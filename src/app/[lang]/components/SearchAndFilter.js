export default function SearchAndFilter(
    {
        onSearch,
        onLetterSelect,
        selectedLetter,
        searchTerm,
        onPageChange,
        lang
    }) {
    const alphabet = '#ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const translations = {
        searchPlaceholder: {
            en: "Search cocktails...",
            es: "Buscar cócteles...",
            it: "Cerca cocktail..."
        }
    };

    const handleLetterSelect = (letter) => {
        onPageChange(1); // Reset to page 1
        onSearch(''); // Clear search
        onLetterSelect(letter === selectedLetter ? '' : letter);
    };

    const handleSearch = (value) => {
        onPageChange(1); // Reset to page 1
        onLetterSelect(''); // Clear letter filter
        onSearch(value);
    };

    const handleReset = () => {
        onPageChange(1); // Reset to page 1
        onSearch('');
        onLetterSelect('');
    };

    return (
        <div className="search-filter-container">
            {/* SEARCH BOX */}
            <div className="search-box">
                <input
                    type="text"
                    placeholder={translations.searchPlaceholder[lang]}
                    onChange={(e) => handleSearch(e.target.value)}
                    value={searchTerm || ''} // Add this
                    className="search-input"
                />
                {searchTerm && (
                    <button
                        onClick={() => handleSearch('')}
                        className="clear-button"
                    >
                        ×
                    </button>
                )}
            </div>

            {/* LETTER NAVIGATION */}
            {/* <div className="letter-filter"> */}
            <div className={`letter-filter ${selectedLetter ? 'has-reset' : ''}`}>
                {selectedLetter && (
                    <button
                        onClick={handleReset}
                        className="letter-button reset"
                    >
                        ×
                    </button>
                )}
                {alphabet.map(letter => (
                    <button
                        key={letter}
                        onClick={() => handleLetterSelect(letter)}
                        className={`letter-button ${selectedLetter === letter ? 'active' : ''}`}
                    >
                        {letter}
                    </button>
                ))}
            </div>
        </div>
    );
}