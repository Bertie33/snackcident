"use client";
import {createContext, useContext, useState, ReactNode, useEffect} from "react";
import {Drink, Ingredient, Meal} from "@/models/models";

type FoodContextType = {
    drinks: Drink[];
    ingredients: Ingredient[];
    meals: Meal[];

    addDrink: (drink: Drink) => void;
    addIngredient: (ingredient: Ingredient) => void;
    addMeal: (meal: Meal) => void;
};

const FoodContext = createContext<FoodContextType | undefined>(
    undefined
);

const STORAGE_KEYS = {
    drinks: "calorie-tracker-drinks",
    meals: "calorie-tracker-meals",
    ingredients: "calorie-tracker-ingredients",
};

function getFromStorage<T>(key: string): T[] {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
}


export function FoodProvider({children}: { children: ReactNode }) {
    const [drinks, setDrinks] = useState<Drink[]>(() =>
        getFromStorage<Drink>(STORAGE_KEYS.drinks)
    );

    const [meals, setMeals] = useState<Meal[]>(() =>
        getFromStorage<Meal>(STORAGE_KEYS.meals)
    );

    const [ingredients, setIngredients] = useState<Ingredient[]>(() =>
        getFromStorage<Ingredient>(STORAGE_KEYS.ingredients)
    );

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEYS.drinks,
            JSON.stringify(drinks)
        );
    }, [drinks]);

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEYS.meals,
            JSON.stringify(meals)
        );
    }, [meals]);

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEYS.ingredients,
            JSON.stringify(ingredients)
        );
    }, [ingredients]);


    const addDrink = (drink: Drink) => {
        setDrinks((prev) => [...prev, drink]);
    }

    const addIngredient = (ingredient: Ingredient) => {
        setIngredients((prev) => [...prev, ingredient]);
    }

    const addMeal = (meal: Meal) => {
        setMeals((prev) => [...prev, meal]);
    }

    return (
        <FoodContext.Provider
            value={{
                drinks,
                meals,
                ingredients,
                addDrink,
                addMeal,
                addIngredient,
            }}
        >
            {children}
        </FoodContext.Provider>
    );
}

export function useFood() {
    const context = useContext(FoodContext);

    if (!context) {
        throw new Error("useFood must be used within FoodProvider");
    }

    return context;
}


