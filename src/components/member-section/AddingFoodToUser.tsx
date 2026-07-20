import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export function AddingFoodToUser({ name, id }: { name: string, id: string }) {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">Add Food +</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add food to {name}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="item-1">Food: </Label>
                            <Input id="food-1" name="food" defaultValue="" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="quantity-1">Amount g/ml:</Label>
                            <Input id="quantity-1" name="quantity" defaultValue="" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add</Button>
                        <Button type="submit">Add to All</Button>
                        <Button type="submit">Add as Daily</Button>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}