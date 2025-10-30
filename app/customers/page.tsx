"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import {
  Users,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  TrendingUp,
  Search,
  Filter,
  MoreHorizontal,
  Building,
  MapPin,
  Star,
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
import { customerData, customerSegmentData } from "@/lib/mock-data"

const customerMetrics = {
  totalCustomers: 1248,
  activeCustomers: 1156,
  newCustomers: 47,
  churnRate: 3.2,
  avgLifetimeValue: 12450,
  satisfactionScore: 4.3,
}

const customerAnalytics = {
  acquisitionTrend: [
    { month: "Jan", new: 42, churned: 18, net: 24 },
    { month: "Feb", new: 51, churned: 22, net: 29 },
    { month: "Mar", new: 38, churned: 15, net: 23 },
    { month: "Apr", new: 47, churned: 19, net: 28 },
    { month: "May", new: 55, churned: 21, net: 34 },
    { month: "Jun", new: 62, churned: 25, net: 37 },
  ],

  revenueBySegment: [
    { segment: "Enterprise", revenue: 890000, customers: 156 },
    { segment: "Mid-Market", revenue: 540000, customers: 342 },
    { segment: "Small Business", revenue: 320000, customers: 567 },
    { segment: "Startup", revenue: 85000, customers: 183 },
  ],

  topCustomers: [
    { name: "TechCorp Inc.", value: 125000, growth: 15.2, tier: "Enterprise" },
    { name: "Global Solutions", value: 89000, growth: 8.7, tier: "Enterprise" },
    { name: "Innovate Co.", value: 67000, growth: -2.1, tier: "Mid-Market" },
    { name: "Future Systems", value: 54000, growth: 22.3, tier: "Mid-Market" },
    { name: "Dynamic Corp", value: 43000, growth: 5.8, tier: "Small Business" },
  ],
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

function CustomerMetricCard({ title, value, change, icon: Icon, prefix = "", suffix = "" }: any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
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

function CustomerCard({ customer }: { customer: any }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "inactive":
        return "bg-red-500"
      case "prospect":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={customer.avatar} alt={customer.name} />
            <AvatarFallback>
              {customer.name.split(' ').map((n: string) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{customer.name}</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Send Email</DropdownMenuItem>
                  <DropdownMenuItem>Schedule Call</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="text-sm text-muted-foreground">{customer.company}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`h-2 w-2 rounded-full ${getStatusColor(customer.status)}`} />
                <span className="text-xs text-muted-foreground capitalize">{customer.status}</span>
              </div>
              <span className="text-sm font-medium">${customer.value.toLocaleString()}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Last contact: {customer.lastContact}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredCustomers = customerData.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter
    return matchesSearch && matchesStatus
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
              <h1 className="text-3xl font-bold tracking-tight">Customer Management</h1>
              <p className="text-muted-foreground">
                Manage customer relationships and track engagement metrics
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Send Campaign
              </Button>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Customer
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Customer Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <CustomerMetricCard
              title="Total Customers"
              value={customerMetrics.totalCustomers}
              change={4.2}
              icon={Users}
            />
            <CustomerMetricCard
              title="New Customers"
              value={customerMetrics.newCustomers}
              change={12.5}
              icon={UserPlus}
            />
            <CustomerMetricCard
              title="Avg Lifetime Value"
              value={customerMetrics.avgLifetimeValue}
              change={8.3}
              icon={DollarSign}
              prefix="$"
            />
            <CustomerMetricCard
              title="Satisfaction Score"
              value={customerMetrics.satisfactionScore}
              change={2.1}
              icon={Star}
              suffix="/5"
            />
          </div>
        </motion.div>

        {/* Customer Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="segments">Segments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Customer Acquisition */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Acquisition</CardTitle>
                    <CardDescription>New customers vs churn over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={customerAnalytics.acquisitionTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="new" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                        <Area type="monotone" dataKey="net" stackId="2" stroke="#8884d8" fill="#8884d8" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Revenue by Segment */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue by Segment</CardTitle>
                    <CardDescription>Revenue distribution across customer segments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={customerAnalytics.revenueBySegment}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="segment" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Revenue']} />
                        <Bar dataKey="revenue" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Top Customers */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Top Customers</CardTitle>
                  <CardDescription>Highest value customers and their growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Growth</TableHead>
                        <TableHead>Tier</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customerAnalytics.topCustomers.map((customer) => (
                        <TableRow key={customer.name}>
                          <TableCell className="font-medium">{customer.name}</TableCell>
                          <TableCell>${customer.value.toLocaleString()}</TableCell>
                          <TableCell>
                            <span className={customer.growth > 0 ? 'text-green-500' : 'text-red-500'}>
                              {customer.growth > 0 ? '+' : ''}{customer.growth}%
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{customer.tier}</Badge>
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

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-4">
            {/* Search and Filter */}
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="prospect">Prospect</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Customer Grid */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredCustomers.map((customer) => (
                  <CustomerCard key={customer.id} customer={customer} />
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Segments Tab */}
          <TabsContent value="segments" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Customer Segments</CardTitle>
                  <CardDescription>Customer distribution by business size</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          dataKey="value"
                          data={customerSegmentData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          label={({ name, value }) => `${name} ${value}%`}
                        >
                          {customerSegmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-4">
                      {customerSegmentData.map((segment, index) => (
                        <div key={segment.name} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="h-3 w-3 rounded-full" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="font-medium">{segment.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{segment.customers}</div>
                            <div className="text-sm text-muted-foreground">{segment.value}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Churn Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{customerMetrics.churnRate}%</div>
                  <Progress value={customerMetrics.churnRate} className="mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Active Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round((customerMetrics.activeCustomers / customerMetrics.totalCustomers) * 100)}%
                  </div>
                  <Progress 
                    value={(customerMetrics.activeCustomers / customerMetrics.totalCustomers) * 100} 
                    className="mt-2" 
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{customerMetrics.satisfactionScore}/5</div>
                  <Progress value={(customerMetrics.satisfactionScore / 5) * 100} className="mt-2" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}