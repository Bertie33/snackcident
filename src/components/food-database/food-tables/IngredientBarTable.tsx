import {useFood, useFoodContext} from "@/contexts/FoodProvider";
import {BaseBarTable} from "@/components/food-database/food-tables/BaseBarTable";
import EditIngredient from "@/components/food-database/food-tables/EditIngredient";
import {TableCell, TableRow} from "@/components/ui/table";
import {ActionDropdown} from "@/components/food-database/food-tables/ActionDropdown";

export function IngredientBarTable() {
    const { state } = useFoodContext();
    const { removeIngredient } = useFood();
    const items = state.ingredients.filter((i) => !i.deleted);

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure?")) removeIngredient(id);
    };

    return (
        <BaseBarTable
            items={items}
            editComponent={(id, close) => <EditIngredient id={id} close={close} />}
            renderRow={(item, onEdit) => (
                <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.caloriesPer100}{item.unit}</TableCell>
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