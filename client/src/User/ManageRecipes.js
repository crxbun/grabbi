import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getImageDataUri, displayImage } from "../utils/ImageUtils";

function ManageRecipes() {
    const [userRecipes, setUserRecipes] = useState([]);

    // useEffect(() => {
    //     // Simulated function to fetch user's posted recipes from backend
    //     const userRecipesData = fetchUserRecipes(); // Replace with your actual logic to fetch user recipes
    //     setUserRecipes(userRecipesData);
    // }, []);

    //DB/BACKEND NEEDED HERE
    const fetchUserRecipes = async () => {
        try {
            const res = await fetch('/api/user/recipes');
            if (res.ok) {
                const userRecipesData = await res.json();
                return userRecipesData;
            }
            else {
                alert('Failed to fetch user recipes!')
            }
        }
        catch (error) {
            console.error('Error fetching user recipes: ', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRecipesData = await fetchUserRecipes();
                setUserRecipes(userRecipesData);
            }
            catch (error) {
                console.error('Error fetching data: ', error);
            }
        }
        fetchData();
    }, []);

    // const fetchUserRecipes = () => {
    //     // Simulated user recipes data for testing

    //     //based on userinformation, fetch the user recipes 
    //     return [
    //         {
    //             id: 1,
    //             userid: 1010,
    //             title: "Spaghetti Carbonara",
    //             image: "https://via.placeholder.com/250",
    //             author: "John Doe",
    //             readyInMinutes: 20,
    //             servings: 4,
    //             summary: "Classic Italian pasta dish with creamy sauce.",
    //             instructions: ["1. Cook spaghetti according to package instructions...", "2...."],
    //             ingredients: ["Spaghetti", "Eggs", "Bacon", "Parmesan Cheese", "Black Pepper"],
    //         },
    //         {
    //             id: 2,
    //             userid: 1010,
    //             title: "Chicken Alfredo",
    //             image: "https://via.placeholder.com/250",
    //             author: "Jane Smith",
    //             readyInMinutes: 30,
    //             servings: 3,
    //             summary: "Creamy pasta dish with tender chicken.",
    //             instructions: ["1. Cook fettuccine according to package instructions...", "2..."],
    //             ingredients: ["Fettuccine", "Chicken Breast", "Heavy Cream", "Parmesan Cheese", "Garlic"],
    //         }, {
    //             id: 3,
    //             userid: 1010,
    //             title: "Chicken Alfredo",
    //             image: "https://via.placeholder.com/250",
    //             author: "Jane Smith",
    //             readyInMinutes: 30,
    //             servings: 3,
    //             summary: "Creamy pasta dish with tender chicken.",
    //             instructions: ["1. Cook fettuccine according to package instructions...", "2..."],
    //             ingredients: ["Fettuccine", "Chicken Breast", "Heavy Cream", "Parmesan Cheese", "Garlic"],
    //         },
    //         // Add more test recipes as needed
    //     ];
    // }

    const handleDeleteRecipe = (id, userid) => {
        // Logic to delete the recipe with the given recipe id
        alert('we want to delete recipe' + id + " from user " + userid);
        // You can implement this according to your backend or data management system
    }

    if (!userRecipes) {
        return <LoadingMessage>Loading...</LoadingMessage>;
    }

    return (
        <Wrapper>
            <h3>My Recipes</h3>
            <RecipeGrid>
                <RecipeContainer key="add-card">
                    <RecipeCard className="add-card" to="/create-recipe">
                        <p className="add-recipe">Create a New Recipe</p>
                        <span className="plus-sign">+</span>
                    </RecipeCard>
                </RecipeContainer>

                {userRecipes && userRecipes.map((recipe) => (
                    <RecipeContainer key={recipe.id}>
                        <RecipeCard to={`/user-recipe/${recipe.author}/${recipe.id}`}>
                            <img src={require(`../../../grabbi/custom_recipe_images/${recipe.id}.jpg`)} alt={recipe.title} />
                            <CardContent>
                                <p>{recipe.title}</p>
                            </CardContent>
                        </RecipeCard>
                        <DeleteButton onClick={() => handleDeleteRecipe(recipe.id, recipe.userid)}>Delete</DeleteButton>
                    </RecipeContainer>
                ))}
            </RecipeGrid>
        </Wrapper>
    );
}
const LoadingMessage = styled.div`
    text-align: center;
    font-size: 1.2rem;
    margin-top: 2rem;
`;

const Wrapper = styled.div`
    padding: 0 2rem;
    margin-left:10rem;
    margin-right:10rem;
    margin-top:4rem;
    h3{
        font-size:30px;
    }
`;

const RecipeGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 1rem;
`;

const RecipeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const RecipeCard = styled(Link)`
    border-radius: 2rem;
    overflow: hidden;
    width: 100%;
    max-width:250px;
    max-height: 250px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    &.add-card {
        background: rgba(211, 211, 211, 0.8); 
        min-height:250px;
    }
    &:hover {
        transform: scale(1.05);
    }
    .add-recipe {
        font-size: 20px;
        font-weight: bold; 
        margin-top: auto; 
        position: absolute;
        bottom: 20px; 
        color: black;
    }
    .plus-sign {
        font-size: 60px;
        color:black;
        margin-bottom: auto;
        margin-top:auto;
    }

    img {
        width: 100%;
        height: auto;
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
    width: 100%;
    text-align: center;
    p {
        margin: 0;
        color: white;
        font-weight: 100;
        font-size: calc(0.8rem + 0.2vw);
    }
`;

const DeleteButton = styled.button`
    background-color: red;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 0.5rem;
`;

export default ManageRecipes;
