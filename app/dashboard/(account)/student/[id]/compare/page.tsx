import { CompareDorms } from '@/components/compare'
import React from 'react'

const ComparePage = () => {
  return (
    <div className="flex flex-col flex-1 h-0">
      <div>
        <h2 className="text-2xl font-bold">Compare Dorm Prices</h2>
      </div>
      <CompareDorms />
    </div>
  )
}

export default ComparePage
