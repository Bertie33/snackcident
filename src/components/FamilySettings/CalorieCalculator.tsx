import {FamilyContext, useFamilyContext} from "@/contexts/FamilyProvider";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {FamilyMember, Gender} from "@/models/familyModels";


export function CalorieCalculator() {
    const {state, makeCalorieGoal} = useFamilyContext();
    const [selectedMemberId, setSelectedMemberId] = useState<string>();
    const selectedMember = state.familyMembers.find(
        member => member.id === selectedMemberId
    );
    const latestWeight = selectedMember
        ? [...selectedMember.weightHistory.entries()]
            .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
            .at(0)?.[1].weight
        : undefined;


    const age = selectedMember?.age ? new Date().getFullYear() - new Date(selectedMember.age).getFullYear() : undefined;

    const difference =
        selectedMember && latestWeight !== undefined
            ? latestWeight - selectedMember.weightGoal
            : undefined;

    const goalText =
        difference === undefined
            ? ""
            : difference > 2
                ? "Weight loss"
                : difference < 0
                    ? "Weight gain"
                    : "Weight maintenance";


    const bmr =
        selectedMember && latestWeight !== undefined && age !== undefined
            ? calculateBMR(
                latestWeight,
                selectedMember.height,
                age,
                selectedMember.gender
            )
            : undefined;

    const maintenance = bmr
        ? {
            noMovement: Math.round(bmr * 1.2),
            someMovement: Math.round(bmr * 1.375),
            lotsOfMovement: Math.round(bmr * 1.725),
        }
        : undefined;

    let recommended = maintenance;

    if (maintenance && difference !== undefined) {
        if (difference > 0) {
            recommended = {
                noMovement: maintenance.noMovement - 500,
                someMovement: maintenance.someMovement - 500,
                lotsOfMovement: maintenance.lotsOfMovement - 500,
            };
        } else if (difference < 0) {
            recommended = {
                noMovement: maintenance.noMovement + 300,
                someMovement: maintenance.someMovement + 300,
                lotsOfMovement: maintenance.lotsOfMovement + 300,
            };
        }
    }

    const setCalorieGoal = (goal: number) => {
        if (!selectedMember) return;

        makeCalorieGoal(selectedMember.id, goal);
    };


    function calculateBMR(
        weight: number,
        height: number,
        age: number,
        gender: Gender
    ) {
        const base = 10 * weight + 6.25 * height - 5 * age;

        return gender === Gender.Male
            ? base + 5
            : base - 161;
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Calculate Calories</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <div className="grid gap-4 m-10 justify-items-center">
                    <div className="font-bold">Calorie Calculator</div>
                    <Select
                        value={selectedMemberId}
                        onValueChange={setSelectedMemberId}
                    >
                        <SelectTrigger className="font-bold" id="unit">
                            <SelectValue placeholder="Select Member"/>
                        </SelectTrigger>
                        <SelectContent>
                            {state.familyMembers.map((member) => (
                                <SelectItem
                                    key={member.id}
                                    value={member.id}
                                >
                                    {member.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className="grid gap-2">
                        {selectedMember && (
                            <>
                                <div>Current Calorie Goal: {selectedMember.calorieGoal} kcal/day</div>
                                <div>Latest Weight: {latestWeight} kg</div>
                                <div>Goal: {selectedMember.weightGoal} kg</div>
                                <div>Assumed Goal: {goalText}</div>
                                <div className="text-center">--------------</div>
                            </>
                        )}
                        {recommended && (
                            <>
                                <div className="flex items-center gap-2">
                                    <span>Sedentary: {recommended.noMovement} kcal/day</span>
                                    <Button
                                        size="sm"
                                        onClick={() => setCalorieGoal(recommended.noMovement)}
                                    >
                                        Use
                                    </Button>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span>Some movement: {recommended.someMovement} kcal/day</span>
                                    <Button
                                        size="sm"
                                        onClick={() => setCalorieGoal(recommended.someMovement)}
                                    >
                                        Use
                                    </Button>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span>A lot of movement: {recommended.lotsOfMovement} kcal/day</span>
                                    <Button
                                        size="sm"
                                        onClick={() => setCalorieGoal(recommended.lotsOfMovement)}
                                    >
                                        Use
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}