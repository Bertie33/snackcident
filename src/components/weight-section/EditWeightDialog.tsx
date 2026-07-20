"use client"
import React from "react";
import {
    Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {EditWeightDialogProps} from "@/models/models";

export function EditWeightDialog({
                                     target,
                                     onClose,
                                     onSave,
                                     onDelete,
                                 }: EditWeightDialogProps) {
    const [weight, setWeight] = React.useState("");


    React.useEffect(() => {
        setWeight(target ? String(target.weight) : "");
    }, [target]);


    if (!target) return null;

    return (
        <Dialog
            open
            onOpenChange={(open) => !open && onClose()}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit weight for {target.memberName}
                    </DialogTitle>
                </DialogHeader>

                <div className="grid gap-3">
                    <Label>Date</Label>
                    <p>{target.date}</p>
                </div>

                <div className="grid gap-3">
                    <Label>Weight</Label>
                    <Input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                </div>

                <DialogFooter>

                    <Button variant="destructive" onClick={onDelete}>
                        Delete
                    </Button>

                    <Button
                        onClick={() => onSave(Number(weight))}
                    >
                        Accept
                    </Button>

                    <Button
                        variant="outline"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}