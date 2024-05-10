import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";
const apiKey = '67815a01ce384c598e82c73974777855';

function Desserts() {
    const [desserts, setDesserts] = useState([]);

    useEffect(() => {
        getDessertRecipes();
        const interval = setInterval(getDessertRecipes, 5 * 60 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const getDessertRecipes = async () => {
        try {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=6&tags=desserts`);
            if (api.ok) {
                const data = await api.json();
                localStorage.setItem("desserts", JSON.stringify(data.recipes));
                setDesserts(data.recipes);
            } else {
                console.error("Failed to fetch data from API");
                const storedData = localStorage.getItem('desserts');
                if (storedData) {
                    setDesserts(JSON.parse(storedData));
                }
            }
        } catch (error) {
            console.error("Error fetching data from API:", error);
            const storedData = localStorage.getItem('desserts');
            if (storedData) {
                setDesserts(JSON.parse(storedData));
            }
        }
    }

    return (
        <Wrapper>
            <h3>Dessert Recipes</h3>
            <Splide
                options={{
                    perPage: 4,
                    arrows: false,
                    pagination: false,
                    drag: "free",
                    gap: "1rem",
                }}
            >
                {desserts && desserts.map((recipe) => (
                    <SplideSlide key={recipe.id}>
                        <Card>
                            <Link to={'/recipe/' + recipe.id}>

                                <img src={recipe.image} alt={recipe.title} />
                                <CardContent>
                                    <p>{recipe.title}</p>
                                </CardContent>
                            </Link>
                        </Card>
                    </SplideSlide>
                ))}
            </Splide>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
    padding: 0 2rem; 
`;

const Card = styled.div`
    position: relative;
    border-radius: 2rem;
    overflow: hidden;
    width: 100%;
    max-width: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    img {
        width: 100%;
        height: auto;
        display: block;
        border-radius: 2rem;
    }
`;

const CardContent = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 1rem;
    border-bottom-left-radius: 1.5rem;
    border-bottom-right-radius: 1.5rem;

    p {
        margin: 0;
        color: white;
        font-weight: 100;
        font-size: calc(0.8rem + 0.2vw); 
        text-align: center;
    }
`;

export default Desserts;
