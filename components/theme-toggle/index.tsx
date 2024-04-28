'use client'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DMS_CONTENT } from '@/constants/language'

type ThemeToggleProps = {
  language: 'ENGLISH' | 'TURKISH'
}

export const ThemeToggle = ({ language }: ThemeToggleProps) => {
  const { setTheme } = useTheme()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          {DMS_CONTENT.UI_MODE[language].content['light']}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          {DMS_CONTENT.UI_MODE[language].content['dark']}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          {DMS_CONTENT.UI_MODE[language].content['system']}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
