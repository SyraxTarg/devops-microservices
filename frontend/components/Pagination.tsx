"use client"

type PaginationProps = {
    currentPage: number;
    onPageChange: (page: number) => void;
    totalPages?: number;
};

export default function Pagination({ currentPage, onPageChange, totalPages }: PaginationProps) {
    return (
        <div className="flex items-center justify-center gap-4 mt-6">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg border border-gray-300 font-medium text-gray-700
                    hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                Prev
            </button>

            <span className="px-3 py-2 text-sm font-medium text-gray-800 bg-gray-100 rounded-lg">
                Page {currentPage}
            </span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={totalPages ? currentPage >= totalPages : false}
                className={`px-4 py-2 rounded-lg border border-gray-300 font-medium text-gray-700
                    hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                Next
            </button>
        </div>
    )
}
