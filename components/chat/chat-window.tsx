'use client'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Send, User, X } from 'lucide-react'
import { useChatWindow } from '@/hooks/use-chat-hook'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Card, CardDescription } from '../ui/card'
import { cn } from '@/lib/utils'

type ChatWindowProps = {
  userId: string
  id: string
  image: string
  name: string
  onClose(): void
}

export const ChatWindow = ({
  id,
  image,
  name,
  onClose,
  userId,
}: ChatWindowProps) => {
  const {
    onOpenChatWindow,
    openWindow,
    register,
    chats,
    onSendMessage,
    messageWindowRef,
  } = useChatWindow(userId, id)
  return (
    <div className="flex flex-col gap-3 items-end bg-muted">
      <AnimatePresence>
        {openWindow && (
          <motion.div
            className="border-2 overflow-hidden rounded-lg"
            initial={{
              width: 0,
              height: 0,
            }}
            animate={{
              width: 400,
              height: 500,
              transition: {
                duration: 0.2,
              },
            }}
            exit={{
              width: 0,
              height: 0,
            }}
          >
            <motion.div
              className="flex flex-col h-full"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: {
                  delay: 0.3,
                  duration: 0.2,
                },
              }}
              exit={{
                opacity: 0,
              }}
            >
              <div>
                <div className="flex px-3 justify-between items-center">
                  <h2 className="text-lg font-semibold lowercase my-3">
                    {name}
                  </h2>
                  <X onClick={onClose} className="cursor-pointer" />
                </div>
                <Separator />
              </div>
              <div
                ref={messageWindowRef}
                className={cn(
                  'flex-1 flex flex-col h-0 p-3 gap-3 overflow-y-auto no-scroll-window'
                )}
              >
                {chats.length ? (
                  chats.map((chat) =>
                    chat.studentId == userId ? (
                      <Card
                        className="bg-muted self-end px-4 py-2 max-w-[70%]"
                        key={chat.id}
                      >
                        {chat.message}
                      </Card>
                    ) : (
                      <Card
                        className="bg-orange dark:bg-iridium px-4 py-2 self-start max-w-[70%]"
                        key={chat.id}
                      >
                        {chat.message}
                      </Card>
                    )
                  )
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <CardDescription>Start a conversation</CardDescription>
                  </div>
                )}
              </div>
              <form
                onSubmit={onSendMessage}
                className="bg-muted flex py-2 gap-3 px-3"
              >
                <Input
                  {...register('message')}
                  className="flex-1 border-0 bg-muted"
                  placeholder="Send a message..."
                />
                <Button type="submit" variant="ghost">
                  <Send />
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Avatar onClick={onOpenChatWindow} className="cursor-pointer">
        <AvatarImage src={image} alt="user" />
        <AvatarFallback>
          <User />
        </AvatarFallback>
      </Avatar>
    </div>
  )
}
