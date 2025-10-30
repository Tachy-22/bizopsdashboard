export interface KPI {
  id: string
  title: string
  value: string | number
  change: number
  changeType: 'increase' | 'decrease'
  icon: string
  description: string
}

export interface ChartData {
  name: string
  value: number
  [key: string]: any
}

export interface Employee {
  id: string
  name: string
  email: string
  department: string
  position: string
  status: 'active' | 'inactive' | 'on-leave'
  avatar?: string
  joinDate: string
  salary: number
}

export interface Customer {
  id: string
  name: string
  email: string
  company: string
  status: 'active' | 'inactive' | 'prospect'
  value: number
  lastContact: string
  avatar?: string
}

export interface InventoryItem {
  id: string
  name: string
  category: string
  stock: number
  minStock: number
  price: number
  supplier: string
  lastUpdated: string
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
}

export interface FinancialData {
  period: string
  revenue: number
  expenses: number
  profit: number
  cashFlow: number
}

export interface OperationMetric {
  id: string
  name: string
  target: number
  actual: number
  unit: string
  status: 'on-track' | 'behind' | 'exceeded'
}

// Mock Data
export const mockKPIs: KPI[] = [
  {
    id: '1',
    title: 'Total Revenue',
    value: '$2.4M',
    change: 12.5,
    changeType: 'increase',
    icon: 'TrendingUp',
    description: 'Monthly recurring revenue'
  },
  {
    id: '2',
    title: 'Active Customers',
    value: 1248,
    change: -3.2,
    changeType: 'decrease',
    icon: 'Users',
    description: 'Currently active customers'
  },
  {
    id: '3',
    title: 'Operational Efficiency',
    value: '94.2%',
    change: 5.1,
    changeType: 'increase',
    icon: 'Zap',
    description: 'Overall efficiency rating'
  },
  {
    id: '4',
    title: 'Cost Savings',
    value: '$340K',
    change: 8.7,
    changeType: 'increase',
    icon: 'DollarSign',
    description: 'Annual cost savings'
  }
]

export const revenueData: ChartData[] = [
  { name: 'Jan', revenue: 180000, expenses: 120000, profit: 60000 },
  { name: 'Feb', revenue: 220000, expenses: 140000, profit: 80000 },
  { name: 'Mar', revenue: 190000, expenses: 130000, profit: 60000 },
  { name: 'Apr', revenue: 250000, expenses: 160000, profit: 90000 },
  { name: 'May', revenue: 280000, expenses: 170000, profit: 110000 },
  { name: 'Jun', revenue: 320000, expenses: 180000, profit: 140000 },
  { name: 'Jul', revenue: 300000, expenses: 175000, profit: 125000 },
  { name: 'Aug', revenue: 350000, expenses: 190000, profit: 160000 },
  { name: 'Sep', revenue: 330000, expenses: 185000, profit: 145000 },
  { name: 'Oct', revenue: 380000, expenses: 200000, profit: 180000 },
  { name: 'Nov', revenue: 400000, expenses: 210000, profit: 190000 },
  { name: 'Dec', revenue: 420000, expenses: 220000, profit: 200000 }
]

export const employeeData: Employee[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    department: 'Engineering',
    position: 'Senior Developer',
    status: 'active',
    joinDate: '2022-03-15',
    salary: 95000
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    department: 'Marketing',
    position: 'Marketing Manager',
    status: 'active',
    joinDate: '2021-11-08',
    salary: 78000
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    department: 'Sales',
    position: 'Account Executive',
    status: 'on-leave',
    joinDate: '2020-07-22',
    salary: 65000
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@company.com',
    department: 'Engineering',
    position: 'Lead Engineer',
    status: 'active',
    joinDate: '2019-02-14',
    salary: 120000
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@company.com',
    department: 'HR',
    position: 'HR Business Partner',
    status: 'active',
    joinDate: '2023-01-10',
    salary: 72000
  }
]

