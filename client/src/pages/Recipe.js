import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";

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

const BookmarkWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom:0rem;
`;

const BookmarkButton = styled.button`
    cursor: pointer;
    font-size: 2rem;
    background: none;
    border: none;
    margin-top:0.5rem;
    margin-left: 1rem;
    
`;

const CopyButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #ffffff;
    border: 2px solid #000000;
    color: #000000;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    margin-right: 1rem;

    &:hover {
        background-color: #000000;
        color: #ffffff;
    }
`;
const apiKey = '67815a01ce384c598e82c73974777855';

function Recipe() {
    const [info, setInfo] = useState({});
    const [activeTab, setActiveTab] = useState('instructions');
    let params = useParams();
    const navigate = useNavigate();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const redirectToShoppingList = () => {
        // Redirect to Recommendation page with ingredients pre-filled
        const ingredientsString = info.extendedIngredients.map(ingredient => ingredient.original).join(', ');
        console.log(ingredientsString);

        // Redirect to Recommendation page with ingredients pre-filled as a single string
        navigate('/shopping-list', { state: { ingredients: ingredientsString } });
    };
    const checkUser = async () => {
        //backend user stuff
        //setIsBookmarked
        //setIslLoggedIn
        //get user details + setIsBookmarked +setIsLogginedIn
        setIsLoggedIn(true);
        setIsBookmarked(false);
    }

    const fetchDetails = async () => {
        const storedRecipe = localStorage.getItem(`recipe_${params.name}`);
        if (storedRecipe) {
            setInfo(JSON.parse(storedRecipe));
        } else {
            const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${apiKey}`);
            const detailData = await data.json();
            localStorage.setItem(`recipe_${params.name}`, JSON.stringify(detailData));
            setInfo(detailData);
        }
    };

    const handleBookmark = async (id,title,image) => {
        setIsBookmarked(!isBookmarked);
        try {
            if (isBookmarked) {
                const res = await fetch(`/api/user/bookmarks/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (res.ok) {
                    alert('Recipe unbookmarked successfully.');
                }
                else {
                    alert('Failed to unbookmark recipe.');
                }
            }
            else {
                const res = await fetch(`/api/user/bookmarks`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id, title, image}),
                });
                if (res.ok) {
                    alert('Recipe bookmarked successfully!');
                }
                else {
                    alert('Failed to bookmark recipe.');
                }
            }
        }
        catch (error) {
            console.error('Error bookmarking/unbookmarking recipe: ', error);
        }
        /*
        save the bookmark in the following format in db


         {recipeid,recipetitle,recipeimage}

         the user should have an array of these

         userBookmarks = [
            {recipeId1, recipetitle1,recipeimage1}
            {recipeId2,recipetitle2,recipeimage2}
            ...
         ]
        */
        // setIsBookmarked(!isBookmarked); //flips state of bookmark based on user click
        //  //backend stuff 
        // if (isBookmarked) {
        //     // If already bookmarked, remove from backend
        //     try {
        //         // Placeholder for backend action to remove bookmarked recipe
        //         alert('Recipe unbookmarked');
        //     } catch (error) {
        //         console.error("Failed to unbookmark recipe: ", error);
        //     }
        // } else {
        //     // If not bookmarked, add to backend
        //     try {
        //         // Placeholder for backend action to add bookmarked recipe
        //         alert('Recipe bookmarked');
        //     } catch (error) {
        //         console.error("Failed to bookmark recipe: ", error);
        //     }
        // }
    };

    const copyUrlToClipboard1 = () => {
        // Copy the URL to the clipboard
        navigator.clipboard.writeText(info.sourceUrl)
            .then(() => {
                alert("URL copied to clipboard!");
            })
            .catch((error) => {
                console.error("Failed to copy URL to clipboard: ", error);
            });
    };
    const copyUrlToClipboard2 = () => {
        // Copy the URL to the clipboard
        navigator.clipboard.writeText(info.spoonacularSourceUrl)
            .then(() => {
                alert("URL copied to clipboard!");
            })
            .catch((error) => {
                console.error("Failed to copy URL to clipboard: ", error);
            });
    };

    const goBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        checkUser();
        fetchDetails();
    }, [params.name]);

    return (
        <DetailWrapper>
            <RecipeInfo>
                <TitleWrapper>
                    <h2>
                        {info.title}
                    </h2>
                </TitleWrapper>
                <RoundedImage src={info.image} alt={info.title} />
                {isLoggedIn && (
                    <BookmarkWrapper>
                        <h3><strong>Bookmark this Recipe:</strong></h3>
                        {isBookmarked ? (
                            <BookmarkButton onClick={() => handleBookmark(info.id, info.title, info.image)}>
                                <FaBookmark />
                            </BookmarkButton>
                        ) : (
                            <BookmarkButton onClick={()=>handleBookmark(info.id,info.title,info.image)}>
                                <FaRegBookmark />
                            </BookmarkButton>
                        )}
                    </BookmarkWrapper>
                )}

                <h3 dangerouslySetInnerHTML={{ __html: '<strong>Source: </strong>' + info.sourceName }}></h3>
                <h3>
                    <CopyButton onClick={copyUrlToClipboard1}>Copy URL</CopyButton>
                    <CopyButton onClick={copyUrlToClipboard2}>Copy Spoonacular URL</CopyButton>
                </h3>
                <h3 dangerouslySetInnerHTML={{ __html: '<strong>Ready in: </strong>' + info.readyInMinutes + ' minutes & <strong>Serves for:</strong> ' + info.servings }}></h3>
                <h3 dangerouslySetInnerHTML={{ __html: info.summary }}></h3>
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
                {activeTab === "instructions" && (
                    <div>
                        <h3 dangerouslySetInnerHTML={{ __html: info.instructions }}></h3>
                    </div>
                )}
                {activeTab === "ingredients" && (

                    <div>
                        <Button className="List"onClick={redirectToShoppingList}>Generate Shopping List</Button>

                        <ul>
                            {info.extendedIngredients && info.extendedIngredients.map((ingredient) => (
                                <li key={ingredient.id}>{ingredient.original}</li>
                            ))}
                        </ul>
                    </div>


                )}
            </Info>
        </DetailWrapper>
    )
}

export default Recipe;
