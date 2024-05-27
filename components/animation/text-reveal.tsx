'use client'
import React from 'react'
import { motion } from 'framer-motion'

type TextRevealProps = {
  text: string
  className?: string
}

export const TextReveal = ({ text, className }: TextRevealProps) => {
  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  }

  const chars = text.split('')

  return (
    <motion.h1
      initial="hidden"
      className={className}
      whileInView="reveal"
      transition={{ staggerChildren: 0.02 }}
    >
      {chars.map((char, key) => (
        <motion.span
          key={key}
          transition={{ duration: 0.5 }}
          variants={charVariants}
        >
          {char}
        </motion.span>
      ))}
    </motion.h1>
  )
}
