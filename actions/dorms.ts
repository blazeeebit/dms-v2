'use server'
import { client } from '@/lib/prisma'
import axios from 'axios'
import { getMonthName } from '@/lib/utils'
import { onMailer } from './mail'
import { clerkClient } from '@clerk/nextjs/server'

export const onCreateNewListing = async (
  id: string,
  listing: {
    title: string
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
            stripeId: true,
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
        orderBy: {
          id: 'asc',
        },
        include: {
          service: {
            select: {
              rating: true,
            },
          },
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
          payments: ownerIdAndPreference.owner[0].stripeId,
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

export const onGetDormProfile = async (id: string, ownerId: string) => {
  try {
    const userLanguagePreference = await client.user.findUnique({
      where: {
        id: ownerId,
      },
      select: {
        language: true,
      },
    })

    if (userLanguagePreference) {
      const dormProfile = await client.dormitories.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          language: {
            where: {
              language: userLanguagePreference.language,
            },
          },
          promo: {
            where: {
              active: true,
            },
            select: {
              discount: true,
            },
          },
          service: {
            select: {
              id: true,
              rating: true,
              name: true,
              icon: true,
            },
          },
          location: true,
          featuredImage: true,
          Owner: {
            select: {
              stripeId: true,
            },
          },
          rooms: {
            select: {
              id: true,
              price: true,
              type: true,
            },
          },
          bookingPlan: {
            select: {
              id: true,
              price: true,
              period: true,
            },
          },
          gallery: {
            select: {
              id: true,
              image: true,
            },
          },
        },
      })

      if (dormProfile) {
        return dormProfile
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onSearchDormToCompare = async (query: string, id: string) => {
  try {
    const userLanguagePreference = await client.user.findUnique({
      where: {
        id,
      },
      select: {
        language: true,
      },
    })
    if (userLanguagePreference) {
      const dorms = await client.dormitories.findMany({
        where: {
          active: true,
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
              language: userLanguagePreference.language,
            },
            select: {
              name: true,
              description: true,
            },
          },
        },
        take: 5,
      })

      if (dorms) {
        console.log('Dorms', dorms, query)
        return dorms
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onGetSingleCompareDorm = async (id: string) => {
  try {
    const dorm = await client.dormitories.findUnique({
      where: {
        id,
      },
      select: {
        featuredImage: true,
        service: {
          select: {
            name: true,
            icon: true,
          },
        },
        language: {
          select: {
            language: true,
            name: true,
            description: true,
          },
        },
      },
    })

    if (dorm) {
      return dorm
    }
  } catch (error) {
    console.log(error)
  }
}

export const onGetAllDorms = async (id: string) => {
  try {
    const userLanguagePreference = await client.user.findUnique({
      where: {
        id,
      },
      select: {
        language: true,
      },
    })
    if (userLanguagePreference) {
      const allDorms = await client.dormitories.findMany({
        where: {
          active: true,
        },
        select: {
          id: true,
          featuredImage: true,
          service: true,
          location: true,
          gallery: true,
          active: true,
          language: {
            where: {
              language: userLanguagePreference.language,
            },
            select: {
              name: true,
              description: true,
            },
          },
        },
        take: 5,
      })

      return allDorms
    }
  } catch (error) {
    console.log(error)
  }
}

export const onUpdateDormTitle = async (id: string, name: string) => {
  try {
    const languageSet = await client.dormitories.findUnique({
      where: {
        id,
      },
      select: {
        language: {
          select: {
            id: true,
            language: true,
          },
        },
      },
    })

    if (languageSet) {
      const options = {
        method: 'POST',
        url: process.env.TRANSLATION_API_URL,
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.TRANSLATION_API_KEY,
          'X-RapidAPI-Host': process.env.TRANSLATION_API_HOST,
        },
        data: {
          q: name,
          source: 'en',
          target: 'tr',
        },
      }

      const translation = await axios.request(options)

      if (translation) {
        for (const set in languageSet.language) {
          await client.dormitoriesLanguage.update({
            where: {
              id: languageSet.language[set].id,
              language: languageSet.language[set].language,
            },
            data: {
              name:
                languageSet.language[set].language == 'ENGLISH'
                  ? name
                  : translation.data.data.translations.translatedText,
            },
          })
        }

        return { status: 200, message: 'Title successfully updated' }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onUpdateDormDescription = async (
  id: string,
  description: string
) => {
  try {
    const languageSet = await client.dormitories.findUnique({
      where: {
        id,
      },
      select: {
        language: {
          select: {
            id: true,
            language: true,
          },
        },
      },
    })

    if (languageSet) {
      const options = {
        method: 'POST',
        url: process.env.TRANSLATION_API_URL,
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.TRANSLATION_API_KEY,
          'X-RapidAPI-Host': process.env.TRANSLATION_API_HOST,
        },
        data: {
          q: description,
          source: 'en',
          target: 'tr',
        },
      }

      const translation = await axios.request(options)

      if (translation) {
        for (const set in languageSet.language) {
          await client.dormitoriesLanguage.update({
            where: {
              id: languageSet.language[set].id,
              language: languageSet.language[set].language,
            },
            data: {
              description:
                languageSet.language[set].language == 'ENGLISH'
                  ? description
                  : translation.data.data.translations.translatedText,
            },
          })
        }

        return { status: 200, message: 'Description successfully updated' }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onUploadGallery = async (id: string, file: string) => {
  try {
    await client.dormitories.update({
      where: {
        id,
      },
      data: {
        gallery: {
          create: {
            image: file,
          },
        },
      },
    })
  } catch (error) {
    console.log(error)
  }
}

export const onCreateRoomPlan = async (
  id: string,
  room: string,
  price: string
) => {
  try {
    const roomPlan = await client.dormitories.update({
      where: {
        id,
      },
      data: {
        rooms: {
          create: {
            type: room,
            price,
          },
        },
      },
    })

    if (roomPlan) {
      return { status: 200, message: 'New room plan created' }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onCreateDormBookingButton = async (
  id: string,
  price: string,
  period: Date
) => {
  try {
    const button = await client.dormitories.update({
      where: {
        id,
      },
      data: {
        bookingPlan: {
          create: {
            price,
            period,
          },
        },
      },
    })

    if (button) {
      return { status: 200, message: 'Booking button added' }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onCreateBooking = async (
  id: string,
  studentId: string,
  type: string
) => {
  try {
    const room = await client.dormitories.findUnique({
      where: {
        id,
      },
      select: {
        rooms: {
          where: {
            type,
          },
          select: {
            id: true,
          },
        },
      },
    })

    if (room) {
      const booking = await client.room.update({
        where: {
          id: room.rooms[0].id,
        },
        data: {
          reservations: {
            create: {
              students: studentId,
            },
          },
        },
      })

      if (booking) {
        const studentEmail = await client.user.findUnique({
          where: {
            id: studentId,
          },
          select: {
            clerkId: true,
          },
        })

        if (studentEmail) {
          const email = await clerkClient.users.getUser(studentEmail.clerkId)
          onMailer(
            email.emailAddresses[0].emailAddress,
            'Booking Confirmed',
            'Your booking has been confirmed'
          )
          return { status: 200, message: 'Payment complete! Booking created' }
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onCheckIfBooked = async (studentId: string, dormId: string) => {
  try {
    const booked = await client.dormitories.findUnique({
      where: {
        id: dormId,
      },
      select: {
        rooms: {
          where: {
            dormitoriesId: dormId,
            reservations: {
              some: {
                students: studentId,
              },
            },
          },
          select: {
            reservations: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    })

    if (booked?.rooms[0].reservations.length! > 0) {
      return true
    }
    return false
  } catch (error) {
    console.log(error)
  }
}

export const onCheckIfStudentRented = async (
  studentId: string,
  dormId: string
) => {
  try {
    const rented = await client.dormitories.findUnique({
      where: {
        id: dormId,
      },
      select: {
        rooms: {
          where: {
            rented: {
              some: {
                student: studentId,
              },
            },
          },
          select: {
            rented: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    })

    if (rented && rented.rooms[0].rented.length > 0) {
      return true
    }
    return false
  } catch (error) {
    console.log(error)
  }
}

export const onRateDormService = async (
  id: string,
  ratings: number,
  studentId: string
) => {
  try {
    const rated = await client.service.update({
      where: {
        id,
      },
      data: {
        rating: {
          create: {
            rating: ratings,
            studentId,
          },
        },
      },
    })
    if (rated) {
      return { status: 200, message: 'Thank you for rating us!' }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onPostNewReview = async (
  dormId: string,
  studentId: string,
  review: string
) => {
  try {
    const reviewed = await client.dormitories.update({
      where: {
        id: dormId,
      },
      data: {
        review: {
          create: {
            studentId,
            review,
          },
        },
      },
    })

    if (reviewed) {
      return { status: 200, message: 'Your review has been posted' }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onGetDormReviewForUser = async (
  dormId: string,
  studentId: string
) => {
  try {
    const studentReview = await client.dormitories.findUnique({
      where: {
        id: dormId,
      },
      select: {
        review: {
          where: {
            studentId,
          },
          select: {
            review: true,
          },
        },
      },
    })

    if (studentReview && studentReview.review) {
      return studentReview.review
    }
  } catch (error) {
    console.log(error)
  }
}

export const onGetAllDormReviews = async (dormId: string) => {
  try {
    const reviews = await client.dormitories.findMany({
      where: {
        id: dormId,
      },
      select: {
        review: {
          select: {
            studentId: true,
            review: true,
            id: true,
          },
          take: 5,
        },
      },
    })

    return reviews
  } catch (error) {
    console.log(error)
  }
}

export const onGetTotalRating = async (dormId: string) => {
  try {
    const rating = await client.rating.findMany({
      where: {
        Service: {
          dormitoriesId: dormId,
        },
      },
      select: {
        rating: true,
      },
    })

    if (rating) {
      const totalRating = rating.reduce((total, next) => {
        return total + next.rating
      }, 0)

      return totalRating / rating.length
    }
  } catch (error) {
    console.log(error)
  }
}

export const onDeleteDorm = async (dormId: string) => {
  try {
    const deleteDorm = await client.dormitories.delete({
      where: {
        id: dormId,
      },
    })

    if (deleteDorm) {
      return {
        status: 200,
        message: 'Dorm has been deleted',
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onTotalDormsOwned = async (userId: string) => {
  try {
    const owned = await client.dormitories.count({
      where: {
        Owner: {
          userId,
        },
      },
    })

    if (owned) {
      return owned
    }
  } catch (error) {
    console.log(error)
  }
}

export const onTotalDormBookings = async (userId: string) => {
  try {
    const bookings = await client.reservations.count({
      where: {
        Room: {
          Dormitories: {
            Owner: {
              userId,
            },
          },
        },
      },
    })

    if (bookings) {
      return bookings
    }
  } catch (error) {
    console.log(error)
  }
}

export const onTotalDormsRevenue = async (userId: string) => {
  try {
    const revenue = await client.transactions.findMany({
      where: {
        Dormitories: {
          Owner: {
            userId,
          },
        },
      },
      select: {
        amount: true,
      },
    })

    if (revenue) {
      const total = revenue.reduce((total, next) => {
        return total + parseInt(next.amount)
      }, 0)
      return total
    }
  } catch (error) {
    console.log(error)
  }
}

export const onTotalDormsRented = async (userId: string) => {
  try {
    const rented = await client.rented.count({
      where: {
        Room: {
          Dormitories: {
            Owner: {
              userId,
            },
          },
        },
      },
    })

    if (rented) {
      return rented
    }
  } catch (error) {
    console.log(error)
  }
}

export const onCreateStudentRentData = async (userId: string) => {
  try {
    const allRents = await client.rented.findMany({
      where: {
        Room: {
          Dormitories: {
            Owner: {
              userId,
            },
          },
        },
      },
      select: {
        createdAt: true,
      },
    })

    if (allRents) {
      //create a data set
      const dataSet: { month: string; count: number }[] = [
        {
          month: 'Jan',
          count: 0,
        },
        {
          month: 'Feb',
          count: 0,
        },
        {
          month: 'Mar',
          count: 0,
        },
        {
          month: 'Apr',
          count: 0,
        },
        {
          month: 'May',
          count: 0,
        },
        {
          month: 'Jun',
          count: 0,
        },
        {
          month: 'Jul',
          count: 0,
        },
        {
          month: 'Aug',
          count: 0,
        },
        {
          month: 'Sep',
          count: 0,
        },
        {
          month: 'Oct',
          count: 0,
        },
        {
          month: 'Nov',
          count: 0,
        },
        {
          month: 'Dec',
          count: 0,
        },
      ]

      for (let month = 0; month < dataSet.length; month++) {
        for (let renter = 0; renter < allRents.length; renter++) {
          if (
            getMonthName(allRents[renter].createdAt.getMonth() + 1) ==
            dataSet[month].month
          ) {
            dataSet[month].count += 1
          }
        }
      }

      return dataSet
    }
  } catch (error) {
    console.log(error)
  }
}

export const onCreateRevenueDataSet = async (userId: string) => {
  try {
    const transactions = await client.transactions.findMany({
      where: {
        Dormitories: {
          Owner: {
            userId,
          },
        },
      },
      select: {
        createdAt: true,
        amount: true,
      },
    })

    if (transactions) {
      const dataSet: { month: string; count: number }[] = [
        {
          month: 'Jan',
          count: 0,
        },
        {
          month: 'Feb',
          count: 0,
        },
        {
          month: 'Mar',
          count: 0,
        },
        {
          month: 'Apr',
          count: 0,
        },
        {
          month: 'May',
          count: 0,
        },
        {
          month: 'Jun',
          count: 0,
        },
        {
          month: 'Jul',
          count: 0,
        },
        {
          month: 'Aug',
          count: 0,
        },
        {
          month: 'Sep',
          count: 0,
        },
        {
          month: 'Oct',
          count: 0,
        },
        {
          month: 'Nov',
          count: 0,
        },
        {
          month: 'Dec',
          count: 0,
        },
      ]

      for (let month = 0; month < dataSet.length; month++) {
        for (let renter = 0; renter < transactions.length; renter++) {
          if (
            getMonthName(transactions[renter].createdAt.getMonth() + 1) ==
            dataSet[month].month
          ) {
            dataSet[month].count += parseInt(transactions[renter].amount) / 100
          }
        }
      }

      return dataSet
    }
  } catch (error) {
    console.log(error)
  }
}

export const onGetAllRecentTransactions = async (userId: string) => {
  try {
    const transaction = await client.transactions.findMany({
      where: {
        Dormitories: {
          Owner: {
            userId,
          },
        },
      },
      select: {
        Dormitories: {
          select: {
            language: {
              select: {
                name: true,
              },
            },
          },
        },
        createdAt: true,
        amount: true,
        studentName: true,
        studentId: true,
        type: true,
        id: true,
      },
      take: 5,
      orderBy: {
        createdAt: 'asc',
      },
    })

    if (transaction) {
      return transaction
    }
  } catch (error) {
    console.log(error)
  }
}

export const onCreatenewPromo = async (
  dormId: string,
  name: string,
  discount: string
) => {
  try {
    const promo = await client.dormitories.update({
      where: {
        id: dormId,
      },
      data: {
        promo: {
          create: {
            name,
            discount: parseInt(discount),
          },
        },
      },
    })

    if (promo) {
      return {
        status: 200,
        message: 'New promo created',
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onGetAllPromos = async (dormId: string) => {
  try {
    const promos = await client.promos.findMany({
      where: {
        dormitoriesId: dormId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    if (promos) {
      return promos
    }
  } catch (error) {
    console.log(error)
  }
}

export const onActivateNewPromo = async (dormId: string, promoId: string) => {
  try {
    const checkActive = await client.promos.findMany({
      where: {
        dormitoriesId: dormId,
        active: true,
      },
    })

    if (checkActive.length > 0) {
      return {
        status: 200,
        message:
          'Looks like you already have an active promo. Deactivate it first',
      }
    }

    const activate = await client.promos.update({
      where: {
        id: promoId,
      },
      data: {
        active: true,
      },
    })

    if (activate) {
      return {
        status: 200,
        message: 'Promo successfully activated',
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onDeactivateNewPromo = async (promoId: string) => {
  try {
    const promo = await client.promos.update({
      where: {
        id: promoId,
      },
      data: {
        active: false,
      },
    })

    if (promo) {
      return {
        status: 200,
        message: 'Promo successfully deactivated',
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onDeleteRoomPlan = async (id: string) => {
  try {
    const deleted = await client.room.delete({
      where: {
        id,
      },
    })

    if (deleted) {
      return {
        status: 200,
        message: 'Room successfully deleted',
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onGetReviewCount = async (dormId: string) => {
  try {
    const reviews = await client.review.count({
      where: {
        dormitoriesId: dormId,
      },
    })

    if (reviews) {
      return reviews
    }
  } catch (error) {
    console.log(error)
  }
}

export const onGetRentedStudents = async (dormId: string) => {
  try {
    const students = await client.rented.findMany({
      where: {
        Room: {
          dormitoriesId: dormId,
        },
      },
      take: 5,
    })

    if (students) {
      return students
    }
  } catch (error) {
    console.log(error)
  }
}

export const onGetStudentInfoRented = async (userId: string) => {
  try {
    const info = await client.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        clerkId: true,
        image: true,
      },
    })

    if (info) {
      const email = await clerkClient.users.getUser(info.clerkId)
      return {
        name: info.name,
        email: email.emailAddresses[0].emailAddress,
        image: info.image || email.imageUrl,
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onGetRentedRoomType = async (roomId: string) => {
  try {
    const room = await client.room.findUnique({
      where: {
        id: roomId,
      },
      select: {
        type: true,
      },
    })

    if (room) {
      return room.type
    }
  } catch (error) {
    console.log(error)
  }
}

export const onGetIndividualRatings = async (studentId: string) => {
  try {
    const ratings = await client.rating.findMany({
      where: {
        studentId,
      },
      select: {
        rating: true,
      },
    })

    if (ratings) {
      const userInfo = await client.user.findUnique({
        where: {
          id: studentId,
        },
        select: {
          image: true,
          name: true,
          clerkId: true,
        },
      })

      if (userInfo) {
        const imageUrl = await clerkClient.users.getUser(userInfo.clerkId)
        const ratingsAvg = ratings.reduce((total, next) => {
          return total + next.rating
        }, 0)

        return {
          user: userInfo,
          clerkImg: imageUrl.imageUrl,
          total: ratingsAvg / ratings.length,
        }
      }
    }
  } catch (error) {}
}
