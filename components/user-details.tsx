"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  User,
  Clock,
  FileText,
  Shield,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  Phone,
  Mail,
  Bell,
  Check,
  X,
  Eye,
} from "lucide-react"
import type { User as UserType } from "@/lib/mock-data"
import { mockAlerts } from "@/lib/mock-data"

interface UserDetailsProps {
  user: UserType
  onBack: () => void
}

export function UserDetails({ user, onBack }: UserDetailsProps) {
  const [adminNotes, setAdminNotes] = useState("")
  const [selectedActivity, setSelectedActivity] = useState<any>(null)

  // Get alerts for this user
  const userAlerts = mockAlerts.filter((alert) => alert.userId === user.id)

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

  const getResponseIcon = (method: string) => {
    switch (method) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "sms":
        return <MessageSquare className="h-4 w-4" />
      case "app_notification":
        return <Bell className="h-4 w-4" />
      case "phone_call":
        return <Phone className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getResponseBadgeVariant = (response: string) => {
    switch (response) {
      case "confirmed":
        return "default"
      case "denied":
        return "destructive"
      case "no_response":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const handleDismissAlert = (alertId: string) => {
    console.log("Dismissing alert:", alertId)
    setSelectedActivity(null)
  }

  const handleFurtherInvestigate = (alertId: string) => {
    console.log("Further investigating alert:", alertId)
  }

  // Mock flagged activities with user responses
  const flaggedActivities = [
    {
      id: "activity-1",
      time: "1:30 PM",
      action: "Login attempt from new device",
      location: "Unknown Location",
      device: "iPhone 15",
      status: "flagged",
      alertId: "3",
      userResponse: {
        response: "confirmed",
        explanation:
          "I was asked by the CFO to pull salary data for the annual compensation review. I have the email request from him. I accessed the financial system because the HR system didn't have the complete salary history I needed for the analysis.",
        timestamp: "3:20 PM Today",
        responseMethod: "email",
      },
    },
    {
      id: "activity-2",
      time: "11:30 PM",
      action: "Downloaded financial report",
      location: "Coffee Shop WiFi",
      device: "Personal Laptop",
      status: "flagged",
      alertId: "1",
      userResponse: {
        response: "denied",
        explanation:
          "I was not in the office at that time and did not access any systems. My laptop was at home and I was attending a family dinner. This appears to be unauthorized access to my account.",
        timestamp: "8:15 AM Today",
        responseMethod: "email",
      },
    },
  ]

  if (selectedActivity) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => setSelectedActivity(null)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to User Details
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Activity Investigation</h1>
              <p className="text-gray-600">User response and admin actions</p>
            </div>
          </div>
        </div>

        {/* Activity Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span>Detected Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h4 className="font-medium text-orange-900 mb-2">Security Alert:</h4>
              <p className="text-sm text-orange-800 mb-2">
                {selectedActivity.action} at {selectedActivity.time} from {selectedActivity.location} using{" "}
                {selectedActivity.device}.
              </p>
              <div className="flex items-center space-x-4 text-xs text-orange-700">
                <span>User: {user.name}</span>
                <span>Risk Level: High</span>
                <span>Alert ID: {selectedActivity.alertId}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Response */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>User Response</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">
                      Responded via {selectedActivity.userResponse.responseMethod.replace("_", " ")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getResponseIcon(selectedActivity.userResponse.responseMethod)}
                  <Badge variant={getResponseBadgeVariant(selectedActivity.userResponse.response)}>
                    {selectedActivity.userResponse.response === "confirmed" && <Check className="h-3 w-3 mr-1" />}
                    {selectedActivity.userResponse.response === "denied" && <X className="h-3 w-3 mr-1" />}
                    {selectedActivity.userResponse.response === "confirmed"
                      ? "Yes, this was me"
                      : selectedActivity.userResponse.response === "denied"
                        ? "No, this wasn't me"
                        : "No Response"}
                  </Badge>
                  <span className="text-xs text-gray-500">{selectedActivity.userResponse.timestamp}</span>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">User Explanation:</h4>
                <p className="text-gray-700 leading-relaxed">{selectedActivity.userResponse.explanation}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Admin Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="admin-notes">Investigation Notes</Label>
                <Textarea
                  id="admin-notes"
                  placeholder="Add your investigation notes, conclusions, or follow-up actions..."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="mt-2"
                />
              </div>

              <Separator />

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => handleDismissAlert(selectedActivity.alertId)}
                  className="flex-1"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Dismiss Alert
                </Button>
                <Button
                  onClick={() => handleFurtherInvestigate(selectedActivity.alertId)}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Further Investigate
                </Button>
              </div>

              <div className="text-xs text-gray-500 text-center">
                Actions will be logged in the security audit trail
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
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
                  ...flaggedActivities,
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
                          onClick={() => setSelectedActivity(activity)}
                        >
                          View Response
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
                {userAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle
                            className={`h-4 w-4 ${alert.severity === "high" ? "text-red-500" : "text-yellow-500"}`}
                          />
                          <h3 className="font-medium text-gray-900">{alert.title}</h3>
                          <Badge variant={alert.severity === "high" ? "destructive" : "secondary"}>
                            {alert.severity}
                          </Badge>
                          {alert.userResponse && (
                            <Badge variant={getResponseBadgeVariant(alert.userResponse.response)}>
                              User {alert.userResponse.response === "confirmed" ? "Confirmed" : "Denied"}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                        <p className="text-xs text-gray-500">{alert.timestamp}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
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
    </div>
  )
}
