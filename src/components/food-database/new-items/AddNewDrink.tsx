"use client";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useFood} from "@/contexts/FoodProvider";
import {useState} from "react";
import { v4 as uuid } from "uuid";


export function AddNewDrink() {

    const { addDrink } = useFood();

    const [item,setItem] = useState({
        name:"",
        cals:""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setItem((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addDrink({
            id: uuid(),
            name: item.name,
            calories: item.cals,
        });

        setItem({ name: "", cals: "" });
    };


    return (
        <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Add New Drink</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add New Drink</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="item-1">Drink: </Label>
                            <Input id="drink-1"  defaultValue="" name="name" onChange={handleChange} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="calories-1">Calories per 100ml</Label>
                            <Input id="calories-1" name="cals" defaultValue="" onChange={handleChange} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add</Button>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                    </form>
                </DialogContent>
        </Dialog>
    )
}