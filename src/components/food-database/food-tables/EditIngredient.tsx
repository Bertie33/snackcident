"use client";

import {useFood, useFoodContext, UserError} from "@/contexts/FoodProvider";
import {useState} from "react";
import {
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Unit} from "@/models/models";


export default function EditIngredient({id, close}: { id: string; close: () => void }) {

    let {state} = useFoodContext();
    const {changeIngredient} = useFood();
    const [errors, setErrors] = useState<{ name?: string; calories?: string }>({});

    let item = state.ingredients.find((i) => i.id === id);

    interface FormIngredient {
        name: string
        unit: Unit
        calories: number
    }

    if (!item) {
        return null;
    }

    const [ingredient, setIngredient] = useState<FormIngredient>({
        name: item.name,
        unit: item.unit,
        calories: item.caloriesPer100
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setIngredient((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            changeIngredient(id, {
                name: ingredient.name,
                unit: ingredient.unit,
                caloriesPer100: Number(ingredient.calories),
            });
            close();
        } catch (error: any) {
            if (error instanceof UserError)
                setErrors(error.newUserErrors)
        }

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
                                placeholder={ingredient.name}
                                name="name"
                                value={ingredient.name}
                                onChange={handleChange}
                            />
                            {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="unit">Edit Unit</Label>
                            <Select
                                value={ingredient.unit}
                                onValueChange={(value: Unit) =>
                                    setIngredient((prev) => ({...prev, unit: value}))
                                }
                            >
                                <SelectTrigger id="unit">
                                    <SelectValue placeholder={ingredient.unit}/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="g">g</SelectItem>
                                    <SelectItem value="ml">ml</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="calories">
                                Calories per 100 {ingredient.unit || "g/ml"}
                            </Label>
                            <Input
                                id="calories"
                                name="calories"
                                inputMode="numeric"
                                type="number"
                                value={ingredient.calories}
                                onChange={handleChange}
                            />
                            {errors.calories && <p className="text-destructive text-sm">{errors.calories}</p>}
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