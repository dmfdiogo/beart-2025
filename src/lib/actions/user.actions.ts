'use server'
import { signIn, signOut as authSignOut } from '@/auth'
import { signInFormSchema, signUpFormSchema } from '../validator'
import { hashSync } from 'bcrypt-ts-edge'
import { prisma } from '@/db/prisma'
import { formatError } from '../utils'

// Sign in the user with credentials
export async function signInWithCredentials(prevState: unknown, formData: FormData) {
  try {
    // Set user from form and validate it with Zod schema
    const user = signInFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    })

    await signIn('credentials', user)

    return { success: true, message: 'Signed in successfully' }
  } catch (error) {
    return { success: false, message: 'Invalid email or password' }
  }
}

// Register a new user
export async function signUp(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      confirmPassword: formData.get('confirmPassword'),
      password: formData.get('password'),
    })

    const plainPassword = user.password

    user.password = hashSync(user.password, 10)

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    })

    await signIn('credentials', {
      email: user.email,
      password: plainPassword,
    })

    return { success: true, message: 'User created successfully' }
  } catch (error) {
    // if (isRedirectError(error)) {
    //   throw error
    // }

    console.log('Error signing up:', error)
    // console.log(error.name)
    // console.log(error.code)
    // console.log(error.errors)
    // console.log(error.meta?.target)

    return {
      success: false,
      message: formatError(error),
    }
  }
}

// Sign the user out
export async function signOut() {
  await authSignOut()
}
