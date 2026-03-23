"use client";
import { useFood, useFoodContext } from "@/contexts/FoodProvider";
import { BaseBarTable } from "@/components/food-database/food-tables/BaseBarTable";
import EditMeal from "@/components/food-database/food-tables/EditMeal";
import { TableCell, TableRow } from "@/components/ui/table";
import { ActionDropdown } from "@/components/food-database/food-tables/ActionDropdown";

export function MealBarTable() {
    const { state } = useFoodContext();
    const { removeMeal } = useFood();
    const items = state.meals;

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure?")) removeMeal(id);
    };

    return (
        <BaseBarTable
            items={items}
            headers={["Item", "Portions", "Calories/Portion", "Actions"]}
            editComponent={(id, close) => <EditMeal id={id} close={close} />}
            renderRow={(item, onEdit) => (
                <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.portions}</TableCell>
                    <TableCell>{item.caloriesPerPortion ?? 0} cal</TableCell>
                    <TableCell className="text-right">
                        <ActionDropdown
                            onEdit={() => onEdit(item.id)}
                            onDelete={() => handleDelete(item.id)}
                        />
                    </TableCell>
                </TableRow>
            )}
        />
    );
}