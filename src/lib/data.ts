import { Task, User, Notification } from "./types";
import { subDays, addDays, formatISO } from "date-fns";

export const users: User[] = [
  {
    id: "user-1",
    name: "Alex Johnson",
    avatarUrl: "https://picsum.photos/seed/1/100/100",
  },
];

export const tasks: Task[] = [
  {
    id: "task-1",
    title: "Morning Display Check",
    description:
      "Verify all promotional displays are set up according to the new campaign guidelines. Check for any damaged materials and replace them. Ensure all prices are correct.",
    status: "Pending",
    deadline: formatISO(addDays(new Date(), 2)),
    storeId: "store-a",
    assignedTo: "user-1",
  },
  {
    id: "task-2",
    title: "Restock Aisle 5",
    description: "Aisle 5 is running low on breakfast cereals. Please restock from the backroom inventory. Prioritize top-selling brands.",
    status: "Pending",
    deadline: formatISO(addDays(new Date(), 1)),
    storeId: "store-a",
    assignedTo: "user-1",
  },
  {
    id: "task-3",
    title: "Inventory Scan - Dairy",
    description:
      "Complete a full inventory scan of the dairy section. Report any items close to their expiration date. Ensure the temperature log is up to date.",
    status: "Needs Rework",
    deadline: formatISO(addDays(new Date(), 1)),
    storeId: "store-a",
    assignedTo: "user-1",
    feedback: "The scan for milk was incomplete. Please rescan all milk products.",
  },
  {
    id: "task-4",
    title: "Clean Spillage in Aisle 3",
    description: "A customer reported a juice spillage in Aisle 3. Please clean it up immediately and place a 'Wet Floor' sign.",
    status: "Overdue",
    deadline: formatISO(subDays(new Date(), 1)),
    storeId: "store-a",
    assignedTo: "user-1",
  },
  {
    id: "task-5",
    title: "End-of-Day Checkout Audit",
    description:
      "Perform a cash drawer audit for checkout lane 4. Reconcile cash, card, and check payments against the register report.",
    status: "Completed",
    deadline: formatISO(subDays(new Date(), 2)),
    storeId: "store-a",
    assignedTo: "user-1",
  },
    {
    id: "task-6",
    title: "Prepare Online Order #5821",
    description:
      "Pick and pack items for online order #5821. The order includes perishable goods, so ensure cold chain is maintained.",
    status: "Pending",
    deadline: formatISO(addDays(new Date(), 0)),
    storeId: "store-a",
    assignedTo: "user-1",
  },
];

export const notifications: Notification[] = [
  {
    id: "notif-1",
    message: "New task assigned: Weekly Freezer Check.",
    read: false,
    createdAt: formatISO(new Date()),
  },
  {
    id: "notif-2",
    message: "Task 'Inventory Scan - Dairy' needs rework.",
    taskId: "task-3",
    read: false,
    createdAt: formatISO(subDays(new Date(), 1)),
  },
  {
    id: "notif-3",
    message: "Deadline for 'Restock Aisle 5' is tomorrow.",
    taskId: "task-2",
    read: true,
    createdAt: formatISO(subDays(new Date(), 1)),
  },
];
