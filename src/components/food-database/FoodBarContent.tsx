import {AddNewFoodToDB} from "@/components/food-database/AddNewFoodToDB";
import {useFoodContext} from "@/contexts/FoodProvider";
import {IngredientBarTable} from "@/components/food-database/IngredientBarTable";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export default function FoodBarContent() {

    let context = useFoodContext();

    return (
        <div className="w-full">
            <Tabs defaultValue="ingredients" className="flex w-full flex-col">
                <TabsList className="w-fit">
                    <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                    <TabsTrigger value="drinks">Drinks</TabsTrigger>
                    <TabsTrigger value="meals">Meals</TabsTrigger>
                </TabsList>

                <TabsContent value="ingredients" className="w-full">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Ingredients</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <IngredientBarTable/>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="drinks">
                    <Card>
                        <CardHeader>
                            <CardTitle>Drinks</CardTitle>
                        </CardHeader>
                    </Card>
                </TabsContent>

                <TabsContent value="meals">
                    <Card>
                        <CardHeader>
                            <CardTitle>Meals</CardTitle>
                        </CardHeader>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="flex flex-col justify-center">
                <AddNewFoodToDB/>
            </div>
        </div>
    )
}


