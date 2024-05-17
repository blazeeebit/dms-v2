import { CompareDorms } from '@/components/compare'
import React from 'react'

const ComparePage = ({ params }: { params: { id: string } }) => {
  console.log(params)
  return (
    <div className="flex flex-col flex-1 h-0">
      <div>
        <h2 className="text-2xl font-bold">Compare Dorm Prices</h2>
      </div>
      <CompareDorms id={params.id} />
    </div>
  )
}

export default ComparePage
