"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart with a label";

const chartData = [
  { month: "Janeiro", gastos: 186, saldo: 300, restante: 180 },
  { month: "Fevereiro", gastos: 305, saldo: 300, restante: 180 },
  { month: "Março", gastos: 237, saldo: 300, restante: 180 },
  { month: "Abril", gastos: 73, saldo: 300, restante: 180 },
  { month: "Maio", gastos: 209, saldo: 300, restante: 180 },
  { month: "Junho", gastos: 214, saldo: 300, restante: 180 },
  { month: "Julho", gastos: 270, saldo: 300, restante: 180 },
  { month: "Agosto", gastos: 180, saldo: 300, restante: 180 },
  { month: "Setembro", gastos: 250, saldo: 300, restante: 180 },
  { month: "Outubro", gastos: 300, saldo: 300, restante: 180 },
  { month: "Novembro", gastos: 214, saldo: 300, restante: 180 },
  { month: "Dezembro", gastos: 350, saldo: 300, restante: 180 },
];

const chartConfig = {
  gastos: {
    label: "Gastos",
    color: "var(--chart-1)",
  },
  saldo: {
    label: "Saldo",
    color: "var(--chart-2)",
  },
  restante: {
    label: "Restante",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function ChartBarLabel() {
  return (
    <Card className="w-full box-border">
      <CardHeader>
        {/* <CardTitle>Bar Chart - Label</CardTitle> */}
        <CardDescription>Gastos totais 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="saldo" fill="var(--chart-saldo)" radius={4}>
              {/* <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              /> */}
            </Bar>
            <Bar dataKey="gastos" fill="var(--chart-gastos)" radius={4}>
              {/* <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              /> */}
            </Bar>
            <Bar dataKey="restante" fill="var(--chart-restante)" radius={4}>
              {/* <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              /> */}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Exibindo os gastos totais <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Ano de 2025
        </div>
      </CardFooter>
    </Card>
  );
}
