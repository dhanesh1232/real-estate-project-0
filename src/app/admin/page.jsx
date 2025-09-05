// app/dashboard/page.js
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart2,
  ChartSplineIcon,
  Users,
  TrendingUp,
  TrendingDown,
  Download,
  MoreHorizontal,
  ArrowUpRight,
  Eye,
  Home,
  Building,
  Crown,
  MapPin,
  IndianRupee,
  RefreshCw,
  Search,
  Filter,
  Plus,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/mediaQuery";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Custom Tooltip for charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg p-3 shadow-md">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p
            key={`item-${index}`}
            className="text-sm"
            style={{ color: entry.color }}
          >
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Generate random data updates for real-time simulation
const generateRandomUpdate = (baseValue, variance = 0.1) => {
  return Math.max(
    0,
    baseValue * (1 + (Math.random() * variance * 2 - variance))
  );
};

// Simulate real-time data updates for different data types
const useRealtimeData = (initialData, interval = 8000) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const timer = setInterval(() => {
      setData((prevData) => ({
        ...prevData,
        totalRevenue: generateRandomUpdate(prevData.totalRevenue, 0.05),
        newCustomers: Math.round(
          generateRandomUpdate(prevData.newCustomers, 0.08)
        ),
        activeAccounts: Math.round(
          generateRandomUpdate(prevData.activeAccounts, 0.03)
        ),
        growthRate: generateRandomUpdate(prevData.growthRate, 0.1),
        totalVisitors: Math.round(
          generateRandomUpdate(prevData.totalVisitors, 0.05)
        ),
        monthVisitors: Math.round(
          generateRandomUpdate(prevData.monthVisitors, 0.07)
        ),
        weekVisitors: Math.round(
          generateRandomUpdate(prevData.weekVisitors, 0.1)
        ),
        visitorData: prevData.visitorData.map((item) => ({
          ...item,
          visitors: Math.round(generateRandomUpdate(item.visitors, 0.15)),
        })),
        trafficSources: prevData.trafficSources.map((source) => ({
          ...source,
          value: Math.round(generateRandomUpdate(source.value, 0.12)),
        })),
        revenueData: prevData.revenueData.map((item) => ({
          ...item,
          value: generateRandomUpdate(item.value, 0.1),
        })),
        recentTransactions: prevData.recentTransactions.map((transaction) => ({
          ...transaction,
          amount: `$${Math.round(
            generateRandomUpdate(
              parseInt(transaction.amount.replace(/[^0-9]/g, ""), 10),
              0.05
            )
          ).toLocaleString()}`,
        })),
        avgCommission: Math.round(
          generateRandomUpdate(prevData.avgCommission, 0.08)
        ),
        marketData: prevData.marketData.map((item) => ({
          ...item,
          value: Math.round(generateRandomUpdate(item.value, 0.15)),
        })),
      }));
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return data;
};

// Stat Card Component
const StatCard = ({
  title,
  value,
  change,
  subtitle,
  trend,
  icon: Icon,
  loading = false,
}) => {
  const isPositive = change && change.startsWith("+");
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-md gap-0 p-2.5">
      <CardHeader className="flex flex-row items-center justify-between px-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="p-2 rounded-full bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="px-2">
        {loading ? (
          <div className="h-8 bg-muted rounded animate-pulse"></div>
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
        {change && (
          <div className="flex items-center">
            <Badge
              variant={isPositive ? "default" : "destructive"}
              className="flex items-center gap-1 shadow-inner rounded-2xl"
            >
              <TrendIcon className="h-3 w-3" />
              {change}
            </Badge>
            <span className="text-xs text-muted-foreground ml-2">
              {subtitle}
            </span>
          </div>
        )}
        {trend && (
          <p className="text-xs text-muted-foreground mt-0.5">{trend}</p>
        )}
      </CardContent>
    </Card>
  );
};

// Core Stats Section
const CoreStats = ({ data, loading, mobile }) => {
  return (
    <div
      className={`grid gap-4 lg:grid-cols-4 ${
        mobile ? "grid-cols-1" : "grid-cols-2"
      }`}
    >
      <StatCard
        title="Total Revenue"
        value={`$${(data.totalRevenue / 1000).toFixed(1)}K`}
        s
        change={
          data.revenueChange > 0
            ? `+${data.revenueChange.toFixed(1)}%`
            : `${data.revenueChange.toFixed(1)}%`
        }
        subtitle="from last month"
        trend={
          data.revenueChange > 0 ? "Trending up this month" : "Needs attention"
        }
        icon={IndianRupee}
        loading={loading}
      />
      <StatCard
        title="New Customers"
        value={data.newCustomers.toLocaleString()}
        change={
          data.customerChange > 0
            ? `+${data.customerChange.toFixed(1)}%`
            : `${data.customerChange.toFixed(1)}%`
        }
        subtitle="this period"
        trend={
          data.customerChange > 0
            ? "Strong acquisition"
            : "Acquisition needs attention"
        }
        icon={Users}
        loading={loading}
      />
      <StatCard
        title="Active Accounts"
        value={data.activeAccounts.toLocaleString()}
        change={
          data.accountChange > 0
            ? `+${data.accountChange.toFixed(1)}%`
            : `${data.accountChange.toFixed(1)}%`
        }
        subtitle="from last month"
        trend={
          data.accountChange > 0
            ? "Strong user retention"
            : "Retention needs attention"
        }
        icon={BarChart2}
        loading={loading}
      />
      <StatCard
        title="Growth Rate"
        value={`${data.growthRate.toFixed(1)}%`}
        change={
          data.growthChange > 0
            ? `+${data.growthChange.toFixed(1)}%`
            : `${data.growthChange.toFixed(1)}%`
        }
        subtitle="from last month"
        trend={
          data.growthChange > 0
            ? "Steady performance increase"
            : "Performance declining"
        }
        icon={ChartSplineIcon}
        loading={loading}
      />
    </div>
  );
};

// Visitor Stats Section
const VisitorStats = ({ data, loading }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 grid-cols-1 lg:grid-cols-7 mt-4">
      <Card className="col-span-4 p-2.5 gap-1.5">
        <CardHeader className="flex flex-row items-center justify-between px-2">
          <div>
            <CardTitle>Total Visitors</CardTitle>
            <CardDescription>
              Real-time tracking for the last 3 months
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              Live
            </Badge>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          {loading ? (
            <div className="h-[300px] bg-muted rounded animate-pulse"></div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.visitorData}>
                <defs>
                  <linearGradient
                    id="colorVisitors"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stop="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stop="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="#3b82f6"
                  fill="url(#colorVisitors)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card className="col-span-3 gap-0">
        <CardHeader className="px-2">
          <CardTitle>Traffic Overview</CardTitle>
          <CardDescription>Real-time performance metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 px-2">
          {loading ? (
            <>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-10 bg-muted rounded animate-pulse"
                  ></div>
                ))}
              </div>
              <div className="pt-4 border-t space-y-3">
                <div className="h-5 bg-muted rounded animate-pulse w-1/3"></div>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-8 bg-muted rounded animate-pulse"
                  ></div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">Last 3 months</p>
                  </div>
                  <div className="font-semibold">
                    {data.totalVisitors.toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">Last 30 days</p>
                  </div>
                  <div className="font-semibold">
                    {data.monthVisitors.toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">Last 7 days</p>
                  </div>
                  <div className="font-semibold">
                    {data.weekVisitors.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-3">Traffic Sources</h3>
                <div className="space-y-3">
                  {data.trafficSources.map((source, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: source.color }}
                        ></div>
                        <p className="text-sm">{source.name}</p>
                      </div>
                      <p className="text-sm font-medium">
                        {source.value.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Revenue Section
const RevenueInsights = ({ data, loading }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handlePropertyClick = (property) => {
    setSelectedProperty(property === selectedProperty ? null : property);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 grid-cols-1 lg:grid-cols-7 mt-4">
      <Card className="col-span-3 gap-0">
        <CardHeader className="flex flex-row items-center justify-between px-2">
          <div>
            <CardTitle>Revenue by Property Type</CardTitle>
            <CardDescription>
              Distribution of revenue across categories
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        </CardHeader>
        <CardContent className="px-2">
          {loading ? (
            <div className="h-[250px] bg-muted rounded animate-pulse"></div>
          ) : (
            <>
              <div className="flex justify-center items-center mb-4">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={data.revenueData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} (${(percent * 100).toFixed(0)}%)`
                      }
                    >
                      {data.revenueData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke={
                            selectedProperty === entry.name ? "#000" : "#fff"
                          }
                          strokeWidth={selectedProperty === entry.name ? 2 : 1}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}K`, "Revenue"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {data.revenueData.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 p-1 rounded cursor-pointer ${
                      selectedProperty === item.name ? "bg-muted" : ""
                    }`}
                    onClick={() => handlePropertyClick(item.name)}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs">{item.name}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="col-span-4 space-y-3 gap-0">
        <CardHeader className="flex flex-row items-center justify-between px-2">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Latest property sales and commissions
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter className="h-3.5 w-3.5" />
              Filter
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="px-2">
          {loading ? (
            <div className="space-y-3">
              <div className="h-10 bg-muted rounded animate-pulse"></div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-16 bg-muted rounded animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto rounded border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">
                      Property & Client
                    </TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.recentTransactions.map((transaction) => {
                    const IconComponent = transaction.icon;
                    return (
                      <TableRow
                        key={transaction.id}
                        className="cursor-pointer"
                        onClick={() =>
                          alert(`View details for ${transaction.property}`)
                        }
                      >
                        <TableCell className="font-medium">
                          <div>{transaction.property}</div>
                          <div className="text-muted-foreground text-xs">
                            {transaction.client}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1 w-fit"
                          >
                            <IconComponent className="h-3 w-3" />
                            {transaction.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {transaction.amount}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>

        <CardFooter>
          <Button variant="outline" className="w-full" size="sm" asChild>
            <Link href="/admin/leads">
              View All Transactions
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// Search Bar Component
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-sm">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <input
        type="search"
        placeholder="Search properties, clients..."
        className="w-full rounded border border-input bg-background pl-8 pr-4 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
};

// Main Dashboard Page
export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("3m");
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMediaQuery("(max-width:500px)");
  // Initial data structure
  const initialData = {
    totalRevenue: 45231.89,
    revenueChange: 20.1,
    newCustomers: 1234,
    customerChange: -20,
    activeAccounts: 45678,
    accountChange: 12.5,
    growthRate: 4.5,
    growthChange: 0.5,
    visitorData: [
      { date: "Apr 2", visitors: 400 },
      { date: "Apr 8", visitors: 300 },
      { date: "Apr 14", visitors: 200 },
      { date: "Apr 21", visitors: 278 },
      { date: "Apr 28", visitors: 189 },
      { date: "May 5", visitors: 239 },
      { date: "May 12", visitors: 349 },
      { date: "May 19", visitors: 430 },
      { date: "May 26", visitors: 320 },
      { date: "Jun 2", visitors: 380 },
      { date: "Jun 8", visitors: 435 },
      { date: "Jun 15", visitors: 520 },
      { date: "Jun 22", visitors: 600 },
      { date: "Jun 30", visitors: 750 },
    ],
    totalVisitors: 45678,
    monthVisitors: 15234,
    weekVisitors: 3567,
    trafficSources: [
      { name: "Organic Search", value: 12456, color: "#3b82f6" },
      { name: "Direct", value: 8342, color: "#10b981" },
      { name: "Social Media", value: 5673, color: "#f59e0b" },
      { name: "Email", value: 4231, color: "#ef4444" },
      { name: "Referral", value: 2987, color: "#8b5cf6" },
    ],
    revenueData: [
      { name: "Residential", value: 35, color: "#3b82f6" },
      { name: "Commercial", value: 25, color: "#10b981" },
      { name: "Luxury", value: 15, color: "#f59e0b" },
      { name: "Vacation", value: 12, color: "#ef4444" },
      { name: "Land", value: 8, color: "#8b5cf6" },
      { name: "Other", value: 5, color: "#6366f1" },
    ],
    recentTransactions: [
      {
        id: 1,
        property: "Luxury Villa",
        client: "John Smith",
        date: "2023-10-15",
        amount: "$250,000",
        type: "Luxury",
        icon: Crown,
      },
      {
        id: 2,
        property: "Downtown Apartment",
        client: "Emma Johnson",
        date: "2023-10-14",
        amount: "$185,000",
        type: "Commercial",
        icon: Building,
      },
      {
        id: 3,
        property: "Beach House",
        client: "Michael Brown",
        date: "2023-10-14",
        amount: "$320,000",
        type: "Vacation",
        icon: MapPin,
      },
      {
        id: 4,
        property: "Mountain Cabin",
        client: "Sarah Davis",
        date: "2023-10-13",
        amount: "$145,000",
        type: "Residential",
        icon: Home,
      },
      {
        id: 5,
        property: "Suburban Home",
        client: "David Wilson",
        date: "2023-10-12",
        amount: "$275,000",
        type: "Residential",
        icon: Home,
      },
    ],
    avgCommission: 12500,
    commissionChange: 8.2,
    marketData: [
      { month: "Jan", value: 400 },
      { month: "Feb", value: 300 },
      { month: "Mar", value: 600 },
      { month: "Apr", value: 800 },
      { month: "May", value: 500 },
      { month: "Jun", value: 900 },
      { month: "Jul", value: 750 },
    ],
  };

  // Simulate real-time data updates
  const realtimeData = useRealtimeData(initialData, 8000);

  // Simulate loading state when time range changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeRange]);

  return (
    <div className="flex-1 space-y-4 min-h-full w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between p-4 pb-0 gap-2 w-full">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
            Dashboard
          </h2>
          <p className="text-muted-foreground text-sm">
            Overview of your real estate business performance
          </p>
        </div>
        <div className="flex items-center gap-2 w-full md:justify-end">
          <SearchBar />
          <Button variant="outline" size="sm" className="h-9 gap-1" asChild>
            <Link href="/admin/properties/new">
              <Plus className="h-3.5 w-3.5" />
              Add Property
            </Link>
          </Button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between sticky z-20 top-12 bg-background px-4 pb-4">
          <Button variant="primary" size="sm">
            Overview
          </Button>

          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="3m">Last 3 months</SelectItem>
                <SelectItem value="6m">Last 6 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="p-4 pt-0 space-y-4">
          <CoreStats
            data={realtimeData}
            loading={isLoading}
            mobile={isMobile}
          />
          <VisitorStats data={realtimeData} loading={isLoading} />
          <RevenueInsights data={realtimeData} loading={isLoading} />
        </div>
      </div>
    </div>
  );
}
