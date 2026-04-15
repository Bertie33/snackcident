"use client";

import {useFood} from "@/contexts/FoodProvider";
import { useState } from "react";
import {
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


export default function EditDrink({id, close}: { id: string; close: () => void }) {

    let {state} = useFood();
    const {changeDrink} = useFood();

    let item = state.drinks.find((i) => i.id === id);

    interface FormIngredient {
        name: string
        calories: number
    }

    if (!item) {
        return null;
    }

    const [drink, setDrink] = useState<FormIngredient>({
        name: item.name,
        calories: item.calories
    });

    const handleChange = (e:any) => {
        const {name, value} = e.target;

        setDrink((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        changeDrink(id, {
            name: drink.name,
            calories: Number(drink.calories),
        });

        close()
    };



    return (
        <>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="m-10">
                        <DialogTitle>Edit {item.name}</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="ingredient">Edit Name</Label>
                            <Input
                                id="ingredient"
                                placeholder={drink.name}
                                name="name"
                                value={drink.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="calories">
                                Calories per 100ml
                            </Label>
                            <Input
                                id="calories"
                                name="calories"
                                inputMode="numeric"
                                type="number"
                                value={drink.calories}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit">Save</Button>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </>
    )
}