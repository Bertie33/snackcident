"use client"
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Calendar} from "@/components/ui/calendar"
import {ChevronDownIcon} from "lucide-react"
import {format} from "date-fns"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import React from "react";
import {useFamilyContext} from "@/contexts/FamilyProvider";


export function AddingWeightToUser({ name, id }: { name: string, id: string }) {

    const { addWeight } = useFamilyContext();
    const [date, setDate] = React.useState<Date>();
    const [weight, setWeight] = React.useState("");
    const [open, setOpen] = React.useState(false)
    const [dialogOpen, setDialogOpen] = React.useState(false)

    function handleSubmit() {
        if (!date || !weight) return;
        addWeight(id, format(date, "yyyy-MM-dd"), Number(weight));
        setDialogOpen(false);
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">Add Weight +</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Updating weight for {name}</DialogTitle>
                    </DialogHeader>

                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="secondary"
                                data-empty={!date}
                                className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                            >
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                <ChevronDownIcon data-icon="inline-end"/>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(d) => { setDate(d); setOpen(false); }}
                                defaultMonth={date}
                            />
                        </PopoverContent>
                    </Popover>


                    <div className="grid gap-3">
                        <Label htmlFor="quantity-1">Weight in kg:</Label>
                        <Input id="quantity-1" name="quantity" value={weight} onChange={
                            e => setWeight(e.target.value)} />
                    </div>

                    <DialogFooter>
                        <Button type="button" onClick={handleSubmit}>Accept</Button>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                    </DialogFooter>

                </DialogContent>
            </form>
        </Dialog>
    )
}