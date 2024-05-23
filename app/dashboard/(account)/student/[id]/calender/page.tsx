'use client'
import { Loader } from '@/components/loader'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import axios from 'axios'
import { useEffect, useState } from 'react'

const EmuCalender = () => {
  const [calender, setCalender] = useState<any[] | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)

  const onGetCalender = async () => {
    try {
      setLoading(true)
      const cal = await axios.get('/api/calender')
      if (cal) {
        setCalender(cal.data)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    onGetCalender()
  }, [])

  return (
    <Card className="flex flex-col flex-1 h-0 overflow-auto no-scroll-window p-10 mb-5">
      <CardTitle className="text-3xl">EMU Accademic Calender</CardTitle>
      <Loader loading={loading}>
        {calender ? (
          calender.map((cal, key) => (
            <div
              key={key}
              className="flex flex-col hover:bg-muted rounded-lg cursor-pointer"
            >
              <CardDescription className="text-xl p-5">{cal}</CardDescription>
              <Separator orientation="horizontal" />
            </div>
          ))
        ) : (
          <div>No calender</div>
        )}
      </Loader>
    </Card>
  )
}

export default EmuCalender
