// Pagination.js
// 'use client'
const translations = {
    pagination: {
        en: { prev: "Previous", next: "Next", page: "Page" },
        es: { prev: "Anterior", next: "Siguiente", page: "Página" },
        it: { prev: "Precedente", next: "Successivo", page: "Pagina" }
    }
 };

export default function Pagination({ currentPage, totalPages, onPageChange, lang }) {
    if (totalPages <= 1) return null;

    return (
        <div className="pagination">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="pagination-button"
            >
                {translations.pagination[lang].prev}
            </button>
            <span>{translations.pagination[lang].page} {currentPage} of {totalPages}</span>
            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="pagination-button"
            >
                {translations.pagination[lang].next}
            </button>
        </div>
    );
}