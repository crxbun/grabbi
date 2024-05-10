import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate ,useParams} from "react-router-dom";



const UserRecipe = () => {
    const [recipe, setRecipe] = useState(null);
    const [activeTab, setActiveTab] = useState('instructions');
    const navigate = useNavigate();
    const { userId, recipeId } = useParams(); //extracts userID and recipeID from params

    useEffect(() => {
        // Simulated function to fetch recipe details from backend using userId and recipeId
        fetchRecipeDetails(userId, recipeId)
            .then((recipeData) => {
                setRecipe(recipeData);
            })
            .catch((error) => {
                console.error("Error fetching recipe details:", error);
            });
    }, [userId, recipeId]);



    const fetchRecipeDetails = async (userId, recipeId) => {
        console.log(userId+","+recipeId);
        /*

        Based on userID and recipeID, fetch the user recipe details from db. 
        I assume you would just need the userid and recipeid to search for it in db
        */
        // Simulated function to fetch recipe details from backend
        // You should replace this with your actual backend 
        // This function should return the recipe details for the given userId and recipeId
        // For demonstration purposes, I'll just return a static recipe object
        return {
            id: recipeId,
            userid: userId,
            title: "Spaghetti Carbonara",
            image: "https://via.placeholder.com/250",
            author: "John Doe",
            readyInMinutes: 20,
            servings: 4,
            summary: "Classic Italian pasta dish with creamy sauce.",
            instructions: ["1. Cook spaghetti according to package instructions...", "2...."],
            ingredients: ["Spaghetti", "Eggs", "Bacon", "Parmesan Cheese", "Black Pepper"],
        };
    };

    const redirectToShoppingList = () => {
        // Redirect to Recommendation page with ingredients pre-filled
        const ingredientsString = recipe.ingredients.join(', ');

        // Redirect to Recommendation page with ingredients pre-filled as a single string
        navigate('/shopping-list', { state: { ingredients: ingredientsString } });
    };



    const goBack = () => {
        navigate(-1);
    }
    if (!recipe) {
        return <LoadingMessage>Loading...</LoadingMessage>;
    }
    return (
        <DetailWrapper>
            <RecipeInfo>
                <TitleWrapper>
                    <h2>{recipe.title}</h2>
                </TitleWrapper>
                <RoundedImage src={recipe.image} alt={recipe.title} />
                <h3><strong>Author: </strong>{recipe.author}</h3>
                <h3>
                    <strong>Ready in: </strong>{recipe.readyInMinutes} minutes & <strong>Serves for:</strong> {recipe.servings}
                </h3>
                <h3 dangerouslySetInnerHTML={{ __html: recipe.summary }}></h3>
            </RecipeInfo>
            <Info>
                <Button className={activeTab === 'instructions' ? 'active' : ''}
                    onClick={() => setActiveTab('instructions')}
                >
                    Instructions
                </Button>
                <Button className={activeTab === 'ingredients' ? 'active' : ''}
                    onClick={() => setActiveTab("ingredients")}
                >
                    Ingredients
                </Button>
                <GoBackButton onClick={goBack}>
                    Go Back
                </GoBackButton>
                <div>
                    {activeTab === "instructions" && (
                        <div>
                            <h3>Instructions:</h3>
                            <ol>
                                {recipe.instructions.map((instruction, index) => (
                                    <li key={index}>{instruction}</li>
                                ))}
                            </ol>
                        </div>
                    )}
                    {activeTab === "ingredients" && (
                        <div>
                            <Button className="List" onClick={redirectToShoppingList}>Generate Shopping List</Button>

                            <h3>Ingredients:</h3>
                            <ul>
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </Info>
        </DetailWrapper>
    );
};
const LoadingMessage = styled.div`
    text-align: center;
    font-size: 1.2rem;
    margin-top: 2rem;
`;
const DetailWrapper = styled.div`
    margin-top: 5rem;
    margin-bottom: 5rem;
    display: flex;
    justify-content: space-between;
    margin-left: 10rem;
    margin-right: 10rem;

    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }

    h2 {
        margin-bottom: 2rem;
        font-size: 1.5rem;
        display: flex;
        align-items: center; 
    }
    h3 {
        font-size: 1rem;
        margin-bottom: 1rem;
        margin-top: 0.5rem; 
    }

    li {
        font-size: 1rem;
        margin-top: 2rem;
        line-height: 2.5rem;
        margin-left: 2rem;
    }

    ul {
        margin-top: 2rem;
    }
  
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const TitleWrapper = styled.div`
    display: flex;
`;

const RecipeInfo = styled.div`
    width: 45%;
`;

const Info = styled.div`
    width: 45%;
`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
    margin-top: 4rem;
    margin-bottom: 2rem;

    &.List{
        margin-top:0rem;
        margin-bottom:0rem;
        padding: 12px 20px;
        background-color: #1c7445;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s;
      
        &:hover {
          background-color: #145231;
        }        
    }
`;

const GoBackButton = styled(Button)`
    margin-right: 0;
`;

const RoundedImage = styled.img`
    border-radius: 30px;
`;


export default UserRecipe;
