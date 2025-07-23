"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { UserOverview } from "@/components/user-overview"
import { UserDetails } from "@/components/user-details"
import { AlertCenter } from "@/components/alert-center"
import { mockUsers, mockAlerts } from "@/lib/mock-data"

export function Dashboard() {
  const [activeView, setActiveView] = useState("overview")
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeView) {
      case "overview":
        return (
          <UserOverview
            users={mockUsers}
            onUserSelect={(userId) => {
              setSelectedUserId(userId)
              setActiveView("user-details")
            }}
          />
        )
      case "user-details":
        const selectedUser = mockUsers.find((u) => u.id === selectedUserId)
        return selectedUser ? <UserDetails user={selectedUser} onBack={() => setActiveView("overview")} /> : null
      case "alerts":
        return <AlertCenter alerts={mockAlerts} />
      default:
        return <UserOverview users={mockUsers} onUserSelect={() => {}} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar
          activeView={activeView}
          onViewChange={setActiveView}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 lg:ml-64">
          <div className="p-4 lg:p-8">{renderContent()}</div>
        </main>
      </div>
    </div>
  )
}
