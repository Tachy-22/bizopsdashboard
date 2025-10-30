"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Wallet,
  PieChart,
  Calculator,
  Calendar,
  Download,
  FileText,
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
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ComposedChart,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
import DashboardLayout from "@/components/dashboard-layout"
import { revenueData } from "@/lib/mock-data"

const financialData = {
  kpis: {
    totalRevenue: 2400000,
    totalExpenses: 1680000,
    netProfit: 720000,
    cashFlow: 450000,
    profitMargin: 30,
    revenueGrowth: 12.5,
  },

  expenseBreakdown: [
    { category: "Personnel", amount: 672000, percentage: 40 },
    { category: "Operations", amount: 420000, percentage: 25 },
    { category: "Marketing", amount: 252000, percentage: 15 },
    { category: "Technology", amount: 168000, percentage: 10 },
    { category: "Facilities", amount: 100800, percentage: 6 },
    { category: "Other", amount: 67200, percentage: 4 },
  ],

  cashFlowData: [
    { month: "Jan", operating: 45000, investing: -12000, financing: 8000, net: 41000 },
    { month: "Feb", operating: 52000, investing: -8000, financing: 5000, net: 49000 },
    { month: "Mar", operating: 48000, investing: -15000, financing: 12000, net: 45000 },
    { month: "Apr", operating: 58000, investing: -10000, financing: 7000, net: 55000 },
    { month: "May", operating: 62000, investing: -18000, financing: 15000, net: 59000 },
    { month: "Jun", operating: 67000, investing: -22000, financing: 10000, net: 55000 },
  ],

  budgetVsActual: [
    { category: "Revenue", budget: 2200000, actual: 2400000, variance: 200000 },
    { category: "Cost of Goods", budget: 1100000, actual: 1050000, variance: -50000 },
    { category: "Personnel", budget: 650000, actual: 672000, variance: 22000 },
    { category: "Marketing", budget: 280000, actual: 252000, variance: -28000 },
    { category: "Operations", budget: 400000, actual: 420000, variance: 20000 },
    { category: "Technology", budget: 150000, actual: 168000, variance: 18000 },
  ],

  accountsReceivable: [
    { customer: "TechCorp Inc.", amount: 125000, daysOutstanding: 28, status: "current" },
    { customer: "Global Solutions", amount: 89000, daysOutstanding: 35, status: "current" },
    { customer: "Innovate Co.", amount: 67000, daysOutstanding: 47, status: "overdue" },
    { customer: "Future Systems", amount: 54000, daysOutstanding: 62, status: "overdue" },
    { customer: "Dynamic Corp", amount: 43000, daysOutstanding: 15, status: "current" },
  ],

  financialRatios: {
    currentRatio: 2.4,
    quickRatio: 1.8,
    debtToEquity: 0.3,
    returnOnAssets: 15.2,
    returnOnEquity: 22.1,
    grossMargin: 56.2,
  },
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

function FinancialKPICard({ title, value, change, icon: Icon, prefix = "", suffix = "" }: any) {
  const isPositive = change > 0
  
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
        <div className="flex items-center space-x-1 text-xs">
          {isPositive ? (
            <TrendingUp className="h-3 w-3 text-green-500" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-500" />
          )}
          <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
            {Math.abs(change)}%
          </span>
          <span className="text-muted-foreground">from last month</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Financial() {
  const [period, setPeriod] = useState("monthly")

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
              <h1 className="text-3xl font-bold tracking-tight">Financial Overview</h1>
              <p className="text-muted-foreground">
                Comprehensive financial performance and analysis
              </p>
            </div>
            <div className="flex gap-2">
              <Select value={period} onValueChange={setPeriod}>
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
                <FileText className="mr-2 h-4 w-4" />
                P&L Report
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Financial KPIs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <FinancialKPICard
              title="Total Revenue"
              value={financialData.kpis.totalRevenue}
              change={financialData.kpis.revenueGrowth}
              icon={DollarSign}
              prefix="$"
            />
            <FinancialKPICard
              title="Net Profit"
              value={financialData.kpis.netProfit}
              change={8.2}
              icon={TrendingUp}
              prefix="$"
            />
            <FinancialKPICard
              title="Cash Flow"
              value={financialData.kpis.cashFlow}
              change={5.7}
              icon={Wallet}
              prefix="$"
            />
            <FinancialKPICard
              title="Profit Margin"
              value={financialData.kpis.profitMargin}
              change={2.1}
              icon={Calculator}
              suffix="%"
            />
          </div>
        </motion.div>

        {/* Financial Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Revenue Trend */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Revenue & Profit Trend</CardTitle>
                <CardDescription>Monthly revenue, expenses, and profit</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, '']} />
                    <Bar dataKey="revenue" fill="#8884d8" />
                    <Line type="monotone" dataKey="profit" stroke="#82ca9d" strokeWidth={3} />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Expense Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Distribution of operational expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <RechartsPieChart>
                    <Pie
                      dataKey="amount"
                      data={financialData.expenseBreakdown}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label={({ category, percentage }) => `${category} ${percentage}%`}
                    >
                      {financialData.expenseBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Amount']} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Financial Analysis Tabs */}
        <Tabs defaultValue="cashflow" className="space-y-4">
          <TabsList>
            <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
            <TabsTrigger value="budget">Budget vs Actual</TabsTrigger>
            <TabsTrigger value="receivables">Accounts Receivable</TabsTrigger>
            <TabsTrigger value="ratios">Financial Ratios</TabsTrigger>
          </TabsList>

          {/* Cash Flow Tab */}
          <TabsContent value="cashflow" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Cash Flow Analysis</CardTitle>
                  <CardDescription>Operating, investing, and financing cash flows</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={financialData.cashFlowData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, '']} />
                      <Area type="monotone" dataKey="operating" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="investing" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                      <Area type="monotone" dataKey="financing" stackId="1" stroke="#ffc658" fill="#ffc658" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Budget vs Actual Tab */}
          <TabsContent value="budget" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Budget vs Actual Performance</CardTitle>
                  <CardDescription>Comparison of budgeted vs actual figures</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {financialData.budgetVsActual.map((item) => (
                      <div key={item.category} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.category}</span>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-muted-foreground">
                              Budget: ${item.budget.toLocaleString()}
                            </span>
                            <span className="text-sm font-medium">
                              Actual: ${item.actual.toLocaleString()}
                            </span>
                            <Badge
                              variant={item.variance > 0 ? "destructive" : "default"}
                            >
                              {item.variance > 0 ? "+" : ""}${item.variance.toLocaleString()}
                            </Badge>
                          </div>
                        </div>
                        <Progress 
                          value={(item.actual / item.budget) * 100} 
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Accounts Receivable Tab */}
          <TabsContent value="receivables" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Accounts Receivable</CardTitle>
                  <CardDescription>Outstanding customer payments and aging</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Days Outstanding</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {financialData.accountsReceivable.map((item) => (
                        <TableRow key={item.customer}>
                          <TableCell className="font-medium">{item.customer}</TableCell>
                          <TableCell>${item.amount.toLocaleString()}</TableCell>
                          <TableCell>{item.daysOutstanding} days</TableCell>
                          <TableCell>
                            <Badge
                              variant={item.status === "current" ? "default" : "destructive"}
                            >
                              {item.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Financial Ratios Tab */}
          <TabsContent value="ratios" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Liquidity Ratios</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Current Ratio</span>
                      <span className="font-medium">{financialData.financialRatios.currentRatio}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quick Ratio</span>
                      <span className="font-medium">{financialData.financialRatios.quickRatio}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Profitability Ratios</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>ROA</span>
                      <span className="font-medium">{financialData.financialRatios.returnOnAssets}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ROE</span>
                      <span className="font-medium">{financialData.financialRatios.returnOnEquity}%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Leverage Ratios</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Debt to Equity</span>
                      <span className="font-medium">{financialData.financialRatios.debtToEquity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gross Margin</span>
                      <span className="font-medium">{financialData.financialRatios.grossMargin}%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}