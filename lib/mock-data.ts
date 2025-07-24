export interface User {
  id: string
  name: string
  email: string
  department: string
  role: string
  riskLevel: "low" | "medium" | "high"
  lastActive: string
  riskScore: number
  riskFactors: string[]
  joinDate: string
  accessLevel: "basic" | "elevated" | "admin"
  recentActivities: Activity[]
}

export interface Activity {
  id: string
  type: "login" | "file_access" | "system_access" | "data_export" | "permission_change"
  description: string
  timestamp: string
  location: string
  deviceType: string
  riskLevel: "normal" | "suspicious" | "critical"
  ipAddress: string
}

export interface UserResponse {
  id: string
  alertId: string
  userId: string
  response: "confirmed" | "denied" | "no_response"
  explanation: string
  timestamp: string
  responseMethod: "email" | "sms" | "app_notification" | "phone_call"
}

export interface Alert {
  id: string
  title: string
  description: string
  severity: "low" | "medium" | "high"
  type: "login" | "file" | "security" | "behavior" | "access"
  userName: string
  userId: string
  timestamp: string
  ruleTriggered: string
  status: "active" | "resolved" | "investigating" | "dismissed"
  resolvedAt?: string
  riskScore: number
  affectedSystems: string[]
  userResponse?: UserResponse
  adminNotes?: string
  investigationSteps?: string[]
}

// Risk calculation logic
export const calculateRiskLevel = (user: User): "low" | "medium" | "high" => {
  let riskScore = 0

  // Base risk factors
  const riskFactors = {
    // Access level risk
    accessLevel: {
      basic: 0,
      elevated: 15,
      admin: 25,
    },

    // Department risk (based on data sensitivity)
    department: {
      Finance: 20,
      HR: 15,
      Engineering: 10,
      Legal: 18,
      Executive: 25,
      IT: 12,
      Marketing: 5,
      Sales: 8,
      Operations: 10,
    },

    // Tenure risk (newer employees = higher risk)
    tenure: (joinDate: string) => {
      const monthsEmployed = Math.floor((Date.now() - new Date(joinDate).getTime()) / (1000 * 60 * 60 * 24 * 30))
      if (monthsEmployed < 3) return 20
      if (monthsEmployed < 6) return 15
      if (monthsEmployed < 12) return 10
      if (monthsEmployed < 24) return 5
      return 0
    },
  }

  // Calculate base risk
  riskScore += riskFactors.accessLevel[user.accessLevel] || 0
  riskScore += riskFactors.department[user.department] || 0
  riskScore += riskFactors.tenure(user.joinDate)

  // Behavioral risk factors from recent activities
  const suspiciousActivities = user.recentActivities.filter((a) => a.riskLevel === "suspicious").length
  const criticalActivities = user.recentActivities.filter((a) => a.riskLevel === "critical").length

  riskScore += suspiciousActivities * 10
  riskScore += criticalActivities * 25

  // Off-hours activity
  const offHoursActivities = user.recentActivities.filter((activity) => {
    const hour = new Date(activity.timestamp).getHours()
    return hour < 7 || hour > 19 // Before 7 AM or after 7 PM
  }).length

  riskScore += offHoursActivities * 5

  // Multiple device usage
  const uniqueDevices = new Set(user.recentActivities.map((a) => a.deviceType)).size
  if (uniqueDevices > 3) riskScore += 15

  // Multiple location access
  const uniqueLocations = new Set(user.recentActivities.map((a) => a.location)).size
  if (uniqueLocations > 2) riskScore += 10

  // Determine risk level
  if (riskScore >= 60) return "high"
  if (riskScore >= 30) return "medium"
  return "low"
}

