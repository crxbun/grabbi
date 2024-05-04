import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/search.css';

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    navigate(`/search/${input}`);
  };

  return (
    <div className="container">
      <SearchContainer onSubmit={submit}>
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
      </SearchContainer>
    </div>
  );
}



const SearchContainer = styled.form`
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8); 
  padding: 10px;
  border-radius: 5px;
  .search-icon {
    margin-right: 10px;
  }
  input {
    border: none;
    font-size: 1rem;
    color: black;
    padding: 10px;
    border-radius: 5px;
    outline: none;
    width: 600px; 
  }
`;

export default Search;
