import React from 'react'
import { SideDrawer } from '../sheet'
import { Menu } from 'lucide-react'
import dynamic from 'next/dynamic'

const SearchBar = dynamic(
  () => import('@/components/search').then((component) => component.SearchBar),
  { ssr: false }
)

const EmuLogo = dynamic(
  () =>
    import('@/components/emu-logo').then((component) => component.EmuDmsLogo),
  { ssr: false }
)

type MobileDrawerProps = {
  language: 'ENGLISH' | 'TURKISH'
}

export const MobileDrawer = ({ language }: MobileDrawerProps) => {
  return (
    <div className="lg:hidden">
      <SideDrawer trigger={<Menu size={30} />} side="left">
        <EmuLogo />
        <SearchBar language={language} />
      </SideDrawer>
    </div>
  )
}
