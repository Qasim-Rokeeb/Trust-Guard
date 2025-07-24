import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
          <Shield className="w-8 h-8 text-purple-600" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
          <p className="text-gray-600 max-w-md">
            The page you're looking for doesn't exist or has been moved to a different location.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Go to Login</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
