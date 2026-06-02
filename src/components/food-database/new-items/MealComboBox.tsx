import * as React from "react"
import {useFoodContext} from "@/contexts/FoodProvider";
import {Input} from "@/components/ui/input";

interface MealComboBoxProps {
    onSelect: (ingredientId: string) => void;
}

export function MealComboBox({ onSelect }: MealComboBoxProps) {
    const { state } = useFoodContext();
    const [searchValue, setSearchValue] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    const filteredItems = state.ingredients
        .filter((i) => !i.deleted)
        .filter((i) =>
            searchValue === "" || i.name.toLowerCase().includes(searchValue.toLowerCase())
        );

    const handleSelect = (ingredientId: string) => {
        onSelect(ingredientId);
        setSearchValue("");
        setIsOpen(false);
    };

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={wrapperRef} className="relative w-full">
            <Input
                type="text"
                placeholder="Search ingredients..."
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
            />

            {isOpen && filteredItems.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-popover border border-input rounded-md shadow-md max-h-60 overflow-y-auto">
                    {filteredItems.map((ingredient) => (
                        <button
                            key={ingredient.id}
                            type="button"
                            className="w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground outline-none cursor-pointer"
                            onClick={() => handleSelect(ingredient.id)}
                        >
                            {ingredient.name}
                        </button>
                    ))}
                </div>
            )}

            {isOpen && searchValue !== "" && filteredItems.length === 0 && (
                <div className="absolute z-50 w-full mt-1 bg-popover border border-input rounded-md shadow-md p-3">
                    <p className="text-sm text-muted-foreground text-center">No ingredients found.</p>
                </div>
            )}
        </div>
    );
}