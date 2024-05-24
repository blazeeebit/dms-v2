'use server'

import { client } from '@/lib/prisma'
import axios from 'axios'
import * as cheerio from 'cheerio'

export const onIntegrateCalender = async (url: string, title: string) => {
  try {
    const calender = await axios.get(
      `${process.env.SCRAPPING_ANT_HOST}${url}&x-api-key=${process.env.SCRAPPING_ANT_TOKEN}`
    )
    if (calender) {
      const $ = cheerio.load(calender.data)
      const integrated = await client.calender.create({
        data: {
          calender: JSON.stringify($('tr').text()),
          year: title,
        },
      })

      if (integrated) {
        return { status: 200, message: 'Calender successfully integrated' }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onGetCalenders = async () => {
  try {
    const calenders = await client.calender.findMany({
      select: {
        id: true,
        year: true,
      },
    })
    if (calenders) {
      return calenders
    }
  } catch (error) {
    console.log(error)
  }
}

export const onGetCalender = async (id: string) => {
  try {
    const calender = await client.calender.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        year: true,
        calender: true,
      },
    })

    if (calender) {
      return { ...calender, calender: calender.calender.split('\\n') }
    }
  } catch (error) {
    console.log(error)
  }
}
