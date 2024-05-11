import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Category from '../components/Category';
import '../styles/cusine.css';
import Search from "../components/Search";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

const Grid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
    grid-gap: 2rem; 
    margin-right:10rem;
    margin-left:10rem;
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

function Cuisine() {
    const [cuisine, setCuisine] = useState([]);
    let params = useParams();

    const getCuisine = async (name) => {
        const data = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=416d57353a9f485aa0cd3d81bebbedf3&cuisine=${name}&number=10`
        );
        const recipes = await data.json();
        setCuisine(recipes.results);
    };

    useEffect(() => {
        getCuisine(params.type);

        // Fetch recipes every 5 hours
        const interval = setInterval(() => {
            getCuisine(params.type);
        }, 5 * 60 * 60 * 1000);

        // Clean up interval when the component unmounts
        return () => clearInterval(interval);
    }, [params.type]);

    return (
        <div >
            <Search />

            <Category className="cusine-cards" />
            <Grid
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                {cuisine && cuisine.map((item) => (
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
        </div>
    );
}

export default Cuisine;
