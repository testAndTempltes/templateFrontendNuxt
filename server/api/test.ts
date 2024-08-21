import { defineEventHandler } from 'h3'

export default defineEventHandler(async (): Promise<{ message: string }> => {
  return { message: 'Hello from the API!' }
})
