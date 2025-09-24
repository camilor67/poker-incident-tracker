import { getServerSession } from 'next-auth'
import { NextRequest } from 'next/server'

export async function getAuthSession() {
  return await getServerSession()
}

export async function requireAuth() {
  const session = await getAuthSession()
  
  if (!session) {
    return { error: 'Unauthorized', status: 401 }
  }
  
  return { session }
}
