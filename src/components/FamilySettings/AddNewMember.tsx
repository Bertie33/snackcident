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
import {useState} from "react";
import {v4 as uuid} from "uuid";

export function AddNewMember() {

    const context = useFamilyContext();

    const [member, setMember] = useState({
        name: "",
        weightGoal:0,
        calorieGoal:0,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "name") {
            setMember(prev => ({ ...prev, name: value }));
        } else if (name === "weightGoal") {
            setMember(prev => ({ ...prev, weightGoal: Number(value) }));
        } else if (name === "calorieGoal") {
            setMember(prev => ({ ...prev, calorieGoal: Number(value) }));
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
        });

        setMember({name: "", weightGoal:0, calorieGoal:0});
    };


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" >Add New Member</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="my-4">
                        <DialogTitle>Add New Member</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 my-3">
                        <div className="grid gap-4">
                            <Label htmlFor="name-1">Name: </Label>
                            <Input id="member-1" value={member.name} name="name" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="grid gap-4 my-3">
                        <div className="grid gap-4">
                            <Label htmlFor="weight-goal-1">Weight Goal: </Label>
                            <Input
                                type="number"
                                name="weightGoal"
                                value={member.weightGoal}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="grid gap-4 my-3">
                        <div className="grid gap-4">
                            <Label htmlFor="cal-goal-1">Calorie Goal: </Label>
                            <Input
                                type="number"
                                name="calorieGoal"
                                value={member.calorieGoal}
                                onChange={handleChange}
                            />
                        </div>
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