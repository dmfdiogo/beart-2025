export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Be Art'
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'A modern store built with Next.js'
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT) || 4

export const signInDefaultValues = {
  email: 'test@example.com',
  password: 'password',
}

export const signUpDefaultValues = {
  name: 'Steve Smith',
  email: 'steve@example.com',
  password: 'password',
  confirmPassword: 'password',
}
