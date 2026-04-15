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



function loadInitialState(): FoodState {
    if (typeof window === "undefined") return initialFoodState

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
        dispatch({
            type: "CHANGE_DRINK",
            payload: { id, updates },
        })
    }

    const addIngredient = (ingredient: Ingredient) => {
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
        dispatch({
            type: "CHANGE_INGREDIENT",
            payload: { id, updates },
        })
    }

    const addMeal = (meal: Meal) => {
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


