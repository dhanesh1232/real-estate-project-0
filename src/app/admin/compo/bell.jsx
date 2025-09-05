"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Notification Bell with Badge and Popup
export const NotificationBell = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New property listed", time: "2 mins ago" },
    { id: 2, text: "Someone messaged you", time: "1 hour ago" },
    { id: 3, text: "Booking request received", time: "2 hours ago" },
  ]);

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative rounded-full hover:bg-slate-100 cursor-pointer"
        >
          <Bell className="h-4.5 w-4.5" />
          {notifications.length > 0 && (
            <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center bg-red-500 text-xs">
              {notifications.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="end">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Notifications</h4>
            {notifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearNotifications}
                className="text-sm text-red-500 hover:text-red-600"
              >
                Clear all
              </Button>
            )}
          </div>
          <div className="space-y-3">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-2 p-2 hover:bg-slate-50 rounded"
                >
                  <div className="flex-1">
                    <p className="text-sm">{notification.text}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                No new notifications
              </p>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
