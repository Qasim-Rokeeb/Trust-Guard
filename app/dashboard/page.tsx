"use client"

import { UserOverview } from "@/components/user-overview"
import { mockUsers } from "@/lib/mock-data"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()

  const handleUserSelect = (userId: string) => {
    router.push(`/dashboard/users/${userId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Monitor user activity and security alerts</p>
        </div>
      </div>
      <UserOverview users={mockUsers} onUserSelect={handleUserSelect} />
    </div>
  )
}
