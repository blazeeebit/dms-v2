'use client'
import { useChat } from '@/hooks/use-chat-hook'
import { motion } from 'framer-motion'
import { MessageCircleMore, Search, X } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Input } from '../ui/input'

export const StudentChatList = () => {
  const { onOpenChatList, openList } = useChat()
  return (
    <motion.div
      className="border-2 overflow-hidden fixed bottom-10 right-10"
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
          className="h-full w-full flex justify-center items-center cursor-pointer"
        >
          <MessageCircleMore />
        </motion.div>
      )}
      {openList && (
        <motion.div
          className="p-5 flex flex-col"
          initial={{
            opacity: 0,
          }}
          animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.3 } }}
        >
          <Card className="px-3 py-1 flex gap-2 items-center">
            <Search />
            <Input
              placeholder="Search for other students..."
              className="border-none"
            />
            <X size={30} className="cursor-pointer" onClick={onOpenChatList} />
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}
