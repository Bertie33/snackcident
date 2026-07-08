"use client";
import { useFood } from "@/contexts/FoodProvider";
import { BaseBarTable } from "@/components/food-database/food-tables/BaseBarTable";
import EditDrink from "@/components/food-database/food-tables/EditDrink";
import { TableCell, TableRow } from "@/components/ui/table";
import { ActionDropdown } from "@/components/food-database/food-tables/ActionDropdown";

export function DrinkBarTable() {
    const { state } = useFood();
    const { removeDrink } = useFood();
    const items = state.drinks;

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure?")) removeDrink(id);
    };

    return (
        <BaseBarTable
            items={items}
            editComponent={(id, close) => <EditDrink id={id} close={close} />}
            renderRow={(item, onEdit) => (
                <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.calories} per 100 ml</TableCell>
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