"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import {
  Users,
  UserPlus,
  Calendar,
  Award,
  TrendingUp,
  Clock,
  MapPin,
  Mail,
  Phone,
  MoreHorizontal,
  Search,
  Filter,
  Download,
  Star,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Area,
  AreaChart,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import DashboardLayout from "@/components/dashboard-layout"
import { employeeData, departmentPerformanceData } from "@/lib/mock-data"

const hrData = {
  metrics: {
    totalEmployees: 247,
    newHires: 12,
    turnoverRate: 8.3,
    avgSalary: 78500,
    satisfactionScore: 4.2,
    openPositions: 15,
  },

  departmentBreakdown: [
    { department: "Engineering", count: 89, percentage: 36 },
    { department: "Sales", count: 52, percentage: 21 },
    { department: "Marketing", count: 34, percentage: 14 },
    { department: "Operations", count: 28, percentage: 11 },
    { department: "HR", count: 18, percentage: 7 },
    { department: "Finance", count: 16, percentage: 6 },
    { department: "Legal", count: 10, percentage: 4 },
  ],

  hiringTrend: [
    { month: "Jan", hires: 8, departures: 5, net: 3 },
    { month: "Feb", hires: 12, departures: 7, net: 5 },
    { month: "Mar", hires: 15, departures: 9, net: 6 },
    { month: "Apr", hires: 10, departures: 6, net: 4 },
    { month: "May", hires: 18, departures: 8, net: 10 },
    { month: "Jun", hires: 22, departures: 12, net: 10 },
  ],

  performanceDistribution: [
    { rating: "Exceptional", count: 37, percentage: 15 },
    { rating: "Exceeds", count: 74, percentage: 30 },
    { rating: "Meets", count: 111, percentage: 45 },
    { rating: "Below", count: 20, percentage: 8 },
    { rating: "Unsatisfactory", count: 5, percentage: 2 },
  ],

  upcomingReviews: [
    { employee: "Sarah Johnson", department: "Engineering", dueDate: "2024-02-15", status: "pending" },
    { employee: "Michael Chen", department: "Marketing", dueDate: "2024-02-18", status: "scheduled" },
    { employee: "Emily Rodriguez", department: "Sales", dueDate: "2024-02-20", status: "overdue" },
    { employee: "David Kim", department: "Engineering", dueDate: "2024-02-22", status: "pending" },
  ],

  trainingPrograms: [
    { program: "Leadership Development", enrolled: 45, completed: 32, completion: 71 },
    { program: "Technical Skills", enrolled: 67, completed: 58, completion: 87 },
    { program: "Safety Training", enrolled: 247, completed: 241, completion: 98 },
    { program: "Compliance", enrolled: 247, completed: 234, completion: 95 },
  ],
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d", "#ffc658"]

function EmployeeCard({ employee }: { employee: any }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "on-leave":
        return "bg-yellow-500"
      case "inactive":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={employee.avatar} alt={employee.name} />
            <AvatarFallback>
              {employee.name.split(' ').map((n: string) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{employee.name}</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Edit Details</DropdownMenuItem>
                  <DropdownMenuItem>Performance Review</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="text-sm text-muted-foreground">{employee.position}</p>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{employee.department}</Badge>
              <div className={`h-2 w-2 rounded-full ${getStatusColor(employee.status)}`} />
              <span className="text-xs text-muted-foreground capitalize">{employee.status}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function HRMetricCard({ title, value, change, icon: Icon, suffix = "" }: any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {typeof value === 'number' ? value.toLocaleString() : value}{suffix}
        </div>
        {change && (
          <div className="flex items-center space-x-1 text-xs">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-green-500">+{change}%</span>
            <span className="text-muted-foreground">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function HumanResources() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  const filteredEmployees = employeeData.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter
    return matchesSearch && matchesDepartment
  })

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
              <h1 className="text-3xl font-bold tracking-tight">Human Resources</h1>
              <p className="text-muted-foreground">
                Manage employees, performance, and organizational development
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Review
              </Button>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Employee
              </Button>
            </div>
          </div>
        </motion.div>

        {/* HR Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <HRMetricCard
              title="Total Employees"
              value={hrData.metrics.totalEmployees}
              change={4.2}
              icon={Users}
            />
            <HRMetricCard
              title="New Hires (30d)"
              value={hrData.metrics.newHires}
              change={12.5}
              icon={UserPlus}
            />
            <HRMetricCard
              title="Turnover Rate"
              value={hrData.metrics.turnoverRate}
              change={-2.1}
              icon={TrendingUp}
              suffix="%"
            />
            <HRMetricCard
              title="Satisfaction Score"
              value={hrData.metrics.satisfactionScore}
              change={5.3}
              icon={Star}
              suffix="/5"
            />
          </div>
        </motion.div>

        {/* HR Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Department Breakdown */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Department Breakdown</CardTitle>
                    <CardDescription>Employee distribution by department</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          dataKey="count"
                          data={hrData.departmentBreakdown}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          label={({ department, percentage }) => `${department} ${percentage}%`}
                        >
                          {hrData.departmentBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Hiring Trend */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Hiring Trends</CardTitle>
                    <CardDescription>Monthly hiring and departure trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={hrData.hiringTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="hires" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                        <Area type="monotone" dataKey="net" stackId="2" stroke="#8884d8" fill="#8884d8" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Upcoming Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Performance Reviews</CardTitle>
                  <CardDescription>Scheduled and pending employee reviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {hrData.upcomingReviews.map((review) => (
                        <TableRow key={review.employee}>
                          <TableCell className="font-medium">{review.employee}</TableCell>
                          <TableCell>{review.department}</TableCell>
                          <TableCell>{review.dueDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                review.status === "overdue"
                                  ? "destructive"
                                  : review.status === "scheduled"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {review.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              View
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

          {/* Employees Tab */}
          <TabsContent value="employees" className="space-y-4">
            {/* Search and Filter */}
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>

            {/* Employee Grid */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredEmployees.map((employee) => (
                  <EmployeeCard key={employee.id} employee={employee} />
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Performance Distribution */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Distribution</CardTitle>
                    <CardDescription>Employee performance rating breakdown</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={hrData.performanceDistribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="rating" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Department Performance */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Department Performance</CardTitle>
                    <CardDescription>Average performance scores by department</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={departmentPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="productivity" fill="#82ca9d" />
                        <Bar dataKey="satisfaction" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Training Tab */}
          <TabsContent value="training" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Training Program Progress</CardTitle>
                  <CardDescription>Employee enrollment and completion rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {hrData.trainingPrograms.map((program) => (
                      <div key={program.program} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{program.program}</span>
                          <div className="flex items-center space-x-4 text-sm">
                            <span>
                              {program.completed}/{program.enrolled} completed
                            </span>
                            <Badge variant="outline">{program.completion}%</Badge>
                          </div>
                        </div>
                        <Progress value={program.completion} className="h-2" />
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