import { useState } from 'react'

export const useChat = () => {
  const [openList, setOpenList] = useState<boolean>(false)

  const onOpenChatList = () => setOpenList((prev) => !prev)

  return { onOpenChatList, openList }
}
