"use client"

import { AlertCenter } from "@/components/alert-center"
import { mockAlerts } from "@/lib/mock-data"

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alert Center</h1>
          <p className="text-gray-600">Manage security alerts and incidents</p>
        </div>
      </div>
      <AlertCenter alerts={mockAlerts} />
    </div>
  )
}
