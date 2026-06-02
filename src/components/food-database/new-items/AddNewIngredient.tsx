"use client";
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useFood, useFoodContext, UserError} from "@/contexts/FoodProvider";
import {useState} from "react";
import {v4 as uuid} from "uuid";
import {Unit} from "@/models/models"


interface AddNewIngredientProps {
    open: boolean;
    onClose: () => void;
}

export function AddNewIngredient({open, onClose}: AddNewIngredientProps) {
    let context = useFoodContext();

    interface FormIngredient {
        name: string;
        unit: Unit;
        calories: number;
    }

    const [item, setItem] = useState<FormIngredient>({
        name: "",
        unit: "g",
        calories: 0,
    });

    const [errors, setErrors] = useState<{ name?: string; calories?: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setItem((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {

        try {
            context.addIngredient({
                id: uuid(),
                name: item.name,
                unit: item.unit,
                caloriesPer100: Number(item.calories),
                deleted: false,
            });
        } catch (error: any) {
            if (error instanceof UserError)
                setErrors(error.newUserErrors)
        }

        setItem({name: "", unit: "g", calories: 0});
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add New Ingredient</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="ingredient">Ingredient</Label>
                            <Input
                                id="ingredient"
                                name="name"
                                value={item.name}
                                onChange={handleChange}
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="unit">Unit</Label>
                            <Select
                                value={item.unit}
                                onValueChange={(value: Unit) =>
                                    setItem((prev) => ({...prev, unit: value}))
                                }
                            >
                                <SelectTrigger id="unit">
                                    <SelectValue placeholder="Select unit"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="g">g</SelectItem>
                                    <SelectItem value="ml">ml</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="calories">
                                Calories per 100 {item.unit || "g/ml"}
                            </Label>
                            <Input
                                id="calories"
                                name="calories"
                                inputMode="numeric"
                                type="number"
                                value={item.calories}
                                onChange={handleChange}
                            />
                            {errors.calories && <p className="text-red-500 text-sm">{errors.calories}</p>}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit">Add</Button>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}