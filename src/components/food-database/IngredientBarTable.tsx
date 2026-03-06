"use client";

import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {MoreHorizontalIcon} from "lucide-react";
import {JSX, useState} from "react";
import {useFood, useFoodContext} from "@/contexts/FoodProvider";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import EditIngredient from "@/components/food-database/EditIngredient";

export function IngredientBarTable(): JSX.Element {
    let {state} = useFoodContext();
    const {removeIngredient} = useFood();
    let items = state.ingredients.filter((i) => !i.deleted);

    const [open, setOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)

    const handleDeleteIngredient = (id: string) => {
        const confirm = window.confirm("Are you sure you want to delete this ingredient?");

        if (confirm) {
            removeIngredient(id);
        }
    }

    return (
        <div className="w-full rounded-xl border bg-background shadow-sm">
            <div className="w-full overflow-x-auto">
                <div className="max-h-[320px] overflow-y-auto">
                    <Table className="w-full min-w-[600px]">
                        <TableHeader className="sticky top-0 z-10 bg-background">
                            <TableRow>
                                <TableHead>Item</TableHead>
                                <TableHead>Calories</TableHead>
                                <TableHead className="w-[80px] text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {items.map((item) => (
                                <TableRow
                                    key={item.id}
                                    className="transition-colors hover:bg-muted/40"
                                >
                                    <TableCell className="font-medium">
                                        {item.name}
                                    </TableCell>

                                    <TableCell>
                                        {item.caloriesPer100}{item.unit}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                >
                                                    <MoreHorizontalIcon className="h-4 w-4"/>
                                                    <span className="sr-only">Open menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onSelect={() => {
                                                        setEditingId(item.id)
                                                        setOpen(true)
                                                    }}
                                                >
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => handleDeleteIngredient(item.id)}>
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <Dialog open={open} onOpenChange={(v) => {
                setOpen(v)
                if (!v) setEditingId(null)
            }}>
                {editingId && <EditIngredient id={editingId} close={() => setOpen(false)}/>}
            </Dialog>
        </div>
    )
}