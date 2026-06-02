import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationControlsProps {
    startIndex: number;
    endIndex: number;
    total: number;
    rowsPerPage: number;
    onPrevious: () => void;
    onNext: () => void;
}

export function PaginationControls({
                                       startIndex,
                                       endIndex,
                                       total,
                                       rowsPerPage,
                                       onPrevious,
                                       onNext,
                                   }: PaginationControlsProps) {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        className={startIndex === 0 ? "pointer-events-none opacity-50" : undefined}
                        onClick={onPrevious}
                    />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext
                        className={endIndex >= total ? "pointer-events-none opacity-50" : undefined}
                        onClick={onNext}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}