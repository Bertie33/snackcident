"use client";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React, {useState} from "react";
import {Dialog} from "@/components/ui/dialog";
import {SearchBar} from "@/components/food-database/food-tables/SearchBar";
import {PaginationControls} from "@/components/food-database/food-tables/PaginationControls";



interface TableItem{
    id: string;
    name: string;
}

interface BaseBarTableProps<T extends TableItem>{
    items: T[];
    renderRow: (item: T, onEdit: (id:string) => void) => React.ReactNode;
    editComponent: (id: string, close: () => void) => React.ReactNode;
}

export function BaseBarTable<T extends TableItem>({ items, renderRow, editComponent }: BaseBarTableProps<T>) {
    const [search, setSearch] = useState("");
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(5);
    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const displayedItems = search
        ? items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))
        : items.slice(startIndex, endIndex);

    return (
        <div className="w-full rounded-xl border bg-background shadow-sm">
            <div className="w-full overflow-x-auto">
                <div className="max-h-[320px] overflow-y-auto">
                    <SearchBar value={search} onChange={setSearch} />
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
                                <React.Fragment key={item.id}>
                                    {renderRow(item, (id: string) => {
                                        setEditingId(id);
                                        setOpen(true);
                                    })}
                                </React.Fragment>
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
            <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setEditingId(null); }}>
                {editingId && editComponent(editingId, () => setOpen(false))}
            </Dialog>
        </div>
    );
}