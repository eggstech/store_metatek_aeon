"use client";

import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, Pie, PieChart, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Task } from "@/lib/types";

interface DashboardClientProps {
  tasks: Task[];
}

const COLORS = {
  Completed: "hsl(var(--chart-2))",
  Pending: "hsl(var(--chart-1))",
  Overdue: "hsl(var(--destructive))",
  "Needs Rework": "hsl(var(--accent))",
};

export default function DashboardClient({ tasks }: DashboardClientProps) {
  const taskStats = useMemo(() => {
    return tasks.reduce(
      (acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
      },
      {} as Record<Task["status"], number>
    );
  }, [tasks]);

  const chartData = Object.entries(taskStats).map(([status, count]) => ({
    status,
    count,
    fill: COLORS[status as keyof typeof COLORS],
  }));

  const totalTasks = tasks.length;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{totalTasks}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-[hsl(var(--chart-2))]">
            {taskStats.Completed || 0}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Pending</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-[hsl(var(--chart-1))]">
            {taskStats.Pending || 0}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Action Required</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-[hsl(var(--destructive))]">
            {(taskStats.Overdue || 0) + (taskStats["Needs Rework"] || 0)}
          </p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Task Status Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[250px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="status"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="count" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Task Distribution</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <ChartContainer config={{}} className="h-[250px] w-full">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="status"
                innerRadius={60}
                strokeWidth={5}
              >
                {chartData.map((entry) => (
                    <Cell key={`cell-${entry.status}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartLegend content={<ChartLegendContent nameKey="status" />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
