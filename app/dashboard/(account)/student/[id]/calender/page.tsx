import { onScrapeEmuCalender } from '@/actions/scraper'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const EmuCalender = async () => {
  const calender: string[] = await onScrapeEmuCalender()

  return (
    <Card className="flex flex-col flex-1 h-0 overflow-auto no-scroll-window p-10 mb-5">
      <CardTitle className="text-3xl">EMU Accademic Calender</CardTitle>
      {calender.map((cal, key) => (
        <div
          key={key}
          className="flex flex-col hover:bg-muted rounded-lg cursor-pointer"
        >
          <CardDescription className="text-xl p-5">{cal}</CardDescription>
          <Separator orientation="horizontal" />
        </div>
      ))}
    </Card>
  )
}

export default EmuCalender
