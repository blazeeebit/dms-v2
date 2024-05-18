'use server'

import { client } from '@/lib/prisma'
import { clerkClient } from '@clerk/nextjs/server'

export const onGetFilters = async () => {
  try {
    const filters = await client.filters.findMany()
    if (filters) {
      return filters
    }
  } catch (error) {
    console.log(error)
  }
}

export const onSearchQuery = async (
  query: string | undefined,
  filter: string | undefined,
  language: 'ENGLISH' | 'TURKISH'
) => {
  try {
    //get results based on filter
    if (!filter) {
      const result = await client.user.findMany({
        where: {
          name: {
            startsWith: query,
            mode: 'insensitive',
          },
        },
        select: {
          id: true,
          clerkId: true,
          name: true,
          image: true,
        },
      })

      if (result) {
        let count = 0
        const users: {
          id: string
          name: string
          clerkId: string
          image: string | null
        }[] = []
        while (count < result.length) {
          if (!result[count].image) {
            const user = await clerkClient.users.getUser(result[count].clerkId)
            result[count].image = user.imageUrl
            users.push(result[count])
          } else {
            users.push(result[count])
          }
          count++
        }
        console.log(users)
        return { users: users }
      }
    }
    if (filter == 'dorm') {
      const result = await client.dormitories.findMany({
        where: {
          language: {
            some: {
              name: {
                startsWith: query,
                mode: 'insensitive',
              },
            },
          },
        },
        select: {
          id: true,
          featuredImage: true,
          language: {
            where: {
              language: language,
            },
            select: {
              name: true,
              description: true,
            },
          },
        },
        take: 5,
      })

      if (result) {
        return { dorms: result }
      }
    }
    if (filter == 'price') {
      const result = await client.dormitories.findMany({
        where: {
          active: true,
          price: {
            lt: query,
          },
        },
        select: {
          id: true,
          featuredImage: true,
          language: {
            where: {
              language: language,
            },
            select: {
              name: true,
              description: true,
            },
          },
        },
        take: 5,
      })

      if (result) {
        return { dorms: result }
      }
    }
  } catch (error) {
    console.log(error)
  }
}
