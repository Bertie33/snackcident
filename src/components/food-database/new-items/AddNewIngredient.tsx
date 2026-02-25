import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"


export function AddNewIngredient() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">Add New Ingredient</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Ingredient</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="item-1">Ingredient: </Label>
                            <Input id="ingredient-1" name="name" defaultValue=""/>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="unit-1">Unit: </Label>
                            <Input id="unit-1" name="unit" defaultValue=""/>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="calories-1">Calories per 100 g/ml</Label>
                            <Input id="calories-1" name="calories" defaultValue=""/>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add</Button>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}