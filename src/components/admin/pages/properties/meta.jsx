import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import Keywords from "./multi-text";
import { InputWithLabel } from "./helper/compo";

export function SeoContainer({ metadata, onChangeMeta }) {
  console.log("Metadata", metadata);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("desktop");

  const getPreviewUrl = () => {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXTAUTH_URL ||
      window.location.origin;
    return `${baseUrl}/${metadata.slug || "page-url"}`;
  };

  return (
    <div>
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Search Engine Optimization
            </h3>
            <p className="text-sm text-gray-500">
              Optimize your page for search engines and social sharing
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-200 rounded cursor-pointer transition-colors"
          >
            <svg
              className={`w-5 h-5 transform transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-2">
          {/* Preview Section */}
          <div className="bg-white rounded border p-4">
            <div className="mb-4 flex space-x-4 border-b">
              <button
                className={`pb-2 px-4 ${
                  activeTab === "desktop"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("desktop")}
              >
                Desktop
              </button>
              <button
                className={`pb-2 px-4 ${
                  activeTab === "mobile"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("mobile")}
              >
                Mobile
              </button>
            </div>

            <div
              className={`preview-container ${
                activeTab === "mobile" ? "max-w-[375px]" : "w-full"
              }`}
            >
              <div className="mb-2 text-xs text-gray-500">
                {getPreviewUrl()}
              </div>
              <h2 className="text-xl text-blue-800 hover:underline mb-1">
                {metadata.title || "Page Title"}
              </h2>
              <p className="text-sm text-gray-800 mb-1">
                {metadata.description ||
                  "Page description will appear here. Make it compelling for better click-through rates."}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {/* Input Fields Section */}
            <div className="flex flex-col space-y-4">
              <InputWithLabel
                value={metadata.slug}
                label="URL Slug"
                placeholder="page-url-slug"
                onChange={(val) => onChangeMeta("slug", val.target.value)}
              />

              <InputWithLabel
                value={metadata.title}
                label="Meta Title"
                placeholder="Enter page title"
                onChange={(val) => onChangeMeta("title", val.target.value)}
              />

              <div>
                <Label className="block mb-2 font-medium text-gray-700">
                  Meta Description
                </Label>
                <Textarea
                  value={metadata.description}
                  placeholder="Enter page description"
                  onChange={(val) =>
                    onChangeMeta("description", val.target.value)
                  }
                  className="min-h-[100px] rounded"
                />
              </div>

              <div>
                <Label className="block mb-2 font-medium text-gray-700">
                  Meta Keywords
                </Label>
                <Keywords
                  defaultKeywords={metadata.keywords}
                  placeholder="Enter keywords"
                  onChange={(val) => onChangeMeta("keywords", [...val])}
                />
              </div>

              <InputWithLabel
                readOnly
                value={metadata.ogImage}
                label="Open Graph Image URL"
                placeholder="Enter image URL for social sharing"
                onChange={(val) => onChangeMeta("ogImage", val.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
