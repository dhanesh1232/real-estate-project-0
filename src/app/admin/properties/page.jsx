"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Calendar,
  Search,
  Building2,
  RefreshCcw,
  ChevronDown,
  ChevronUp,
  List,
  Download,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCallback, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Loader } from "@/components/Layout/loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { FiGrid } from "react-icons/fi";
import { formatPrice } from "@/components/admin/pages/properties/helper/helper";

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("updatedAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [viewMode, setViewMode] = useState("grid");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [selectedProperties, setSelectedProperties] = useState(new Set());
  const [isBulkAction, setIsBulkAction] = useState(false);

  const fetchProperties = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/properties");
      const data = await res.json();
      setProperties(data.data || []);
      setFilteredProperties(data.data || []);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  useEffect(() => {
    let result = properties;

    // Apply search filter
    if (debouncedSearchTerm) {
      const term = debouncedSearchTerm.toLowerCase();
      result = result.filter(
        (property) =>
          property.title?.toLowerCase().includes(term) ||
          property.description?.toLowerCase().includes(term) ||
          (property.location?.address &&
            property.location.address.toLowerCase().includes(term)) ||
          (property.location?.city &&
            property.location.city.toLowerCase().includes(term))
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(
        (property) => property.propertyStatus === statusFilter
      );
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter(
        (property) => property.category === categoryFilter
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let aValue = a[sortBy] || 0;
      let bValue = b[sortBy] || 0;

      if (sortBy === "price") {
        aValue = aValue || 0;
        bValue = bValue || 0;
      } else if (sortBy === "title") {
        aValue = aValue || "";
        bValue = bValue || "";
      } else if (sortBy.includes("date") || sortBy === "updatedAt") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredProperties(result);
  }, [
    debouncedSearchTerm,
    statusFilter,
    categoryFilter,
    properties,
    sortBy,
    sortOrder,
  ]);

  const formatArea = (property) => {
    if (property.sqft) return `${property.sqft.toLocaleString()} sq.ft.`;
    if (property.acres) return `${property.acres} acres`;
    if (property.ankanam) return `${property.ankanam} ankanam`;
    return "N/A";
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "For Sale":
        return "default";
      case "For Rent":
        return "secondary";
      case "Sold":
        return "outline";
      case "Rented":
        return "destructive";
      default:
        return "default";
    }
  };

  const getCategoryLabel = (category) => {
    const categoryMap = {
      apartment: "Apartment",
      house: "House",
      plot: "Plot",
      land: "Land",
      villa: "Villa",
      commercial: "Commercial",
    };
    return categoryMap[category] || category;
  };

  const calculateTotalValue = () => {
    return properties
      .filter(
        (prop) =>
          prop.propertyStatus === "For Sale" ||
          prop.propertyStatus === "For Rent"
      )
      .reduce((total, prop) => total + (prop.price || 0), 0);
  };

  const getLocationString = (location) => {
    if (!location) return "Location not specified";
    return `${location.address}, ${location.city}, ${location.state}`;
  };

  const handleDeleteProperty = async (propertyId) => {
    try {
      const res = await fetch(`/api/properties/${propertyId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProperties(properties.filter((p) => p._id !== propertyId));
        setDeleteDialogOpen(false);
        setPropertyToDelete(null);
      } else {
        console.error("Failed to delete property");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  const togglePropertySelection = (propertyId) => {
    const newSelection = new Set(selectedProperties);
    if (newSelection.has(propertyId)) {
      newSelection.delete(propertyId);
    } else {
      newSelection.add(propertyId);
    }
    setSelectedProperties(newSelection);
  };

  const toggleAllPropertiesSelection = () => {
    if (selectedProperties.size === filteredProperties.length) {
      setSelectedProperties(new Set());
    } else {
      setSelectedProperties(
        new Set(filteredProperties.map((p) => p._id || p.id))
      );
    }
  };

  const handleBulkDelete = async () => {
    try {
      const res = await fetch("/api/properties/bulk", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: Array.from(selectedProperties) }),
      });

      if (res.ok) {
        setProperties(
          properties.filter((p) => !selectedProperties.has(p._id || p.id))
        );
        setSelectedProperties(new Set());
        setIsBulkAction(false);
      } else {
        console.error("Failed to delete properties");
      }
    } catch (error) {
      console.error("Error deleting properties:", error);
    }
  };

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const PropertyCardSkeleton = () => (
    <Card className="overflow-hidden pb-4 gap-0 h-full flex flex-col">
      <Skeleton className="aspect-video w-full" />
      <CardHeader className="p-4 gap-1">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full" />
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-2">
        <Skeleton className="h-6 w-1/2 mb-4" />
        <div className="grid grid-cols-3 gap-2 mb-4">
          <Skeleton className="h-12 rounded" />
          <Skeleton className="h-12 rounded" />
          <Skeleton className="h-12 rounded" />
        </div>
        <div className="flex justify-between gap-2 mt-auto">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 w-9" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-full">
      {/* Header Block */}
      <div className="flex p-4 z-20 flex-col sticky bg-white top-12 sm:flex-row justify-between items-start md:items-center gap-4 border-b">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Properties Management
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Manage and control your real estate property listings
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
          <Button className="flex items-center gap-2" asChild>
            <Link href="/admin/properties/new">
              <PlusCircle className="h-4 w-4" />
              <span>Add New Property</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={fetchProperties}
          >
            <RefreshCcw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export as Excel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {isLoading ? (
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Stats Overview */}
          <Tabs defaultValue="overview" className="p-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mt-4">
                <Card className="py-4 gap-0">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Properties
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {properties.length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {
                        properties.filter((p) => p.visual === "published")
                          .length
                      }{" "}
                      published
                    </p>
                  </CardContent>
                </Card>
                <Card className="py-4 gap-0">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Listings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {
                        properties.filter(
                          (p) =>
                            p.propertyStatus === "For Sale" ||
                            p.propertyStatus === "For Rent"
                        ).length
                      }
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {
                        properties.filter(
                          (p) => p.propertyStatus === "For Sale"
                        ).length
                      }{" "}
                      for sale
                    </p>
                  </CardContent>
                </Card>
                <Card className="py-4 gap-0">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Value
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatPrice(calculateTotalValue())}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {
                        properties.filter((p) => p.propertyStatus === "Sold")
                          .length
                      }{" "}
                      sold properties
                    </p>
                  </CardContent>
                </Card>
                <Card className="py-4 gap-0">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Average Views
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {properties.length
                        ? Math.round(
                            properties.reduce(
                              (sum, p) => sum + (p.views || 0),
                              0
                            ) / properties.length
                          )
                        : 0}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Total views:{" "}
                      {properties.reduce((sum, p) => sum + (p.views || 0), 0)}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="analytics">
              <div className="mt-4 p-4 border rounded">
                <h3 className="text-lg font-medium mb-4">Property Analytics</h3>
                <p className="text-muted-foreground">
                  Analytics features coming soon...
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Filters and Controls */}
          <div className="p-4 bg-muted/30 border-b">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search properties..."
                    className="pl-8 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="For Sale">For Sale</SelectItem>
                      <SelectItem value="For Rent">For Rent</SelectItem>
                      <SelectItem value="Sold">Sold</SelectItem>
                      <SelectItem value="Rented">Rented</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="plot">Plot</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                      setCategoryFilter("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full lg:w-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      Sort: {sortBy === "updatedAt" ? "Recent" : sortBy}
                      {sortOrder === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => handleSortChange("updatedAt")}
                    >
                      Recent
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSortChange("price")}>
                      Price
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSortChange("title")}>
                      Title
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleSortChange("createdAt")}
                    >
                      Date Added
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex border rounded">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    className="h-9 w-9 rounded-r-none"
                    onClick={() => setViewMode("grid")}
                  >
                    <FiGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    className="h-9 w-9 rounded-l-none"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {selectedProperties.size > 0 && (
              <div className="flex items-center justify-between mt-4 p-3 bg-primary/10 rounded">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={
                      selectedProperties.size === filteredProperties.length
                    }
                    onChange={toggleAllPropertiesSelection}
                    className="h-4 w-4 rounded"
                  />
                  <span className="text-sm font-medium">
                    {selectedProperties.size} property(s) selected
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsBulkAction(!isBulkAction)}
                  >
                    {isBulkAction ? "Cancel" : "Bulk Actions"}
                  </Button>
                  {isBulkAction && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          Delete Selected
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete{" "}
                            {selectedProperties.size} properties. This action
                            cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleBulkDelete}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Properties Grid/List */}
          <div className="p-4">
            {filteredProperties.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  No properties found
                </h3>
                <p className="text-muted-foreground mb-6">
                  {properties.length === 0
                    ? "Get started by adding your first property"
                    : "Try adjusting your search or filter criteria"}
                </p>
                {properties.length === 0 && (
                  <Button asChild>
                    <Link href="/admin/properties/new">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add New Property
                    </Link>
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div className="text-sm text-muted-foreground mb-4">
                  Showing {filteredProperties.length} of {properties.length}{" "}
                  properties
                </div>

                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filteredProperties.map((property) => (
                      <Card
                        key={property._id || property.id}
                        className={cn(
                          "overflow-hidden pb-4 gap-0 hover:shadow-lg transition-shadow h-full flex flex-col",
                          selectedProperties.has(property._id || property.id) &&
                            "ring-2 ring-primary"
                        )}
                      >
                        <div className="aspect-video relative overflow-hidden group">
                          {property.featuredImage?.mime?.startsWith("video") ? (
                            <Image
                              src={
                                property.mediaFiles?.[0]?.url ||
                                "/placeholder-property.jpg"
                              }
                              alt={property.title}
                              width={400}
                              height={300}
                              className="object-cover w-full h-full transition-transform group-hover:scale-105"
                            />
                          ) : (
                            <Image
                              src={
                                property.featuredImage?.url ||
                                "/placeholder-property.jpg"
                              }
                              alt={property.title}
                              width={400}
                              height={300}
                              className="object-cover w-full h-full transition-transform group-hover:scale-105"
                            />
                          )}
                          <div className="absolute top-2 right-2 flex flex-col items-end gap-2">
                            <Badge
                              variant={getStatusVariant(
                                property.propertyStatus
                              )}
                            >
                              {property.propertyStatus}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-background/80 backdrop-blur"
                            >
                              {getCategoryLabel(property.category)}
                            </Badge>
                          </div>
                          {property.visual === "draft" && (
                            <div className="absolute top-2 left-2">
                              <Badge variant="secondary">Draft</Badge>
                            </div>
                          )}
                          <div className="absolute top-2 left-2">
                            <input
                              type="checkbox"
                              checked={selectedProperties.has(
                                property._id || property.id
                              )}
                              onChange={() =>
                                togglePropertySelection(
                                  property._id || property.id
                                )
                              }
                              className="h-4 w-4 rounded bg-white"
                            />
                          </div>
                        </div>
                        <CardHeader className="p-4 gap-1">
                          <h2 className="text-lg font-semibold flex-wrap md:text-xl line-clamp-1">
                            {property.title}
                          </h2>
                          <p className="flex items-center mt-1">
                            <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0 text-gray-500" />
                            <span className="text-gray-500">
                              {getLocationString(property.location)}
                            </span>
                          </p>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col p-2">
                          <div className="flex justify-between items-center mb-3">
                            <div className="text-xl md:text-2xl font-bold text-primary">
                              {formatPrice(property.price)}
                              {property.propertyStatus === "For Rent" && (
                                <span className="text-sm font-normal">/mo</span>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                              {new Date(
                                property.updatedAt
                              ).toLocaleDateString()}
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                            <div className="p-2 bg-muted rounded">
                              <div className="font-semibold">
                                {property.bedrooms || 0}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Beds
                              </div>
                            </div>
                            <div className="p-2 bg-muted rounded">
                              <div className="font-semibold">
                                {property.bathrooms || 0}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Baths
                              </div>
                            </div>
                            <div className="p-2 bg-muted rounded">
                              <div className="font-semibold">
                                {formatArea(property)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Area
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between gap-2 mt-auto">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              asChild
                            >
                              <Link
                                href={`/properties/${
                                  property.seoMeta?.slug || property._id
                                }`}
                                target="_blank"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                <span className="hidden sm:inline">View</span>
                              </Link>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              asChild
                            >
                              <Link
                                href={`/admin/properties/${
                                  property._id || property.id
                                }`}
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                <span className="hidden sm:inline">Edit</span>
                              </Link>
                            </Button>
                            <AlertDialog
                              open={
                                deleteDialogOpen &&
                                propertyToDelete === property._id
                              }
                              onOpenChange={setDeleteDialogOpen}
                            >
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() =>
                                    setPropertyToDelete(property._id)
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete "
                                    {property.title}". This action cannot be
                                    undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleDeleteProperty(property._id)
                                    }
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredProperties.map((property) => (
                      <Card
                        key={property._id || property.id}
                        className={cn(
                          "p-4",
                          selectedProperties.has(property._id || property.id) &&
                            "ring-2 ring-primary"
                        )}
                      >
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="relative w-full md:w-48 h-36 rounded overflow-hidden">
                            {property.featuredImage?.mime?.startsWith(
                              "video"
                            ) ? (
                              <Image
                                src={
                                  property.mediaFiles?.[0]?.url ||
                                  "/placeholder-property.jpg"
                                }
                                alt={property.title}
                                width={400}
                                height={300}
                                className="object-cover w-full h-full transition-transform group-hover:scale-105"
                              />
                            ) : (
                              <Image
                                src={
                                  property.featuredImage?.url ||
                                  "/placeholder-property.jpg"
                                }
                                alt={property.title}
                                fill
                                className="object-cover"
                              />
                            )}
                            <div className="absolute top-2 left-2">
                              <input
                                type="checkbox"
                                checked={selectedProperties.has(
                                  property._id || property.id
                                )}
                                onChange={() =>
                                  togglePropertySelection(
                                    property._id || property.id
                                  )
                                }
                                className="h-4 w-4 rounded bg-white"
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-3">
                              <div>
                                <h3 className="text-lg font-semibold">
                                  {property.title}
                                </h3>
                                <p className="text-sm text-muted-foreground flex items-center mt-1">
                                  <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                                  {getLocationString(property.location)}
                                </p>
                              </div>
                              <div className="text-xl font-bold text-primary">
                                {formatPrice(property.price)}
                                {property.propertyStatus === "For Rent" && (
                                  <span className="text-sm font-normal">
                                    /mo
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge
                                variant={getStatusVariant(
                                  property.propertyStatus
                                )}
                              >
                                {property.propertyStatus}
                              </Badge>
                              <Badge variant="outline">
                                {getCategoryLabel(property.category)}
                              </Badge>
                              {property.visual === "draft" && (
                                <Badge variant="secondary">Draft</Badge>
                              )}
                            </div>

                            <div className="grid grid-cols-3 gap-2 mb-4 max-w-md">
                              <div className="p-2 bg-muted rounded text-center">
                                <div className="font-semibold">
                                  {property.bedrooms || 0}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Beds
                                </div>
                              </div>
                              <div className="p-2 bg-muted rounded text-center">
                                <div className="font-semibold">
                                  {property.bathrooms || 0}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Baths
                                </div>
                              </div>
                              <div className="p-2 bg-muted rounded text-center">
                                <div className="font-semibold">
                                  {formatArea(property)}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Area
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between items-center">
                              <div className="text-xs text-muted-foreground flex items-center">
                                <Calendar className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                                Updated:{" "}
                                {new Date(
                                  property.updatedAt
                                ).toLocaleDateString()}
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" asChild>
                                  <Link
                                    href={`/properties/${
                                      property.seoMeta?.slug || property._id
                                    }`}
                                    target="_blank"
                                  >
                                    <Eye className="h-4 w-4 mr-1" />
                                    View
                                  </Link>
                                </Button>
                                <Button variant="outline" size="sm" asChild>
                                  <Link
                                    href={`/admin/properties/${
                                      property._id || property.id
                                    }`}
                                  >
                                    <Edit className="h-4 w-4 mr-1" />
                                    Edit
                                  </Link>
                                </Button>
                                <AlertDialog
                                  open={
                                    deleteDialogOpen &&
                                    propertyToDelete === property._id
                                  }
                                  onOpenChange={setDeleteDialogOpen}
                                >
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() =>
                                        setPropertyToDelete(property._id)
                                      }
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Are you sure?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This will permanently delete "
                                        {property.title}". This action cannot be
                                        undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() =>
                                          handleDeleteProperty(property._id)
                                        }
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
