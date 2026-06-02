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
import {useFood, useFoodContext, UserError} from "@/contexts/FoodProvider";
import {useState} from "react";
import {v4 as uuid} from "uuid";
import {MealIngredient} from "@/models/models";
import {calculateMealCaloriesPerPortion} from "@/utils/calculateCalories";
import {AddNewIngredient} from "@/components/food-database/new-items/AddNewIngredient";


export function AddNewMeal() {
    const context = useFood();
    const initialState = {
        name: "",
        portions: 0,
        calories: "",
        ingredients: [] as MealIngredient[],
    };

    const [item, setItem] = useState(initialState);
    const [isOpen, setIsOpen] = useState(false);
    const [addIngredientOpen, setAddIngredientOpen] = useState(false);

    const [errors, setErrors] = useState<{ name?: string; portions?: string }>({});

    const handleChange = (e: any) => {
        const {name, value} = e.target;

        setItem((prev) => ({
            ...prev,
            [name]: name === "portions" ? Number(value) : value,
        }));
    };

    const handleAddIngredient = (ingredientId: string) => {
        setItem(prev => ({
            ...prev,
            ingredients: [
                ...prev.ingredients,
                {
                    ingredientId,
                    amount: 0,
                }
            ]
        }));
    };

    const handleAmountChange = (ingredientId: string, amount: number) => {
        setItem(prev => ({
            ...prev,
            ingredients: prev.ingredients.map(i =>
                i.ingredientId === ingredientId ? {...i, amount} : i
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

        const caloriesPerPortion = calculateMealCaloriesPerPortion(
            item.ingredients,
            context.state.ingredients,
            item.portions
        );

        try {
            context.addMeal({
                id: uuid(),
                name: item.name,
                portions: item.portions,
                caloriesPerPortion,
                ingredients: item.ingredients,
            });
            setItem(initialState);
            setIsOpen(false);
        } catch (error: any) {
            if (error instanceof UserError)
                setErrors(error.newUserErrors)
        }



    };

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>

                <DialogTrigger asChild>
                    <Button className="w-full" onClick={() => setIsOpen(true)}>
                        Add New Meal
                    </Button>
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
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
                                <MealComboBox onSelect={handleAddIngredient}/>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setAddIngredientOpen(true)}
                            >
                                Add New Ingredient
                            </Button>


                            <div className="grid gap-3">
                                <Label>Serves</Label>
                                <Input
                                    type="number"
                                    name="portions"
                                    value={item.portions}
                                    onChange={handleChange}
                                />
                                {errors.portions && <p className="text-red-500 text-sm">{errors.portions}</p>}
                            </div>

                            {item.portions > 0 && item.ingredients.length > 0 && (
                                <div className="grid gap-3 p-3 bg-muted rounded-md">
                                    <Label>Calories per Portion</Label>
                                    <span className="text-2xl font-semibold">
                                        {calculateMealCaloriesPerPortion(
                                            item.ingredients,
                                            context.state.ingredients,
                                            item.portions
                                        )} cal
                                    </span>
                                </div>
                            )}
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
            <AddNewIngredient
                open={addIngredientOpen}
                onClose={() => setAddIngredientOpen(false)}
            />
        </div>
    );
}