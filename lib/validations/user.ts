import * as z from 'zod'

export const UserValidation = z.object({
    profile_photo: z.string().url().nonempty(),
    name: z.string().min(3).max(30),
    username: z.string().min(5).max(30),
    bio: z.string().min(15).max(1000)
})

export const WorkshopValidation = z.object({
    password: z.string().min(6).max(6)
})

export const CheckPointValidation = z.object({
    token: z.string().min(6).max(6)
})