export const customerData: Customer[] = [
  {
    id: '1',
    name: 'Tech Solutions Inc.',
    email: 'contact@techsolutions.com',
    company: 'Tech Solutions Inc.',
    status: 'active',
    value: 125000,
    lastContact: '2024-01-15'
  },
  {
    id: '2',
    name: 'Global Manufacturing',
    email: 'procurement@globalmanuf.com',
    company: 'Global Manufacturing',
    status: 'active',
    value: 89000,
    lastContact: '2024-01-10'
  },
  {
    id: '3',
    name: 'Retail Chain Co.',
    email: 'vendor@retailchain.com',
    company: 'Retail Chain Co.',
    status: 'prospect',
    value: 45000,
    lastContact: '2024-01-08'
  },
  {
    id: '4',
    name: 'Healthcare Systems',
    email: 'purchasing@healthsys.com',
    company: 'Healthcare Systems',
    status: 'active',
    value: 200000,
    lastContact: '2024-01-12'
  }
]

export const inventoryData: InventoryItem[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    category: 'Electronics',
    stock: 150,
    minStock: 50,
    price: 99.99,
    supplier: 'AudioTech Corp',
    lastUpdated: '2024-01-15',
    status: 'in-stock'
  },
  {
    id: '2',
    name: 'Office Chairs',
    category: 'Furniture',
    stock: 25,
    minStock: 30,
    price: 299.99,
    supplier: 'Comfort Furniture',
    lastUpdated: '2024-01-14',
    status: 'low-stock'
  },
  {
    id: '3',
    name: 'Laptop Stands',
    category: 'Accessories',
    stock: 0,
    minStock: 20,
    price: 49.99,
    supplier: 'ErgoSupplies',
    lastUpdated: '2024-01-13',
    status: 'out-of-stock'
  },
  {
    id: '4',
    name: 'Bluetooth Mice',
    category: 'Electronics',
    stock: 75,
    minStock: 25,
    price: 29.99,
    supplier: 'TechGear Ltd',
    lastUpdated: '2024-01-15',
    status: 'in-stock'
  }
]

export const operationMetrics: OperationMetric[] = [
  {
    id: '1',
    name: 'Production Efficiency',
    target: 95,
    actual: 94.2,
    unit: '%',
    status: 'on-track'
  },
  {
    id: '2',
    name: 'Customer Satisfaction',
    target: 90,
    actual: 92.5,
    unit: '%',
    status: 'exceeded'
  },
  {
    id: '3',
    name: 'Order Fulfillment Time',
    target: 24,
    actual: 28,
    unit: 'hours',
    status: 'behind'
  },
  {
    id: '4',
    name: 'Quality Score',
    target: 98,
    actual: 97.8,
    unit: '%',
    status: 'on-track'
  }
]

export const departmentPerformanceData: ChartData[] = [
  { name: 'Engineering', efficiency: 92, satisfaction: 88, productivity: 95 },
  { name: 'Sales', efficiency: 87, satisfaction: 91, productivity: 89 },
  { name: 'Marketing', efficiency: 83, satisfaction: 85, productivity: 87 },
  { name: 'HR', efficiency: 90, satisfaction: 93, productivity: 88 },
  { name: 'Operations', efficiency: 94, satisfaction: 89, productivity: 92 },
  { name: 'Finance', efficiency: 91, satisfaction: 87, productivity: 90 }
]

export const salesByRegionData: ChartData[] = [
  { name: 'North America', value: 145000, percentage: 35 },
  { name: 'Europe', value: 128000, percentage: 31 },
  { name: 'Asia Pacific', value: 89000, percentage: 22 },
  { name: 'Latin America', value: 35000, percentage: 8 },
  { name: 'Middle East & Africa', value: 16000, percentage: 4 }
]

export const customerSegmentData: ChartData[] = [
  { name: 'Enterprise', value: 45, customers: 156 },
  { name: 'Mid-Market', value: 30, customers: 342 },
  { name: 'Small Business', value: 20, customers: 567 },
  { name: 'Startup', value: 5, customers: 183 }
]

export const monthlyActiveUsers: ChartData[] = [
  { name: 'Jan', users: 12400 },
  { name: 'Feb', users: 13200 },
  { name: 'Mar', users: 12800 },
  { name: 'Apr', users: 14100 },
  { name: 'May', users: 15300 },
  { name: 'Jun', users: 16200 },
  { name: 'Jul', users: 15800 },
  { name: 'Aug', users: 17400 },
  { name: 'Sep', users: 16900 },
  { name: 'Oct', users: 18200 },
  { name: 'Nov', users: 19100 },
  { name: 'Dec', users: 20300 }
]