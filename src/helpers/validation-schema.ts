import {z} from 'zod';

export const LoginSchema = z.object({
  email: z.string({required_error: 'Email is required'}).trim().email('Enter a valid email'),
  password: z.string({required_error: 'Password is required'}).trim().min(6, 'Password must be at least 6 characters').max(20, 'Password must be at most 20 characters'),
})