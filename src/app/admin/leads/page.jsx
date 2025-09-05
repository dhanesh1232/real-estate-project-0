// app/leads/page.js
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Filter,
  Search,
  MoreHorizontal,
  Phone,
  Mail,
  Calendar,
  User,
  Home,
  MapPin,
  Clock,
  Eye,
  MessageSquare,
  Download,
  Plus,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Sample lead data
const initialLeads = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 123-4567",
    property: "Luxury Villa in Beverly Hills",
    message:
      "Interested in scheduling a viewing for the luxury villa. Please contact me with available times.",
    status: "new",
    source: "Website Contact Form",
    date: "2023-10-15T14:30:00",
    followUpDate: "2023-10-17",
    budget: "$1.2M - $1.5M",
    timeline: "Within 3 months",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "(555) 987-6543",
    property: "Downtown Apartment",
    message:
      "Looking for a 2-bedroom apartment in downtown. Prefer high floor with city views.",
    status: "contacted",
    source: "Website Contact Form",
    date: "2023-10-14T10:15:00",
    followUpDate: "2023-10-16",
    budget: "$800K - $950K",
    timeline: "1-2 months",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    email: "emma.r@example.com",
    phone: "(555) 456-7890",
    property: "Beach House Malibu",
    message:
      "Interested in beach properties. Would like information about financing options.",
    status: "qualified",
    source: "Website Contact Form",
    date: "2023-10-13T16:45:00",
    followUpDate: "2023-10-15",
    budget: "$2M - $2.8M",
    timeline: "Flexible",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@example.com",
    phone: "(555) 234-5678",
    property: "Mountain Cabin",
    message:
      "Looking for a vacation home in the mountains. Prefer properties with land.",
    status: "new",
    source: "Website Contact Form",
    date: "2023-10-12T09:20:00",
    followUpDate: "2023-10-14",
    budget: "$600K - $750K",
    timeline: "Within 6 months",
  },
  {
    id: 5,
    name: "Jennifer Kim",
    email: "jennifer.k@example.com",
    phone: "(555) 876-5432",
    property: "Suburban Family Home",
    message:
      "Relocating to area with family. Need 4+ bedrooms, good school district.",
    status: "contacted",
    source: "Website Contact Form",
    date: "2023-10-11T13:10:00",
    followUpDate: "2023-10-13",
    budget: "$1M - $1.3M",
    timeline: "2-3 months",
  },
  {
    id: 6,
    name: "Robert Williams",
    email: "robert.w@example.com",
    phone: "(555) 345-6789",
    property: "Commercial Space Downtown",
    message:
      "Looking for retail space in high-traffic areas. Minimum 2000 sq ft.",
    status: "converted",
    source: "Website Contact Form",
    date: "2023-10-10T11:05:00",
    followUpDate: "Completed",
    budget: "$1.5M - $2.2M",
    timeline: "ASAP",
  },
  {
    id: 7,
    name: "Lisa Thompson",
    email: "lisa.t@example.com",
    phone: "(555) 765-4321",
    property: "Luxury Condo",
    message:
      "Interested in luxury buildings with amenities. Prefer newer construction.",
    status: "new",
    source: "Website Contact Form",
    date: "2023-10-09T15:40:00",
    followUpDate: "2023-10-11",
    budget: "$1.8M - $2.5M",
    timeline: "3-4 months",
  },
  {
    id: 8,
    name: "James Anderson",
    email: "james.a@example.com",
    phone: "(555) 543-2109",
    property: "Investment Property",
    message: "Looking for multi-family properties with good ROI potential.",
    status: "qualified",
    source: "Website Contact Form",
    date: "2023-10-08T12:25:00",
    followUpDate: "2023-10-10",
    budget: "$1.2M - $1.8M",
    timeline: "Within 6 months",
  },
];

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "new", label: "New", color: "bg-blue-500" },
  { value: "contacted", label: "Contacted", color: "bg-yellow-500" },
  { value: "qualified", label: "Qualified", color: "bg-purple-500" },
  { value: "converted", label: "Converted", color: "bg-green-500" },
];

const LeadStatusBadge = ({ status }) => {
  const getStatusInfo = (status) => {
    switch (status) {
      case "new":
        return { label: "New", color: "bg-blue-500" };
      case "contacted":
        return { label: "Contacted", color: "bg-yellow-500" };
      case "qualified":
        return { label: "Qualified", color: "bg-purple-500" };
      case "converted":
        return { label: "Converted", color: "bg-green-500" };
      default:
        return { label: "New", color: "bg-gray-500" };
    }
  };

  const statusInfo = getStatusInfo(status);

  return (
    <Badge className={`${statusInfo.color} text-white`}>
      {statusInfo.label}
    </Badge>
  );
};

