interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <div className="p-3 border-b">
            <input
                type="text"
                placeholder="Search item..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-md border px-3 py-2 text-sm"
            />
        </div>
    );
}