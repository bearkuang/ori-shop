import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

interface SearchModalProps {
    onClose: () => void;
}

interface Item {
    id: number;
    item_name: string;
    item_price: number;
}

const SearchModal: React.FC<SearchModalProps> = ({ onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Item[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm) {
                fetchSearchResults();
            } else {
                setSearchResults([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const fetchSearchResults = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/items/search/?q=${searchTerm}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleItemClick = (itemId: number) => {
        navigate(`/item/${itemId}/info`);
        onClose();
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20 z-50">
            <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg">
                <form onSubmit={handleSearch} className="p-4">
                    <div className="flex">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="검색어를 입력하세요"
                            className="w-full p-2 border rounded-l-lg"
                            autoFocus
                        />
                        <button type="submit" className="bg-[#9c524a] text-white p-2 rounded-r-lg">
                            <FaSearch />
                        </button>
                    </div>
                </form>
                <div className="max-h-96 overflow-y-auto">
                    {searchResults.map((item) => (
                        <div
                            key={item.id}
                            className="p-4 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleItemClick(item.id)}
                        >
                            <h3 className="font-semibold">{item.item_name}</h3>
                            <p>{item.item_price.toLocaleString()} 원</p>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t">
                    <button onClick={onClose} className="w-full p-2 bg-gray-200 rounded-lg">
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;