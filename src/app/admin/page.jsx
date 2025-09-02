// app/dashboard/page.js
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { BarChart2, ChartSplineIcon, DollarSign, Users } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Stat Card Component
const StatCard = ({ title, value, change, subtitle, trend, icon: Icon }) => {
  const isPositive = change && change.startsWith("+");

  return (
    <Card className="gap-0 p-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p
            className={`text-xs ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {change} {subtitle}
          </p>
        )}
        {trend && <p className="text-xs text-muted-foreground mt-1">{trend}</p>}
      </CardContent>
    </Card>
  );
};

// Core Stats Section
const CoreStats = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Revenue"
        value="$45,231.89"
        change="+20.1%"
        subtitle="from last month"
        trend="Trending up this month"
        icon={DollarSign}
      />
      <StatCard
        title="New Customers"
        value="1,234"
        change="-20%"
        subtitle="this period"
        trend="Acquisition needs attention"
        icon={Users}
      />
      <StatCard
        title="Active Accounts"
        value="45,678"
        change="+12.5%"
        subtitle="from last month"
        trend="Strong user retention"
        icon={BarChart2}
      />
      <StatCard
        title="Growth Rate"
        value="4.5%"
        change="+0.5%"
        subtitle="from last month"
        trend="Steady performance increase"
        icon={ChartSplineIcon}
      />
    </div>
  );
};

// Visitor Stats Section
const VisitorStats = () => {
  // Mock data for visitor stats
  const visitorData = [
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
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
      <Card className="col-span-4 gap-0 p-4">
        <CardHeader>
          <CardTitle>Total Visitors</CardTitle>
          <CardDescription>Total for the last 3 months</CardDescription>
        </CardHeader>
        <CardContent className="pl-2 px-0">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#3b82f6"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-3 gap-0 p-4">
        <CardHeader className="px-0">
          <CardTitle>Traffic Overview</CardTitle>
          <CardDescription>Last 3 months performance</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium leading-none">
                  Last 3 months
                </p>
              </div>
              <div className="font-medium">45,678</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium leading-none">Last 30 days</p>
              </div>
              <div className="font-medium">15,234</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium leading-none">Last 7 days</p>
              </div>
              <div className="font-medium">3,567</div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Mobile</p>
                <p className="text-sm font-medium">15,359</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Desktop</p>
                <p className="text-sm font-medium">12,327</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">Top Traffic Sources</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm">Organic Search</p>
                  <p className="text-sm font-medium">12,456</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Direct</p>
                  <p className="text-sm font-medium">8,342</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Social Media</p>
                  <p className="text-sm font-medium">5,673</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Email</p>
                  <p className="text-sm font-medium">4,231</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Revenue Section
const RevenueInsights = () => {
  // Mock data for revenue by category
  const revenueData = [
    { name: "Residential", value: 35 },
    { name: "Commercial", value: 25 },
    { name: "Luxury", value: 15 },
    { name: "Vacation", value: 12 },
    { name: "Land", value: 8 },
    { name: "Other", value: 5 },
  ];

  const COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#6366f1",
  ];

  // Mock data for recent transactions
  const recentTransactions = [
    {
      id: 1,
      property: "Luxury Villa",
      client: "John Smith",
      date: "2023-10-15",
      amount: "$250,000",
    },
    {
      id: 2,
      property: "Downtown Apartment",
      client: "Emma Johnson",
      date: "2023-10-14",
      amount: "$185,000",
    },
    {
      id: 3,
      property: "Beach House",
      client: "Michael Brown",
      date: "2023-10-14",
      amount: "$320,000",
    },
    {
      id: 4,
      property: "Mountain Cabin",
      client: "Sarah Davis",
      date: "2023-10-13",
      amount: "$145,000",
    },
    {
      id: 5,
      property: "Suburban Home",
      client: "David Wilson",
      date: "2023-10-12",
      amount: "$275,000",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
      <Card className="col-span-3 gap-0 p-4">
        <CardHeader>
          <CardTitle>Revenue by Property Type</CardTitle>
          <CardDescription>
            Distribution of revenue across categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={revenueData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {revenueData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value}K`, "Revenue"]} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-4 gap-0 p-4">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Latest property sales and commissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <div className="grid grid-cols-4 p-3 bg-muted/50 font-medium">
              <div>Property</div>
              <div>Client</div>
              <div>Date</div>
              <div className="text-right">Amount</div>
            </div>
            <div className="divide-y">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="grid grid-cols-4 p-3 text-sm"
                >
                  <div className="font-medium">{transaction.property}</div>
                  <div>{transaction.client}</div>
                  <div>{transaction.date}</div>
                  <div className="text-right font-medium">
                    {transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <Card className="gap-0 p-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg. Commission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,500</div>
                <p className="text-xs text-green-600">+8.2% from last month</p>
              </CardContent>
            </Card>

            <Card className="gap-0 p-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Conversion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8%</div>
                <p className="text-xs text-green-600">+1.2% from last month</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Main Dashboard Page
export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Real Estate Dashboard
        </h2>
        <div className="hidden md:flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">
            Last updated: Today, 10:30 AM
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <CoreStats />
        <VisitorStats />
        <RevenueInsights />
      </div>
    </div>
  );
}
