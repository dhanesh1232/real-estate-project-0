"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle, Eye, Edit, Trash2, MapPin, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PropertiesPage() {
  // Mock data - replace with actual data fetching
  const properties = [
    {
      id: 1,
      title: "Modern Downtown Apartment",
      location: "Downtown, New York",
      price: "$350,000",
      status: "Active",
      lastUpdated: "2024-03-15",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&auto=format",
      beds: 2,
      baths: 2,
      area: "1200 sq ft",
    },
    {
      id: 2,
      title: "Luxury Villa with Pool",
      location: "Beverly Hills, LA",
      price: "$1,250,000",
      status: "Pending",
      lastUpdated: "2024-03-10",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&auto=format",
      beds: 4,
      baths: 3,
      area: "3200 sq ft",
    },
    {
      id: 3,
      title: "Waterfront Condo",
      location: "Miami Beach, Florida",
      price: "$675,000",
      status: "Sold",
      lastUpdated: "2024-02-28",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format",
      beds: 3,
      baths: 2,
      area: "1800 sq ft",
    },
    {
      id: 4,
      title: "Suburban Family Home",
      location: "Austin, Texas",
      price: "$550,000",
      status: "Active",
      lastUpdated: "2024-03-18",
      image:
        "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=500&auto=format",
      beds: 3,
      baths: 2.5,
      area: "2100 sq ft",
    },
    {
      id: 5,
      title: "Downtown Loft",
      location: "Chicago, Illinois",
      price: "$425,000",
      status: "Active",
      lastUpdated: "2024-03-12",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&auto=format",
      beds: 1,
      baths: 1,
      area: "950 sq ft",
    },
    {
      id: 6,
      title: "Mountain Retreat",
      location: "Aspen, Colorado",
      price: "$1,850,000",
      status: "Pending",
      lastUpdated: "2024-03-05",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&auto=format",
      beds: 5,
      baths: 4,
      area: "3800 sq ft",
    },
  ];

  const getStatusVariant = (status) => {
    switch (status) {
      case "Active":
        return "default";
      case "Pending":
        return "secondary";
      case "Sold":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header Block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Properties Management
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Manage and control your real estate property listings
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button className="flex items-center gap-2 w-full md:w-auto" asChild>
            <Link href="/admin/properties/new" className="flex-1 md:flex-none">
              <PlusCircle className="h-4 w-4" />
              <span className="inline">Add New Property</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <Card className="py-4 gap-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Properties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{properties.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card className="py-4 gap-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Active Listings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {properties.filter((p) => p.status === "Active").length}
            </div>
            <p className="text-xs text-muted-foreground">+1 from last week</p>
          </CardContent>
        </Card>
        <Card className="py-4 gap-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4.2M</div>
            <p className="text-xs text-muted-foreground">
              +$500K from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {properties.map((property) => (
          <Card
            key={property.id}
            className="overflow-hidden pb-4 hover:shadow-lg transition-shadow h-full flex flex-col"
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={property.image}
                alt={property.title}
                className="object-cover w-full h-full transition-transform hover:scale-105"
              />
              <Badge
                className="absolute top-2 right-2"
                variant={getStatusVariant(property.status)}
              >
                {property.status}
              </Badge>
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg md:text-xl line-clamp-1">
                {property.title}
              </CardTitle>
              <CardDescription className="flex items-center mt-1">
                <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                <span className="truncate">{property.location}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <div className="text-xl md:text-2xl font-bold text-primary">
                  {property.price}
                </div>
                <div className="text-xs text-muted-foreground flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                  <span className="hidden xs:inline">Updated </span>
                  {property.lastUpdated}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="p-2 bg-muted rounded">
                  <div className="font-semibold">{property.beds}</div>
                  <div className="text-xs text-muted-foreground">Beds</div>
                </div>
                <div className="p-2 bg-muted rounded">
                  <div className="font-semibold">{property.baths}</div>
                  <div className="text-xs text-muted-foreground">Baths</div>
                </div>
                <div className="p-2 bg-muted rounded">
                  <div className="font-semibold">{property.area}</div>
                  <div className="text-xs text-muted-foreground">Area</div>
                </div>
              </div>

              <div className="flex justify-between gap-2 mt-auto">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">View</span>
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Edit</span>
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
