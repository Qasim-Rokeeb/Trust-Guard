"use client"

import { useState } from "react"
import { Dashboard } from "@/components/dashboard"
import { LoginForm } from "@/components/login-form"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  if (!isAuthenticated) {
    return <LoginForm onLogin={() => setIsAuthenticated(true)} />
  }

  return <Dashboard />
}
