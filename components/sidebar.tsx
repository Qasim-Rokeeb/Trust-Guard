"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Users, AlertTriangle, BarChart3, Settings, X, Shield, ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface SidebarProps {
  activeView: string
  onViewChange: (view: string) => void
  isOpen: boolean
  onClose: () => void
}

const navigation = [
  {
    id: "overview",
    name: "User Overview",
    icon: Users,
    href: "/dashboard",
    badge: null,
  },
  {
    id: "alerts",
    name: "Alert Center",
    icon: AlertTriangle,
    href: "/dashboard/alerts",
    badge: { count: 5, variant: "destructive" as const },
  },
  {
    id: "analytics",
    name: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
    badge: null,
  },
  {
    id: "settings",
    name: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    badge: null,
  },
]

export function Sidebar({ activeView, onViewChange, isOpen, onClose }: SidebarProps) {
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleNavigation = (href: string) => {
    router.push(href)
    onClose()
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 z-40 transform transition-all duration-300 ease-in-out",
          // Mobile styles
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop styles
          isCollapsed ? "md:w-16" : "md:w-64",
          // Full width on mobile when open
          "w-64 md:w-auto",
        )}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 md:hidden">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold">TrustGuard</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Desktop collapse button */}
        <div className="hidden md:flex items-center justify-end p-2 border-b border-gray-200">
          <Button variant="ghost" size="sm" onClick={toggleCollapse} className="p-2">
            <ChevronLeft className={cn("h-4 w-4 transition-transform duration-200", isCollapsed && "rotate-180")} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = activeView === item.id

              return (
                <div key={item.id} className="relative">
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start h-11 transition-all duration-200",
                      isActive
                        ? "bg-purple-600 text-white hover:bg-purple-700 shadow-sm"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                      isCollapsed ? "md:justify-center md:px-2" : "md:justify-start md:px-3",
                    )}
                    onClick={() => handleNavigation(item.href)}
                  >
                    <Icon className={cn("h-5 w-5 flex-shrink-0", !isCollapsed && "md:mr-3")} />
                    <span className={cn("font-medium truncate", isCollapsed && "md:hidden")}>{item.name}</span>
                    {item.badge && !isCollapsed && (
                      <Badge variant={item.badge.variant} className="ml-auto h-5 px-2 text-xs">
                        {item.badge.count}
                      </Badge>
                    )}
                  </Button>

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 hidden md:block">
                      {item.name}
                      {item.badge && (
                        <Badge variant={item.badge.variant} className="ml-2 h-4 px-1 text-xs">
                          {item.badge.count}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-2">
          <div className={cn("text-xs text-gray-500 text-center", isCollapsed && "md:hidden")}>
            <p className="font-medium">TrustGuard v2.1.0</p>
            <p>© 2024 Security Systems</p>
          </div>
        </div>
      </div>
    </>
  )
}
