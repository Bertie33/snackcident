import {Drink, Ingredient, Meal} from "@/models/models";
import {FoodAction} from "@/models/models";
import {FoodState} from "@/models/models";


export default function FoodReducer(state: FoodState, action: FoodAction): FoodState {
    switch (action.type) {

        case "HYDRATE": {
            return action.payload as FoodState;
        }

        case "ADD_DRINK": {
            const drink = action.payload
            return {
                ...state,
                drinks: [...state.drinks, drink],
            }
        }

        case "REMOVE_DRINK": {
            const {id} = action.payload as { id: string }
            return {
                ...state,
                drinks: state.drinks.filter((drink: Drink) => drink.id !== id),
            }
        }

        case "CHANGE_DRINK": {
            const {id, updates} = action.payload as { id: string; updates: Partial<Drink> }
            return {
                ...state,
                drinks: state.drinks.map((drink: Drink) =>
                    drink.id === id ? {...drink, ...updates} : drink
                ),
            }
        }

        case "ADD_INGREDIENT":
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload],
            }

        case "REMOVE_INGREDIENT":
            return {
                ...state,
                ingredients: state.ingredients.filter(
                    i => i.id !== action.payload.id
                ),
            }

        case "CHANGE_INGREDIENT":
            return {
                ...state,
                ingredients: state.ingredients.map(i =>
                    i.id === action.payload.id
                        ? { ...i, ...action.payload.updates }
                        : i
                ),
            }

        case "ADD_MEAL":
            return {
                ...state,
                meals: [...state.meals, action.payload],
            }

        case "REMOVE_MEAL":
            return {
                ...state,
                meals: state.meals.filter(
                    m => m.id !== action.payload.id),
            }

        case "CHANGE_MEAL":
            return {
                ...state,
                meals: state.meals.map(m =>
                    m.id === action.payload.id
                        ? { ...m, ...action.payload.updates }
                        : m
                ),
            }

        // case "ADD_INGREDIENT_TO_MEAL":
        //     return {
        //     }
        //
        // case "CHANGE_MEAL_INGREDIENT":
        //     return {
        //     }
        //
        // case "REMOVE_INGREDIENT_FROM_MEAL":
        //     return {
        //     }


        default:
            return state;
    }
}
