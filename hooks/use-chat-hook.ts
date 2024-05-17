import {
  onGetMessages,
  onGetOnlineStudents,
  onGetStudentDetails,
  onStoreMessage,
} from '@/actions/realtime'
import { supabaseClient } from '@/lib/utils'
import { chatMessageProps, chatMessageSchema } from '@/schemas/chat.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

export const useChat = (id: string) => {
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
    | {
        id: string
        name: string
        email: string
        image: string | null
        online: boolean
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

  const onOnlineStudents = async () => {
    try {
      setLoading(true)
      const students = await onGetOnlineStudents(id)
      if (students) {
        setOnlineStudents(students)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onOpenChatList = () => setOpenList((prev) => !prev)

  useEffect(() => {
    onOnlineStudents()
  }, [])

  useEffect(() => {
    supabaseClient
      .channel('table-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'Student',
        },
        async (payload) => {
          try {
            if (payload.new.online) {
              const onlineStudent = await onGetStudentDetails(
                payload.new.userId
              )
              if (onlineStudent) {
                const studentNotOnline = onlineStudents.find(
                  (student) => student.id !== onlineStudent.id
                )
                if (!studentNotOnline) {
                  setOnlineStudents((prevState) => [
                    ...prevState,
                    {
                      id: onlineStudent.id,
                      name: onlineStudent.name,
                      email: onlineStudent.email,
                      image: onlineStudent.image,
                      online: payload.new.online,
                    },
                  ])
                }
              }
            }
            if (!payload.new.online) {
              setOnlineStudents((prev) =>
                prev.filter((student) => student.id !== payload.new.userId)
              )
            }
          } catch (error) {
            console.log(error)
          }
        }
      )
      .subscribe()
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
