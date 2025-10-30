"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import DashboardLayout from "@/components/dashboard-layout"
import {
  mockKPIs,
  revenueData,
  departmentPerformanceData,
  salesByRegionData,
  customerSegmentData,
  monthlyActiveUsers,
  operationMetrics,
} from "@/lib/mock-data"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

function KPICard({ kpi, index }: { kpi: any; index: number }) {
  const Icon = kpi.icon === 'TrendingUp' ? TrendingUp : 
               kpi.icon === 'Users' ? Users : 
               kpi.icon === 'Zap' ? Zap : DollarSign
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpi.value}</div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            {kpi.changeType === 'increase' ? (
              <ArrowUpRight className="h-3 w-3 text-green-500" />
            ) : (
              <ArrowDownRight className="h-3 w-3 text-red-500" />
            )}
            <span className={kpi.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}>
              {Math.abs(kpi.change)}%
            </span>
            <span>from last month</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{kpi.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function Dashboard() {
  const [selectedDateRange, setSelectedDateRange] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState("revenue")
  const [isRealTime, setIsRealTime] = useState(false)

  // Simulate real-time updates
  const [realtimeData, setRealtimeData] = useState({
    activeUsers: 1247,
    currentRevenue: 245780,
    ordersToday: 156
  })

  // Mock real-time updates
  React.useEffect(() => {
    if (!isRealTime) return

    const interval = setInterval(() => {
      setRealtimeData(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
        currentRevenue: prev.currentRevenue + Math.floor(Math.random() * 1000),
        ordersToday: prev.ordersToday + Math.floor(Math.random() * 3)
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [isRealTime])

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
              <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's what's happening with your business today.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant={isRealTime ? "default" : "outline"}
                onClick={() => setIsRealTime(!isRealTime)}
                className="relative"
              >
                {isRealTime && (
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse" />
                )}
                Live Data
              </Button>
              <Button>
                <TrendingUp className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {mockKPIs.map((kpi, index) => (
            <KPICard key={kpi.id} kpi={kpi} index={index} />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue, expenses, and profit</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, '']} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="profit"
                      stackId="2"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Department Performance */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Efficiency across departments</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="efficiency" fill="#8884d8" />
                    <Bar dataKey="satisfaction" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Advanced Features Grid */}
        <div className="grid gap-6 md:grid-cols-4">
          {/* Real-time Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-1"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Live Activity</span>
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                </CardTitle>
                <CardDescription>Real-time system activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-500 text-white">SJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-sm">
                    <p className="font-medium">New order #1247</p>
                    <p className="text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-green-500 text-white">MC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-sm">
                    <p className="font-medium">Production target achieved</p>
                    <p className="text-muted-foreground">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-orange-500 text-white">ER</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-sm">
                    <p className="font-medium">Low stock alert</p>
                    <p className="text-muted-foreground">8 minutes ago</p>
                  </div>
                </div>
                <div className="text-center pt-2">
                  <Button variant="ghost" size="sm" className="text-xs">
                    View all activity
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        {/* Bottom Grid */}
        <div className="grid gap-6 md:grid-cols-3 md:col-span-3">
          {/* Sales by Region */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Sales by Region</CardTitle>
                <CardDescription>Revenue distribution globally</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={salesByRegionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                    >
                      {salesByRegionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Revenue']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Operation Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Operation Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {operationMetrics.map((metric) => (
                  <div key={metric.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{metric.name}</span>
                      <Badge
                        variant={
                          metric.status === 'exceeded'
                            ? 'default'
                            : metric.status === 'on-track'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {metric.status}
                      </Badge>
                    </div>
                    <Progress
                      value={(metric.actual / metric.target) * 100}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>
                        {metric.actual}{metric.unit}
                      </span>
                      <span>
                        Target: {metric.target}{metric.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Monthly Active Users */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Monthly Active Users</CardTitle>
                <CardDescription>User engagement trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={monthlyActiveUsers}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [(value as number).toLocaleString(), 'Users']} />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={{ fill: '#8884d8' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
            </div>

    </DashboardLayout>
  )
}
