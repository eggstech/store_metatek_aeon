"use client";

import { Bell, Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { notifications as mockNotifications } from "@/lib/data";
import { useState } from "react";
import { Notification } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

export default function AppHeader() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex-1">
        <h1 className="text-lg font-semibold">Tasks</h1>
      </div>
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-4 w-4 justify-center rounded-full p-0 text-xs"
                >
                  {unreadCount}
                </Badge>
              )}
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="flex items-center justify-between p-2">
              <h4 className="font-medium">Notifications</h4>
               {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={handleMarkAllRead}>
                    <Check className="mr-2 h-4 w-4" />
                    Mark all as read
                  </Button>
               )}
            </div>
            <div className="mt-2 flex flex-col gap-2 p-1">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                        "flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-accent",
                        !notification.read && "bg-accent/50"
                    )}
                  >
                    <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="p-4 text-center text-sm text-muted-foreground">
                  No new notifications
                </p>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
