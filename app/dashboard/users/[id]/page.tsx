"use client"

import { useParams, useRouter } from "next/navigation"
import { UserDetails } from "@/components/user-details"
import { mockUsers } from "@/lib/mock-data"
import { notFound } from "next/navigation"

export default function UserDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.id as string

  const user = mockUsers.find((u) => u.id === userId)

  if (!user) {
    notFound()
  }

  const handleBack = () => {
    router.push("/dashboard")
  }

  return <UserDetails user={user} onBack={handleBack} />
}
