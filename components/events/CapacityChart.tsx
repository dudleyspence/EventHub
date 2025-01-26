"use client";

import React from "react";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Cell,
  PolarAngleAxis,
} from "recharts";

type CapacityChartProps = {
  chartData: {
    name: string;
    value: number;
    fill: string;
  };
  total: number;
};

export default function CapacityChart({
  chartData,
  total,
}: CapacityChartProps) {
  return (
    <div className="w-full h-[240px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          barSize={10}
          cx="50%"
          cy="50%"
          data={[chartData]}
          endAngle={-270}
          innerRadius={90}
          outerRadius={70}
          startAngle={90}
        >
          <PolarAngleAxis
            angleAxisId={0}
            domain={[0, total]}
            tick={false}
            type="number"
          />
          <RadialBar
            angleAxisId={0}
            animationDuration={1000}
            animationEasing="ease"
            background={{
              fill: "hsl(var(--heroui-default-100))",
            }}
            cornerRadius={12}
            dataKey="value"
          >
            <Cell key={`1`} fill={chartData.fill} />
          </RadialBar>
          <g>
            <text textAnchor="middle" x="50%" y="48%">
              <tspan className="fill-default-500 text-tiny" dy="-0.5em" x="50%">
                {chartData.name}
              </tspan>
              <tspan
                className="fill-foreground text-medium font-semibold"
                dy="1.5em"
                x="50%"
              >
                {total.toLocaleString()}
              </tspan>
            </text>
          </g>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}
