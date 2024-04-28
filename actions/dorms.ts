'use server'
import { client } from '@/lib/prisma'
import axios from 'axios'

export const onCreateNewListing = async (
  id: string,
  listing: {
    title: string
    price: string
    description: string
    image: string
    services: {
      name: string
      icon: string
    }[]
  }
) => {
  const options = {
    method: 'POST',
    url: process.env.TRANSLATION_API_URL,
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.TRANSLATION_API_KEY,
      'X-RapidAPI-Host': process.env.TRANSLATION_API_HOST,
    },
    data: {
      q: [listing.title, listing.description],
      source: 'en',
      target: 'tr',
    },
  }
  try {
    //first we generate a translation for title
    const translation = await axios.request(options)
    //insert both versions into database
    //first english
    const ownerId = await client.user.findUnique({
      where: {
        id,
      },
      select: {
        owner: {
          select: {
            id: true,
          },
        },
      },
    })

    if (ownerId) {
      const createDorm = await client.owner.update({
        where: {
          id: ownerId.owner[0].id,
        },
        data: {
          dorms: {
            create: {
              price: listing.price,
              featuredImage: listing.image,
              service: {
                create: listing.services,
              },
              language: {
                createMany: {
                  data: [
                    {
                      name: listing.title,
                      language: 'ENGLISH',
                      description: listing.description,
                    },
                    {
                      name: translation.data.data.translations
                        .translatedText[0],
                      description:
                        translation.data.data.translations.translatedText[1],
                      language: 'TURKISH',
                    },
                  ],
                },
              },
            },
          },
        },
      })
      if (createDorm) {
        return { status: 200, message: 'Created new dorm' }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onGetDormListings = async (id: string) => {
  try {
    //get the users language preference and owner id
    const ownerIdAndPreference = await client.user.findUnique({
      where: {
        id,
      },
      select: {
        language: true,
        owner: {
          select: {
            id: true,
            payments: true,
          },
        },
      },
    })

    if (ownerIdAndPreference) {
      //now get the logged in owners dorms and based on translation
      const dormVarient = await client.dormitories.findMany({
        where: {
          ownerId: ownerIdAndPreference.owner[0].id,
        },
        include: {
          language: {
            where: {
              language: ownerIdAndPreference.language,
            },
            select: {
              description: true,
              name: true,
            },
          },
        },
      })

      if (dormVarient) {
        return {
          dorms: dormVarient,
          preference: ownerIdAndPreference.language,
          payments: ownerIdAndPreference.owner[0].payments,
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onGetAllServices = async () => {
  try {
    const services = await client.services.findMany({
      select: {
        id: true,
        name: true,
        icon: true,
      },
    })
    if (services) {
      return services
    }
  } catch (error) {
    console.log(error)
  }
}

export const onActiveateDorm = async (dormId: string, state: boolean) => {
  console.log(state)
  try {
    const dormStatus = await client.dormitories.update({
      where: {
        id: dormId,
      },
      data: {
        active: !state ? false : true,
      },
      select: {
        active: true,
      },
    })

    console.log(dormStatus)

    if (dormStatus) {
      return {
        status: 200,
        message: `Listing ${!dormStatus.active ? 'deactivated' : 'activated'}`,
      }
    }
  } catch (error) {
    console.log(error)
  }
}
