"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import {
  Package,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Truck,
  Clock,
  DollarSign,
  BarChart3,
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
import { inventoryData } from "@/lib/mock-data"

const inventoryMetrics = {
  totalItems: 1247,
  lowStockItems: 23,
  outOfStockItems: 8,
  totalValue: 2340000,
  avgTurnover: 8.5,
  onTimeDelivery: 94.2,
}

const supplyChainData = {
  suppliers: [
    { name: "TechCorp Supplies", category: "Electronics", rating: 4.8, onTime: 96, orders: 127 },
    { name: "Global Manufacturing", category: "Hardware", rating: 4.6, onTime: 92, orders: 89 },
    { name: "Efficient Logistics", category: "Components", rating: 4.9, onTime: 98, orders: 156 },
    { name: "Quality Parts Inc.", category: "Accessories", rating: 4.5, onTime: 89, orders: 73 },
  ],

  stockMovement: [
    { month: "Jan", inbound: 450, outbound: 380, net: 70 },
    { month: "Feb", inbound: 520, outbound: 420, net: 100 },
    { month: "Mar", inbound: 480, outbound: 390, net: 90 },
    { month: "Apr", inbound: 580, outbound: 460, net: 120 },
    { month: "May", inbound: 620, outbound: 510, net: 110 },
    { month: "Jun", inbound: 680, outbound: 540, net: 140 },
  ],

  categoryBreakdown: [
    { category: "Electronics", value: 45, items: 456 },
    { category: "Furniture", value: 25, items: 234 },
    { category: "Accessories", value: 18, items: 345 },
    { category: "Hardware", value: 12, items: 212 },
  ],

  reorderAlerts: [
    { item: "Wireless Headphones", currentStock: 15, minStock: 50, urgency: "high" },
    { item: "Office Chairs", currentStock: 5, minStock: 30, urgency: "critical" },
    { item: "USB Cables", currentStock: 25, minStock: 100, urgency: "medium" },
    { item: "Laptop Stands", currentStock: 0, minStock: 20, urgency: "critical" },
  ],
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

function InventoryMetricCard({ title, value, change, icon: Icon, suffix = "" }: any) {
  const isPositive = change > 0
  
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
        )}
      </CardContent>
    </Card>
  )
}

function InventoryItemRow({ item }: { item: any }) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-stock":
        return <Badge className="bg-green-500">In Stock</Badge>
      case "low-stock":
        return <Badge variant="secondary">Low Stock</Badge>
      case "out-of-stock":
        return <Badge variant="destructive">Out of Stock</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <TableRow>
      <TableCell className="font-medium">{item.name}</TableCell>
      <TableCell>{item.category}</TableCell>
      <TableCell>{item.stock}</TableCell>
      <TableCell>{item.minStock}</TableCell>
      <TableCell>${item.price}</TableCell>
      <TableCell>{item.supplier}</TableCell>
      <TableCell>{getStatusBadge(item.status)}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Update Stock</DropdownMenuItem>
            <DropdownMenuItem>Reorder</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredInventory = inventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
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
              <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
              <p className="text-muted-foreground">
                Track stock levels, manage suppliers, and optimize your supply chain
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Truck className="mr-2 h-4 w-4" />
                Track Shipment
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Inventory Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <InventoryMetricCard
              title="Total Items"
              value={inventoryMetrics.totalItems}
              change={5.2}
              icon={Package}
            />
            <InventoryMetricCard
              title="Low Stock Items"
              value={inventoryMetrics.lowStockItems}
              change={-12.5}
              icon={AlertTriangle}
            />
            <InventoryMetricCard
              title="Total Value"
              value={`$${(inventoryMetrics.totalValue / 1000000).toFixed(1)}M`}
              change={8.7}
              icon={DollarSign}
            />
            <InventoryMetricCard
              title="Avg Turnover"
              value={inventoryMetrics.avgTurnover}
              change={3.2}
              icon={BarChart3}
              suffix="x/year"
            />
          </div>
        </motion.div>

        {/* Inventory Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Stock Movement */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Stock Movement</CardTitle>
                    <CardDescription>Inbound vs outbound inventory flow</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={supplyChainData.stockMovement}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="inbound" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                        <Area type="monotone" dataKey="outbound" stackId="2" stroke="#8884d8" fill="#8884d8" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Category Breakdown */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Category Breakdown</CardTitle>
                    <CardDescription>Inventory distribution by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          dataKey="value"
                          data={supplyChainData.categoryBreakdown}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          label={({ category, value }) => `${category} ${value}%`}
                        >
                          {supplyChainData.categoryBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Items Tab */}
          <TabsContent value="items" className="space-y-4">
            {/* Search and Filter */}
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Furniture">Furniture</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="in-stock">In Stock</SelectItem>
                  <SelectItem value="low-stock">Low Stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Inventory Table */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Items</CardTitle>
                  <CardDescription>Detailed view of all inventory items</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Min Stock</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInventory.map((item) => (
                        <InventoryItemRow key={item.id} item={item} />
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Suppliers Tab */}
          <TabsContent value="suppliers" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Supplier Performance</CardTitle>
                  <CardDescription>Key supplier metrics and performance data</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>On-Time Delivery</TableHead>
                        <TableHead>Total Orders</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {supplyChainData.suppliers.map((supplier) => (
                        <TableRow key={supplier.name}>
                          <TableCell className="font-medium">{supplier.name}</TableCell>
                          <TableCell>{supplier.category}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <span>{supplier.rating}</span>
                              <span className="text-yellow-500">★</span>
                            </div>
                          </TableCell>
                          <TableCell>{supplier.onTime}%</TableCell>
                          <TableCell>{supplier.orders}</TableCell>
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

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Reorder Alerts</CardTitle>
                  <CardDescription>Items requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {supplyChainData.reorderAlerts.map((alert, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <AlertTriangle 
                            className={`h-5 w-5 ${
                              alert.urgency === 'critical' 
                                ? 'text-red-500' 
                                : alert.urgency === 'high' 
                                ? 'text-orange-500' 
                                : 'text-yellow-500'
                            }`} 
                          />
                          <div>
                            <div className="font-medium">{alert.item}</div>
                            <div className="text-sm text-muted-foreground">
                              Current: {alert.currentStock} | Min: {alert.minStock}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={
                              alert.urgency === 'critical' 
                                ? 'destructive' 
                                : alert.urgency === 'high' 
                                ? 'default' 
                                : 'secondary'
                            }
                          >
                            {alert.urgency}
                          </Badge>
                          <Button size="sm">
                            Reorder
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