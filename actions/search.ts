'use server'

import { client } from '@/lib/prisma'

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
        return result
      }

      return []
    }
    if (filter == 'dorm') {
      const result = await client.dormitories.findMany({
        where: {
          active: true,
          language: {
            some: {
              name: {
                contains: query,
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
        return result
      }

      return []
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
        return result
      }

      return []
    }
  } catch (error) {
    console.log(error)
  }
}
