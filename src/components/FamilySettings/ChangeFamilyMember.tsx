"use client"

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useFamilyContext} from "@/contexts/FamilyProvider";

export function ChangeFamilyMember() {

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [newName, setNewName] = useState("")
    const {state, changeMember} = useFamilyContext();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Edit Member</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <div className="grid gap-4 m-10">
                    {state.familyMembers.map((member) => (
                        <div key={member.id} className="flex justify-between items-center">
                            <span>{member.name}</span>
                            <Button onClick={() => {
                                setSelectedId(member.id);
                                setNewName(member.name)
                            }}>
                                Edit
                            </Button>
                        </div>
                    ))}
                </div>
                <div>
                    {selectedId && (
                        <div className="grid gap-3 mt-4">
                            <Label>New Name:</Label>
                            <Input value={newName} onChange={(e) => setNewName(e.target.value)}/>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button
                        disabled={!selectedId}
                        onClick={() => {
                            if (selectedId) {
                                changeMember(selectedId, {name: newName});
                                setSelectedId(null);
                                setNewName("");
                            }
                        }}
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}