// Generate realistic activities
const generateActivities = (userId: string, riskProfile: "low" | "medium" | "high"): Activity[] => {
  const baseActivities: Omit<Activity, "id" | "timestamp">[] = [
    {
      type: "login",
      description: "Logged into system",
      location: "Office Network",
      deviceType: "Windows Desktop",
      riskLevel: "normal",
      ipAddress: "192.168.1.45",
    },
    {
      type: "file_access",
      description: "Accessed quarterly reports folder",
      location: "Office Network",
      deviceType: "Windows Desktop",
      riskLevel: "normal",
      ipAddress: "192.168.1.45",
    },
    {
      type: "system_access",
      description: "Connected to VPN",
      location: "Home Network",
      deviceType: "MacBook Pro",
      riskLevel: "normal",
      ipAddress: "73.158.64.22",
    },
  ]

  // Add risk-specific activities
  if (riskProfile === "high") {
    baseActivities.push(
      {
        type: "login",
        description: "Login from new device",
        location: "Unknown Location",
        deviceType: "iPhone 15",
        riskLevel: "critical",
        ipAddress: "203.45.67.89",
      },
      {
        type: "data_export",
        description: "Downloaded customer database",
        location: "Coffee Shop WiFi",
        deviceType: "Personal Laptop",
        riskLevel: "critical",
        ipAddress: "45.123.78.90",
      },
      {
        type: "file_access",
        description: "Accessed HR salary files",
        location: "Office Network",
        deviceType: "Windows Desktop",
        riskLevel: "suspicious",
        ipAddress: "192.168.1.45",
      },
    )
  } else if (riskProfile === "medium") {
    baseActivities.push(
      {
        type: "login",
        description: "Late night system access",
        location: "Office Network",
        deviceType: "Windows Desktop",
        riskLevel: "suspicious",
        ipAddress: "192.168.1.45",
      },
      {
        type: "file_access",
        description: "Bulk file download",
        location: "Office Network",
        deviceType: "Windows Desktop",
        riskLevel: "suspicious",
        ipAddress: "192.168.1.45",
      },
    )
  }

  // Generate timestamps for last 7 days
  return baseActivities.map((activity, index) => ({
    ...activity,
    id: `${userId}-activity-${index}`,
    timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  }))
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    department: "Finance",
    role: "Senior Financial Analyst",
    riskLevel: "high",
    lastActive: "2:30 PM",
    riskScore: 75,
    riskFactors: [
      "New device access from unknown location",
      "Downloaded sensitive financial data outside office hours",
      "Multiple failed login attempts detected",
      "Accessed HR salary database without authorization",
    ],
    joinDate: "2024-10-15", // New employee (2 months)
    accessLevel: "elevated",
    recentActivities: [],
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@company.com",
    department: "Engineering",
    role: "Senior Software Engineer",
    riskLevel: "low",
    lastActive: "3:15 PM",
    riskScore: 15,
    riskFactors: [],
    joinDate: "2021-03-10", // Long-term employee
    accessLevel: "elevated",
    recentActivities: [],
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@company.com",
    department: "HR",
    role: "HR Manager",
    riskLevel: "medium",
    lastActive: "1:45 PM",
    riskScore: 45,
    riskFactors: [
      "Unusual after-hours system access",
      "Bulk download of employee records",
      "VPN access from multiple locations",
    ],
    joinDate: "2023-08-20", // 1+ year employee
    accessLevel: "admin",
    recentActivities: [],
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@company.com",
    department: "Marketing",
    role: "Marketing Director",
    riskLevel: "low",
    lastActive: "4:00 PM",
    riskScore: 20,
    riskFactors: [],
    joinDate: "2020-01-15", // Long-term employee
    accessLevel: "basic",
    recentActivities: [],
  },
  {
    id: "5",
    name: "Lisa Thompson",
    email: "lisa.thompson@company.com",
    department: "Legal",
    role: "Legal Counsel",
    riskLevel: "medium",
    lastActive: "2:15 PM",
    riskScore: 38,
    riskFactors: [
      "Access to confidential legal documents from personal device",
      "Login attempts from coffee shop WiFi",
    ],
    joinDate: "2022-11-30", // 2+ year employee
    accessLevel: "elevated",
    recentActivities: [],
  },
  {
    id: "6",
    name: "James Wilson",
    email: "james.wilson@company.com",
    department: "Executive",
    role: "Chief Technology Officer",
    riskLevel: "high",
    lastActive: "3:30 PM",
    riskScore: 85,
    riskFactors: [
      "Admin access from compromised network",
      "Unusual data export patterns",
      "Multiple simultaneous sessions from different countries",
      "Disabled security monitoring temporarily",
    ],
    joinDate: "2024-11-01", // Very new executive
    accessLevel: "admin",
    recentActivities: [],
  },
  {
    id: "7",
    name: "Amanda Foster",
    email: "amanda.foster@company.com",
    department: "IT",
    role: "System Administrator",
    riskLevel: "low",
    lastActive: "4:15 PM",
    riskScore: 12,
    riskFactors: [],
    joinDate: "2019-06-12", // Long-term trusted employee
    accessLevel: "admin",
    recentActivities: [],
  },
  {
    id: "8",
    name: "Robert Martinez",
    email: "robert.martinez@company.com",
    department: "Sales",
    role: "Sales Representative",
    riskLevel: "medium",
    lastActive: "1:20 PM",
    riskScore: 32,
    riskFactors: ["Downloaded customer contact lists to personal device", "Frequent access from client locations"],
    joinDate: "2024-07-08", // 5 months - still relatively new
    accessLevel: "basic",
    recentActivities: [],
  },
]

