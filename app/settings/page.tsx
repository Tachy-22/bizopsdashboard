"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import {
  Settings,
  User,
  Shield,
  Bell,
  Palette,
  Globe,
  Database,
  Key,
  Users,
  CreditCard,
  Mail,
  Smartphone,
  Monitor,
  Sun,
  Moon,
  Save,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import DashboardLayout from "@/components/dashboard-layout"

const settingsData = {
  profile: {
    name: "John Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    role: "Administrator",
    department: "IT",
    avatar: "",
    bio: "Experienced business operations manager with 10+ years in enterprise software and analytics.",
  },

  notifications: {
    email: true,
    push: true,
    sms: false,
    reports: true,
    alerts: true,
    marketing: false,
  },

  preferences: {
    theme: "system",
    language: "en",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    currency: "USD",
  },

  integrations: [
    { name: "Slack", description: "Team communication", status: "connected", icon: "💬" },
    { name: "Google Workspace", description: "Email and documents", status: "connected", icon: "📧" },
    { name: "Salesforce", description: "Customer relationship management", status: "disconnected", icon: "🏢" },
    { name: "Microsoft Teams", description: "Video conferencing", status: "connected", icon: "📹" },
    { name: "Zoom", description: "Video meetings", status: "connected", icon: "🎥" },
    { name: "Jira", description: "Project management", status: "disconnected", icon: "📋" },
  ],

  security: {
    twoFactorEnabled: true,
    lastPasswordChange: "2024-01-01",
    activeSessions: 3,
    loginHistory: [
      { device: "MacBook Pro", location: "New York, NY", time: "2024-01-15 09:30 AM", current: true },
      { device: "iPhone", location: "New York, NY", time: "2024-01-15 08:15 AM", current: false },
      { device: "Chrome Browser", location: "Boston, MA", time: "2024-01-14 02:45 PM", current: false },
    ],
  },

  teamMembers: [
    { name: "Sarah Johnson", role: "Manager", department: "Engineering", access: "Full Access", status: "active" },
    { name: "Michael Chen", role: "Analyst", department: "Finance", access: "Read Only", status: "active" },
    { name: "Emily Rodriguez", role: "Coordinator", department: "Sales", access: "Limited", status: "inactive" },
    { name: "David Kim", role: "Specialist", department: "Operations", access: "Full Access", status: "active" },
  ],
}

