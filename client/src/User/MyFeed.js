import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

const apiKey = '67815a01ce384c598e82c73974777855';

const MyFeed = () => {
    const [userRecipes, setUserRecipes] = useState([]);
    const [userBookmarks, setUserBookmarks] = useState([]);
    const [userFeed,setUserFeed]=useState([]);

    // Simulated function to fetch user's posted recipes from backend
    const fetchUserRecipes = () => {
        // Simulated user recipes data for testing
        //if there aren't any, set
        return [
            {
                id: 1,
                userid: 1010,
                title: "Spaghetti Carbonara",
                image: "https://via.placeholder.com/250",
                author: "John Doe",
                readyInMinutes: 20,
                servings: 4,
                summary: "Classic Italian pasta dish with creamy sauce.",
                instructions: ["1. Cook spaghetti according to package instructions...", "2...."],
                ingredients: ["Spaghetti", "Eggs", "Bacon", "Parmesan Cheese", "Black Pepper"],
            },
            {
                id: 2,
                userid: 1010,
                title: "Chicken Alfredo",
                image: "https://via.placeholder.com/250",
                author: "Jane Smith",
                readyInMinutes: 30,
                servings: 3,
                summary: "Creamy pasta dish with tender chicken.",
                instructions: ["1. Cook fettuccine according to package instructions...", "2..."],
                ingredients: ["Fettuccine", "Chicken Breast", "Heavy Cream", "Parmesan Cheese", "Garlic"],
            },
            {
                id: 3,
                userid: 1010,
                title: "Chicken Alfredo",
                image: "https://via.placeholder.com/250",
                author: "Jane Smith",
                readyInMinutes: 30,
                servings: 3,
                summary: "Creamy pasta dish with tender chicken.",
                instructions: ["1. Cook fettuccine according to package instructions...", "2..."],
                ingredients: ["Fettuccine", "Chicken Breast", "Heavy Cream", "Parmesan Cheese", "Garlic"],
            },
            // Add more test recipes as needed
        ];
    }

    const fetchUserBookmarks = () => {
        // Simulated user bookmarks data for testing
        return [

            {
                id: 716429,
                title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
                image: "https://img.spoonacular.com/recipes/716429-556x370.jpg"

            }


        ]; // Initially, with some test data
    }

    const fetchSimilarRecipes = async (recipeId) => {
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/similar?apiKey=${apiKey}&number=2`);
            if (response.ok) {
                const similarRecipes = await response.json();
                return similarRecipes;
            } else {
                console.error("Failed to fetch data from API");
                return [];
            }

        } catch (error) {
            console.error("Failed to fetch similar recipes for recipe ID", recipeId, error);
            return [];
        }
    };

    useEffect(() => {
        const userRecipesData = fetchUserRecipes();
        const userBookmarkData = fetchUserBookmarks();
        setUserRecipes(userRecipesData);
        setUserBookmarks(userBookmarkData);
    }, []);

    useEffect(() => {
        const fetchSimilarRecipesForUserBookmarks = async () => {
            const updatedUserFeed = [];

            for (const bookmark of userBookmarks) {
                const similarRecipes = await fetchSimilarRecipes(bookmark.id);
                updatedUserFeed.push(...similarRecipes);
            }

            setUserFeed(updatedUserFeed);
        };

        if (userBookmarks.length > 0) {
            fetchSimilarRecipesForUserBookmarks();
        }
    }, [userBookmarks]);

    return (
        <div>
            
            <Wrapper>
                <h1 style={{marginTop:'40px',textAlign:'center'}}>My Feed</h1>
                <h3 >My Created Recipes</h3>
                {userRecipes.length === 0 ? (
                    <NoRecipesText>No user recipes created</NoRecipesText>
                ) : (
                    <Splide
                        options={{
                            perPage: 4,
                            arrows: false,
                            pagination: false,
                            drag: "free",
                            gap: '1rem'
                        }}
                    >
                        {userRecipes.map((recipe) => (
                            <SplideSlide key={recipe.id}>
                                <Card to={`/user-recipe/${recipe.userid}/${recipe.id}`}>
                                    <img src={recipe.image} alt={recipe.title} />
                                    <CardContent>
                                        <p>{recipe.title}</p>
                                    </CardContent>
                                </Card>
                            </SplideSlide>
                        ))}
                    </Splide>
                )}
            </Wrapper>
            <Wrapper>
                <h3>My Bookmarked Recipes</h3>
                {userBookmarks.length === 0 ? (
                    <NoRecipesText>No user bookmarks</NoRecipesText>
                ) : (
                    <Splide
                        options={{
                            perPage: 4,
                            arrows: false,
                            pagination: false,
                            drag: "free",
                            gap: '1rem'
                        }}
                    >
                        {userBookmarks.map((recipe) => (
                            <SplideSlide key={recipe.id}>
                                <Card to={`/recipe/` + recipe.id}>
                                    <img src={recipe.image} alt={recipe.title} />
                                    <CardContent>
                                        <p>{recipe.title}</p>
                                    </CardContent>
                                </Card>
                            </SplideSlide>
                        ))}
                    </Splide>
                )}
            </Wrapper>
            <Wrapper className="bottom">
                <h3>Recommended Recipes</h3>
                {userFeed.length === 0 ? (
                    <NoRecipesText>No user bookmarks to recommend similar recipes</NoRecipesText>
                ) : (
                    <Splide
                        options={{
                            perPage: 4,
                            arrows: false,
                            pagination: false,
                            drag: "free",
                            gap: '1rem'
                        }}
                    >
                        {userFeed.map((recipe) => (
                            <SplideSlide key={recipe.id}>
                                <Card to={`/recipe/` + recipe.id}>
                                    <img src={recipe.image} alt={recipe.title} />
                                    <CardContent>
                                        <p>{recipe.title}</p>
                                    </CardContent>
                                </Card>
                            </SplideSlide>
                        ))}
                    </Splide>
                )}
            </Wrapper>
        </div>
    )

}

const Wrapper = styled.div`
    padding: 0 2rem;
    margin-left:10rem;
    margin-right:10rem;

    &.bottom{
        margin-bottom:5rem;
    }
    
`;
const NoRecipesText = styled.p`
    font-size: 1.2rem;
    text-align: center;
    margin-top: 20px;
    color: #555;
`;

const Card = styled(Link)`
    position: relative;
    border-radius: 2rem;
    overflow: hidden;
    width: 100%;
    max-height: 200px;
    max-width: 250px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: block;
    text-decoration: none;
    color: inherit;

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
    text-align: center;

    p {
        margin: 0;
        color: white;
        font-weight: 100;
        font-size: calc(0.8rem + 0.2vw);
    }
`;

export default MyFeed;
