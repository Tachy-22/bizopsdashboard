"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Cog,
  PlayCircle,
  PauseCircle,
  StopCircle,
  TrendingUp,
  Users,
  Zap,
  Target,
  BarChart3,
  Gauge,
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
  RadialBarChart,
  RadialBar,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import DashboardLayout from "@/components/dashboard-layout"
import { operationMetrics } from "@/lib/mock-data"

const operationsData = {
  productionLines: [
    {
      id: "LINE-001",
      name: "Assembly Line A",
      status: "running",
      efficiency: 94.2,
      output: 1247,
      target: 1300,
      lastMaintenance: "2024-01-10",
    },
    {
      id: "LINE-002",
      name: "Assembly Line B",
      status: "maintenance",
      efficiency: 0,
      output: 0,
      target: 1200,
      lastMaintenance: "2024-01-15",
    },
    {
      id: "LINE-003",
      name: "Packaging Line",
      status: "running",
      efficiency: 87.5,
      output: 2134,
      target: 2400,
      lastMaintenance: "2024-01-08",
    },
    {
      id: "LINE-004",
      name: "Quality Control",
      status: "running",
      efficiency: 96.8,
      output: 1987,
      target: 2000,
      lastMaintenance: "2024-01-12",
    },
  ],

  efficiencyTrend: [
    { time: "00:00", overall: 92, lineA: 94, lineB: 88, packaging: 93 },
    { time: "04:00", overall: 89, lineA: 91, lineB: 85, packaging: 91 },
    { time: "08:00", overall: 95, lineA: 97, lineB: 92, packaging: 96 },
    { time: "12:00", overall: 91, lineA: 93, lineB: 87, packaging: 93 },
    { time: "16:00", overall: 94, lineA: 96, lineB: 91, packaging: 95 },
    { time: "20:00", overall: 88, lineA: 90, lineB: 84, packaging: 90 },
  ],

  alerts: [
    {
      id: 1,
      type: "warning",
      title: "Line B Maintenance Required",
      description: "Scheduled maintenance window starting in 2 hours",
      timestamp: "2 minutes ago",
    },
    {
      id: 2,
      type: "info",
      title: "Efficiency Target Achieved",
      description: "Assembly Line A exceeded efficiency target by 4.2%",
      timestamp: "15 minutes ago",
    },
    {
      id: 3,
      type: "error",
      title: "Quality Control Alert",
      description: "Defect rate exceeded threshold on Batch #1247",
      timestamp: "32 minutes ago",
    },
  ],

  qualityMetrics: [
    { month: "Jan", defectRate: 2.1, passRate: 97.9, rework: 1.2 },
    { month: "Feb", defectRate: 1.8, passRate: 98.2, rework: 0.9 },
    { month: "Mar", defectRate: 2.3, passRate: 97.7, rework: 1.4 },
    { month: "Apr", defectRate: 1.5, passRate: 98.5, rework: 0.7 },
    { month: "May", defectRate: 1.9, passRate: 98.1, rework: 1.0 },
    { month: "Jun", defectRate: 1.3, passRate: 98.7, rework: 0.6 },
  ],

  utilizationData: [
    { name: "Equipment", value: 85, fill: "#8884d8" },
    { name: "Labor", value: 92, fill: "#82ca9d" },
    { name: "Materials", value: 78, fill: "#ffc658" },
  ],
}

function ProductionLineCard({ line }: { line: any }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-500"
      case "maintenance":
        return "bg-yellow-500"
      case "stopped":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return PlayCircle
      case "maintenance":
        return Cog
      case "stopped":
        return StopCircle
      default:
        return PauseCircle
    }
  }

  const StatusIcon = getStatusIcon(line.status)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{line.name}</CardTitle>
        <div className="flex items-center space-x-2">
          <div className={`h-2 w-2 rounded-full ${getStatusColor(line.status)}`} />
          <StatusIcon className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{line.efficiency}%</div>
        <p className="text-xs text-muted-foreground">Efficiency Rate</p>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Output</span>
            <span>
              {line.output.toLocaleString()} / {line.target.toLocaleString()}
            </span>
          </div>
          <Progress value={(line.output / line.target) * 100} className="h-2" />
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          Last maintenance: {line.lastMaintenance}
        </div>
      </CardContent>
    </Card>
  )
}

