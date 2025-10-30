"use client"

import { motion } from "framer-motion"
import {
  Target,
  TrendingUp,
  Award,
  Clock,
  Users,
  BarChart3,
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/components/dashboard-layout"
import { operationMetrics } from "@/lib/mock-data"

const performanceData = {
  kpis: [
    { title: "Overall Performance", value: "94.2%", target: "95%", status: "on-track" },
    { title: "Team Efficiency", value: "87.5%", target: "90%", status: "behind" },
    { title: "Quality Score", value: "96.8%", target: "95%", status: "exceeded" },
    { title: "Cost Efficiency", value: "92.1%", target: "90%", status: "exceeded" },
  ],

  teamPerformance: [
    { team: "Production A", efficiency: 94, quality: 96, output: 102 },
    { team: "Production B", efficiency: 89, quality: 94, output: 98 },
    { team: "Quality Control", efficiency: 97, quality: 98, output: 95 },
    { team: "Packaging", efficiency: 91, quality: 93, output: 99 },
    { team: "Maintenance", efficiency: 88, quality: 92, output: 85 },
  ],

  performanceTrends: [
    { month: "Jan", efficiency: 89, quality: 94, cost: 88 },
    { month: "Feb", efficiency: 91, quality: 95, cost: 90 },
    { month: "Mar", efficiency: 93, quality: 96, cost: 92 },
    { month: "Apr", efficiency: 92, quality: 97, cost: 91 },
    { month: "May", efficiency: 94, quality: 96, cost: 93 },
    { month: "Jun", efficiency: 95, quality: 98, cost: 94 },
  ],
}

function PerformanceCard({ kpi }: { kpi: any }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "exceeded": return "text-green-500"
      case "on-track": return "text-blue-500"
      case "behind": return "text-red-500"
      default: return "text-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "exceeded": return Award
      case "on-track": return Target
      case "behind": return Clock
      default: return BarChart3
    }
  }

  const StatusIcon = getStatusIcon(kpi.status)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
        <StatusIcon className={`h-4 w-4 ${getStatusColor(kpi.status)}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{kpi.value}</div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground">Target: {kpi.target}</span>
          <Badge variant={kpi.status === "exceeded" ? "default" : kpi.status === "on-track" ? "secondary" : "destructive"}>
            {kpi.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

export default function OperationsPerformance() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Operations Performance</h1>
            <p className="text-muted-foreground">
              Detailed performance analytics and team efficiency metrics
            </p>
          </div>
        </motion.div>

        {/* Performance KPIs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {performanceData.kpis.map((kpi, index) => (
              <PerformanceCard key={index} kpi={kpi} />
            ))}
          </div>
        </motion.div>

        {/* Performance Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Team Performance Comparison</CardTitle>
                <CardDescription>Efficiency, quality, and output by team</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <RadarChart data={performanceData.teamPerformance}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="team" />
                    <PolarRadiusAxis angle={90} domain={[0, 110]} />
                    <Radar
                      name="Efficiency"
                      dataKey="efficiency"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="Quality"
                      dataKey="quality"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.3}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>6-month performance trajectory</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={performanceData.performanceTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="efficiency" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="quality" stroke="#82ca9d" strokeWidth={2} />
                    <Line type="monotone" dataKey="cost" stroke="#ffc658" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Detailed Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
              <CardDescription>Detailed breakdown of operational metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {operationMetrics.map((metric) => (
                <div key={metric.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{metric.name}</span>
                    <div className="flex items-center space-x-2">
                      <span>{metric.actual}{metric.unit}</span>
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
                  </div>
                  <Progress
                    value={(metric.actual / metric.target) * 100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Current: {metric.actual}{metric.unit}</span>
                    <span>Target: {metric.target}{metric.unit}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}