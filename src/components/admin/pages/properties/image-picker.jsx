"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ImageIcon,
  Upload,
  Check,
  VideoIcon,
  List,
  FolderOpen,
  RefreshCcw,
  Filter,
  X,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import { FiGrid } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export const ImagePickerModal = ({
  defaultMedia,
  onSelect,
  multiple = false,
  trigger,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("media");
  const [mediaItems, setMediaItems] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Initialize selected items when modal opens
  useEffect(() => {
    if (open) {
      setSelectedItems(
        defaultMedia
          ? Array.isArray(defaultMedia)
            ? defaultMedia
            : [defaultMedia]
          : []
      );
    }
  }, [open, defaultMedia]);

  // Filter and sort media based on search and sort options
  useEffect(() => {
    let result = [...mediaItems];

    // Apply search filter
    if (searchQuery) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredMedia(result);
  }, [mediaItems, searchQuery, sortBy]);

  // Fetch media from your API (Cloudinary/ImageKit)
  const fetchMedia = useCallback(async () => {
    try {
      setIsLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch(`/api/media`);
      const data = await response.json();
      setMediaItems(data.data || []);
    } catch (error) {
      toast.error("Failed to load media");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open && activeTab === "media") {
      fetchMedia();
    }
  }, [open, activeTab, fetchMedia]);

  const handleUpload = async (files) => {
    setUploading(true);
    setUploadProgress(0);
    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => formData.append("files", file));

      const response = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      // Simulate progress (replace with actual progress events if supported by your API)
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      const data = await response.json();
      clearInterval(interval);
      setUploadProgress(100);

      if (response.ok) {
        toast.success("Upload successful");
        setMediaItems((prev) => [...data.data, ...prev]);
        setActiveTab("media");
        setTimeout(() => setUploadProgress(0), 1000);
      } else {
        toast.error(data.error || "Upload failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  const handleSelect = (item) => {
    if (multiple) {
      setSelectedItems((prev) =>
        prev.some((selected) => selected.fileId === item.fileId)
          ? prev.filter((selected) => selected.fileId !== item.fileId)
          : [...prev, item]
      );
    } else {
      // For single selection, toggle selection
      setSelectedItems((prev) =>
        prev.some((selected) => selected.fileId === item.fileId) ? [] : [item]
      );
    }
  };

  const handleConfirmSelection = () => {
    if (multiple) {
      onSelect(selectedItems);
    } else {
      onSelect(selectedItems[0] || null);
    }
    setOpen(false);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    if (activeTab === "upload") {
      const files = e.dataTransfer.files;
      handleUpload(files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          React.cloneElement(trigger, { onClick: () => setOpen(true) })
        ) : (
          <Button type="button" variant="outline">
            {children}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full gap-0 h-[85vh] p-0 overflow-hidden flex flex-col rounded">
        <DialogHeader className="px-4 sm:px-6 py-4 flex flex-row items-center justify-between">
          <DialogTitle className="text-xl flex items-center gap-2">
            {multiple ? "Select Media" : "Select Featured Image"}
            {selectedItems.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {selectedItems.length} selected
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col flex-1 overflow-hidden">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-3 flex flex-col gap-3 border-b">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="media" className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Media Library
                </TabsTrigger>
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload
                </TabsTrigger>
              </TabsList>

              {activeTab === "media" && (
                <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between w-full">
                  <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search media..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => fetchMedia()}
                      className="h-9 w-9"
                      title="Refresh"
                    >
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setViewMode(viewMode === "grid" ? "list" : "grid")
                      }
                      className="h-9 w-9"
                      title={viewMode === "grid" ? "List view" : "Grid view"}
                    >
                      {viewMode === "grid" ? (
                        <List className="h-4 w-4" />
                      ) : (
                        <FiGrid className="h-4 w-4" />
                      )}
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="h-9 gap-2 hover:bg-muted/50 transition-colors"
                          title="Sort media"
                        >
                          <Filter className="h-4 w-4" />
                          <span className="hidden sm:inline">Sort by:</span>
                          <span className="font-medium">
                            {
                              {
                                newest: "Newest",
                                oldest: "Oldest",
                                "name-asc": "A-Z",
                                "name-desc": "Z-A",
                              }[sortBy]
                            }
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-56 shadow-lg animate-in fade-in-0 zoom-in-95"
                      >
                        {[
                          {
                            label: "Newest first",
                            value: "newest",
                            icon: "↓",
                          },
                          {
                            label: "Oldest first",
                            value: "oldest",
                            icon: "↑",
                          },
                          {
                            label: "Name (A to Z)",
                            value: "name-asc",
                            icon: "A→Z",
                          },
                          {
                            label: "Name (Z to A)",
                            value: "name-desc",
                            icon: "Z→A",
                          },
                        ].map((option) => (
                          <DropdownMenuCheckboxItem
                            key={option.value}
                            checked={sortBy === option.value}
                            onCheckedChange={() => setSortBy(option.value)}
                            className="gap-2"
                          >
                            <span className="w-8 text-center text-muted-foreground">
                              {option.icon}
                            </span>
                            <span>{option.label}</span>
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )}
            </div>

            <TabsContent
              value="media"
              className="flex-1 flex flex-col mt-0 overflow-hidden"
            >
              {isLoading ? (
                <div className="flex-1 overflow-auto p-4 sm:p-6">
                  <div
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                        : "space-y-3"
                    }
                  >
                    {Array.from({ length: 12 }).map((_, i) =>
                      viewMode === "grid" ? (
                        <Card key={i} className="overflow-hidden gap-0">
                          <CardContent className="p-0 aspect-square">
                            <Skeleton className="h-full w-full rounded-none" />
                          </CardContent>
                        </Card>
                      ) : (
                        <div
                          key={i}
                          className="flex items-center gap-4 p-3 border rounded-lg"
                        >
                          <Skeleton className="h-16 w-16 rounded" />
                          <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-3 w-1/3" />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ) : filteredMedia.length > 0 ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 gap-3 p-4 sm:p-6 overflow-auto flex-1"
                      : "space-y-3 p-4 sm:p-6 overflow-auto flex-1"
                  }
                >
                  {filteredMedia.map((item) => {
                    const isSelected = selectedItems.some(
                      (selected) => selected.fileId === item.fileId
                    );

                    return viewMode === "grid" ? (
                      <Card
                        key={item.fileId}
                        className={`relative group cursor-pointer overflow-hidden gap-0 transition-all border-2`}
                        onClick={() => handleSelect(item)}
                      >
                        <CardContent className="p-0">
                          <div className="aspect-square w-full h-full relative flex items-center justify-center bg-muted/20">
                            {item.mime?.startsWith("video") ? (
                              <div className="relative w-full h-full">
                                <video
                                  src={item.url}
                                  className="w-full h-full object-cover"
                                  muted
                                  playsInline
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                  <VideoIcon className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                              </div>
                            ) : (
                              <>
                                <img
                                  src={item.url}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                              </>
                            )}

                            {isSelected && (
                              <div className="absolute top-2 right-2 bg-primary rounded-full p-1.5">
                                <Check className="h-3.5 w-3.5 text-primary-foreground" />
                              </div>
                            )}
                            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                              {item.mime?.split("/")[1]?.toUpperCase()}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <div
                        key={item.fileId}
                        className={`flex items-center gap-4 p-3 border rounded-lg cursor-pointer transition-colors group ${
                          isSelected
                            ? "bg-primary/10 border-primary"
                            : "hover:bg-muted/50"
                        }`}
                        onClick={() => handleSelect(item)}
                      >
                        <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                          {item.mime?.startsWith("video") ? (
                            <>
                              <video
                                src={item.url}
                                className="w-full h-full object-cover"
                                muted
                                playsInline
                              />
                              <div className="absolute bottom-1 right-1 bg-black/70 rounded-full p-0.5">
                                <VideoIcon className="h-2 w-2 text-white" />
                              </div>
                            </>
                          ) : (
                            <img
                              src={item.url}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        {viewMode === "list" && (
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {item.name}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {item.mime?.split("/")[1]?.toUpperCase()} •{" "}
                              {new Date(item.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        )}
                        {isSelected && (
                          <div className="bg-primary rounded-full p-1.5">
                            <Check className="h-3.5 w-3.5 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full bg-muted/10 rounded-lg m-4 p-8">
                  <FolderOpen className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
                  <p className="text-muted-foreground text-sm mb-2 font-medium">
                    {searchQuery ? "No results found" : "No media files found"}
                  </p>
                  <p className="text-muted-foreground text-xs mb-4 text-center">
                    {searchQuery
                      ? `No media matching "${searchQuery}"`
                      : "Upload your first file to get started"}
                  </p>
                  {searchQuery ? (
                    <Button
                      onClick={() => setSearchQuery("")}
                      variant="outline"
                      size="sm"
                    >
                      Clear search
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setActiveTab("upload")}
                      className="flex items-center gap-2"
                      size="sm"
                    >
                      <Upload className="h-4 w-4" />
                      Upload Files
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="upload" className="flex-1 mt-0 p-4 sm:p-6">
              <div
                className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors bg-muted/10 flex flex-col items-center justify-center h-full"
                onDrop={handleFileDrop}
                onDragOver={handleDragOver}
              >
                <input
                  type="file"
                  id="upload"
                  multiple={multiple}
                  onChange={(e) => handleUpload(e.target.files)}
                  className="hidden"
                  accept="image/*,video/*"
                />
                <label htmlFor="upload" className="cursor-pointer block">
                  <div className="bg-primary/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    Drag & Drop or Click to Upload
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                    {multiple
                      ? "Select multiple images or videos to upload to your media library"
                      : "Select a single image or video to upload to your media library"}
                  </p>
                  <Button asChild>
                    <span>Select Files</span>
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4">
                    Supports JPG, PNG, GIF, WEBP, MP4, MOV
                  </p>
                </label>
              </div>

              {uploading && (
                <div className="mt-6 space-y-2 bg-muted/10 p-4 rounded-lg">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Uploading files...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 sm:px-6 py-4 border-t">
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              {selectedItems.length} {multiple ? "files" : "file"} selected
              {selectedItems.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSelection}
                  className="h-7 text-xs"
                >
                  Clear selection
                </Button>
              )}
            </div>
            <div className="flex gap-2 self-end sm:self-auto">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleConfirmSelection}
                disabled={selectedItems.length === 0}
              >
                Confirm Selection
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
