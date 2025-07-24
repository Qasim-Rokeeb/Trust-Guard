"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { usePathname } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const getActiveView = () => {
    if (pathname === "/dashboard") return "overview"
    if (pathname.startsWith("/dashboard/users")) return "overview"
    if (pathname === "/dashboard/alerts") return "alerts"
    if (pathname === "/dashboard/analytics") return "analytics"
    if (pathname === "/dashboard/settings") return "settings"
    return "overview"
  }

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false) // Close mobile sidebar on desktop
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex pt-16">
        <Sidebar
          activeView={getActiveView()}
          onViewChange={() => {}} // Navigation handled by router now
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main
          className={`
          flex-1 transition-all duration-300 ease-in-out
          md:ml-64
          ${isCollapsed ? "lg:ml-16" : "lg:ml-64"}
        `}
        >
          <div className="p-4 lg:p-8 max-w-full">{children}</div>
        </main>
      </div>
    </div>
  )
}
