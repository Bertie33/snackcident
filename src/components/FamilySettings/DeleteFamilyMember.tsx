"use client";
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import {useFamilyContext} from "@/contexts/FamilyProvider";

export function DeleteFamilyMember() {

    const {state, removeMember} = useFamilyContext();


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Delete Member</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <div className="grid gap-4 m-10" >
                    {state.familyMembers.map((member) => (
                        <div key={member.id} className="flex justify-between items-center">
                            <span>{member.name}</span>
                            <DialogClose asChild>
                                <Button  variant="destructive" onClick={() => removeMember(member.id)}>
                                    Delete
                                </Button>
                            </DialogClose>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}