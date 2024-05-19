import { onGetMessages, onStoreMessage } from '@/actions/realtime'
import { supabaseClient } from '@/lib/utils'
import { chatMessageProps, chatMessageSchema } from '@/schemas/chat.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

export const useChat = (student: {
  name: string
  email: string
  image: string
  id: string
}) => {
  const [openList, setOpenList] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [openChats, setOpenChats] = useState<
    {
      id: string
      image: string
      name: string
    }[]
  >([])
  const [onlineStudents, setOnlineStudents] = useState<
    {
      name: string
      email: string
      id: string
      image: string
    }[]
  >([])

  const onCreateChatWindow = (id: string, image: string, name: string) =>
    setOpenChats((prev) => [
      ...prev,
      {
        id,
        image,
        name,
      },
    ])

  const onRemoveChatWindow = (id: string) =>
    setOpenChats((prev) => prev.filter((window) => window.id !== id))

  const onOpenChatList = () => setOpenList((prev) => !prev)

  useEffect(() => {
    const channel = supabaseClient.channel('tracking')

    channel
      .on('presence', { event: 'sync' }, () => {
        setLoading(true)
        setOnlineStudents([])
        const state: any = channel.presenceState()
        for (const user in state) {
          setOnlineStudents((prev: any) => [
            ...prev,
            {
              name: state[user][0].name,
              email: state[user][0].email,
              id: state[user][0].id,
              image: state[user][0].image,
            },
          ])
        }
        setLoading(false)
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            ...student,
          })
        }
      })

    return () => {
      channel.unsubscribe()
    }
  }, [])

  return {
    onOpenChatList,
    openList,
    onlineStudents,
    loading,
    onCreateChatWindow,
    openChats,
    onRemoveChatWindow,
  }
}

export const useChatWindow = (senderId: string, recieverId: string) => {
  const { reset, handleSubmit, register } = useForm<chatMessageProps>({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: {
      senderId: senderId,
      recieverId: recieverId,
    },
  })
  const messageWindowRef = useRef<HTMLDivElement | null>(null)

  const [chats, setChats] = useState<
    | {
        id: string
        message: string
        recieverId: string
        studentId: string | null
        createdAt: Date
      }[]
  >([])
  const [openWindow, setOpenWindow] = useState<boolean>(false)

  const onScrollToBottom = () => {
    messageWindowRef.current?.scroll({
      top: messageWindowRef.current.scrollHeight,
      left: 0,
      behavior: 'smooth',
    })
  }

  const onOpenChatWindow = () => setOpenWindow((prev) => !prev)

  const onGetAllMessages = async () => {
    try {
      const messages = await onGetMessages(senderId, recieverId)
      if (messages) {
        setChats(messages)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onSendMessage = handleSubmit(async (values) => {
    try {
      reset()
      await onStoreMessage(values.senderId, values.message, values.recieverId)
    } catch (error) {
      console.log(error)
    }
  })

  useEffect(() => {
    onGetAllMessages()
  }, [])

  useEffect(() => {
    supabaseClient
      .channel('table-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'Message',
        },
        async (payload) => {
          console.log(payload)
          setChats((prev) => [
            ...prev,
            {
              id: payload.new.id,
              message: payload.new.message,
              createdAt: payload.new.createdAt,
              studentId: payload.new.studentId,
              recieverId: payload.new.recieverId,
            },
          ])
        }
      )
      .subscribe()
  }, [])

  useEffect(() => {
    onScrollToBottom()
  }, [chats, messageWindowRef])

  return {
    onOpenChatWindow,
    openWindow,
    onSendMessage,
    chats,
    register,
    messageWindowRef,
  }
}
