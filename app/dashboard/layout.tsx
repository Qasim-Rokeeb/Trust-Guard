"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { usePathname } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const getActiveView = () => {
    if (pathname === "/dashboard") return "overview"
    if (pathname.startsWith("/dashboard/users")) return "overview"
    if (pathname === "/dashboard/alerts") return "alerts"
    if (pathname === "/dashboard/analytics") return "analytics"
    if (pathname === "/dashboard/settings") return "settings"
    return "overview"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar
          activeView={getActiveView()}
          onViewChange={() => {}} // Navigation handled by router now
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 lg:ml-64">
          <div className="p-4 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
