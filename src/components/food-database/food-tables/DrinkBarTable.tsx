"use client";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
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
import {Dialog} from "@/components/ui/dialog";
import EditDrink from "@/components/food-database/food-tables/EditDrink";
import {SearchBar} from "@/components/food-database/food-tables/SearchBar";
import {PaginationControls} from "@/components/food-database/food-tables/PaginationControls";

export function DrinkBarTable(): JSX.Element {
    const {state} = useFoodContext();
    const {removeDrink} = useFood();
    const items = state.drinks.filter((i) => i);

    const [search, setSearch] = useState("");

    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(5);

    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleSearch = (value: string) => {
        setSearch(value);
        if (value === "") {
            setStartIndex(0);
            setEndIndex(5);
        }
    };

    const handleDeleteDrink = (id: string) => {
        if (window.confirm("Are you sure you want to delete this drink?")) {
            removeDrink(id);
        }
    };

    const displayedItems = search
        ? items.filter((i) =>
            i.name.toLowerCase().includes(search.toLowerCase())
        )
        : items.slice(startIndex, endIndex);

    return (
        <div className="w-full rounded-xl border bg-background shadow-sm">
            <div className="w-full overflow-x-auto">
                <div className="max-h-[320px] overflow-y-auto">
                    <SearchBar value={search} onChange={setSearch}/>
                    <Table className="w-full min-w-[600px]">
                        <TableHeader className="sticky top-0 z-10 bg-background">
                            <TableRow>
                                <TableHead>Item</TableHead>
                                <TableHead>Calories</TableHead>
                                <TableHead className="w-[80px] text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {displayedItems.map((item) => (
                                <TableRow
                                    key={item.id}
                                    className={`transition-colors hover:bg-muted/40 ${
                                        search ? "border-l-4 border-red-500" : ""
                                    }`}
                                >
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>{item.calories}ml</TableCell>
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
                                                        setEditingId(item.id);
                                                        setOpen(true);
                                                    }}
                                                >
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onSelect={() => handleDeleteDrink(item.id)}
                                                >
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <PaginationControls
                        startIndex={startIndex}
                        endIndex={endIndex}
                        total={items.length}
                        rowsPerPage={5}
                        onPrevious={() => {
                            setStartIndex(Math.max(0, startIndex - 5));
                            setEndIndex(Math.max(5, endIndex - 5));
                        }}
                        onNext={() => {
                            setStartIndex(startIndex + 5);
                            setEndIndex(endIndex + 5);
                        }}
                    />

                </div>
            </div>

            <Dialog
                open={open}
                onOpenChange={(v) => {
                    setOpen(v);
                    if (!v) setEditingId(null);
                }}
            >
                {editingId && <EditDrink id={editingId} close={() => setOpen(false)}/>}
            </Dialog>
        </div>
    )
        ;
}