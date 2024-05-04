import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

function Popular() {
    const [popular, setPopular] = useState([]);

    useEffect(() => {
        getPopRecipes();
        const interval = setInterval(getPopRecipes, 5 * 60 * 60 * 1000);
        return () => clearInterval(interval);

    }, []);

    const getPopRecipes = async () => {
        const check = localStorage.getItem('popular');
        if (check) {
            let parsedCheck;
            try {
                parsedCheck = JSON.parse(check);
            } catch (error) {
                console.log("error parsing stored popular recipes", error);
                localStorage.removeItem('popular');
                return;
            }
            setPopular(JSON.parse(check));
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=67815a01ce384c598e82c73974777855&number=10`);
            if (api.ok) {
                if (data.status === "failure" && data.code === 402) {

                    console.log("Daily points limit reached");
                    return;
                }
                const data = await api.json();
                localStorage.setItem("popular", JSON.stringify(data.recipes));
                setPopular(data.recipes);
            }
        }
    }

    return (
        <Wrapper>
            <h3>Trending Recipes</h3>
            <Splide
                options={{
                    perPage: 3,
                    arrows: false,
                    pagination: false,
                    drag: "free",
                    gap: "2rem",
                }}
            >
                {popular && popular.map((recipe) => (
                    <SplideSlide key={recipe.id}>
                        <Card>
                            <img src={recipe.image} alt={recipe.title} />
                            <CardContent>
                                <p>{recipe.title}</p>
                            </CardContent>
                        </Card>
                    </SplideSlide>
                ))}
            </Splide>
        </Wrapper>
    );
}

const Wrapper = styled.div`
padding: 0 2rem;
`;

const Card = styled.div`
    position: relative;
    border-radius: 2rem;
    overflow: hidden;
    width: 100%;
    max-height:360px;
    max-width: 350px;
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
    p {
        margin: 0;
        color: white;
        font-weight: 100;
        font-size: calc(0.8rem + 0.2vw); 
        text-align: center;
    }
`;

export default Popular;
