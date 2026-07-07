"use client"
import {useFamilyContext} from "@/contexts/FamilyProvider";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart";
import React from "react";
import {format} from "date-fns";
import { chartColors } from "@/models/Colours";
import {Area, AreaChart, XAxis, YAxis} from "recharts";
import {EditWeightDialog} from "@/components/weight-section/EditWeightDialog";
import {EditTarget, WeightActiveDotProps} from "@/models/models";

export default function WeightChartContent() {
    const { state, addWeight } = useFamilyContext();
    const members = state.familyMembers;
    const allDates = [...new Set(members.flatMap(m => Array.from(m.weightHistory.keys())))].sort();
    const [editTarget, setEditTarget] = React.useState<EditTarget | null>(null);

    const chartData = allDates.map(date => {
        const row: Record<string, string | number> = {date: new Date(date).getTime()};
        for (const member of members) {
            const entry = member.weightHistory.get(date);
            if (entry) row[member.id] = entry.weight;
        }
        return row;
    })

    const chartConfig: ChartConfig = Object.fromEntries(
        members.map((m, i) => [m.id, {
            label: m.name,
            color: chartColors[i % chartColors.length]
        }])
    );

    function handleSaveWeight(weight: number) {
        if (!editTarget) return;

        addWeight(editTarget.memberId, editTarget.date, weight);
        setEditTarget(null);
    }

    return (
        <div className="sm:max-w-[1025px]">
            <ChartContainer config={chartConfig} className="h-[400px] w-full">
                <AreaChart data={chartData}>
                    <XAxis
                        dataKey="date"
                        type="number"
                        scale="time"
                        domain={["dataMin", "dataMax"]}
                        tickFormatter={(val) => new Date(val).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short"
                        })}
                    />
                    <YAxis
                        label={{value: "kg", angle: -90, position: "insideLeft"}}
                        domain={["auto", "auto"]}
                    />
                    <ChartTooltip content={<ChartTooltipContent/>}/>
                    <ChartLegend content={<ChartLegendContent/>}/>
                    {members.map(m => (
                        <Area
                            key={m.id}
                            dataKey={m.id}
                            type="monotone"
                            stroke={`var(--color-${m.id})`}
                            fill="transparent"
                            fillOpacity={0}
                            strokeWidth={2.5}
                            connectNulls={true}
                            dot={{ r: 5, strokeWidth: 2 }}
                            activeDot={(props: WeightActiveDotProps) => (
                                <circle
                                    r={5}
                                    cx={props.cx}
                                    cy={props.cy}
                                    fill={props.fill}
                                    stroke={props.stroke}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        const dateStr = format(new Date(props.payload.date), "yyyy-MM-dd");

                                        setEditTarget({
                                            memberId: m.id,
                                            memberName: m.name,
                                            date: dateStr,
                                            weight: props.value ?? 0,
                                        });
                                    }}
                                />
                            )}
                        />
                    ))}
                </AreaChart>
            </ChartContainer>
            <EditWeightDialog
                target={editTarget}
                onClose={() => setEditTarget(null)}
                onSave={handleSaveWeight}
            />
        </div>
    )
}