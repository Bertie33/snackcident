"use client"

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useFamilyContext} from "@/contexts/FamilyProvider";
import React, {useState} from "react";
import {Gender} from "@/models/familyModels";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {CalorieCalculator} from "@/components/FamilySettings/CalorieCalculator";

export function ChangeFamilyMember() {

    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const [calOpen, setCalOpen] = React.useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [editedMember, setEditedMember] = useState({
        name: "",
        weightGoal: 0,
        calorieGoal: 0,
        age: "",
        height: 0,
        gender: Gender.PreferNotToSay,
    });
    const {state, changeMember} = useFamilyContext();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Edit Member</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <div className="grid gap-4 m-10">
                    {state.familyMembers.map((member) => (
                        <div key={member.id} className="flex justify-between items-center">
                            <span>{member.name}</span>
                            <Button
                                onClick={() => {
                                    setSelectedId(member.id);
                                    setEditedMember({
                                        name: member.name,
                                        weightGoal: member.weightGoal,
                                        calorieGoal: member.calorieGoal,
                                        age: member.age,
                                        height: member.height,
                                        gender: member.gender,
                                    });
                                    setDate(member.age ? new Date(member.age) : undefined);

                                }}
                            >
                                Edit
                            </Button>
                        </div>
                    ))}
                </div>
                <div>
                    {selectedId && (
                        <div className="grid gap-3 mt-4">
                            <Label>Name</Label>
                            <Input
                                value={editedMember.name}
                                onChange={(e) =>
                                    setEditedMember(prev => ({
                                        ...prev,
                                        name: e.target.value,
                                    }))
                                }
                            />

                            <Label>Weight Goal</Label>
                            <Input
                                type="number"
                                value={editedMember.weightGoal}
                                onChange={(e) =>
                                    setEditedMember(prev => ({
                                        ...prev,
                                        weightGoal: Number(e.target.value),
                                    }))
                                }
                            />

                            <Label>Calorie Goal</Label>
                            <Input
                                type="number"
                                value={editedMember.calorieGoal}
                                onChange={(e) =>
                                    setEditedMember(prev => ({
                                        ...prev,
                                        calorieGoal: Number(e.target.value),
                                    }))
                                }
                            />
                            <Label>Date of Birth</Label>
                            <Popover open={calOpen} onOpenChange={setCalOpen}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="justify-start font-normal">
                                        {date ? date.toLocaleDateString() : "Select date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        defaultMonth={date}
                                        captionLayout="dropdown"
                                        onSelect={(d) => {
                                            setDate(d);
                                            setCalOpen(false);
                                            if (d) setEditedMember(prev => ({
                                                ...prev,
                                                age: d.toISOString().split('T')[0]
                                            }));
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>

                            <Label>Height in cm</Label>
                            <Input
                                type="number"
                                value={editedMember.height}
                                onChange={(e) => setEditedMember(prev => ({...prev, height: Number(e.target.value)}))}
                            />

                            <Label>Gender</Label>
                            <Select
                                value={editedMember.gender}
                                onValueChange={(val) => setEditedMember(prev => ({ ...prev, gender: val as Gender }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(Gender).map((g) => (
                                        <SelectItem key={g} value={g}>{g}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>

                <DialogFooter>
                        <Button
                            disabled={!selectedId}
                            onClick={() => {
                                if (selectedId) {
                                    changeMember(selectedId, editedMember);
                                    setSelectedId(null);
                                    setEditedMember({ name: "", weightGoal: 0, calorieGoal: 0, age: "", height: 0, gender: Gender.PreferNotToSay });
                                    setDate(undefined);
                                }
                            }}
                        >
                            Save
                        </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}