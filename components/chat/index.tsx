'use client'
import { useChat } from '@/hooks/use-chat-hook'
import { motion } from 'framer-motion'
import { MessageCircleMore, X } from 'lucide-react'
import React from 'react'
import { CardDescription } from '../ui/card'
import { StudentChatCard } from './chat-card'
import { Loader } from '../loader'
import { ChatWindow } from './chat-window'

type StudentChatListProps = {
  student: {
    name: string
    email: string
    image: string
    id: string
  }
}

export const StudentChatList = ({ student }: StudentChatListProps) => {
  const {
    onOpenChatList,
    openList,
    onlineStudents,
    loading,
    onCreateChatWindow,
    openChats,
    onRemoveChatWindow,
  } = useChat(student)

  return (
    <div className="fixed bottom-10 right-10 flex gap-5 items-end">
      {openChats &&
        openChats.map((chat) => (
          <ChatWindow
            key={chat.id}
            {...chat}
            userId={student.id}
            onClose={() => onRemoveChatWindow(chat.id)}
          />
        ))}
      <motion.div
        className="border-2 overflow-hidden"
        initial={{
          width: 60,
          height: 60,
          borderRadius: '50%',
        }}
        animate={{
          width: !openList ? 60 : 400,
          height: !openList ? 60 : 600,
          borderRadius: !openList ? '50%' : '15px',
          transition: {
            duration: 0.2,
          },
        }}
      >
        {!openList && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.2,
                delay: 0.5,
              },
            }}
            onClick={onOpenChatList}
            className="h-full w-full bg-muted flex justify-center items-center cursor-pointer"
          >
            <MessageCircleMore />
          </motion.div>
        )}
        {openList && (
          <motion.div
            className="p-5 flex flex-col h-full bg-muted"
            initial={{
              opacity: 0,
            }}
            animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.3 } }}
          >
            <div className="flex justify-end">
              <X
                size={20}
                className="cursor-pointer"
                onClick={onOpenChatList}
              />
            </div>
            <Loader loading={loading}>
              <div className="w-full flex-1 h-0 py-5 flex flex-col gap-2 overflow-y-scroll no-scroll-window">
                {onlineStudents.length > 1 ? (
                  onlineStudents.map(
                    (s) =>
                      s.id !== student.id && (
                        <StudentChatCard
                          key={s.id}
                          {...s}
                          onChat={() =>
                            onCreateChatWindow(s.id, s.image || '', s.name)
                          }
                        />
                      )
                  )
                ) : (
                  <CardDescription>No Students Online</CardDescription>
                )}
              </div>
            </Loader>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
