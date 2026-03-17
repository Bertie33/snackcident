"use client"

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
import {MealComboBox} from "@/components/food-database/new-items/MealComboBox";
import {AddNewIngredient} from "@/components/food-database/new-items/AddNewIngredient";
import {useFood, useFoodContext} from "@/contexts/FoodProvider";
import {useState} from "react";
import {v4 as uuid} from "uuid";
import {MealIngredient} from "@/models/models";


export function AddNewMeal() {
    const context = useFoodContext();

    const initialState = {
        name: "",
        portions: 0,
        calories: "",
        ingredients: [] as MealIngredient[],
    };

    const [item, setItem] = useState(initialState);

    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setItem((prev) => ({
            ...prev,
            [name]: name === "portions" ? Number(value) : value,
        }));
    };

    const handleAddIngredient = (ingredientId: string) => {
        if (item.ingredients.some(i => i.ingredientId === ingredientId)) {
            console.log("Ingredient already exists");
            return;
        }

        setItem(prev => ({
            ...prev,
            ingredients: [...prev.ingredients, { ingredientId, amount: 100 }]
        }));
    };

    const handleAmountChange = (ingredientId: string, amount: number) => {
        setItem(prev => ({
            ...prev,
            ingredients: prev.ingredients.map(i =>
                i.ingredientId === ingredientId ? { ...i, amount } : i
            )
        }));
    };

    const handleRemoveIngredient = (ingredientId: string) => {
        setItem(prev => ({
            ...prev,
            ingredients: prev.ingredients.filter(i => i.ingredientId !== ingredientId)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        context.addMeal({
            id: uuid(),
            name: item.name,
            portions: item.portions,
            ingredients: item.ingredients,
        });

        setItem(initialState);

        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>

                <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setIsOpen(true)}>Add New Meal</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Meal</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label>Meal:</Label>
                            <Input
                                name="name"
                                value={item.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex flex-col gap-3 max-h-40 overflow-y-auto border rounded-md p-2">
                            {item.ingredients.length === 0 && (
                                <span className="text-sm text-muted-foreground">
                                    No ingredients added
                                </span>
                            )}

                            {item.ingredients.map((mi) => {
                                const details = context.state.ingredients.find(
                                    i => String(i.id) === String(mi.ingredientId)
                                );

                                return (
                                    <div
                                        key={mi.ingredientId}
                                        className="flex items-center gap-2 border-b pb-2 min-w-0"
                                    >
                                        <span className="flex-1 font-medium">
                                            {details?.name}
                                        </span>

                                        <Input
                                            type="number"
                                            className="w-20"
                                            value={mi.amount}
                                            onChange={(e) =>
                                                handleAmountChange(
                                                    mi.ingredientId,
                                                    Number(e.target.value)
                                                )
                                            }
                                        />

                                        <span className="text-sm text-muted-foreground">
                                            {details?.unit}
                                        </span>

                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                handleRemoveIngredient(mi.ingredientId)
                                            }
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>

                        <div onClick={(e) => e.stopPropagation()}>
                            <MealComboBox onSelect={handleAddIngredient} />
                        </div>

                        <AddNewIngredient />

                        <div className="grid gap-3">
                            <Label>Serves</Label>
                            <Input
                                type="number"
                                name="portions"
                                value={item.portions}
                                onChange={handleChange}
                            />
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