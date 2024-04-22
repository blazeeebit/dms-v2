'use client'
import { AnimatePresence, motion } from 'framer-motion'

export const AnimatedSideBarBody = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <motion.div
      whileHover={{
        width: 300,
        transition: {
          duration: 0.3,
        },
      }}
      className="lg:inline hidden fixed left-0 w-[75px] h-full z-[50]"
    >
      {children}
    </motion.div>
  )
}

export const AnimatedSideBarMenuItem = ({
  children,
  onView,
}: {
  children: React.ReactNode
  onView: number
}) => {
  return (
    <AnimatePresence mode="wait">
      {onView > 290 && (
        <motion.p
          initial={{
            display: 'none',
            opacity: 0,
          }}
          animate={{
            display: 'block',
            opacity: 1,
            transition: {
              duration: 0.3,
            },
          }}
          exit={{
            display: 'none',
          }}
          className="font-medium"
        >
          {children}
        </motion.p>
      )}
    </AnimatePresence>
  )
}
