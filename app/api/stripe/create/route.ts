import { client } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  typescript: true,
  apiVersion: '2024-04-10',
})

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const id = searchParams.get('id')

    const account = await stripe.accounts.create({
      type: 'standard',
      country: 'US',
      business_type: 'individual',
      external_account: {
        object: 'bank_account',
        country: 'US',
        currency: 'usd',
        routing_number: '110000000',
        account_number: '000123456789',
      },
      individual: {
        first_name: 'Test',
        last_name: 'User',
        phone: '+16505551234',
        email: 'test@example.com',
        id_number: '222222222',
        address: {
          line1: '123 State St',
          city: 'Schenectady',
          postal_code: '12345',
          state: 'NY',
        },
        dob: {
          day: 1,
          month: 1,
          year: 1901,
        },
        verification: {
          document: {
            front: 'file_identity_document_success',
          },
        },
      },
    })
    if (account) {
      const integrateStripeAccount = await client.owner.update({
        where: {
          userId: id as string,
        },
        data: {
          stripeId: account.id,
        },
      })

      if (integrateStripeAccount) {
        const accountLink = await stripe.accountLinks.create({
          account: account.id,
          refresh_url: `${process.env.NEXT_PUBLIC_DMS_URL}/callback/stripe/refresh`,
          return_url: `${process.env.NEXT_PUBLIC_DMS_URL}/dashboard/owner/${id}/integrations`,
          type: 'account_onboarding',
        })
        return NextResponse.json({
          url: accountLink.url,
        })
      }
    }
  } catch (error) {
    return new NextResponse(
      'An error occurred when calling the Stripe API to create an account:'
    )
  }
}
