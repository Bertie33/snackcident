"use client";
import {useFamilyContext} from "@/contexts/FamilyProvider";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";


export function AddFamilyName() {
    const {state, changeFamilyName} = useFamilyContext();
    const hasName = !!state.familyName;


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">{hasName ? "Change Family Name" : "Add Family Name"}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{hasName ? "Change Family Name" : "Add Family Name"}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Family Name: </Label>
                            <Input value={state.familyName}
                                   onChange={(e) => changeFamilyName(e.target.value)}/>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit">{hasName ? "Change" : "Add"}</Button>
                        </DialogClose>
                    </DialogFooter>
            </DialogContent>
        </Dialog>


    )
}