"use client";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import FoodBarContent from "@/components/food-database/FoodBarContent";


export default function FoodBar() {


    return (

        <div className="w-full">
            <Card className="mx-auto w-full max-w-sm">
                <CardContent>
                    <Collapsible className="data-[state=open]:bg-muted rounded-md">
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="group w-full">
                                Food Database
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm">
                            <div>
                                <FoodBarContent/>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </CardContent>
            </Card>

        </div>

    )
}