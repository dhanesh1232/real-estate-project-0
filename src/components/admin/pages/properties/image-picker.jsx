"use client";
import { useState, useEffect } from "react";
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
import { ImageIcon, Upload, X, Search, Loader } from "lucide-react";
import { toast } from "sonner";

export const ImagePickerModal = ({ onSelect, multiple = false, children }) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("media");
  const [searchQuery, setSearchQuery] = useState("");
  const [mediaItems, setMediaItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Fetch media from your API (Cloudinary/ImageKit)
  const fetchMedia = async () => {
    try {
      setIsLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch(`/api/media?search=${searchQuery}`);
      const data = await response.json();
      console.log(data.data);
      setMediaItems(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching media:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open && activeTab === "media") {
      fetchMedia();
    }
  }, [open, activeTab, searchQuery]);

  const handleUpload = async (files) => {
    setUploading(true);
    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => formData.append("files", file));

      const response = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Upload successful");
        setMediaItems((prev) => [...data.data, ...prev]); // instantly show
        setActiveTab("media");
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

  const handleConfirmSelection = () => {
    onSelect(multiple ? selectedItems : selectedItems[0]);
    setOpen(false);
    setSelectedItems([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>
            {multiple ? "Select Media" : "Select Featured Image"}
          </DialogTitle>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 h-full flex flex-col"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="media">Media Library</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="media" className="flex-1 flex flex-col mt-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search media..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <Loader className="animate-spin" />
              </div>
            ) : mediaItems.length > 0 ? (
              <div className="grid grid-cols-4 gap-4 overflow-auto flex-1 p-1.5">
                {mediaItems.map((item) => {
                  return (
                    <Card
                      key={item.fileId}
                      className={`relative group h-24 rounded-sm w-24 cursor-pointer ${
                        selectedItems.some(
                          (selected) => selected.fileId === item.fileId
                        )
                          ? "ring-2 ring-primary"
                          : ""
                      }`}
                      onClick={() => handleSelect(item)}
                    >
                      <CardContent className="p-0 aspect-square flex items-center justify-center">
                        {item.mime?.startsWith("video") ? (
                          <video
                            src={item.url}
                            className="w-full h-full object-cover rounded-md"
                            muted
                            playsInline
                          />
                        ) : (
                          <img
                            src={item.url}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] bg-muted/10 rounded-lg">
                <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-sm">No files found</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="upload" className="flex-1 mt-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <input
                type="file"
                id="upload"
                multiple={multiple}
                onChange={(e) => handleUpload(e.target.files)}
                className="hidden"
              />
              <label htmlFor="upload" className="cursor-pointer">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium">Click to upload</h3>
                <p className="text-sm text-gray-500">
                  {multiple
                    ? "Select multiple images"
                    : "Select a single image"}
                </p>
              </label>
            </div>
            {uploading && <p className="text-center mt-4">Uploading...</p>}
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center mt-4">
          <div>
            {selectedItems.length > 0 && (
              <span className="text-sm text-muted-foreground">
                {selectedItems.length} item(s) selected
              </span>
            )}
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
      </DialogContent>
    </Dialog>
  );
};
