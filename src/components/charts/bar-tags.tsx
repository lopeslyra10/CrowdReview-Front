"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Props = {
  data: Array<{ tag: string; count: number }>;
};

export function TagsBarChart({ data }: Props) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" stroke="#94a3b8" hide />
          <YAxis
            dataKey="tag"
            type="category"
            stroke="#94a3b8"
            width={90}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid rgba(148,163,184,0.2)",
              borderRadius: 12,
            }}
            labelStyle={{ color: "#e2e8f0" }}
          />
          <Bar dataKey="count" radius={[8, 8, 8, 8]} fill="url(#tagGradient)">
            <defs>
              <linearGradient id="tagGradient" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
