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
import {useFood, useFoodContext, UserError} from "@/contexts/FoodProvider";
import React, {useState} from "react";
import {v4 as uuid} from "uuid";


export function AddNewDrink() {

    let context = useFood();

    const [item, setItem] = useState({
        name: "",
        calories: ""
    })

    const [errors, setErrors] = useState<{ name?: string; calories?: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setItem((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        try {
            context.addDrink({
                id: uuid(),
                name: item.name,
                calories: Number(item.calories),
            });
            setItem({name: "", calories: ""});
        } catch (error: any) {
            if (error instanceof UserError)
                setErrors(error.newUserErrors)
        }

    };


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add New Drink</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add New Drink</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 my-3">
                        <div className="grid gap-3">
                            <Label htmlFor="item-1">Drink Name: </Label>
                            <Input id="drink-1" value={item.name} name="name" onChange={handleChange}/>
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="calories-1">Calories per 100ml</Label>
                            <Input id="calories-1" inputMode="numeric" name="calories" value={item.calories}
                                   type="number" onChange={handleChange}/>
                            {errors.calories && <p className="text-red-500 text-sm">{errors.calories}</p>}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add</Button>
                        <DialogClose asChild>
                            <Button variant="outline">Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}