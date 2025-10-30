"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import {
  FileText,
  Download,
  Calendar,
  Filter,
  TrendingUp,
  BarChart3,
  PieChart,
  Users,
  DollarSign,
  Clock,
  Share,
  Eye,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Checkbox } from "@/components/ui/checkbox"
import DashboardLayout from "@/components/dashboard-layout"

const reportsData = {
  templates: [
    { id: 1, name: "Monthly Financial Report", category: "Financial", frequency: "Monthly", lastGenerated: "2024-01-15", status: "active" },
    { id: 2, name: "Employee Performance Review", category: "HR", frequency: "Quarterly", lastGenerated: "2024-01-10", status: "active" },
    { id: 3, name: "Operations Efficiency Report", category: "Operations", frequency: "Weekly", lastGenerated: "2024-01-14", status: "active" },
    { id: 4, name: "Customer Satisfaction Survey", category: "Customer", frequency: "Monthly", lastGenerated: "2024-01-12", status: "draft" },
    { id: 5, name: "Inventory Status Report", category: "Inventory", frequency: "Daily", lastGenerated: "2024-01-15", status: "active" },
    { id: 6, name: "Compliance Audit Report", category: "Compliance", frequency: "Annually", lastGenerated: "2024-01-01", status: "pending" },
  ],

  recentReports: [
    { name: "Q4 2023 Financial Summary", type: "Financial", generatedBy: "John Doe", date: "2024-01-15", size: "2.4 MB", views: 23 },
    { name: "December Operations Report", type: "Operations", generatedBy: "Sarah Johnson", date: "2024-01-14", size: "1.8 MB", views: 18 },
    { name: "Year-End HR Analytics", type: "HR", generatedBy: "Mike Chen", date: "2024-01-13", size: "3.1 MB", views: 31 },
    { name: "Customer Journey Analysis", type: "Customer", generatedBy: "Emily Rodriguez", date: "2024-01-12", size: "1.5 MB", views: 15 },
    { name: "Supply Chain Performance", type: "Inventory", generatedBy: "David Kim", date: "2024-01-11", size: "2.2 MB", views: 12 },
  ],

  complianceReports: [
    { name: "SOX Compliance Report", status: "Compliant", lastAudit: "2024-01-15", nextDue: "2024-04-15", priority: "high" },
    { name: "GDPR Data Protection", status: "Compliant", lastAudit: "2024-01-10", nextDue: "2024-07-10", priority: "medium" },
    { name: "ISO 27001 Security", status: "Review Required", lastAudit: "2024-01-05", nextDue: "2024-02-05", priority: "high" },
    { name: "Environmental Standards", status: "Compliant", lastAudit: "2024-01-01", nextDue: "2024-06-01", priority: "low" },
    { name: "Financial Audit", status: "In Progress", lastAudit: "2023-12-15", nextDue: "2024-03-15", priority: "high" },
  ],

  scheduledReports: [
    { name: "Weekly Sales Summary", frequency: "Weekly", nextRun: "2024-01-22", recipients: 5 },
    { name: "Monthly P&L Statement", frequency: "Monthly", nextRun: "2024-02-01", recipients: 8 },
    { name: "Quarterly Board Report", frequency: "Quarterly", nextRun: "2024-04-01", recipients: 12 },
    { name: "Daily Operations Metrics", frequency: "Daily", nextRun: "2024-01-16", recipients: 3 },
  ],
}

function ReportCard({ report, type = "template" }: { report: any, type?: string }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "Compliant":
        return "bg-green-500"
      case "draft":
      case "In Progress":
        return "bg-yellow-500"
      case "pending":
      case "Review Required":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
      case "Compliant":
        return "default"
      case "draft":
      case "In Progress":
        return "secondary"
      case "pending":
      case "Review Required":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-medium">{report.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {type === "template" ? report.category : report.type || report.lastAudit}
            </p>
            {type === "recent" && (
              <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                <span>By {report.generatedBy}</span>
                <span>{report.size}</span>
                <span className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>{report.views}</span>
                </span>
              </div>
            )}
            {type === "compliance" && (
              <div className="mt-2 text-xs text-muted-foreground">
                <div>Last Audit: {report.lastAudit}</div>
                <div>Next Due: {report.nextDue}</div>
              </div>
            )}
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge variant={getStatusVariant(report.status)}>
              {report.status}
            </Badge>
            {type === "template" && (
              <span className="text-xs text-muted-foreground">
                {report.frequency}
              </span>
            )}
            {type === "recent" && (
              <span className="text-xs text-muted-foreground">
                {report.date}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="mr-1 h-3 w-3" />
              View
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-1 h-3 w-3" />
              Download
            </Button>
          </div>
          <Button variant="ghost" size="sm">
            <Share className="mr-1 h-3 w-3" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Reports() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedReports, setSelectedReports] = useState<number[]>([])

  const filteredTemplates = reportsData.templates.filter(report => 
    selectedCategory === "all" || report.category === selectedCategory
  )

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
              <h1 className="text-3xl font-bold tracking-tight">Reports & Compliance</h1>
              <p className="text-muted-foreground">
                Generate reports, monitor compliance, and track business metrics
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Report
              </Button>
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                Create Report
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Report Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportsData.templates.length}</div>
                <p className="text-xs text-muted-foreground">Active templates</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Generated This Month</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">47</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Compliance Status</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
                <p className="text-xs text-muted-foreground">Overall compliance rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Scheduled Reports</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportsData.scheduledReports.length}</div>
                <p className="text-xs text-muted-foreground">Automated reports</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Reports Tabs */}
        <Tabs defaultValue="templates" className="space-y-4">
          <TabsList>
            <TabsTrigger value="templates">Report Templates</TabsTrigger>
            <TabsTrigger value="recent">Recent Reports</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          </TabsList>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-4">
            {/* Filter */}
            <div className="flex items-center space-x-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Financial">Financial</SelectItem>
                  <SelectItem value="HR">Human Resources</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Customer">Customer</SelectItem>
                  <SelectItem value="Inventory">Inventory</SelectItem>
                  <SelectItem value="Compliance">Compliance</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>

            {/* Templates Grid */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredTemplates.map((template) => (
                  <ReportCard key={template.id} report={template} type="template" />
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Recent Reports Tab */}
          <TabsContent value="recent" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {reportsData.recentReports.map((report, index) => (
                  <ReportCard key={index} report={report} type="recent" />
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Reports</CardTitle>
                  <CardDescription>Monitor regulatory compliance and audit status</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Audit</TableHead>
                        <TableHead>Next Due</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reportsData.complianceReports.map((report, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{report.name}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                report.status === "Compliant" 
                                  ? "default" 
                                  : report.status === "In Progress" 
                                  ? "secondary" 
                                  : "destructive"
                              }
                            >
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{report.lastAudit}</TableCell>
                          <TableCell>{report.nextDue}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                report.priority === "high" 
                                  ? "destructive" 
                                  : report.priority === "medium" 
                                  ? "default" 
                                  : "secondary"
                              }
                            >
                              {report.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Review
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

          {/* Scheduled Tab */}
          <TabsContent value="scheduled" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Scheduled Reports</CardTitle>
                  <CardDescription>Automated report generation schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reportsData.scheduledReports.map((report, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Checkbox />
                          <div>
                            <div className="font-medium">{report.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {report.frequency} • Next run: {report.nextRun}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-sm text-muted-foreground">
                            {report.recipients} recipients
                          </div>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}