// Generate activities for each user based on their risk profile
mockUsers.forEach((user) => {
  user.recentActivities = generateActivities(user.id, user.riskLevel)
  // Recalculate risk level based on activities
  user.riskLevel = calculateRiskLevel(user)
})

export const mockAlerts: Alert[] = [
  {
    id: "1",
    title: "Suspicious Data Export",
    description: "Large volume of customer data exported to external drive during off-hours",
    severity: "high",
    type: "file",
    userName: "Sarah Johnson",
    userId: "1",
    timestamp: "11:30 PM Yesterday",
    ruleTriggered: "Bulk Data Export Detection",
    status: "investigating",
    riskScore: 85,
    affectedSystems: ["Customer Database", "CRM System"],
    userResponse: {
      id: "resp-1",
      alertId: "1",
      userId: "1",
      response: "denied",
      explanation:
        "I was not in the office at that time and did not access any systems. My laptop was at home and I was attending a family dinner. This appears to be unauthorized access to my account.",
      timestamp: "8:15 AM Today",
      responseMethod: "email",
    },
    adminNotes: "User denies activity. Investigating potential account compromise.",
    investigationSteps: [
      "Reviewed security camera footage - user not in building",
      "Checked badge access logs - no entry recorded",
      "Analyzing network logs for source IP",
      "Initiated password reset and MFA enforcement",
    ],
  },
  {
    id: "2",
    title: "Compromised Account Indicators",
    description: "Multiple failed login attempts followed by successful login from new geographic location",
    severity: "high",
    type: "security",
    userName: "James Wilson",
    userId: "6",
    timestamp: "1:30 PM Today",
    ruleTriggered: "Credential Stuffing Detection",
    status: "investigating",
    riskScore: 90,
    affectedSystems: ["Active Directory", "Executive Systems"],
    userResponse: {
      id: "resp-2",
      alertId: "2",
      userId: "6",
      response: "confirmed",
      explanation:
        "Yes, this was me. I was traveling for the board meeting in Chicago and had to access the executive dashboard urgently. I forgot my usual laptop and had to use the hotel business center computer. I should have notified IT about the travel access needs beforehand.",
      timestamp: "2:45 PM Today",
      responseMethod: "app_notification",
    },
    adminNotes: "User confirmed legitimate business travel. Verifying with travel records.",
    investigationSteps: [
      "Confirmed business travel authorization in HR system",
      "Verified hotel location matches login geolocation",
      "Reviewed accessed systems - all within job scope",
      "Recommended VPN usage for future travel",
    ],
  },
  {
    id: "3",
    title: "Unauthorized Cross-Department Access",
    description: "HR manager accessed financial systems outside normal job responsibilities",
    severity: "medium",
    type: "access",
    userName: "Emily Rodriguez",
    userId: "3",
    timestamp: "2:45 PM Today",
    ruleTriggered: "Role-Based Access Violation",
    status: "active",
    riskScore: 65,
    affectedSystems: ["Financial Database", "Payroll System"],
    userResponse: {
      id: "resp-3",
      alertId: "3",
      userId: "3",
      response: "confirmed",
      explanation:
        "I was asked by the CFO to pull salary data for the annual compensation review. I have the email request from him. I accessed the financial system because the HR system didn't have the complete salary history I needed for the analysis.",
      timestamp: "3:20 PM Today",
      responseMethod: "email",
    },
  },
  {
    id: "4",
    title: "Privilege Escalation Attempt",
    description: "User attempted to access admin-level functions without proper authorization",
    severity: "high",
    type: "security",
    userName: "Robert Martinez",
    userId: "8",
    timestamp: "3:15 PM Today",
    ruleTriggered: "Privilege Escalation Detection",
    status: "active",
    riskScore: 80,
    affectedSystems: ["User Management", "System Configuration"],
    userResponse: {
      id: "resp-4",
      alertId: "4",
      userId: "8",
      response: "denied",
      explanation:
        "I never tried to access admin functions. I was only trying to update my profile information and change my password. I clicked on what I thought was the profile settings but maybe I clicked the wrong link? I definitely didn't try to access anything I shouldn't have.",
      timestamp: "4:30 PM Today",
      responseMethod: "phone_call",
    },
  },
  {
    id: "5",
    title: "Unusual Login Pattern",
    description: "Login detected from VPN exit node in high-risk country",
    severity: "medium",
    type: "login",
    userName: "Lisa Thompson",
    userId: "5",
    timestamp: "9:20 AM Today",
    ruleTriggered: "Geolocation Risk Assessment",
    status: "active",
    riskScore: 55,
    affectedSystems: ["Legal Document Repository"],
    // No user response yet
  },
  {
    id: "6",
    title: "Resolved: Off-Hours Access",
    description: "Employee confirmed legitimate work from home during weekend",
    severity: "low",
    type: "behavior",
    userName: "Michael Chen",
    userId: "2",
    timestamp: "10:15 AM Yesterday",
    ruleTriggered: "Off-Hours Access Detection",
    status: "resolved",
    resolvedAt: "11:00 AM Yesterday",
    riskScore: 25,
    affectedSystems: ["Development Environment"],
    userResponse: {
      id: "resp-6",
      alertId: "6",
      userId: "2",
      response: "confirmed",
      explanation:
        "I was working on the critical bug fix for the production deployment scheduled for Monday. I needed to finish the code review and testing over the weekend to meet the deadline.",
      timestamp: "10:45 AM Yesterday",
      responseMethod: "sms",
    },
  },
  {
    id: "7",
    title: "Resolved: New Device Registration",
    description: "IT administrator confirmed new company laptop deployment",
    severity: "low",
    type: "login",
    userName: "Amanda Foster",
    userId: "7",
    timestamp: "2:30 PM Yesterday",
    ruleTriggered: "New Device Detection",
    status: "resolved",
    resolvedAt: "2:45 PM Yesterday",
    riskScore: 20,
    affectedSystems: ["IT Management Console"],
    userResponse: {
      id: "resp-7",
      alertId: "7",
      userId: "7",
      response: "confirmed",
      explanation:
        "This was the new MacBook Pro I received as part of the hardware refresh program. I was setting it up and migrating my work environment from the old laptop.",
      timestamp: "2:35 PM Yesterday",
      responseMethod: "app_notification",
    },
  },
]

// Risk assessment rules and thresholds
export const riskAssessmentRules = {
  // High risk indicators (60+ points)
  highRisk: {
    threshold: 60,
    indicators: [
      "New employee (< 3 months) with elevated access",
      "Admin access from compromised/unknown networks",
      "Bulk data export outside business hours",
      "Multiple failed login attempts + successful login from new location",
      "Cross-department data access without authorization",
      "Privilege escalation attempts",
      "Data export to personal devices",
    ],
  },

  // Medium risk indicators (30-59 points)
  mediumRisk: {
    threshold: 30,
    indicators: [
      "Off-hours system access patterns",
      "VPN usage from multiple geographic locations",
      "Bulk file downloads during business hours",
      "New device access with proper authentication",
      "Access to sensitive data matching job role but unusual timing",
      "Moderate tenure employee (6-12 months) with elevated access",
    ],
  },

  // Low risk indicators (< 30 points)
  lowRisk: {
    threshold: 30,
    indicators: [
      "Long-term employees with consistent access patterns",
      "Standard business hours activity",
      "Access patterns matching job responsibilities",
      "Proper authentication and device registration",
      "No unusual data export or access patterns",
    ],
  },
}
