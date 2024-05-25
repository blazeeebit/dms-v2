'use server'
import { client } from '@/lib/prisma'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  typescript: true,
  apiVersion: '2024-04-10',
})

export const onGetUserSubscription = async (id: string) => {
  try {
    const plan = await client.user.findUnique({
      where: {
        id: id,
      },
      select: {
        owner: {
          select: {
            subscription: {
              select: {
                plan: true,
                credits: true,
              },
            },
          },
        },
      },
    })

    if (plan) {
      return { ...plan.owner[0].subscription }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onGetStripeIntegration = async (id: string) => {
  try {
    const stripeId = await client.owner.findUnique({
      where: {
        userId: id,
      },
      select: {
        stripeId: true,
        User: {
          select: {
            language: true,
          },
        },
      },
    })

    if (stripeId) {
      return stripeId
    }
  } catch (error) {
    console.log(error)
  }
}

export const onCreateCustomerPaymentIntentSecret = async (
  amount: number,
  stripeId: string
) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create(
      {
        currency: 'usd',
        amount: amount * 100,
        automatic_payment_methods: {
          enabled: true,
        },
      },
      { stripeAccount: stripeId }
    )

    if (paymentIntent) {
      return { secret: paymentIntent.client_secret }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onRoomRented = async (room: string, student: string) => {
  try {
    const rented = await client.room.update({
      where: {
        id: room,
      },
      data: {
        rented: {
          create: {
            student,
          },
        },
      },
    })

    if (rented) {
      const deleteReservation = await client.reservations.deleteMany({
        where: {
          students: student,
        },
      })

      if (deleteReservation) {
        return { status: 200, message: 'You have confirmed your room' }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onCreateTransaction = async (
  studentId: string,
  dormId: string,
  amount: string,
  type: 'BOOKING' | 'RENTED'
) => {
  try {
    const studentInfo = await client.student.findUnique({
      where: {
        userId: studentId,
      },
      select: {
        User: {
          select: {
            name: true,
          },
        },
      },
    })

    if (studentInfo && studentInfo.User) {
      const transactionComplete = await client.dormitories.update({
        where: {
          id: dormId,
        },
        data: {
          transaction: {
            create: {
              amount,
              type,
              studentId,
              studentName: studentInfo.User.name,
            },
          },
        },
      })

      if (transactionComplete) {
        return { status: 200, message: 'Payment completed' }
      }
    }
  } catch (error) {
    console.log(error)
  }
}
