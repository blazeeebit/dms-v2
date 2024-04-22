import React from 'react'
import { Input } from '../ui/input'
import { Card, CardContent } from '../ui/card'
import { Search } from 'lucide-react'

export const SearchBar = () => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="py-0 px-3 flex gap-2 items-center">
        <Search size={20} />
        <Input className="w-[400px] border-none" placeholder="Search..." />
      </CardContent>
    </Card>
  )
}
