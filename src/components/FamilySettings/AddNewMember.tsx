"use client";
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useFamilyContext} from "@/contexts/FamilyProvider";
import React, {useState} from "react";
import {v4 as uuid} from "uuid";
import {Gender} from "@/models/familyModels";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem,ComboboxList} from "@/components/ui/combobox";
import {InputGroup, InputGroupInput} from "@/components/ui/input-group";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export function AddNewMember() {

    const context = useFamilyContext();
    const [date, setDate] = React.useState<Date | undefined>(undefined)
    const [open, setOpen] = React.useState(false)
    const [dialogOpen, setDialogOpen] = useState(false);
    const [error, setError] = useState("");

    const [member, setMember] = useState({
        name: "",
        weightGoal: 0,
        calorieGoal: undefined as number | undefined,
        age: "",
        height: 0,
        gender: Gender.Male,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        if (name === "name") {
            setMember(prev => ({...prev, name: value}));
        } else if (name === "weightGoal") {
            setMember(prev => ({...prev, weightGoal: Number(value)}));
        } else if (name === "calorieGoal") {
            setMember(prev => ({
                ...prev,
                calorieGoal: value === "" ? undefined : Number(value),
            }));
        } else if (name === "age") {
            setMember(prev => ({...prev, age: String(value)}));
        } else if (name === "height") {
            setMember(prev => ({...prev, height: Number(value)}));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!member.name.trim()) {
            setError("Name is required");
            return;
        }


        if (member.weightGoal <= 0) {
            setError("Please enter a valid weight goal");
            return;
        }

        if (!member.age) {
            setError("Please select a date of birth");
            return;
        }

        if (member.height <= 0) {
            setError("Please enter a valid height");
            return;
        }


        setError("");

        context.addMember({
            id: uuid(),
            name: member.name,
            weightHistory: new Map(),
            calorieHistory: new Map(),
            weightGoal: member.weightGoal,
            calorieGoal: member.calorieGoal,
            age: member.age,
            height: member.height,
            gender: member.gender,
        });

        setDate(undefined);
        setError("");
        setDialogOpen(false);

        setMember({
            name: "",
            weightGoal: 0,
            calorieGoal: undefined,
            age: "",
            height: 0,
            gender: Gender.Male,
        });
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="default">Add New Member</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="my-4">
                        <DialogTitle>Add New Member</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 my-3">
                        <Label htmlFor="name-1">Name: </Label>
                        <Input
                            id="member-1"
                            value={member.name}
                            name="name"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="grid gap-4 my-3">
                        <Label htmlFor="weight-goal-1">Weight Goal: </Label>
                        <Input
                            type="number"
                            name="weightGoal"
                            value={member.weightGoal}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="grid gap-4 my-3">
                        <Label htmlFor="cal-goal-1">Calorie Goal : </Label>
                        <Input
                            type="number"
                            name="calorieGoal"
                            value={member.calorieGoal ?? ""}
                            onChange={handleChange}
                        />
                        <div className="text-xs">(Optionally you can use the calorie calculator after you have added the member and made at least one weight entry!)</div>
                    </div>
                    <div className="grid gap-4 my-3">
                        <Label htmlFor="age-1">Date of Birth: </Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" id="date" className="justify-start font-normal">
                                    {date ? date.toLocaleDateString() : "Select date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    defaultMonth={date}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                        setDate(date)
                                        setOpen(false)
                                        if (date) setMember(prev => ({...prev, age: date.toISOString().split("T")[0]}))
                                        }
                                    }

                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid gap-4 my-3">
                        <Label htmlFor="height-1">Height in cm: </Label>
                        <InputGroup>
                            <InputGroupInput
                                type="number"
                                name="height"
                                value={member.height}
                                onChange={handleChange}
                                required
                            />
                        </InputGroup>
                    </div>
                    <div className="grid gap-4 my-3">
                        <Label htmlFor="gender-1">Gender: </Label>
                        <Select
                            value={member.gender}
                            onValueChange={(val) =>
                                setMember(prev => ({
                                    ...prev,
                                    gender: val as Gender
                                }))
                            }
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
                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}
                    <DialogFooter>
                            <Button type="submit">Add</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}