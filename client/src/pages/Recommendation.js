import { useState,useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import '../styles/background.css';
import { run } from '../components/GenerateRec';
import { useLocation } from 'react-router-dom';
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: auto;
`;

const FormContainer = styled.div`
  flex: 0 0 50%;
`;

const ShoppingListContainer = styled.div`
  flex: 0 0 50%;
  position: relative;
  padding-left: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  overflow: auto;
  margin-left: 50px;
  min-height: 80vh;
  min-width:500px;
  max-width: 500px;
  min-height:75vh;
  max-height:75vh;
`;

const Title = styled.h2`
  margin: 0;
  padding-top: 20px; 
  font-size: 24px; 
  text-align: center;
`;

const RecommendationContainer = styled(motion.div)`
  max-width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  h4{
    text-align: center;
  }
`;

const RecommendationList = styled.div`
  margin-top: 20px;
  margin-right: 20px;
`;

const RecommendationItem = styled.div`
  margin-bottom: 10px;
`;

const RecommendationForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
`;

const FormInput = styled.textarea`
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
`;

const SubmitButton = styled.button`
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
`;

const ShoppingListItem = styled.li`
  margin-bottom: 10px;
  list-style: disc; 
  margin-left:20px;
`;

const Recommendation = () => {
  const [ingredients, setIngredients] = useState('');
  const [location, setLocation] = useState('');
  const [preferences, setPreferences] = useState('');
  const [result, setResult] = useState('');
  const locationState = useLocation().state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const aiResult = await run(ingredients, location, preferences);
    setResult(aiResult);
  };

  useEffect(() => {
    // Check if ingredients are passed in from the Recipe component
    if (locationState && locationState.ingredients) {
      // If yes, set the ingredients
      setIngredients(locationState.ingredients);
    }
  }, [locationState]);

  return (
    <div className="body">
      <Container>
        <FormContainer>
          <RecommendationContainer
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Generate Shopping List</h2>
            <p style={{ fontSize: '15px', textAlign: 'left', marginBottom: '20px' }}>Generate a personalized shopping list with recommendations of grocery stores to visit and specific ingredient products to purchase!</p>

            <RecommendationForm onSubmit={handleSubmit}>
              <FormLabel>
                Copy and Paste Recipe/Input Ingredients:
                <FormInput
                  rows="4"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="Enter ingredients here..."
                  required
                />
              </FormLabel>
              <FormLabel>
                Enter Your Location:
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your location..."
                  style={{ width: 'calc(100%)' }}
                  required
                />
              </FormLabel>
              <FormLabel>
                Enter Your Preferences:
                <FormInput
                  rows="4"
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                  placeholder="Enter your preferences..."
                  required
                />
              </FormLabel>
              <SubmitButton type="submit">Submit</SubmitButton>
            </RecommendationForm>
          </RecommendationContainer>
        </FormContainer>
        <ShoppingListContainer>
          <Title>My Shopping List</Title>
          {result && (
            <>
              <div>
                <h3 style={{ marginTOP: '0px', marginBottom: '0px', fontSize: '18px' }}>User Location:</h3>
                <p>{result.userLocation}</p>
              </div>
              <div>
                <h3 style={{ marginBottom: '0px', fontSize: '18px' }}>User Preferences:</h3>
                <p>{result.userPreferences}</p>
              </div>
              <h3 style={{ marginBottom: '0px', fontSize: '18px' }}>All Ingredients:</h3>
              <ul>
                {result.allIngredients.map((ingredient, index) => (
                  <ShoppingListItem key={index}>{ingredient}</ShoppingListItem>
                ))}
              </ul>
              <RecommendationList>
                <h3 style={{ marginBottom: '5px', fontSize: '18px' }}>Recommendations:</h3>
                {result.results.map((recommendation, index) => (
                  <RecommendationItem key={index}>
                    <RecommendationContainer
                      animate={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h4 style={{ fontSize: '25px', marginBottom: '3px' }}>{recommendation.ingredientName}</h4>
                      <p style={{ marginBottom: '3px' }}>
                        <strong>Store:</strong> {recommendation.store}
                      </p>
                      <p style={{ marginBottom: '3px' }}>
                        <strong>Store Description:</strong> {recommendation.description}
                      </p>
                      <p style={{ marginBottom: '3px' }}>
                        <strong>Address:</strong> {recommendation.address}
                      </p>
                      <p style={{ marginBottom: '3px' }}>
                        <strong>Product Recommendation:</strong> {recommendation.product}
                      </p>
                      <p style={{ marginBottom: '3px' }}>
                        <strong>Cost:</strong> {recommendation.cost}
                      </p>
                    </RecommendationContainer>
                  </RecommendationItem>
                ))}
              </RecommendationList>
              <h3 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '30px' }}><strong>Total Cost: {result.totalCost}</strong></h3>
            </>
          )}
        </ShoppingListContainer>
      </Container>
    </div>
  );
};

export default Recommendation;
