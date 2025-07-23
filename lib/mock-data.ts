export interface User {
  id: string
  name: string
  email: string
  department: string
  role: string
  riskLevel: "low" | "medium" | "high"
  lastActive: string
}

export interface Alert {
  id: string
  title: string
  description: string
  severity: "low" | "medium" | "high"
  type: "login" | "file" | "security"
  userName: string
  timestamp: string
  ruleTriggered: string
  status: "active" | "resolved"
  resolvedAt?: string
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    department: "Finance",
    role: "Senior Analyst",
    riskLevel: "high",
    lastActive: "2:30 PM",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@company.com",
    department: "Engineering",
    role: "Software Engineer",
    riskLevel: "low",
    lastActive: "3:15 PM",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@company.com",
    department: "HR",
    role: "HR Manager",
    riskLevel: "medium",
    lastActive: "1:45 PM",
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@company.com",
    department: "Marketing",
    role: "Marketing Director",
    riskLevel: "low",
    lastActive: "4:00 PM",
  },
  {
    id: "5",
    name: "Lisa Thompson",
    email: "lisa.thompson@company.com",
    department: "Sales",
    role: "Sales Representative",
    riskLevel: "medium",
    lastActive: "2:15 PM",
  },
  {
    id: "6",
    name: "James Wilson",
    email: "james.wilson@company.com",
    department: "Engineering",
    role: "DevOps Engineer",
    riskLevel: "high",
    lastActive: "3:30 PM",
  },
]

export const mockAlerts: Alert[] = [
  {
    id: "1",
    title: "Unusual Login Time",
    description: "User logged in at 11:30 PM, outside normal business hours",
    severity: "medium",
    type: "login",
    userName: "Sarah Johnson",
    timestamp: "11:30 PM Yesterday",
    ruleTriggered: "Off-hours Access Rule",
    status: "active",
  },
  {
    id: "2",
    title: "New Device Access",
    description: "First-time login from unrecognized mobile device",
    severity: "high",
    type: "security",
    userName: "James Wilson",
    timestamp: "1:30 PM Today",
    ruleTriggered: "New Device Detection",
    status: "active",
  },
  {
    id: "3",
    title: "Bulk File Download",
    description: "Downloaded 15 sensitive files within 5 minutes",
    severity: "high",
    type: "file",
    userName: "Sarah Johnson",
    timestamp: "1:45 PM Today",
    ruleTriggered: "Bulk Download Threshold",
    status: "active",
  },
  {
    id: "4",
    title: "Failed Login Attempts",
    description: "5 consecutive failed login attempts detected",
    severity: "medium",
    type: "login",
    userName: "Emily Rodriguez",
    timestamp: "10:15 AM Today",
    ruleTriggered: "Brute Force Detection",
    status: "resolved",
    resolvedAt: "10:30 AM Today",
  },
  {
    id: "5",
    title: "Unusual File Access",
    description: "Accessed HR files outside of normal department permissions",
    severity: "low",
    type: "file",
    userName: "David Kim",
    timestamp: "9:45 AM Today",
    ruleTriggered: "Cross-Department Access",
    status: "resolved",
    resolvedAt: "11:00 AM Today",
  },
]
