import { createClerkClient } from '@clerk/backend'

export const clerkClientSDK = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

