'use client'
import { cn } from '@/lib/utils'
import React from 'react'
import { AnimatedSideBarMenuItem } from '../sidebar/sidebar-motion'
import { Languages } from 'lucide-react'
import { useTranslation } from '@/hooks/use-profile-hook'
import { Loader } from '../loader'

type LanguageToggleProps = {
  onResize: number
}

export const LanguageToggle = ({ onResize }: LanguageToggleProps) => {
  const { onChangeLanguagePreference, language, loading } = useTranslation()
  return (
    <div
      onClick={onChangeLanguagePreference}
      className={cn(
        'flex gap-x-5 cursor-pointer items-center p-1 rounded-md hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black duration-150 trnasition ease-in-out'
      )}
    >
      <Languages size={30} />
      <AnimatedSideBarMenuItem onView={onResize}>
        <Loader loading={loading}>
          <p className="text-base leading-none font-semibold capitalize">
            {language == 'ENGLISH' ? 'English' : 'Turkish'}
          </p>
        </Loader>
      </AnimatedSideBarMenuItem>
    </div>
  )
}
