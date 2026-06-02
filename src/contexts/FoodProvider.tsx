"use client";
import { useReducer, createContext, useContext, ReactNode, useEffect } from "react"
import FoodReducer from "@/contexts/FoodReducer";
import {FoodState, Drink, Ingredient, Meal, FoodContextType, FoodAction} from "@/models/models"


const initialFoodState: FoodState = {
    drinks: [],
    ingredients: [],
    meals: [],
}


export const FoodContext = createContext<FoodContextType | undefined>(
    undefined
);

const STORAGE_KEYS = {
    drinks: "calorie-tracker-drinks",
    meals: "calorie-tracker-meals",
    ingredients: "calorie-tracker-ingredients",
};

export class UserError<T> extends Error {
    constructor(message: string,public newUserErrors: T) {
        super(message);
    }
}


export function useFoodContext() {
    return useContext(FoodContext)!;
}

function loadInitialState(): FoodState {
    if (typeof window === "undefined") return initialFoodState
    try{
        return {
            drinks: JSON.parse(
                localStorage.getItem(STORAGE_KEYS.drinks) || "[]"
            ),
            meals: JSON.parse(
                localStorage.getItem(STORAGE_KEYS.meals) || "[]"
            ),
            ingredients: JSON.parse(
                localStorage.getItem(STORAGE_KEYS.ingredients) || "[]"
            ),
        }
    }
    catch(error:any) {
        console.error(error);
        return initialFoodState;
    }

}

export function FoodProvider({ children }: { children: ReactNode }) {

    const [state, dispatch] = useReducer(
        FoodReducer,
        initialFoodState,
        loadInitialState
    )

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEYS.drinks,
            JSON.stringify(state.drinks)
        )
        localStorage.setItem(
            STORAGE_KEYS.meals,
            JSON.stringify(state.meals)
        )
        localStorage.setItem(
            STORAGE_KEYS.ingredients,
            JSON.stringify(state.ingredients)
        )
    }, [state])


    const addDrink = (drink: Drink) => {

        const newErrors: {name?: string; calories?: string} = {};
        if (!drink.name.trim()) newErrors.name = "Name is required";
        if (Number(drink.calories) <= 0) newErrors.calories = "Must be greater than 0";
        if (Object.keys(newErrors).length > 0) throw new UserError("Invalid drink", newErrors)

        dispatch({
            type: "ADD_DRINK",
            payload: drink
        })
    }

    const removeDrink = (id: string) => {
        dispatch({
            type: "REMOVE_DRINK",
            payload: { id }
        })
    }

    const changeDrink = (id: string, updates: Partial<Drink>) => {
        const newErrors: {name?: string; calories?: string} = {};
        if (updates.name !== undefined && !updates.name.trim()) newErrors.name = "Name is required";
        if (updates.calories !== undefined && Number(updates.calories) <= 0) newErrors.calories = "Must be greater than 0";
        if (Object.keys(newErrors).length > 0) throw new UserError("Invalid Drink", newErrors)


        dispatch({
            type: "CHANGE_DRINK",
            payload: { id, updates },
        })
    }

    const addIngredient = (ingredient: Ingredient) => {
        const newErrors: {name?: string; calories?: string; unit?:string} = {};
        if (!ingredient.name.trim()) newErrors.name = "Name is required";
        if (Number(ingredient.caloriesPer100) <= 0) newErrors.calories = "Must be greater than 0";
        if(ingredient.unit) newErrors.unit = "Unit is required";
        if (Object.keys(newErrors).length > 0) throw new UserError("Invalid ingredient", newErrors)

        dispatch({
            type: "ADD_INGREDIENT",
            payload: ingredient
        })
    }

    const removeIngredient = (id: string) => {
        dispatch({
            type: "REMOVE_INGREDIENT",
            payload: { id }
        })
    }

    const changeIngredient = (id: string, updates: Partial<Ingredient>) => {

        const newErrors: {name?: string; calories?: string} = {};
        if (updates.name !== undefined && !updates.name.trim()) newErrors.name = "Name is required";
        if (updates.caloriesPer100 !== undefined && Number(updates.caloriesPer100) <= 0) newErrors.calories = "Must be greater than 0";
        if (Object.keys(newErrors).length > 0) throw new UserError("Invalid Ingredient", newErrors)

        dispatch({
            type: "CHANGE_INGREDIENT",
            payload: { id, updates },
        })
    }

    const addMeal = (meal: Meal) => {

        const newErrors: {name?: string; calories?: string; ingredients?:string} = {};
        if (!meal.name.trim()) newErrors.name = "Name is required";
        if (Number(meal.caloriesPerPortion) <= 0) newErrors.calories = "Must be greater than 0";
        if(!meal.ingredients) newErrors.ingredients = "Ingredient is required";
        if(meal.ingredients.length <= 0) newErrors.ingredients = "Ingredient is required";
        if (Object.keys(newErrors).length > 0) throw new UserError("Invalid meal", newErrors)

        dispatch({
            type: "ADD_MEAL",
            payload: meal
        })
    }

    const removeMeal = (id: string) => {
        dispatch({
            type: "REMOVE_MEAL",
            payload: { id }
        })
    }

    const changeMeal = (id: string, updates: Partial<Meal>) => {
        const newErrors: {name?: string; calories?: string; ingredients?:string} = {};
        if (updates.name !== undefined && !updates.name.trim()) newErrors.name = "Name is required";
        if (updates.caloriesPerPortion !== undefined && Number(updates.caloriesPerPortion) <= 0) newErrors.calories = "Must be greater than 0";
        if (updates.ingredients !== undefined && updates.ingredients.length <= 0) newErrors.ingredients = "Ingredient is required";
        if (Object.keys(newErrors).length > 0) throw new UserError("Invalid Meal", newErrors)


        dispatch({
            type: "CHANGE_MEAL",
            payload: { id, updates },
        })
    }

    return (
        <FoodContext.Provider
            value={{
                state,
                addDrink,
                removeDrink,
                changeDrink,
                addIngredient,
                removeIngredient,
                changeIngredient,
                addMeal,
                removeMeal,
                changeMeal,
            }}
        >
            {children}
        </FoodContext.Provider>
    );
}

export function useFood() {
    const context = useContext(FoodContext)

    if (!context) {
        throw new Error("useFood must be used within FoodProvider")
    }

    return context
}


