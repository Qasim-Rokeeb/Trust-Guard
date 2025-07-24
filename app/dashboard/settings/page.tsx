"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure TrustGuard security preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Alert Thresholds</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-attempts">Failed Login Attempts</Label>
              <Input id="login-attempts" type="number" defaultValue="5" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="file-downloads">Bulk File Downloads</Label>
              <Input id="file-downloads" type="number" defaultValue="10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="off-hours">Off-Hours Access Window</Label>
              <Select defaultValue="after-6pm">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="after-6pm">After 6:00 PM</SelectItem>
                  <SelectItem value="after-8pm">After 8:00 PM</SelectItem>
                  <SelectItem value="after-10pm">After 10:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-500">Receive alerts via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Real-time Alerts</Label>
                <p className="text-sm text-gray-500">Instant browser notifications</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Reports</Label>
                <p className="text-sm text-gray-500">Summary reports every Monday</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Policies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-lock Suspicious Accounts</Label>
                <p className="text-sm text-gray-500">Temporarily disable high-risk users</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require MFA for Alerts</Label>
                <p className="text-sm text-gray-500">Multi-factor auth for sensitive actions</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="retention">Data Retention Period</Label>
              <Select defaultValue="90-days">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30-days">30 Days</SelectItem>
                  <SelectItem value="90-days">90 Days</SelectItem>
                  <SelectItem value="180-days">180 Days</SelectItem>
                  <SelectItem value="1-year">1 Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-900">Version</p>
                <p className="text-gray-600">TrustGuard v2.1.0</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Last Update</p>
                <p className="text-gray-600">Dec 15, 2024</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">License</p>
                <p className="text-gray-600">Enterprise</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Support</p>
                <p className="text-gray-600">24/7 Available</p>
              </div>
            </div>
            <Separator />
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Export Logs
              </Button>
              <Button variant="outline" size="sm">
                System Health
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Reset to Defaults</Button>
        <Button className="bg-purple-600 hover:bg-purple-700">Save Changes</Button>
      </div>
    </div>
  )
}
