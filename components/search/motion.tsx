import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { Card, CardContent } from '../ui/card'

type SearchResultsProps = {
  state: boolean
  children: React.ReactNode
}

export const SearchResults = ({ state, children }: SearchResultsProps) => {
  return (
    <AnimatePresence mode="wait">
      {state && (
        <motion.div
          className="absolute w-full top-[115%]"
          initial={{
            y: '50%',
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: '50%',
            opacity: 0,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          <Card className="rounded-sm">
            <CardContent className="p-3">{children}</CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
