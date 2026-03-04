import * as React from "react"

import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"
import {Ingredient} from "@/components/food-database/new-items/types";

const ingredient: Ingredient[] = [
    {label: "Tomato", value: "tomato"},
    {label: "Onion", value: "onion"},
    {label: "Garlic", value: "garlic"},
]

export function MealComboBox() {
    return (
        <Combobox
            items={ingredient}
            itemToStringValue={(ingredient) => ingredient.label}
        >
            <ComboboxInput placeholder="Select a Ingredient"/>
            <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                    {(ingredient) => (
                        <ComboboxItem key={ingredient.value} value={ingredient}>
                            {ingredient.label}
                        </ComboboxItem>

                    )}
                </ComboboxList>

            </ComboboxContent>
        </Combobox>
    )
}