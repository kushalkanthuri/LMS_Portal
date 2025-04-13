"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/elements/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/elements/card"

const chartConfig = {
  percentage: {
    label: "Percentage",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function Graph({
  chartData,
}: {
  chartData: {
    subjectId: string
    subjectName: string
    totalClasses: number
    classesAttended: number
    percentage: number
  }[]
}) {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Attendence</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="subjectName"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              className="text-xl font-poppins font-semibold"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="percentage" fill="var(--color-foreground)" radius={8}>
              <LabelList
                position="top"
                className="fill-foreground"
                fontSize={16}
                fontWeight={700}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}