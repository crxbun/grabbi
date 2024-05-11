import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';

const CreateRecipe = () => {
    const [fileToBeSent, setFileToBeSent] = useState(null);

    const handleFileChange = (e) => {
        setFileToBeSent(e.target.files[0]);
    };

    const generateUniqueID = () => {
        let newID
        do {
            newID = Math.floor(10000 + Math.random() * 90000); // Generate random 5-digit number for id
        } while (recipeIDExists(newID)); // Keep generating until a unique ID is found
        return newID;
    };

    //BACKEND HERE
    const recipeIDExists = (id) => {
        // Check if the ID already exists within the user created recipes in some database or storage
        
    };
    const [recipeData, setRecipeData] = useState({
        id: generateUniqueID(), //generate a uniqueid for the recipe created.
        userid: null, // Placeholder for userid
        title: "",
        image: 'https://via.placeholder.com/250', // initial File input for image
        author: "",
        readyInMinutes: "",
        servings: "",
        summary: "",
        instructions: [{ step: "" }], // Initial instruction input
        ingredients: [{ name: "" }], // Initial ingredient input
    });

    useEffect(() => {
        // Fetch user info to get the userid
        getUserInfo()
            .then((userInfo) => {
                setRecipeData((prevData) => ({
                    ...prevData,
                    userid: userInfo.userid, // Set the userid from fetched user info
                }));
            })
            .catch((error) => {
                console.error("Error fetching user info:", error);
            });
    }, []);


    
    const getUserInfo = async () => {
        // Simulated function to fetch user info from backend
        // Replace this with your actual function to fetch user info
        return { userid: 1010 }; // Sample user info with userid
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const formData = new FormData();
                formData.append("title", recipeData.title);
                formData.append("author", recipeData.author);
                formData.append("image", fileToBeSent);
                formData.append("instructions", JSON.stringify(recipeData.instructions));
                formData.append("ingredients", JSON.stringify(recipeData.ingredients));
                formData.append("recipe_id", recipeData.id);
                formData.append("readyInMinutes", recipeData.readyInMinutes);
                formData.append("summary", recipeData.summary);
                formData.append("servings", recipeData.servings);

                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                };

                const res = await axios.post('/create_recipe', formData, config);

                if (res.status === 201) {
                    alert('Recipe created successfully!');
                }
                else if (res.status === 409) {
                    setRecipeData(prevRecipeData => ({
                        ...prevRecipeData,
                        id: generateUniqueID()
                    }))
                    handleSubmit(e);
                }
                else {
                    alert('There was an issue processing the recipe creation. Please try again.');
                }
            }
            catch (error) {
                console.error('Error: ', error);
            }
        }
        else {
            alert("Please fill out all fields.");
        }
    };

    const handleChange = (e, index, type) => {
        const { name, value, files } = e.target;
        if (type === "instructions") {
            const instructions = [...recipeData.instructions];
            instructions[index][name] = value;
            setRecipeData({ ...recipeData, instructions });
        } else if (type === "ingredients") {
            const ingredients = [...recipeData.ingredients];
            ingredients[index][name] = value;
            setRecipeData({ ...recipeData, ingredients });
        } else if (type === "image") {
            const allowedTypes = ["image/jpeg", "image/png"]; // Allowed image types
            const file = files[0];
            const reader = new FileReader();

            if (file && allowedTypes.includes(file.type)) {
                reader.onload = () => {
                    const base64String = reader.result;
                    setRecipeData({
                        ...recipeData,
                        image: base64String,
                    });
                };
                reader.readAsDataURL(file);
            } 
            else {
                alert("Please upload a valid image file (jpg, png).");
            }
        } else {
            setRecipeData({
                ...recipeData,
                [name]: value,
            });
        }
    };


    const handleAddField = (type) => {
        if (type === "instructions") {
            setRecipeData({
                ...recipeData,
                instructions: [...recipeData.instructions, { step: "" }],
            });
        } else if (type === "ingredients") {
            setRecipeData({
                ...recipeData,
                ingredients: [...recipeData.ingredients, { name: "" }],
            });
        }
    };

    const handleRemoveField = (index, type) => {
        if (type === "instructions") {
            const instructions = [...recipeData.instructions];
            instructions.splice(index, 1);
            setRecipeData({ ...recipeData, instructions });
        } else if (type === "ingredients") {
            const ingredients = [...recipeData.ingredients];
            ingredients.splice(index, 1);
            setRecipeData({ ...recipeData, ingredients });
        }
    };

    

    const validateForm = () => {
        // Check if any field is empty
        return Object.values(recipeData).every((value) => value !== "");
    };

    return (
        <Container>
            <h3>Create Recipe</h3>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"

                        value={recipeData.title}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <label>Image:</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/png, image/jpeg"
                        onChange={handleFileChange}

                    />
                </FormGroup>
                <FormGroup>
                    <label>Author:</label>
                    <input
                        type="text"
                        name="author"
                        value={recipeData.author}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <label>Ready in Minutes:</label>
                    <input
                        type="text"
                        name="readyInMinutes"
                        value={recipeData.readyInMinutes}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <label>Servings:</label>
                    <input
                        type="text"
                        name="servings"
                        value={recipeData.servings}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <label>Summary:</label>
                    <textarea
                        name="summary"
                        value={recipeData.summary}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </FormGroup>
                <Fieldset>
                    <legend>Instructions:</legend>
                    {recipeData.instructions.map((instruction, index) => (
                        <FieldGroup key={index}>
                            <InstructionInput
                                type="text"
                                name="step"
                                value={instruction.step}
                                onChange={(e) => handleChange(e, index, "instructions")}
                                required
                            />
                            <ActionButton className="remove" type="button" onClick={() => handleRemoveField(index, "instructions")}>
                                Remove
                            </ActionButton>
                        </FieldGroup>
                    ))}
                    <ActionButton type="button" onClick={() => handleAddField("instructions")}>
                        Add Instruction
                    </ActionButton>
                </Fieldset>
                <Fieldset>
                    <legend>Ingredients:</legend>
                    {recipeData.ingredients.map((ingredient, index) => (
                        <FieldGroup key={index}>
                            <IngredientInput
                                type="text"
                                name="name"
                                value={ingredient.name}
                                onChange={(e) => handleChange(e, index, "ingredients")}
                                required
                            />
                            <ActionButton className="remove" type="button" onClick={() => handleRemoveField(index, "ingredients")}>
                                Remove
                            </ActionButton>
                        </FieldGroup>
                    ))}
                    <ActionButton type="button" onClick={() => handleAddField("ingredients")}>
                        Add Ingredient
                    </ActionButton>
                </Fieldset>
                <SubmitButton type="submit">Create Recipe</SubmitButton>
            </Form>
        </Container>
    );
};

const Container = styled.div`
    width: 50%;
    margin: 0 auto;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const FormGroup = styled.div`
    margin-bottom: 1rem;

    label {
        font-weight: bold;
    }

    input,
    textarea {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-top: 0.5rem;
    }
`;

const Fieldset = styled.fieldset`
    margin-bottom: 1rem;

    legend {
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
`;

const FieldGroup = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
`;

const InstructionInput = styled.input`
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 0.5rem;
    margin-left: 1.5rem;
    margin-right:1.5rem;
`;

const IngredientInput = styled.input`
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 0.5rem;
    margin-left: 1.5rem;
    margin-right:1.5rem;
`;

const ActionButton = styled.button`
    background-color: #dc3545;
    color: #fff;
    border: none;
    padding: 0.3rem 0.5rem;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 1.5rem;
    margin-right:1.5rem;
    margin-bottom:1.5rem;

    &.remove{
        margin-top:1.5rem;
    }
`;

const SubmitButton = styled.button`
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    margin-bottom:7rem;
`;

export default CreateRecipe;
