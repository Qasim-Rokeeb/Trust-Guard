"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Users, AlertTriangle, BarChart3, Settings, X } from "lucide-react"
import { useRouter } from "next/navigation"

interface SidebarProps {
  activeView: string
  onViewChange: (view: string) => void
  isOpen: boolean
  onClose: () => void
}

const navigation = [
  { id: "overview", name: "User Overview", icon: Users, href: "/dashboard" },
  { id: "alerts", name: "Alert Center", icon: AlertTriangle, href: "/dashboard/alerts" },
  { id: "analytics", name: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
  { id: "settings", name: "Settings", icon: Settings, href: "/dashboard/settings" },
]

export function Sidebar({ activeView, onViewChange, isOpen, onClose }: SidebarProps) {
  const router = useRouter()

  const handleNavigation = (href: string) => {
    router.push(href)
    onClose()
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
          <span className="text-lg font-semibold">Menu</span>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeView === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start space-x-3 h-11",
                  activeView === item.id
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "text-gray-700 hover:bg-gray-100",
                )}
                onClick={() => handleNavigation(item.href)}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Button>
            )
          })}
        </nav>
      </div>
    </>
  )
}
