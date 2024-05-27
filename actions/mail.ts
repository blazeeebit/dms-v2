'use server'

import { client } from '@/lib/prisma'
import axios from 'axios'
import nodemailer from 'nodemailer'

export const onMailer = (
  email: string,
  subject: string,
  message: string,
  html: string
) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODE_MAILER_EMAIL,
      pass: process.env.NODE_MAILER_GMAIL_APP_PASSWORD,
    },
  })

  const mailOptions = {
    to: email,
    subject,
    text: message,
    html,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

export const onCreateNewEmailTemplate = async (id: string) => {
  try {
    const template = await client.owner.update({
      where: {
        userId: id,
      },
      data: {
        emailTemplate: {
          create: {},
        },
      },
    })
    if (template) {
      return { status: 200, message: 'New email template created' }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onGetAllEmailTemplates = async (id: string) => {
  try {
    const template = await client.owner.findUnique({
      where: {
        userId: id,
      },
      select: {
        emailTemplate: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    })
    if (template) {
      return template.emailTemplate
    }
  } catch (error) {
    console.log(error)
  }
}

export const onGetEmailTemplate = async (emailId: string) => {
  try {
    const template = await client.emailTempplate.findUnique({
      where: {
        id: emailId,
      },
    })

    if (template) {
      return template
    }
  } catch (error) {
    console.log(error)
  }
}

export const onUpdateEmailTemplateName = async (id: string, name: string) => {
  try {
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

    const template = await client.emailTempplate.update({
      where: {
        id,
      },
      data: {
        enName: name,
        trName: translation.data.data.translations.translatedText,
      },
    })

    if (template) {
      return {
        status: 200,
        message: 'Template name updated',
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onGetDormsNameAndIds = async (
  id: string,
  language: 'ENGLISH' | 'TURKISH'
) => {
  try {
    const dorms = await client.owner.findUnique({
      where: {
        userId: id,
      },
      select: {
        dorms: {
          select: {
            language: {
              where: {
                language,
              },
              select: {
                name: true,
              },
            },
            id: true,
          },
        },
      },
    })

    if (dorms) {
      return dorms
    }
  } catch (error) {
    console.log(error)
  }
}
