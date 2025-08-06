"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

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
import { useEffect, useState } from "react";
// ... importações do seu gráfico e UI

export function ChartBarLabel() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/relatorio-mensal");
      const json = await res.json();
      setData(json);
    }
    fetchData();
  }, []);

  const chartConfig = {
    // saldo: { label: "Saldo", color: "var(--chart-3)" },
    gastos: { label: "Gastos", color: "var(--chart-1)" },
    entrada: { label: "Entrada", color: "var(--chart-2)" },
  };

  return (
    <Card className="w-full box-border">
      <CardHeader>
        <CardDescription>Visão Geral 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full">
          <BarChart data={data} margin={{top: 40}}>
            <CartesianGrid vertical={false}/>
            <XAxis dataKey="month" tickFormatter={(value) => value.slice(0, 3)} />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            {/* <Bar dataKey="saldo" fill="var(--chart-3)" radius={4} /> */}
            <Bar dataKey="gastos" fill="var(--chart-1)" radius={4}/>
            <Bar dataKey="entrada" fill="var(--chart-2)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Exibindo a visão geral <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">Ano de 2025</div>
      </CardFooter>
    </Card>
  );
}

