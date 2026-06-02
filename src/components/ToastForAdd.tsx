"use client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function ToastForAdd() {
    return (
        <Button
            onClick={() =>
                toast("Added", {
                    description: "Item Added",
                })
            }
            variant="outline"
            className="w-fit"
        >
            Add
        </Button>
    )
}