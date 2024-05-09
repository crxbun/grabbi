
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Search from "../components/Search";
import { Link } from "react-router-dom";
function SearchResult() {

    const [results, setResults] = useState([]);
    let params = useParams();

    const getSearch = async (name) => {
        const data = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=67815a01ce384c598e82c73974777855&query=${name}&number=10`
        );
        const recipes = await data.json();
        setResults(recipes.results);
    };

    useEffect(() => {
        getSearch(params.search);

        // Fetch recipes every 5 hours
        const interval = setInterval(() => {
            getSearch(params.search);
        }, 5 * 60 * 60 * 1000);

        // Clean up interval when the component unmounts
        return () => clearInterval(interval);
    }, [params.search]);

    return (
        <Wrapper >
            <Search />
            <h1>Showing results for {params.search}</h1>

            <Grid className="search-cards">
                {results && results.map((item) => (
                    <Card key={item.id}>
                        <Link to={'/recipe/' + item.id}>
                            <img src={item.image} alt={item.title} />
                            <CardContent>
                                <p>{item.title}</p>
                            </CardContent>
                        </Link>
                    </Card>
                ))}
            </Grid>
        </Wrapper>
    )
}
const Wrapper = styled.div`    
    text-align: center;
`;


const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    grid-gap: 2rem; 
    
    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
    }
`;

const Card = styled.div`
    position: relative;
    border-radius: 2rem;
    overflow: hidden;
    width: 100%;
    max-width: 400px; 
    max-height: 400px; 
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
export default SearchResult;