"use client"

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useFamilyContext} from "@/contexts/FamilyProvider";

export function ChangeFamilyMember() {

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [editedMember, setEditedMember] = useState({
        name: "",
        weightGoal: 0,
        calorieGoal: 0,
    });
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
                            <Button
                                onClick={() => {
                                    setSelectedId(member.id);
                                    setEditedMember({
                                        name: member.name,
                                        weightGoal: member.weightGoal,
                                        calorieGoal: member.calorieGoal,
                                    });
                                }}
                            >
                                Edit
                            </Button>
                        </div>
                    ))}
                </div>
                <div>
                    {selectedId && (
                        <div className="grid gap-3 mt-4">
                            <Label>Name</Label>
                            <Input
                                value={editedMember.name}
                                onChange={(e) =>
                                    setEditedMember(prev => ({
                                        ...prev,
                                        name: e.target.value,
                                    }))
                                }
                            />

                            <Label>Weight Goal</Label>
                            <Input
                                type="number"
                                value={editedMember.weightGoal}
                                onChange={(e) =>
                                    setEditedMember(prev => ({
                                        ...prev,
                                        weightGoal: Number(e.target.value),
                                    }))
                                }
                            />

                            <Label>Calorie Goal</Label>
                            <Input
                                type="number"
                                value={editedMember.calorieGoal}
                                onChange={(e) =>
                                    setEditedMember(prev => ({
                                        ...prev,
                                        calorieGoal: Number(e.target.value),
                                    }))
                                }
                            />
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button
                        disabled={!selectedId}
                        onClick={() => {
                            if (selectedId) {
                                changeMember(selectedId, editedMember);

                                setSelectedId(null);
                                setEditedMember({
                                    name: "",
                                    weightGoal: 0,
                                    calorieGoal: 0,
                                });
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