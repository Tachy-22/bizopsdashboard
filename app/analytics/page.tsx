"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import {
  BarChart3,
  Calendar,
  Download,
  Filter,
  TrendingUp,
  Users,
  Eye,
  Clock,
  MousePointer,
  Target,
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
  ComposedChart,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import DashboardLayout from "@/components/dashboard-layout"

const analyticsData = {
  userEngagement: [
    { name: "Jan", pageViews: 12400, uniqueVisitors: 8200, bounceRate: 32 },
    { name: "Feb", pageViews: 13200, uniqueVisitors: 8900, bounceRate: 28 },
    { name: "Mar", pageViews: 12800, uniqueVisitors: 8500, bounceRate: 35 },
    { name: "Apr", pageViews: 14100, uniqueVisitors: 9200, bounceRate: 30 },
    { name: "May", pageViews: 15300, uniqueVisitors: 9800, bounceRate: 25 },
    { name: "Jun", pageViews: 16200, uniqueVisitors: 10400, bounceRate: 22 },
  ],
  
  conversionFunnel: [
    { stage: "Website Visits", count: 10000, percentage: 100 },
    { stage: "Product Views", count: 6500, percentage: 65 },
    { stage: "Add to Cart", count: 2800, percentage: 28 },
    { stage: "Checkout Started", count: 1400, percentage: 14 },
    { stage: "Purchase Completed", count: 980, percentage: 9.8 },
  ],
  
  trafficSources: [
    { name: "Organic Search", value: 45, visitors: 4500 },
    { name: "Direct", value: 30, visitors: 3000 },
    { name: "Social Media", value: 15, visitors: 1500 },
    { name: "Email", value: 7, visitors: 700 },
    { name: "Paid Ads", value: 3, visitors: 300 },
  ],
  
  realtimeMetrics: {
    activeUsers: 1247,
    sessionDuration: "4:32",
    pageViewsToday: 8934,
    conversionRate: 3.2,
  },
  
  topPages: [
    { page: "/dashboard", views: 2341, avgTime: "3:24" },
    { page: "/products", views: 1876, avgTime: "2:18" },
    { page: "/analytics", views: 1432, avgTime: "4:12" },
    { page: "/customers", views: 1098, avgTime: "2:45" },
    { page: "/reports", views: 867, avgTime: "5:33" },
  ],
  
  deviceBreakdown: [
    { device: "Desktop", percentage: 58, users: 5800 },
    { device: "Mobile", percentage: 35, users: 3500 },
    { device: "Tablet", percentage: 7, users: 700 },
  ],
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

function MetricCard({ title, value, change, icon: Icon, description }: any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {change && (
          <div className="flex items-center space-x-1 text-xs mt-1">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-green-500">+{change}%</span>
            <span className="text-muted-foreground">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("30d")

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
              <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
              <p className="text-muted-foreground">
                Detailed insights and metrics for your business performance
              </p>
            </div>
            <div className="flex gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Real-time Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Active Users"
              value={analyticsData.realtimeMetrics.activeUsers.toLocaleString()}
              icon={Users}
              description="Currently online"
              change={12}
            />
            <MetricCard
              title="Avg Session Duration"
              value={analyticsData.realtimeMetrics.sessionDuration}
              icon={Clock}
              description="Time spent per session"
              change={8}
            />
            <MetricCard
              title="Page Views Today"
              value={analyticsData.realtimeMetrics.pageViewsToday.toLocaleString()}
              icon={Eye}
              description="Total page views"
              change={15}
            />
            <MetricCard
              title="Conversion Rate"
              value={`${analyticsData.realtimeMetrics.conversionRate}%`}
              icon={Target}
              description="Visitors to customers"
              change={5}
            />
          </div>
        </motion.div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="engagement" className="space-y-4">
          <TabsList>
            <TabsTrigger value="engagement">User Engagement</TabsTrigger>
            <TabsTrigger value="conversion">Conversion Funnel</TabsTrigger>
            <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
            <TabsTrigger value="content">Content Performance</TabsTrigger>
          </TabsList>

          {/* User Engagement Tab */}
          <TabsContent value="engagement" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>User Engagement Trends</CardTitle>
                    <CardDescription>Page views and unique visitors over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <ComposedChart data={analyticsData.userEngagement}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Bar yAxisId="left" dataKey="pageViews" fill="#8884d8" />
                        <Bar yAxisId="left" dataKey="uniqueVisitors" fill="#82ca9d" />
                        <Line yAxisId="right" type="monotone" dataKey="bounceRate" stroke="#ff7300" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Device Breakdown</CardTitle>
                    <CardDescription>User distribution by device type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsData.deviceBreakdown.map((device, index) => (
                        <div key={device.device} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{device.device}</span>
                            <span className="text-sm text-muted-foreground">
                              {device.percentage}% ({device.users.toLocaleString()})
                            </span>
                          </div>
                          <Progress value={device.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Conversion Funnel Tab */}
          <TabsContent value="conversion" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Funnel Analysis</CardTitle>
                  <CardDescription>Track user journey from visit to purchase</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.conversionFunnel.map((stage, index) => (
                      <div key={stage.stage} className="relative">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                              {index + 1}
                            </div>
                            <span className="font-medium">{stage.stage}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold">{stage.count.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">{stage.percentage}%</div>
                          </div>
                        </div>
                        {index < analyticsData.conversionFunnel.length - 1 && (
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

          {/* Traffic Sources Tab */}
          <TabsContent value="traffic" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Traffic Sources</CardTitle>
                    <CardDescription>Where your visitors are coming from</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          dataKey="value"
                          data={analyticsData.trafficSources}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          label={({ name, value }) => `${name} ${value}%`}
                        >
                          {analyticsData.trafficSources.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Traffic Source Details</CardTitle>
                    <CardDescription>Detailed breakdown by source</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsData.trafficSources.map((source, index) => (
                        <div key={source.name} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div
                              className="h-3 w-3 rounded-full"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="font-medium">{source.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{source.visitors.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">{source.value}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Content Performance Tab */}
          <TabsContent value="content" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Pages</CardTitle>
                  <CardDescription>Most viewed pages and engagement metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.topPages.map((page, index) => (
                      <div key={page.page} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline">#{index + 1}</Badge>
                          <span className="font-medium">{page.page}</span>
                        </div>
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="text-center">
                            <div className="font-bold">{page.views.toLocaleString()}</div>
                            <div className="text-muted-foreground">Views</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold">{page.avgTime}</div>
                            <div className="text-muted-foreground">Avg Time</div>
                          </div>
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