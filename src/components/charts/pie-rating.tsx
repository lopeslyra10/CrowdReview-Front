"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#22d3ee", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"];

type Props = {
  data: Array<{ name: string; value: number }>;
};

export function RatingPieChart({ data }: Props) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={48}
            paddingAngle={4}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid rgba(148,163,184,0.2)",
              borderRadius: 12,
            }}
            itemStyle={{ color: "#e2e8f0" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
