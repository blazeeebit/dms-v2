'use server'

import { client } from '@/lib/prisma'
import OpenAi from 'openai'

const openai = new OpenAi({
  apiKey: process.env.OPEN_AI_KEY,
})

export const onGenerateAiDormDescription = async (
  id: string,
  name: string,
  services: {
    name: string
    icon: string
  }[]
) => {
  try {
    const checkCredits = await client.owner.findUnique({
      where: {
        userId: id,
      },
      select: {
        subscription: {
          select: {
            credits: true,
          },
        },
      },
    })
    if (checkCredits && checkCredits.subscription) {
      const updateCredits = await client.owner.update({
        where: {
          userId: id,
        },
        data: {
          subscription: {
            update: {
              credits: { decrement: 1 },
            },
          },
        },
      })
      if (updateCredits) {
        const chatCompletion = await openai.chat.completions.create({
          messages: [
            {
              role: 'assistant',
              content: `
              You need to generate a 150 word description for this dormitory in eastern mediteranean university. The dorm name is ${name} and you must talk about the services they offer which are ${services
                .map((service) => service.name)
                .join(', ')}
          `,
            },
          ],
          model: 'gpt-3.5-turbo',
        })

        if (chatCompletion) {
          return {
            status: 200,
            message: chatCompletion.choices[0].message.content,
          }
        }
      }
    } else {
      return {
        status: 400,
        message:
          'Looks like your out of credits!, upgrade your plan to get more',
      }
    }
  } catch (error) {
    console.log(error)
  }
}
