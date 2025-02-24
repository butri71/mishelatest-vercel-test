'use client'

import Link from 'next/link'
import Image from "next/image";
import { useState } from 'react';

import SearchAndFilter from '../components/SearchAndFilter';
import Pagination from '../components/Pagination';
import './recipes.css';

export default function CocktailCard({ cocktails, locale, type }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLetter, setSelectedLetter] = useState('');
    const itemsPerPage = 12;


    const filteredCocktails = cocktails.filter(cocktail => {
        // Check if search term matches cocktail name
        const matchesSearch = cocktail.cocktail.toLowerCase().includes(searchTerm.toLowerCase());

        // Check if letter filter matches first letter of cocktail name
        const matchesLetter = !selectedLetter ||
            (selectedLetter === '#' ? /^\d/.test(cocktail.cocktail) :
                cocktail.cocktail.toLowerCase().startsWith(selectedLetter.toLowerCase()));

        return matchesSearch && matchesLetter;
    });

    const totalPages = Math.ceil(filteredCocktails.length / itemsPerPage);
    const currentCocktails = filteredCocktails.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // console.log("CocktailCard searchTerm: ",searchTerm)    
    return (
        <>
           
            <SearchAndFilter
                onSearch={setSearchTerm}
                onLetterSelect={setSelectedLetter}
                selectedLetter={selectedLetter}
                searchTerm={searchTerm}
                onPageChange={setCurrentPage}
                lang={locale}
            />            
            <div className="cocktail-card-grid">
                {currentCocktails.map((post) => {
                    const glassImage = `${post.glass.value + "-" + post.colour.value + ".png"}`;
                    return (
                        <article key={post.slug} className="recipe-card">
                            <Link
                                // href={`/${locale}/${type}/${post.slug}?id=${post.cocktailId}`}
                                href={`/${locale}/${type}/${post.slug}/${post.cocktailId}`}
                                className="recipe-card-link">
                                {/* <div className="recipe-image-container1"> */}
                                <h2 className="card-city-name">{post.cocktail}</h2>
                                {/* </div> */}
                                <div className='card-content-container'>
                                    <div className="glass-image-container">
                                        <Image
                                            src={`/images/glasses/${glassImage}`}
                                            alt={glassImage}
                                            className="card-image"
                                            width={100}
                                            height={100}
                                            priority={false}
                                        />
                                    </div>
                                    <div>
                                        {post.ingredients.slice(0, 2).map((item, index) => (
                                            <div className="ingredients-tags" key={index}>
                                                <div className="ingredients-tags-item">
                                                    {item.slice(0, 20)}
                                                </div>
                                            </div>
                                        ))}
                                        {post.ingredients.length > 2 && (
                                            <div className="ingredients-tags">
                                                <div className="ingredients-tags-item">
                                                    ...
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </article>
                    );
                })}
            </div>

            {/* PAGINATION */}          
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                lang={locale}
            />           
        </>
    );
}