const LeadRow = ({ lead, onViewDetails }) => {
  const [expanded, setExpanded] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <>
      <TableRow
        className="cursor-pointer hover:bg-muted/30"
        onClick={() => setExpanded(!expanded)}
      >
        <TableCell>
          <div className="flex items-center gap-2">
            <button onClick={() => setExpanded(!expanded)}>
              <ChevronDown
                className={`h-4 w-4 transition ease-in-out duration-300 ${
                  expanded ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-medium">{lead.name}</div>
                <div className="text-sm text-muted-foreground">
                  {lead.email}
                </div>
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <div className="font-medium">{lead.property}</div>
        </TableCell>
        <TableCell>
          <div className="text-sm">{lead.budget}</div>
        </TableCell>
        <TableCell>
          <LeadStatusBadge status={lead.status} />
        </TableCell>
        <TableCell>
          <div className="text-sm">{formatDateTime(lead.date)}</div>
        </TableCell>
        <TableCell>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Mail className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(lead);
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
      {expanded && (
        <TableRow>
          <TableCell colSpan={6} className="bg-muted/20 p-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Contact Information</div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{lead.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{lead.email}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Property Details</div>
                <div className="flex items-center gap-2 text-sm">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <span>{lead.property}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Via Website Form</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Timeline & Budget</div>
                <div className="text-sm">
                  <span className="font-medium">Budget:</span> {lead.budget}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Timeline:</span> {lead.timeline}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Follow-up</div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Follow up by: {lead.followUpDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Received: {formatDateTime(lead.date)}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="text-sm font-medium mb-2">Message</div>
              <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">
                "{lead.message}"
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button size="sm" className="gap-1">
                <Phone className="h-4 w-4" />
                Call Lead
              </Button>
              <Button size="sm" variant="outline" className="gap-1">
                <Mail className="h-4 w-4" />
                Send Email
              </Button>
              <Button size="sm" variant="outline" className="gap-1">
                <Calendar className="h-4 w-4" />
                Schedule Viewing
              </Button>
              <Button size="sm" variant="outline" className="gap-1">
                <MessageSquare className="h-4 w-4" />
                Add Note
              </Button>
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

const LeadDetailsModal = ({ lead, open, onClose }) => {
  if (!open) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl max-h-full overflow-y-auto">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle>Lead Details</CardTitle>
            <CardDescription>Contact from website form</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <span className="text-2xl">×</span>
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">{lead.name}</div>
              <div className="text-muted-foreground">{lead.email}</div>
            </div>
            <div className="ml-auto">
              <LeadStatusBadge status={lead.status} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="font-medium">Contact Information</div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{lead.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{lead.email}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-medium">Property Interest</div>
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-muted-foreground" />
                <span>{lead.property}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Via Website Form</span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="font-medium">Budget & Timeline</div>
              <div>
                <span className="font-medium">Budget:</span> {lead.budget}
              </div>
              <div>
                <span className="font-medium">Timeline:</span> {lead.timeline}
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-medium">Dates</div>
              <div>
                <span className="font-medium">Received:</span>{" "}
                {formatDate(lead.date)}
              </div>
              <div>
                <span className="font-medium">Follow-up by:</span>{" "}
                {lead.followUpDate}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-medium">Message</div>
            <div className="bg-muted/30 p-4 rounded-md">"{lead.message}"</div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button className="gap-1">
              <Phone className="h-4 w-4" />
              Call Lead
            </Button>
            <Button variant="outline" className="gap-1">
              <Mail className="h-4 w-4" />
              Send Email
            </Button>
            <Button variant="outline" className="gap-1">
              <Calendar className="h-4 w-4" />
              Schedule Viewing
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function LeadsPage() {
  const [leads, setLeads] = useState(initialLeads);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus =
      statusFilter === "all" || lead.status === statusFilter;
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.property.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const handleViewDetails = (lead) => {
    setSelectedLead(lead);
    setDetailModalOpen(true);
  };

  const updateLeadStatus = (leadId, newStatus) => {
    setLeads(
      leads.map((lead) =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      )
    );
  };

  const stats = {
    total: leads.length,
    new: leads.filter((lead) => lead.status === "new").length,
    contacted: leads.filter((lead) => lead.status === "contacted").length,
    qualified: leads.filter((lead) => lead.status === "qualified").length,
    converted: leads.filter((lead) => lead.status === "converted").length,
  };

  return (
    <div className="flex-1 space-y-4 p-2 md:p-4 pt-0 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Leads Management
          </h2>
          <p className="text-muted-foreground">
            Manage and follow up with leads from website forms
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-1">
            <Plus className="h-4 w-4" />
            Add Lead
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
        <Card className="gap-0 lg:p-4 p-2 lg:gap-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">From website forms</p>
          </CardContent>
        </Card>
        <Card className="gap-0 lg:p-4 p-2 lg:gap-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">New Leads</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.new}</div>
            <p className="text-xs text-muted-foreground">Need contact</p>
          </CardContent>
        </Card>
        <Card className="gap-0 lg:p-4 p-2 lg:gap-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Qualified</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.qualified}</div>
            <p className="text-xs text-muted-foreground">Ready to view</p>
          </CardContent>
        </Card>
        <Card className="gap-0 lg:p-4 p-2 lg:gap-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Converted</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.converted}</div>
            <p className="text-xs text-muted-foreground">Successful deals</p>
          </CardContent>
        </Card>
      </div>

      <Card className="p-2 gap-0">
        <CardHeader className="px-0 p-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Website Form Leads</CardTitle>
              <CardDescription>
                All leads who contacted via website contact forms
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search leads..."
                  className="w-full rounded border border-input bg-background pl-8 pr-4 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-hidden px-1.5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Property Interest</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Received</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <LeadRow
                    key={lead.id}
                    lead={lead}
                    onViewDetails={handleViewDetails}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No leads found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <LeadDetailsModal
        lead={selectedLead}
        open={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
      />
    </div>
  );
}
