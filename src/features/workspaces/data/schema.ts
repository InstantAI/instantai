import { z } from 'zod'

const userStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
  z.literal('invited'),
  z.literal('suspended'),
])
export type UserStatus = z.infer<typeof userStatusSchema>


const userSchema = z.object({
  name: z.string(),
  cpuLimit: z.string(),
  memoryLimit: z.string(),
  gpuLimit: z.string(),
})
export type User = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)
