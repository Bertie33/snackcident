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
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setMember((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        context.addMember({
            id: uuid(),
            name: member.name,
            weightHistory:new Map(),
            calorieHistory:new Map(),
        });

        setMember({name: ""});
    };


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" >Add New Member</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add New Member</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Name: </Label>
                            <Input id="member-1" value={member.name} name="name" onChange={handleChange}/>
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