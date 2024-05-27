'use client'
import React from 'react'
import { motion } from 'framer-motion'

type FadeInProps = {
  children: React.ReactNode
  className?: string
}

export const FadeIn = ({ children, className }: FadeInProps) => {
  const fadeVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  }
  return (
    <motion.div
      initial="hidden"
      animate="reveal"
      className={className}
      transition={{ duration: 0.5, delay: 0.5 }}
      variants={fadeVariants}
    >
      {children}
    </motion.div>
  )
}
