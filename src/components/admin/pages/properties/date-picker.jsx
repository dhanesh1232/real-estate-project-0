"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Calendar22({ value, onSelectDate, label = "Year Built" }) {
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("recent");

  // Normalize value (support Date, number, or string)
  const normalizeYear = (val) => {
    if (val instanceof Date) return val.getFullYear();
    if (typeof val === "number") return val;
    if (typeof val === "string") {
      const parsed = new Date(val);
      return !isNaN(parsed) ? parsed.getFullYear() : null;
    }
    return null;
  };

  const selectedYear = normalizeYear(value);

  // Generate years dynamically
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1899 },
    (_, i) => currentYear - i
  );

  // Split for tabs
  const recentYears = years.slice(0, 30);
  const oldYears = years.slice(30);

  const handleYearSelect = (year) => {
    const yearDate = new Date(year, 0, 1); // consistent format
    onSelectDate?.(yearDate);
    setOpen(false);
  };

  const displayValue = selectedYear ? selectedYear.toString() : "Select year";

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="font-medium text-gray-700">{label}</Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between font-normal"
          >
            {displayValue}
            <ChevronDownIcon className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-64 p-3" align="start" side="bottom">
          <Tabs
            defaultValue="recent"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="old">Older</TabsTrigger>
            </TabsList>

            <div className="max-h-60 overflow-y-auto mt-2">
              <div className="grid grid-cols-3 gap-1">
                {(activeTab === "recent" ? recentYears : oldYears).map(
                  (year) => (
                    <Button
                      key={year}
                      variant={selectedYear === year ? "default" : "ghost"}
                      size="sm"
                      className="h-8 px-2 justify-center"
                      onClick={() => handleYearSelect(year)}
                    >
                      {year}
                    </Button>
                  )
                )}
              </div>
            </div>
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  );
}
