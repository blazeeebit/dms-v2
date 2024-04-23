import { usePathname } from 'next/navigation'
import { useState, useCallback } from 'react'

export const useSideBar = () => {
  const [onResize, setOnResize] = useState<number>(0)
  const onSideBarRef = useCallback((node: HTMLElement | null) => {
    if (!node) return
    const resizeObserver = new ResizeObserver(() => {
      setOnResize(node.getBoundingClientRect().width)
    })
    resizeObserver.observe(node)
  }, [])
  const pathname = usePathname()
  const currentPage = pathname.split('/').pop()
  return {
    onResize,
    onSideBarRef,
    currentPage,
  }
}

export const useNavBar = () => {
  const pathname = usePathname()
  const currentPage = pathname.split('/').pop()

  return { currentPage }
}
