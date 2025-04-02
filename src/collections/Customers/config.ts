import type { CollectionConfig } from 'payload'
import { getServerSideURL } from '@/utilities/getURL'

export const Customers: CollectionConfig = {
  slug: 'customers',
  auth: {
    tokenExpiration: 12 * 60 * 60,
    verify: {
      generateEmailSubject: (args) => {
        return `Hey ${args?.user?.firstName ? args?.user.firstName : args?.user.email}, verify your email address!`
      },
      generateEmailHTML: (args) => {
        return `<div><h1>Hey ${args.user?.firstName ? args.user.firstName : args.user.email}!</h1><br /><p>Verify your email address by going to ${getServerSideURL()}/verify?token=${args.token}</p></div>`
      },
    },
    forgotPassword: {
      generateEmailSubject: (args) => {
        return `Hey ${args?.user?.firstName ? args?.user.firstName : args?.user.email}! Reset your password.`
      },
      generateEmailHTML: (args) => {
        return `<div><h1>Hey ${args?.user?.firstName ? args?.user.firstName : args?.user.email}!</h1><br /><p>You (or someone else) requested to reset your password. If this wasn't you, you can safely ignore this email. Otherwise, reset your password by going to ${getServerSideURL()}/password-reset?token=${args?.token}</p></div>`
      }
    },
    loginWithUsername: {
      allowEmailLogin: true,
      requireEmail: true,
      requireUsername: false,
    },
    cookies: {
      secure: true,
      sameSite: 'None',
      domain: process.env.COOKIE_DOMAIN,
    },
  },
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: () => true,
    admin: () => false,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
        },
        {
          name: 'lastName',
          type: 'text',
        },
      ],
    },
    {
      name: 'tier',
      type: 'radio',
      interfaceName: 'tierProps',
      options: [
        'Free',
        'Basic',
        'Pro',
        'Enterprise',
      ],
      defaultValue: 'Free',
    },
  ],
}