"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
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
  ComposedChart,
  ReferenceLine,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import DashboardLayout from "@/components/dashboard-layout"
import { revenueData } from "@/lib/mock-data"

const revenueAnalytics = {
  forecasting: [
    { month: "Jul", actual: 420000, forecast: 415000, target: 400000 },
    { month: "Aug", actual: 0, forecast: 445000, target: 420000 },
    { month: "Sep", actual: 0, forecast: 460000, target: 440000 },
    { month: "Oct", actual: 0, forecast: 475000, target: 460000 },
    { month: "Nov", actual: 0, forecast: 490000, target: 480000 },
    { month: "Dec", actual: 0, forecast: 510000, target: 500000 },
  ],

  segments: [
    { segment: "Product Sales", q1: 890000, q2: 920000, q3: 980000, q4: 1050000 },
    { segment: "Services", q1: 340000, q2: 380000, q3: 420000, q4: 450000 },
    { segment: "Subscriptions", q1: 280000, q2: 320000, q3: 360000, q4: 400000 },
    { segment: "Licensing", q1: 120000, q2: 140000, q3: 160000, q4: 180000 },
  ],

  cohortAnalysis: [
    { month: "Jan Cohort", month1: 100, month2: 95, month3: 88, month4: 82, month5: 78, month6: 75 },
    { month: "Feb Cohort", month1: 100, month2: 97, month3: 90, month4: 85, month5: 80, month6: 0 },
    { month: "Mar Cohort", month1: 100, month2: 98, month3: 92, month4: 87, month5: 0, month6: 0 },
    { month: "Apr Cohort", month1: 100, month2: 96, month3: 89, month4: 0, month5: 0, month6: 0 },
  ],
}

export default function RevenueAnalysis() {
  const [timeframe, setTimeframe] = useState("monthly")
  const [segment, setSegment] = useState("all")

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
              <h1 className="text-3xl font-bold tracking-tight">Revenue Analysis</h1>
              <p className="text-muted-foreground">
                Deep dive into revenue performance, forecasting, and segmentation
              </p>
            </div>
            <div className="flex gap-2">
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Revenue Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$4.2M</div>
                <div className="flex items-center space-x-1 text-xs">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+12.5%</span>
                  <span className="text-muted-foreground">vs last year</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.3%</div>
                <div className="flex items-center space-x-1 text-xs">
                  <span className="text-green-500">Above target</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Forecast Accuracy</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <div className="flex items-center space-x-1 text-xs">
                  <span className="text-blue-500">Excellent</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue per Customer</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$3,367</div>
                <div className="flex items-center space-x-1 text-xs">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+5.2%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Revenue Analysis Tabs */}
        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
            <TabsTrigger value="segments">Segments</TabsTrigger>
            <TabsTrigger value="cohorts">Cohort Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Performance</CardTitle>
                  <CardDescription>Monthly revenue trend with profit margins</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, '']} />
                      <Bar dataKey="revenue" fill="#8884d8" />
                      <Line type="monotone" dataKey="profit" stroke="#82ca9d" strokeWidth={3} />
                      <ReferenceLine y={300000} stroke="red" strokeDasharray="5 5" label="Target" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="forecasting" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Forecasting</CardTitle>
                  <CardDescription>6-month revenue forecast vs targets</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={revenueAnalytics.forecasting}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, '']} />
                      <Area type="monotone" dataKey="actual" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="forecast" stackId="2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                      <Line type="monotone" dataKey="target" stroke="#ff7300" strokeWidth={2} strokeDasharray="5 5" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="segments" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Segment</CardTitle>
                  <CardDescription>Quarterly performance across revenue streams</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={revenueAnalytics.segments}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="segment" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, '']} />
                      <Bar dataKey="q1" fill="#8884d8" />
                      <Bar dataKey="q2" fill="#82ca9d" />
                      <Bar dataKey="q3" fill="#ffc658" />
                      <Bar dataKey="q4" fill="#ff7300" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="cohorts" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Cohort Analysis</CardTitle>
                  <CardDescription>Customer retention and revenue patterns by acquisition month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={revenueAnalytics.cohortAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="month1" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="month2" stroke="#82ca9d" strokeWidth={2} />
                      <Line type="monotone" dataKey="month3" stroke="#ffc658" strokeWidth={2} />
                      <Line type="monotone" dataKey="month4" stroke="#ff7300" strokeWidth={2} />
                      <Line type="monotone" dataKey="month5" stroke="#8dd1e1" strokeWidth={2} />
                      <Line type="monotone" dataKey="month6" stroke="#d084d0" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}