"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  BarChart3,
  Bell,
  Building2,
  Calendar,
  ChevronDown,
  CreditCard,
  DollarSign,
  FileText,
  HelpCircle,
  Home,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Package,
  Plus,
  PlusCircle,
  Search,
  Settings,
  TrendingUp,
  User,
  UserPlus,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/ui/logo"
import { ThemeToggle } from "@/components/theme-toggle"

interface NavItem {
  title: string
  href: string
  icon: any
  badge?: string
  children?: NavItem[]
}

const navigation: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    badge: "New",
  },
  {
    title: "Operations",
    href: "/operations",
    icon: Building2,
    children: [
      {
        title: "Overview",
        href: "/operations",
        icon: TrendingUp,
      },
      {
        title: "Performance",
        href: "/operations/performance",
        icon: BarChart3,
      },
      {
        title: "Quality Control",
        href: "/operations/quality",
        icon: FileText,
      },
    ],
  },
  {
    title: "Financial",
    href: "/financial",
    icon: DollarSign,
    children: [
      {
        title: "Overview",
        href: "/financial",
        icon: DollarSign,
      },
      {
        title: "Revenue",
        href: "/financial/revenue",
        icon: TrendingUp,
      },
      {
        title: "Expenses",
        href: "/financial/expenses",
        icon: FileText,
      },
    ],
  },
  {
    title: "Human Resources",
    href: "/hr",
    icon: Users,
    children: [
      {
        title: "Employees",
        href: "/hr",
        icon: Users,
      },
      {
        title: "Recruitment",
        href: "/hr/recruitment",
        icon: Calendar,
      },
      {
        title: "Performance",
        href: "/hr/performance",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: Package,
    children: [
      {
        title: "Stock Overview",
        href: "/inventory",
        icon: Package,
      },
      {
        title: "Supply Chain",
        href: "/inventory/supply-chain",
        icon: TrendingUp,
      },
    ],
  },
  {
    title: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

// Mock search data
const searchData = [
  { title: "Dashboard Overview", type: "page", href: "/" },
  { title: "Analytics", type: "page", href: "/analytics" },
  { title: "Financial Reports", type: "page", href: "/financial" },
  { title: "Revenue Analysis", type: "page", href: "/financial/revenue" },
  { title: "Operations Management", type: "page", href: "/operations" },
  { title: "Performance Metrics", type: "page", href: "/operations/performance" },
  { title: "Human Resources", type: "page", href: "/hr" },
  { title: "Recruitment", type: "page", href: "/hr/recruitment" },
  { title: "Inventory Management", type: "page", href: "/inventory" },
  { title: "Customer Management", type: "page", href: "/customers" },
  { title: "Reports & Compliance", type: "page", href: "/reports" },
  { title: "Settings", type: "page", href: "/settings" },
  { title: "Sarah Johnson", type: "employee", href: "/hr" },
  { title: "Michael Chen", type: "employee", href: "/hr" },
  { title: "Emily Rodriguez", type: "employee", href: "/hr" },
  { title: "David Kim", type: "employee", href: "/hr" },
  { title: "TechCorp Inc.", type: "customer", href: "/customers" },
  { title: "Global Solutions", type: "customer", href: "/customers" },
  { title: "Wireless Headphones", type: "product", href: "/inventory" },
  { title: "Office Chairs", type: "product", href: "/inventory" },
  { title: "Monthly Financial Report", type: "report", href: "/reports" },
  { title: "Q4 Performance Review", type: "report", href: "/reports" },
]

const getSearchIcon = (type: string) => {
  switch (type) {
    case "page": return FileText
    case "employee": return User
    case "customer": return Building2
    case "product": return Package
    case "report": return BarChart3
    default: return Search
  }
}

interface SidebarProps {
  className?: string
  isCollapsed?: boolean
  onToggle?: () => void
}

function Sidebar({ className, isCollapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (title: string, effectiveCollapsed: boolean) => {
    if (effectiveCollapsed) {
      // When collapsed, just navigate to the first child page
      const navItem = navigation.find(item => item.title === title)
      if (navItem?.children?.[0]) {
        window.location.href = navItem.children[0].href
      }
      return
    }
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const NavItem = ({ item, level = 0, isCollapsed: itemCollapsed }: { item: NavItem; level?: number; isCollapsed?: boolean }) => {
    const isActive = pathname === item.href
    const isExpanded = expandedItems.includes(item.title)
    const hasChildren = item.children && item.children.length > 0
    const hasActiveChild = hasChildren && item.children?.some(child => pathname === child.href)
    const effectiveCollapsed = itemCollapsed ?? (isCollapsed && !isHovering)

    return (
      <div className="space-y-1">
        {hasChildren ? (
          <button
            onClick={() => toggleExpanded(item.title, effectiveCollapsed)}
            className={cn(
              "group w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
              "hover:bg-accent hover:text-accent-foreground hover:shadow-sm",
              (isActive || hasActiveChild || isExpanded) && "bg-accent text-accent-foreground",
              level > 0 && "ml-4",
              effectiveCollapsed && "justify-center px-2"
            )}
            title={effectiveCollapsed ? `${item.title}${hasChildren ? ' (click to navigate)' : ''}` : undefined}
          >
            <div className={cn(
              "flex items-center gap-3 transition-all duration-200",
              effectiveCollapsed && "justify-center"
            )}>
              <item.icon className={cn(
                "h-4 w-4 transition-all duration-200",
                effectiveCollapsed && "h-5 w-5",
                (isActive || hasActiveChild || isExpanded) && "text-primary"
              )} />
              {!effectiveCollapsed && (
                <>
                  <span className="transition-all duration-200">{item.title}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </div>
            {!effectiveCollapsed && (
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-all duration-300 group-hover:text-primary",
                  isExpanded && "rotate-180 text-primary"
                )}
              />
            )}
          </button>
        ) : (
          <Link
            href={item.href}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
              "hover:bg-accent hover:text-accent-foreground hover:shadow-sm hover:translate-x-1",
              isActive && "bg-accent text-accent-foreground shadow-sm",
              level > 0 && "ml-4 border-l-2 border-transparent hover:border-primary/20",
              level > 0 && isActive && "border-l-2 border-primary",
              effectiveCollapsed && "justify-center px-2"
            )}
            title={effectiveCollapsed ? item.title : undefined}
          >
            <item.icon className={cn(
              "h-4 w-4 transition-all duration-200 group-hover:text-primary",
              effectiveCollapsed && "h-5 w-5",
              isActive && "text-primary"
            )} />
            {!effectiveCollapsed && (
              <>
                <span className="transition-all duration-200">{item.title}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {item.badge}
                  </Badge>
                )}
              </>
            )}
          </Link>
        )}
        
        {hasChildren && isExpanded && !effectiveCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="ml-6 space-y-1 border-l-2 border-muted pl-3 py-1">
              {item.children?.map((child) => (
                <NavItem key={child.href} item={child} level={level + 1} isCollapsed={effectiveCollapsed} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    )
  }

  // Auto-expand sidebar when hovering over collapsed state
  const [isHovering, setIsHovering] = useState(false)
  const shouldShowExpanded = !isCollapsed || isHovering

  return (
    <div 
      className={cn(
        "flex h-full flex-col bg-background border-r transition-all duration-300 relative",
        className, 
        isCollapsed && "w-16 hover:w-64 hover:shadow-lg hover:z-50"
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={cn(
        "flex items-center gap-3 px-6 py-4 transition-all duration-300", 
        isCollapsed && !isHovering && "px-4 justify-center"
      )}>
        <Logo size={isCollapsed && !isHovering ? "lg" : "lg"} className="shrink-0" />
        {shouldShowExpanded && (
          <motion.div 
            initial={isCollapsed ? { opacity: 0, x: -10 } : false}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <span className="text-lg font-bold">BizOps</span>
            <span className="text-xs text-muted-foreground -mt-1">Dashboard</span>
          </motion.div>
        )}
        {/* {isCollapsed && isHovering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute right-2 top-4"
          >
            <Badge variant="outline" className="text-xs">
              Hover to expand
            </Badge>
          </motion.div>
        )} */}
      </div>
      <Separator />
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigation.map((item) => (
            <NavItem key={item.href} item={item} isCollapsed={isCollapsed && !isHovering} />
          ))}
        </nav>
      </ScrollArea>
      <Separator />
      <div className={cn("p-4 transition-all duration-300", isCollapsed && !isHovering && "px-2")}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 px-3 transition-all duration-200 hover:bg-accent",
                isCollapsed && !isHovering && "justify-center px-2"
              )}
            >
              <Avatar className="h-8 w-8 ring-2 ring-transparent transition-all duration-200 hover:ring-primary/20">
                <AvatarImage 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" 
                  alt="User" 
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              {shouldShowExpanded && (
                <motion.div 
                  initial={isCollapsed ? { opacity: 0, x: -10 } : false}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col items-start text-sm"
                >
                  <span className="font-medium">John Doe</span>
                  <span className="text-xs text-muted-foreground">
                    Administrator
                  </span>
                </motion.div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Filter search results
  const filteredResults = searchData.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Keyboard shortcuts for search
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <div className={cn("hidden lg:flex lg:flex-col transition-all duration-300", sidebarCollapsed ? "lg:w-16" : "lg:w-64")}>
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      </div>

      {/* Mobile Navigation */}
      <div className="flex flex-1 flex-col lg:hidden">
        <header className="flex h-16 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <Logo size="sm" />
            <span className="text-lg font-semibold">BizOps Dashboard</span>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>

      {/* Desktop Main Content */}
      <div className="hidden flex-1 flex-col lg:flex">
        <header className="flex h-16 items-center justify-between border-b px-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="h-9 w-9"
            >
              <Menu className="h-4 w-4" />
            </Button>
            
            {/* Search Bar */}
            <div className="relative">
              <Button
                variant="outline"
                className="relative h-9 w-64 justify-start text-sm text-muted-foreground shadow-none"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="mr-2 h-4 w-4" />
                <span>Search anything...</span>
                <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">
                3
              </Badge>
            </Button>

            {/* Quick Actions */}
            <Button variant="ghost" size="icon">
              <Plus className="h-4 w-4" />
            </Button>

            {/* Admin Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" 
                      alt="Admin" 
                    />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Alex Johnson</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      alex.johnson@company.com
                    </p>
                    <Badge variant="secondary" className="w-fit mt-1">Administrator</Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Keyboard className="mr-2 h-4 w-4" />
                    <span>Keyboard shortcuts</span>
                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Users className="mr-2 h-4 w-4" />
                    <span>Team Management</span>
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span>Invite users</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          <span>Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          <span>Message</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          <span>More...</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem>
                    <Building2 className="mr-2 h-4 w-4" />
                    <span>Organization</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    <span>Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help Center</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    <Command className="mr-2 h-4 w-4" />
                    <span>API</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-muted/10 p-6">
          {children}
        </main>
      </div>

      {/* Search Command Dialog */}
      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput 
          placeholder="Search pages, employees, customers, reports..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          {/* Group by type */}
          {["page", "employee", "customer", "product", "report"].map((type) => {
            const items = filteredResults.filter(item => item.type === type)
            if (items.length === 0) return null
            
            return (
              <CommandGroup key={type} heading={type.charAt(0).toUpperCase() + type.slice(1) + 's'}>
                {items.slice(0, 5).map((item, index) => {
                  const IconComponent = getSearchIcon(item.type)
                  return (
                    <CommandItem
                      key={`${item.type}-${index}`}
                      value={item.title}
                      onSelect={() => {
                        setSearchOpen(false)
                        setSearchQuery("")
                        // In a real app, you'd navigate here
                        window.location.href = item.href
                      }}
                    >
                      <IconComponent className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                      <CommandShortcut className="ml-auto">
                        {item.type === "page" ? "Go" : "View"}
                      </CommandShortcut>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            )
          })}
        </CommandList>
      </CommandDialog>
    </div>
  )
}