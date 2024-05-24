import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/prisma'
import axios from 'axios'
import * as cheerio from 'cheerio'

export async function POST(req: NextRequest) {
  const data = await req.json()

  try {
    const calender = await axios.get(
      `${process.env.SCRAPPING_ANT_HOST}${data.url}&x-api-key=${process.env.SCRAPPING_ANT_TOKEN}`
    )
    if (calender) {
      const $ = cheerio.load(calender.data)
      const integrated = await client.calender.create({
        data: {
          calender: JSON.stringify($('tr').text()),
          year: data.title,
        },
      })

      if (integrated) {
        return new NextResponse('Calender integrated')
      }
    }
  } catch (error) {
    return new NextResponse('Calender integration failed')
  }
}
