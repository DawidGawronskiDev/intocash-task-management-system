"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Task } from "@/models/task-model";
import { months } from "@/lib/config";
import {
  collectTasksByMonth,
  collectThisMonthItems,
  getThisMonthItems,
  getThisYearItems,
} from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { lastDayOfMonth, format } from "date-fns";

type DisplayType = "yearly" | "montly" | "weekly";

const TasksChart = ({ tasks }: { tasks: Task[] }) => {
  const [displayType, setDisplayType] = useState<DisplayType>("yearly");

  const handleDisplayType = (value: DisplayType) => {
    setDisplayType(value);
  };

  let chartData: any;
  let chartConfig: any;
  let dataKey: any;

  switch (displayType) {
    case "yearly":
      {
        const filteredTasks = getThisYearItems<Task>(tasks);
        const collectedTasks = collectTasksByMonth(
          filteredTasks,
          Array.from({ length: 12 }, (_, index) => ({ month: index, tasks: 0 }))
        );

        chartConfig = {
          tasks: {
            label: "Tasks",
            color: "#2563eb",
          },
        } satisfies ChartConfig;

        chartData = collectedTasks
          .sort((a, b) => a.month - b.month)
          .map((item) => ({ ...item, month: months[item.month] }));

        dataKey = "month";
      }
      break;
    case "montly": {
      const filteredTasks = getThisMonthItems<Task>(tasks);
      const collectedTasks = collectThisMonthItems(
        filteredTasks,
        Array.from(
          { length: Number(format(lastDayOfMonth(new Date()), "d")) },
          (_, index) => ({ day: index, tasks: 0 })
        )
      );

      chartConfig = {
        tasks: {
          label: "Tasks",
          color: "#2563eb",
        },
      } satisfies ChartConfig;

      chartData = collectedTasks.sort((a, b) => a.day - b.day);

      dataKey = "day";
    }
  }

  return (
    <div>
      <Button type="button" onClick={() => handleDisplayType("yearly")}>
        Yearly
      </Button>
      <Button type="button" onClick={() => handleDisplayType("montly")}>
        Montly
      </Button>
      <Button type="button" onClick={() => handleDisplayType("weekly")}>
        Weekly
      </Button>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <XAxis
            dataKey={dataKey}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value: string | number) => {
              if (typeof value === "number") {
                return value.toString();
              }

              if (typeof value === "string") {
                return value.slice(0, 3);
              }

              return "";
            }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <CartesianGrid vertical={false} />
          <Bar dataKey="tasks" fill="black" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default TasksChart;
