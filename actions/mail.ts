'use server'

import { client } from '@/lib/prisma'
import { clerkClient } from '@clerk/nextjs/server'
import axios from 'axios'
import nodemailer from 'nodemailer'

export const onMailer = (email: string, subject: string, message: string) => {
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
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

export const onBulkMailer = (
  email: string[],
  subject: string,
  message: string
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

export const onAssignDomainToEmail = async (dormId: string, id: string) => {
  try {
    const dorm = await client.emailTempplate.update({
      where: {
        id,
      },
      data: {
        dormId,
      },
    })

    if (dorm) {
      return { status: 200, message: 'Dorm assigned to email' }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onSaveEmailTemplateContent = async (
  emailId: string,
  template: string
) => {
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
        q: template,
        source: 'en',
        target: 'tr',
      },
    }

    const translation = await axios.request(options)

    const temp = await client.emailTempplate.update({
      where: {
        id: emailId,
      },
      data: {
        english: template,
        turkish: translation.data.data.translations.translatedText,
      },
    })

    if (temp) {
      return {
        status: 200,
        message: 'Your template was stored & translated',
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onDeleteEmailTemplate = async (emailId: string) => {
  try {
    const deleted = await client.emailTempplate.delete({
      where: {
        id: emailId,
      },
    })

    if (deleted) {
      return {
        status: 200,
        message: 'Template Deleted',
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const onSendBulkEmailsToStudents = async (
  emailId: string,
  userId: string
) => {
  try {
    const template = await client.emailTempplate.findUnique({
      where: {
        id: emailId,
      },
      select: {
        dormId: true,
        english: true,
        turkish: true,
        enName: true,
        trName: true,
      },
    })

    console.log(template)

    if (template && template.dormId) {
      const students = await client.dormitories.findUnique({
        where: {
          id: template.dormId,
        },
        select: {
          rooms: {
            select: {
              rented: {
                select: {
                  student: true,
                },
              },
            },
          },
        },
      })
      console.log(students, 'student id')
      if (students) {
        let room = 0
        while (room < students.rooms.length) {
          console.log(students.rooms)
          let mails = 0
          while (mails < students.rooms[room].rented.length) {
            console.log(students.rooms[room].rented[mails])
            const languageAndEmail = await client.user.findUnique({
              where: {
                id: students.rooms[room].rented[mails].student,
              },
              select: {
                language: true,
                clerkId: true,
              },
            })
            console.log(languageAndEmail)
            if (languageAndEmail) {
              const email = await clerkClient.users.getUser(
                languageAndEmail.clerkId
              )
              if (languageAndEmail.language === 'ENGLISH') {
                console.log('Mailed english')
                onMailer(
                  email.emailAddresses[0].emailAddress,
                  template.enName!,
                  template.english!
                )
              }
              if (languageAndEmail.language === 'TURKISH') {
                console.log('Mailed Turkish')
                onMailer(
                  email.emailAddresses[0].emailAddress,
                  template.trName!,
                  template.turkish!
                )
              }
            }
            mails++
          }
          room++
        }

        await client.owner.update({
          where: {
            userId,
          },
          data: {
            subscription: {
              update: {
                data: {
                  credits: { decrement: 1 },
                },
              },
            },
          },
        })

        return {
          status: 200,
          message: 'Emails sent',
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}
