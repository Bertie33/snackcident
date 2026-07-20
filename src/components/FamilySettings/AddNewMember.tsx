"use client";
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
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
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group";
import {CalorieCalculator} from "@/components/FamilySettings/CalorieCalculator";

export function AddNewMember() {

    const context = useFamilyContext();
    const [date, setDate] = React.useState<Date | undefined>(undefined)
    const [open, setOpen] = React.useState(false)

    const [member, setMember] = useState({
        name: "",
        weightGoal: 0,
        calorieGoal: 0,
        age: "",
        height: 0,
        gender: Gender.PreferNotToSay,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        if (name === "name") {
            setMember(prev => ({...prev, name: value}));
        } else if (name === "weightGoal") {
            setMember(prev => ({...prev, weightGoal: Number(value)}));
        } else if (name === "calorieGoal") {
            setMember(prev => ({...prev, calorieGoal: Number(value)}));
        } else if (name === "age") {
            setMember(prev => ({...prev, age: String(value)}));
        } else if (name === "height") {
            setMember(prev => ({...prev, height: Number(value)}));
        } else if (name === "gender") {
            setMember(prev => ({...prev, gender: value as Gender}));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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

        setMember({name: "", weightGoal: 0, calorieGoal: 0, age: "", height: 0, gender: Gender.PreferNotToSay});
    };


    return (
        <Dialog>
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
                        <Input id="member-1" value={member.name} name="name" onChange={handleChange}/>
                    </div>
                    <div className="grid gap-4 my-3">
                        <Label htmlFor="weight-goal-1">Weight Goal: </Label>
                        <Input
                            type="number"
                            name="weightGoal"
                            value={member.weightGoal}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid gap-4 my-3">
                        <Label htmlFor="cal-goal-1">Calorie Goal: </Label>
                        <Input
                            type="number"
                            name="calorieGoal"
                            value={member.calorieGoal}
                            onChange={handleChange}
                        />
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
                            <InputGroupInput type="number" name="height" value={member.height} onChange={handleChange} />
                        </InputGroup>
                    </div>
                    <div className="grid gap-4 my-3">
                        <Label htmlFor="gender-1">Gender: </Label>
                        <Combobox  items={Object.values(Gender)}
                                   value={member.gender}
                                   onValueChange={(val) => setMember(prev => ({ ...prev, gender: val as Gender }))}>
                            <ComboboxInput placeholder="Select Gender" />
                            <ComboboxContent>
                                <ComboboxEmpty>No gender found.</ComboboxEmpty>
                                <ComboboxList>
                                    {(item) => (
                                        <ComboboxItem key={item} value={item}>
                                            {item}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit">Add</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}