"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Props = {
  data: Array<{ month: string; rating: number }>;
};

export function ReputationLineChart({ data }: Props) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} domain={[0, 5]} />
          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid rgba(148,163,184,0.2)",
              borderRadius: 12,
            }}
            labelStyle={{ color: "#e2e8f0" }}
          />
          <Line
            type="monotone"
            dataKey="rating"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={{ stroke: "#22d3ee", strokeWidth: 2, r: 4, fill: "#0f172a" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
