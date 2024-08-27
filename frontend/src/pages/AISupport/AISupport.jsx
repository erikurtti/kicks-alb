import React, { useState } from 'react';
import './AISupport.css';

const AISupport = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        // Simulated AI suggestions
        const mockSuggestions = [
            'Try the latest Nike Air Max',
            'Check out Adidas UltraBoost',
            'How about some Converse Chuck Taylor?',
            'Explore the new Puma RS-X'
        ];

        // Simulate a delay to mimic an API call
        setTimeout(() => {
            setSuggestions(mockSuggestions);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="ai-support">
            <h2>AI Shoe Suggestion</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Ask me about shoes..."
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Get Suggestions'}
                </button>
            </form>
            <div className="suggestions">
                {suggestions.length > 0 && (
                    <ul>
                        {suggestions.map((suggestion, index) => (
                            <li key={index}>{suggestion}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AISupport;
