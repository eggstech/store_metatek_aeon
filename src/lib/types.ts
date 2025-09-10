export type TaskStatus =
  | "Pending"
  | "Completed"
  | "Overdue"
  | "Needs Rework";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  deadline: string;
  storeId: string;
  assignedTo: string;
  feedback?: string;
  photoUrl?: string;
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Notification {
  id: string;
  message: string;
  taskId?: string;
  read: boolean;
  createdAt: string;
}
