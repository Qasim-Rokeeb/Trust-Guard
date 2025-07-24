"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/login-form"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  const handleLogin = () => {
    setIsAuthenticated(true)
    router.push("/dashboard")
  }

  if (isAuthenticated) {
    return null // Will redirect to dashboard
  }

  return <LoginForm onLogin={handleLogin} />
}
