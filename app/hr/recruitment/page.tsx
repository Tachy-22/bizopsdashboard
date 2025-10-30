"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import {
  Users,
  UserPlus,
  Calendar,
  Clock,
  Target,
  TrendingUp,
  Search,
  Filter,
  MoreHorizontal,
} from "lucide-react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import DashboardLayout from "@/components/dashboard-layout"

const recruitmentData = {
  metrics: {
    openPositions: 15,
    candidatesInPipeline: 78,
    avgTimeToHire: 24,
    offerAcceptanceRate: 87,
  },

  pipeline: [
    { stage: "Applied", count: 78, conversion: 100 },
    { stage: "Screened", count: 45, conversion: 58 },
    { stage: "Interviewed", count: 28, conversion: 62 },
    { stage: "Final Round", count: 18, conversion: 64 },
    { stage: "Offer Extended", count: 12, conversion: 67 },
    { stage: "Offer Accepted", count: 10, conversion: 83 },
  ],

  positions: [
    { role: "Senior Developer", department: "Engineering", applications: 23, status: "active", priority: "high" },
    { role: "Product Manager", department: "Product", applications: 18, status: "active", priority: "high" },
    { role: "Sales Rep", department: "Sales", applications: 31, status: "active", priority: "medium" },
    { role: "Designer", department: "Design", applications: 15, status: "hold", priority: "low" },
    { role: "Data Analyst", department: "Analytics", applications: 12, status: "active", priority: "medium" },
  ],

  hiringTrends: [
    { month: "Jan", hired: 4, target: 5, applications: 89 },
    { month: "Feb", hired: 6, target: 5, applications: 94 },
    { month: "Mar", hired: 3, target: 4, applications: 78 },
    { month: "Apr", hired: 7, target: 6, applications: 112 },
    { month: "May", hired: 5, target: 5, applications: 98 },
    { month: "Jun", hired: 8, target: 7, applications: 127 },
  ],
}

export default function Recruitment() {
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Recruitment</h1>
              <p className="text-muted-foreground">
                Manage hiring pipeline, track candidates, and optimize recruitment processes
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Interview
              </Button>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Post Job
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Recruitment Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{recruitmentData.metrics.openPositions}</div>
                <p className="text-xs text-muted-foreground">Across all departments</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Candidates in Pipeline</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{recruitmentData.metrics.candidatesInPipeline}</div>
                <p className="text-xs text-muted-foreground">Active candidates</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Time to Hire</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{recruitmentData.metrics.avgTimeToHire}</div>
                <p className="text-xs text-muted-foreground">Days from application to offer</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Offer Acceptance</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{recruitmentData.metrics.offerAcceptanceRate}%</div>
                <p className="text-xs text-muted-foreground">Acceptance rate</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Recruitment Tabs */}
        <Tabs defaultValue="pipeline" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="positions">Open Positions</TabsTrigger>
            <TabsTrigger value="trends">Hiring Trends</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="pipeline" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Recruitment Funnel</CardTitle>
                  <CardDescription>Candidate progression through hiring stages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recruitmentData.pipeline.map((stage, index) => (
                      <div key={stage.stage} className="relative">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                              {index + 1}
                            </div>
                            <span className="font-medium">{stage.stage}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold">{stage.count}</div>
                            <div className="text-sm text-muted-foreground">{stage.conversion}% conversion</div>
                          </div>
                        </div>
                        {index < recruitmentData.pipeline.length - 1 && (
                          <div className="flex justify-center py-2">
                            <div className="h-6 w-px bg-border" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="positions" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Open Positions</CardTitle>
                  <CardDescription>Active job postings and application status</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Role</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Applications</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recruitmentData.positions.map((position, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{position.role}</TableCell>
                          <TableCell>{position.department}</TableCell>
                          <TableCell>{position.applications}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                position.priority === "high"
                                  ? "destructive"
                                  : position.priority === "medium"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {position.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={position.status === "active" ? "default" : "secondary"}>
                              {position.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Hiring Trends</CardTitle>
                  <CardDescription>Monthly hiring performance vs targets</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={recruitmentData.hiringTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="hired" fill="#8884d8" />
                      <Bar dataKey="target" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Pipeline Efficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">68%</div>
                  <Progress value={68} className="mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Source Quality</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85%</div>
                  <Progress value={85} className="mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Recruiter Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92%</div>
                  <Progress value={92} className="mt-2" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}