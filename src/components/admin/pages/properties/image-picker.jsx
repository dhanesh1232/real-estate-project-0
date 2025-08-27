"use client";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  X,
  Search,
  Loader,
  Check,
  VideoIcon,
  FileIcon,
  Grid3X3,
  List,
  FolderOpen,
} from "lucide-react";
import { toast } from "sonner";

export const ImagePickerModal = ({ onSelect, multiple = false, children }) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("media");
  const [searchQuery, setSearchQuery] = useState("");
  const [mediaItems, setMediaItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  // Fetch media from your API (Cloudinary/ImageKit)
  const fetchMedia = useCallback(async () => {
    try {
      setIsLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch(`/api/media?search=${searchQuery}`);
      const data = await response.json();
      setMediaItems(data.data);
    } catch (error) {
      console.error("Error fetching media:", error);
      toast.error("Failed to load media");
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (open && activeTab === "media") {
      fetchMedia();
    }
  }, [open, activeTab, searchQuery, fetchMedia]);

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
      console.error("Upload error:", err);
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
      setSelectedItems([item]);
    }
  };

  const handleRemoveSelected = (itemId) => {
    setSelectedItems((prev) => prev.filter((item) => item.fileId !== itemId));
  };

  const handleConfirmSelection = () => {
    onSelect(multiple ? selectedItems : selectedItems[0]);
    setOpen(false);
    setSelectedItems([]);
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-5xl h-[85vh] p-0 overflow-hidden flex flex-col">
        <DialogHeader className="px-6 py-4 border-b">
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
            <div className="px-6">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="media" className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Media Library
                </TabsTrigger>
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent
              value="media"
              className="flex-1 flex flex-col mt-0 overflow-hidden px-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search media..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setViewMode(viewMode === "grid" ? "list" : "grid")
                  }
                  className="h-10 w-10"
                >
                  {viewMode === "grid" ? (
                    <List className="h-4 w-4" />
                  ) : (
                    <Grid3X3 className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {isLoading ? (
                <div className="flex-1 overflow-auto">
                  <div
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                        : "space-y-3"
                    }
                  >
                    {Array.from({ length: 12 }).map((_, i) =>
                      viewMode === "grid" ? (
                        <Card key={i} className="overflow-hidden">
                          <CardContent className="p-0 aspect-square">
                            <Skeleton className="h-full w-full rounded-none" />
                          </CardContent>
                          <div className="p-2 space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-3 w-1/2" />
                          </div>
                        </Card>
                      ) : (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-3 border rounded-md"
                        >
                          <Skeleton className="h-16 w-16 rounded-md" />
                          <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-3 w-1/3" />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ) : mediaItems.length > 0 ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-auto flex-1 pb-4"
                      : "space-y-2 overflow-auto flex-1 pb-4"
                  }
                >
                  {mediaItems.map((item) => {
                    const isSelected = selectedItems.some(
                      (selected) => selected.fileId === item.fileId
                    );

                    return viewMode === "grid" ? (
                      <Card
                        key={item.fileId}
                        className={`relative group cursor-pointer max-h-32 transition-all overflow-hidden ${
                          isSelected ? "ring-2 ring-primary" : ""
                        }`}
                        onClick={() => handleSelect(item)}
                      >
                        <CardContent className="p-0">
                          <div className="aspect-square relative flex items-center justify-center bg-muted/30">
                            {item.mime?.startsWith("video") ? (
                              <div className="relative w-full h-full">
                                <video
                                  src={item.url}
                                  className="w-full h-full object-cover"
                                  muted
                                  playsInline
                                />
                                <div className="absolute bottom-2 right-2 bg-black/70 rounded-full p-1">
                                  <VideoIcon className="h-3 w-3 text-white" />
                                </div>
                              </div>
                            ) : (
                              <img
                                src={item.url}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            )}

                            {isSelected && (
                              <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                                <Check className="h-3 w-3 text-primary-foreground" />
                              </div>
                            )}
                            <p className="text-xs absolute bottom-1 left-2 text-muted-foreground">
                              {item.mime?.split("/")[1]?.toUpperCase()}
                            </p>
                          </div>
                          <div className="p-1">
                            <p className="text-xs font-medium truncate">
                              {item.name}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <div
                        key={item.fileId}
                        className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer transition-colors group ${
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
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.mime?.split("/")[1]?.toUpperCase()}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="bg-primary rounded-full p-1">
                            <Check className="h-3 w-3 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full bg-muted/10 rounded-lg p-8">
                  <FolderOpen className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-sm mb-2 font-medium">
                    No media files found
                  </p>
                  <p className="text-muted-foreground text-xs mb-4 text-center">
                    {searchQuery
                      ? "Try a different search term"
                      : "Upload your first file to get started"}
                  </p>
                  <Button
                    onClick={() => setActiveTab("upload")}
                    className="flex items-center gap-2"
                    size="sm"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Files
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="upload" className="flex-1 mt-0 px-6">
              <div
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:border-primary/50 transition-colors bg-muted/10"
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
                  <p className="text-sm text-muted-foreground mb-4">
                    {multiple
                      ? "Select multiple images or videos"
                      : "Select a single image or video"}
                  </p>
                  <Button asChild>
                    <span>Browse Files</span>
                  </Button>
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

          {/* Selected items preview */}
          {selectedItems.length > 0 && (
            <div className="border-t px-6 py-4 bg-muted/10">
              <h3 className="text-sm font-medium mb-3">Selected Items</h3>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {selectedItems.map((item) => (
                  <div
                    key={item.fileId}
                    className="relative group flex-shrink-0"
                  >
                    <div className="w-16 h-16 rounded-md overflow-hidden border bg-muted">
                      {item.mime?.startsWith("video") ? (
                        <video
                          src={item.url}
                          className="w-full h-full object-cover"
                          muted
                          playsInline
                        />
                      ) : (
                        <img
                          src={item.url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveSelected(item.fileId)}
                      className="absolute -top-1 -right-1 bg-destructive rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    >
                      <X className="h-3 w-3 text-destructive-foreground" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center px-6 py-4 border-t">
            <div className="text-sm text-muted-foreground">
              {selectedItems.length} of {multiple ? "multiple" : "1"} selected
            </div>
            <div className="flex gap-2">
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
