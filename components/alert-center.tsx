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
  AlertTriangle,
  Clock,
  CheckCircle,
  User,
  FileText,
  Shield,
  MessageSquare,
  Phone,
  Mail,
  Bell,
  Eye,
  X,
  Check,
} from "lucide-react"
import type { Alert } from "@/lib/mock-data"

interface AlertCenterProps {
  alerts: Alert[]
}

export function AlertCenter({ alerts }: AlertCenterProps) {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [adminNotes, setAdminNotes] = useState("")

  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity) {
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

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
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

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "login":
        return <User className="h-5 w-5" />
      case "file":
        return <FileText className="h-5 w-5" />
      case "security":
        return <Shield className="h-5 w-5" />
      default:
        return <AlertTriangle className="h-5 w-5" />
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
    // In a real app, this would update the alert status
    console.log("Dismissing alert:", alertId)
    setSelectedAlert(null)
  }

  const handleFurtherInvestigate = (alertId: string) => {
    // In a real app, this would escalate the alert
    console.log("Further investigating alert:", alertId)
  }

  const activeAlerts = alerts.filter((alert) => alert.status === "active" || alert.status === "investigating")
  const resolvedAlerts = alerts.filter((alert) => alert.status === "resolved" || alert.status === "dismissed")

  const stats = {
    total: alerts.length,
    high: alerts.filter((a) => a.severity === "high").length,
    medium: alerts.filter((a) => a.severity === "medium").length,
    low: alerts.filter((a) => a.severity === "low").length,
  }

  if (selectedAlert) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => setSelectedAlert(null)}>
              ← Back to Alerts
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Alert Investigation</h1>
              <p className="text-gray-600">Detailed analysis and user response</p>
            </div>
          </div>
          <Badge variant={getSeverityBadgeVariant(selectedAlert.severity)} className="flex items-center space-x-1">
            {getSeverityIcon(selectedAlert.severity)}
            <span className="capitalize">{selectedAlert.severity} Priority</span>
          </Badge>
        </div>

        {/* Alert Details */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="mt-1">{getAlertIcon(selectedAlert.type)}</div>
                <div>
                  <CardTitle className="text-xl">{selectedAlert.title}</CardTitle>
                  <p className="text-gray-600 mt-2">{selectedAlert.description}</p>
                  <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
                    <span>
                      User: <strong>{selectedAlert.userName}</strong>
                    </span>
                    <span>
                      Time: <strong>{selectedAlert.timestamp}</strong>
                    </span>
                    <span>
                      Rule: <strong>{selectedAlert.ruleTriggered}</strong>
                    </span>
                    <span>
                      Risk Score: <strong className="text-red-600">{selectedAlert.riskScore}/100</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Affected Systems</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedAlert.affectedSystems.map((system, index) => (
                    <Badge key={index} variant="outline">
                      {system}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Response */}
        {selectedAlert.userResponse ? (
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
                      <p className="font-medium text-gray-900">{selectedAlert.userName}</p>
                      <p className="text-sm text-gray-500">
                        Responded via {selectedAlert.userResponse.responseMethod.replace("_", " ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getResponseIcon(selectedAlert.userResponse.responseMethod)}
                    <Badge variant={getResponseBadgeVariant(selectedAlert.userResponse.response)}>
                      {selectedAlert.userResponse.response === "confirmed" && <Check className="h-3 w-3 mr-1" />}
                      {selectedAlert.userResponse.response === "denied" && <X className="h-3 w-3 mr-1" />}
                      {selectedAlert.userResponse.response === "confirmed"
                        ? "Confirmed"
                        : selectedAlert.userResponse.response === "denied"
                          ? "Denied"
                          : "No Response"}
                    </Badge>
                    <span className="text-xs text-gray-500">{selectedAlert.userResponse.timestamp}</span>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">User Explanation:</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedAlert.userResponse.explanation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                <span>Awaiting User Response</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800">
                  User has been notified about this security alert and we are waiting for their response. Notification
                  sent via email and app notification.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Investigation Notes */}
        {selectedAlert.investigationSteps && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Investigation Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedAlert.investigationSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Admin Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Admin Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="admin-notes">Additional Notes</Label>
                <Textarea
                  id="admin-notes"
                  placeholder="Add investigation notes, follow-up actions, or conclusions..."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="mt-2"
                />
              </div>

              <Separator />

              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => handleDismissAlert(selectedAlert.id)} className="flex-1">
                  <Check className="h-4 w-4 mr-2" />
                  Dismiss Alert
                </Button>
                <Button
                  onClick={() => handleFurtherInvestigate(selectedAlert.id)}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Further Investigate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Alerts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Severity</p>
                <p className="text-2xl font-bold text-red-600">{stats.high}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Medium Severity</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.medium}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Severity</p>
                <p className="text-2xl font-bold text-green-600">{stats.low}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Alerts ({activeAlerts.length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({resolvedAlerts.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Security Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedAlert(alert)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">{getAlertIcon(alert.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-medium text-gray-900">{alert.title}</h3>
                            <Badge
                              variant={getSeverityBadgeVariant(alert.severity)}
                              className="flex items-center space-x-1"
                            >
                              {getSeverityIcon(alert.severity)}
                              <span className="capitalize">{alert.severity}</span>
                            </Badge>
                            {alert.userResponse && (
                              <Badge variant={getResponseBadgeVariant(alert.userResponse.response)}>
                                User{" "}
                                {alert.userResponse.response === "confirmed"
                                  ? "Confirmed"
                                  : alert.userResponse.response === "denied"
                                    ? "Denied"
                                    : "No Response"}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>User: {alert.userName}</span>
                            <span>Time: {alert.timestamp}</span>
                            <span>Rule: {alert.ruleTriggered}</span>
                            <span>Risk: {alert.riskScore}/100</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Investigate
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resolved Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resolvedAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 border border-gray-200 rounded-lg opacity-75">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">{getAlertIcon(alert.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-medium text-gray-900">{alert.title}</h3>
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              Resolved
                            </Badge>
                            {alert.userResponse && (
                              <Badge variant={getResponseBadgeVariant(alert.userResponse.response)}>
                                User {alert.userResponse.response === "confirmed" ? "Confirmed" : "Denied"}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>User: {alert.userName}</span>
                            <span>Resolved: {alert.resolvedAt}</span>
                          </div>
                        </div>
                      </div>
                    </div>
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