function AlertItem({ alert }: { alert: any }) {
  const getAlertVariant = (type: string) => {
    switch (type) {
      case "error":
        return "destructive"
      case "warning":
        return "default"
      default:
        return "default"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error":
        return AlertTriangle
      case "warning":
        return AlertTriangle
      default:
        return CheckCircle
    }
  }

  const AlertIcon = getAlertIcon(alert.type)

  return (
    <Alert variant={getAlertVariant(alert.type)}>
      <AlertIcon className="h-4 w-4" />
      <AlertTitle>{alert.title}</AlertTitle>
      <AlertDescription className="mt-1">
        {alert.description}
        <div className="text-xs text-muted-foreground mt-1">{alert.timestamp}</div>
      </AlertDescription>
    </Alert>
  )
}

export default function Operations() {
  const [selectedLine, setSelectedLine] = useState("all")

  const overallEfficiency = Math.round(
    operationsData.productionLines
      .filter(line => line.status === "running")
      .reduce((acc, line) => acc + line.efficiency, 0) /
    operationsData.productionLines.filter(line => line.status === "running").length
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
              <h1 className="text-3xl font-bold tracking-tight">Operations Management</h1>
              <p className="text-muted-foreground">
                Monitor and manage your production operations in real-time
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Activity className="mr-2 h-4 w-4" />
                Real-time View
              </Button>
              <Button>
                <Target className="mr-2 h-4 w-4" />
                Set Targets
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Efficiency</CardTitle>
                <Gauge className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overallEfficiency}%</div>
                <p className="text-xs text-muted-foreground">
                  +2.1% from yesterday
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Lines</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {operationsData.productionLines.filter(line => line.status === "running").length} / {operationsData.productionLines.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Production lines running
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Output</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {operationsData.productionLines
                    .reduce((acc, line) => acc + line.output, 0)
                    .toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Units produced today
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{operationsData.alerts.length}</div>
                <p className="text-xs text-muted-foreground">
                  Requiring attention
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Production Lines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Production Lines Status</CardTitle>
              <CardDescription>Real-time monitoring of all production lines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {operationsData.productionLines.map((line) => (
                  <ProductionLineCard key={line.id} line={line} />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs for detailed views */}
        <Tabs defaultValue="efficiency" className="space-y-4">
          <TabsList>
            <TabsTrigger value="efficiency">Efficiency Trends</TabsTrigger>
            <TabsTrigger value="quality">Quality Metrics</TabsTrigger>
            <TabsTrigger value="utilization">Resource Utilization</TabsTrigger>
            <TabsTrigger value="alerts">Alerts & Issues</TabsTrigger>
          </TabsList>

          {/* Efficiency Trends */}
          <TabsContent value="efficiency" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Efficiency Trends (24h)</CardTitle>
                  <CardDescription>Production line efficiency over the last 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={operationsData.efficiencyTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[80, 100]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="overall" stroke="#8884d8" strokeWidth={3} />
                      <Line type="monotone" dataKey="lineA" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="lineB" stroke="#ffc658" />
                      <Line type="monotone" dataKey="packaging" stroke="#ff7300" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Quality Metrics */}
          <TabsContent value="quality" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Quality Trends</CardTitle>
                    <CardDescription>Defect rate and pass rate over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={operationsData.qualityMetrics}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="passRate" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                        <Area type="monotone" dataKey="defectRate" stackId="2" stroke="#ff7300" fill="#ff7300" />
                      </AreaChart>
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
                    <CardTitle>Current Quality Metrics</CardTitle>
                    <CardDescription>Today's quality performance</CardDescription>
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
            </div>
          </TabsContent>

          {/* Resource Utilization */}
          <TabsContent value="utilization" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Resource Utilization</CardTitle>
                  <CardDescription>Current utilization of key resources</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" data={operationsData.utilizationData}>
                      <RadialBar dataKey="value" cornerRadius={10} fill="#8884d8" />
                      <Tooltip />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Alerts & Issues */}
          <TabsContent value="alerts" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Active Alerts</CardTitle>
                  <CardDescription>Current system alerts and issues requiring attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {operationsData.alerts.map((alert) => (
                    <AlertItem key={alert.id} alert={alert} />
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}