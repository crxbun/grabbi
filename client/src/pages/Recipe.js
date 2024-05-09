import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Recipe() {
    const [info, setInfo] = useState({});
    const [activeTab, setActiveTab] = useState('instructions');
    let params = useParams();
    const navigate = useNavigate();

    // const fetchDetails = async () => {
    //     const storedRecipe = localStorage.getItem(`recipe_${params.name}`);
    //     if (storedRecipe) {
    //         setInfo(JSON.parse(storedRecipe));
    //     } else {
    //         const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=67815a01ce384c598e82c73974777855`);
    //         const detailData = await data.json();
    //         localStorage.setItem(`recipe_${params.name}`, JSON.stringify(detailData));
    //         setInfo(detailData);
    //     }
    // };

    const goBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        const fetchDetails = async () => {
            const storedRecipe = localStorage.getItem(`recipe_${params.name}`);
            if (storedRecipe) {
                setInfo(JSON.parse(storedRecipe));
            } else {
                const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=67815a01ce384c598e82c73974777855`);
                const detailData = await data.json();
                localStorage.setItem(`recipe_${params.name}`, JSON.stringify(detailData));
                setInfo(detailData);
            }
        };

        fetchDetails();
    }, [params.name]);

    return (
        <DetailWrapper>
            <RecipeInfo>
                <h2>{info.title}</h2>
                <RoundedImage src={info.image} alt={info.title} />
                <h3 dangerouslySetInnerHTML={{ __html: '<strong>Source: </strong>' + info.sourceName }}></h3>
                <h3>
                    <a href={info.sourceUrl} target="_blank" rel="noopener noreferrer">URL: {info.sourceUrl}</a>
                </h3>                <h3 dangerouslySetInnerHTML={{ __html: '<strong>Ready in: </strong>' + info.readyInMinutes + ' minutes & <strong>Serves for:</strong> ' + info.servings }}></h3>
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
                    <ul>
                        {info.extendedIngredients.map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.original}</li>
                        ))}
                    </ul>
                )}
            </Info>
        </DetailWrapper>
    )
}

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
    }
    h3 {
        font-size: 1rem;
        margin-bottom:1rem;
        margin-top: 1rem; /* Adjust the space between headings */
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
    margin-botton:2rem;
`;

const GoBackButton = styled(Button)`
    margin-right: 0;
`;

const RoundedImage = styled.img`
    border-radius: 30px;
`;

export default Recipe;
