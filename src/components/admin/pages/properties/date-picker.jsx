"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Calendar22({ value, onSelectDate }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-3 w-full">
      <Label className="block mb-2 font-medium text-gray-700">Year Built</Label>
      <Popover open={open} onOpenChange={setOpen} className="w-full">
        <PopoverTrigger asChild className="w-full">
          <Button
            variant="outline"
            id="date"
            className="w-auto justify-between font-normal"
          >
            {value ? value.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            onSelect={(date) => {
              onSelectDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
