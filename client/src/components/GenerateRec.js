// node --version # Should be >= 18
// npm install @google/generative-ai

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.5-pro-latest";
//const API_KEY = process.env.API_KEY;
const API_KEY = "AIzaSyCQWSty9IvpQcOV-n3bfYVxUzjjHIcKyzg";

export async function run(ingredients, location, user_pref) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 1,
    topK: 0,
    topP: 0.95,
    maxOutputTokens: 8192,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const parts = [
    { text: "Do not include additional tips. Do not include the backslash when displaying Cost.Make it like a shopping list but still include estimations of prices of the product recommendation. Keep the text unstylized. Format like so:\n\nUser Location:\nUser Preferences:\nAll Ingredients:\nIngredient name:\nStore: \n\nStore Description:\nAddress:\nProduct Recommendation:\nCost:\n\nTotal Cost:" },
    { text: "Recipe Ingredients The user's input and parse the text to only its ingredients, no metrics." },
    { text: "User location the user's input" },
    { text: "User preferences the user's preferences" },
    { text: "Shopping list With each ingredient, provide a recommendation of where to purchase it from popular sources in their location with description alongside address and approximate distance from inputted location, a recommendation of which brands to purchase from selected recommended store, provide the cost of the product previously recommended.\n\nFinally, compile an estimation of the total cost of the shopping list based on the products recommended. \n\nDo not include additional tips. Make it like a shopping list but still include estimations of prices of the product recommendation. Keep the text unstylized. Format like so:\n\nUser Location:\nUser Preferences:\nIngredient Name:\nStore: \n\nStore Description:\nAddress:\nProduct Recommendation:\nCost:\n\nTotal Cost:" },
    { text: "Recipe Ingredients: " + ingredients },
    { text: "User location: " + location },
    { text: "User preferences: " + user_pref },
    { text: "Shopping list " },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;
  const generatedText = response.text();
  console.log(generatedText);
  // Parse the generated text and construct the shopping list object
  const shoppingList = parseShoppingList(generatedText);

  console.log(shoppingList);

  return shoppingList;
}

function parseShoppingList(text) {
  const userLocationRegex = /User Location:\s*(.*)/;
  const userPreferencesRegex = /User Preferences:\s*(.*)/;
  const allIngredientsRegex = /All Ingredients:\s*(.*)/;
  const recommendationRegex = /Ingredient name:\s*(.*?)\s*Store:\s*(.*?)\s*Store Description:\s*(.*?)\s*Address:\s*(.*?)\s*Product Recommendation:\s*(.*?)\s*Cost:\s*\\?(.*?)\s*$/gm;
  const totalCostRegex = /Total Cost:\s*\\?(.*)/;

  const userLocationMatch = text.match(userLocationRegex);
  const userPreferencesMatch = text.match(userPreferencesRegex);
  const allIngredientsMatch = text.match(allIngredientsRegex);
  const totalCostMatch = text.match(totalCostRegex);

  const userLocation = userLocationMatch ? userLocationMatch[1].trim() : "";
  const userPreferences = userPreferencesMatch ? userPreferencesMatch[1].trim() : "";
  const allIngredients = allIngredientsMatch ? allIngredientsMatch[1].split(",").map(ingredient => ingredient.trim()) : [];
  const totalCost = totalCostMatch ? totalCostMatch[1].trim() : "";

  const recommendations = [];
  let match;
  while ((match = recommendationRegex.exec(text)) !== null) {
    const recommendation = {
      ingredientName: match[1].trim(),
      store: match[2].trim(),
      description: match[3].trim(),
      address: match[4].trim(),
      product: match[5].trim(),
      cost: match[6].trim(),
    };
    recommendations.push(recommendation);
  }

  return {
    userLocation,
    userPreferences,
    allIngredients,
    results: recommendations,
    totalCost,
  };
}




