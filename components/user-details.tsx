"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, User, Clock, FileText, Shield, AlertTriangle, CheckCircle } from "lucide-react"
import { WasThisYouDialog } from "@/components/was-this-you-dialog"
import type { User as UserType } from "@/lib/mock-data"

interface UserDetailsProps {
  user: UserType
  onBack: () => void
}

export function UserDetails({ user, onBack }: UserDetailsProps) {
  const [showWasThisYou, setShowWasThisYou] = useState(false)

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "default"
      default:
        return "default"
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "high":
        return <AlertTriangle className="h-4 w-4" />
      case "medium":
        return <Clock className="h-4 w-4" />
      case "low":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Overview
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
        <Badge variant={getRiskBadgeVariant(user.riskLevel)} className="flex items-center space-x-1">
          {getRiskIcon(user.riskLevel)}
          <span className="capitalize">{user.riskLevel} Risk</span>
        </Badge>
      </div>

      {/* User Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <User className="h-8 w-8 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-600">Department</p>
                <p className="text-lg font-semibold text-gray-900">{user.department}</p>
                <p className="text-sm text-gray-500">{user.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-600">Last Active</p>
                <p className="text-lg font-semibold text-gray-900">{user.lastActive}</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-600">Security Score</p>
                <p className="text-lg font-semibold text-gray-900">
                  {user.riskLevel === "high" ? "45/100" : user.riskLevel === "medium" ? "72/100" : "89/100"}
                </p>
                <p className="text-sm text-gray-500">Based on behavior</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information */}
      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
          <TabsTrigger value="files">File Access</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: "2:30 PM", action: "Logged into system", location: "Office Network", status: "normal" },
                  {
                    time: "2:15 PM",
                    action: "Accessed customer database",
                    location: "Office Network",
                    status: "normal",
                  },
                  {
                    time: "1:45 PM",
                    action: "Downloaded financial report",
                    location: "Office Network",
                    status: "flagged",
                  },
                  {
                    time: "1:30 PM",
                    action: "Login attempt from new device",
                    location: "Unknown Location",
                    status: "flagged",
                  },
                  { time: "12:00 PM", action: "Accessed HR documents", location: "Office Network", status: "normal" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${activity.status === "flagged" ? "bg-red-500" : "bg-green-500"}`}
                      />
                      <div>
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-500">{activity.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{activity.time}</p>
                      {activity.status === "flagged" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-1 bg-transparent"
                          onClick={() => setShowWasThisYou(true)}
                        >
                          Verify
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anomalies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detected Anomalies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    type: "Unusual Login Time",
                    description: "Login detected at 11:30 PM, outside normal hours (9 AM - 6 PM)",
                    severity: "medium",
                    time: "Yesterday",
                  },
                  {
                    type: "New Device Access",
                    description: "First-time access from mobile device (iPhone 15)",
                    severity: "high",
                    time: "2 hours ago",
                  },
                  {
                    type: "Bulk File Download",
                    description: "Downloaded 15 files in 5 minutes, above normal threshold",
                    severity: "high",
                    time: "3 hours ago",
                  },
                ].map((anomaly, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle
                            className={`h-4 w-4 ${anomaly.severity === "high" ? "text-red-500" : "text-yellow-500"}`}
                          />
                          <h3 className="font-medium text-gray-900">{anomaly.type}</h3>
                          <Badge variant={anomaly.severity === "high" ? "destructive" : "secondary"}>
                            {anomaly.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{anomaly.description}</p>
                        <p className="text-xs text-gray-500">{anomaly.time}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setShowWasThisYou(true)}>
                        Investigate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>File Access History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Q4_Financial_Report.xlsx", action: "Downloaded", time: "1:45 PM", sensitive: true },
                  { name: "Employee_Handbook.pdf", action: "Viewed", time: "1:30 PM", sensitive: false },
                  { name: "Customer_Database_Export.csv", action: "Downloaded", time: "12:15 PM", sensitive: true },
                  { name: "Marketing_Strategy_2024.pptx", action: "Edited", time: "11:30 AM", sensitive: false },
                  { name: "Salary_Information.xlsx", action: "Viewed", time: "10:45 AM", sensitive: true },
                ].map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">{file.action}</p>
                      </div>
                      {file.sensitive && (
                        <Badge variant="outline" className="text-orange-600 border-orange-600">
                          Sensitive
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{file.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <WasThisYouDialog open={showWasThisYou} onOpenChange={setShowWasThisYou} userName={user.name} />
    </div>
  )
}