function SettingSection({ icon: Icon, title, description, children }: any) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Icon className="h-5 w-5" />
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [notifications, setNotifications] = useState(settingsData.notifications)
  const [preferences, setPreferences] = useState(settingsData.preferences)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">
                Manage your account settings, preferences, and security options
              </p>
            </div>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </motion.div>

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SettingSection
                icon={User}
                title="Profile Information"
                description="Update your personal information and profile details"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={settingsData.profile.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue={settingsData.profile.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue={settingsData.profile.phone} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" defaultValue={settingsData.profile.role} readOnly />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-col items-center space-y-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={settingsData.profile.avatar} alt={settingsData.profile.name} />
                        <AvatarFallback className="text-lg">
                          {settingsData.profile.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <Button variant="outline">Change Avatar</Button>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        defaultValue={settingsData.profile.bio}
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              </SettingSection>
            </motion.div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SettingSection
                icon={Bell}
                title="Notification Preferences"
                description="Configure how you want to receive notifications"
              >
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Communication Channels</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Email Notifications</div>
                            <div className="text-sm text-muted-foreground">Receive notifications via email</div>
                          </div>
                        </div>
                        <Switch 
                          checked={notifications.email} 
                          onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Bell className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Push Notifications</div>
                            <div className="text-sm text-muted-foreground">Receive browser push notifications</div>
                          </div>
                        </div>
                        <Switch 
                          checked={notifications.push} 
                          onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-4 w-4" />
                          <div>
                            <div className="font-medium">SMS Notifications</div>
                            <div className="text-sm text-muted-foreground">Receive text message notifications</div>
                          </div>
                        </div>
                        <Switch 
                          checked={notifications.sms} 
                          onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Notification Types</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">System Alerts</div>
                          <div className="text-sm text-muted-foreground">Critical system notifications</div>
                        </div>
                        <Switch 
                          checked={notifications.alerts} 
                          onCheckedChange={(checked) => setNotifications({...notifications, alerts: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Report Updates</div>
                          <div className="text-sm text-muted-foreground">Automated report notifications</div>
                        </div>
                        <Switch 
                          checked={notifications.reports} 
                          onCheckedChange={(checked) => setNotifications({...notifications, reports: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Marketing Updates</div>
                          <div className="text-sm text-muted-foreground">Product updates and announcements</div>
                        </div>
                        <Switch 
                          checked={notifications.marketing} 
                          onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SettingSection>
            </motion.div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SettingSection
                icon={Palette}
                title="Application Preferences"
                description="Customize your dashboard experience"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <Select value={preferences.theme} onValueChange={(value) => setPreferences({...preferences, theme: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">
                            <div className="flex items-center space-x-2">
                              <Sun className="h-4 w-4" />
                              <span>Light</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="dark">
                            <div className="flex items-center space-x-2">
                              <Moon className="h-4 w-4" />
                              <span>Dark</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="system">
                            <div className="flex items-center space-x-2">
                              <Monitor className="h-4 w-4" />
                              <span>System</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select value={preferences.language} onValueChange={(value) => setPreferences({...preferences, language: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Timezone</Label>
                      <Select value={preferences.timezone} onValueChange={(value) => setPreferences({...preferences, timezone: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                          <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Date Format</Label>
                      <Select value={preferences.dateFormat} onValueChange={(value) => setPreferences({...preferences, dateFormat: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Currency</Label>
                      <Select value={preferences.currency} onValueChange={(value) => setPreferences({...preferences, currency: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                          <SelectItem value="JPY">JPY (¥)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </SettingSection>
            </motion.div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <SettingSection
                icon={Shield}
                title="Security Settings"
                description="Manage your account security and access controls"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Two-Factor Authentication</div>
                      <div className="text-sm text-muted-foreground">Add an extra layer of security to your account</div>
                    </div>
                    <Badge variant={settingsData.security.twoFactorEnabled ? "default" : "secondary"}>
                      {settingsData.security.twoFactorEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Password</div>
                        <div className="text-sm text-muted-foreground">
                          Last changed: {settingsData.security.lastPasswordChange}
                        </div>
                      </div>
                      <Button variant="outline">Change Password</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Active Sessions</div>
                        <div className="text-sm text-muted-foreground">
                          {settingsData.security.activeSessions} active sessions
                        </div>
                      </div>
                      <Button variant="outline">Manage Sessions</Button>
                    </div>
                  </div>
                </div>
              </SettingSection>
              
              <Card>
                <CardHeader>
                  <CardTitle>Login History</CardTitle>
                  <CardDescription>Recent login activity on your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {settingsData.security.loginHistory.map((login, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Monitor className="h-4 w-4" />
                          <div>
                            <div className="font-medium">{login.device}</div>
                            <div className="text-sm text-muted-foreground">{login.location}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">{login.time}</div>
                          {login.current && <Badge variant="outline">Current</Badge>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SettingSection
                icon={Database}
                title="Third-party Integrations"
                description="Connect and manage external service integrations"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  {settingsData.integrations.map((integration, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {/* <div className="text-2xl">{integration.icon}</div> */}
                        <div>
                          <div className="font-medium">{integration.name}</div>
                          <div className="text-sm text-muted-foreground">{integration.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={integration.status === "connected" ? "default" : "secondary"}>
                          {integration.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          {integration.status === "connected" ? "Configure" : "Connect"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </SettingSection>
            </motion.div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SettingSection
                icon={Users}
                title="Team Management"
                description="Manage team members and their access permissions"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-muted-foreground">
                    {settingsData.teamMembers.length} team members
                  </div>
                  <Button>
                    <Users className="mr-2 h-4 w-4" />
                    Invite Member
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Access Level</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {settingsData.teamMembers.map((member, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell>{member.department}</TableCell>
                        <TableCell>{member.access}</TableCell>
                        <TableCell>
                          <Badge variant={member.status === "active" ? "default" : "secondary"}>
                            {member.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </SettingSection>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}