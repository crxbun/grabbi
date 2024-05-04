import styled from "styled-components";
import { FaBurger } from "react-icons/fa6";
import { GiNoodles } from "react-icons/gi";
import { FaPizzaSlice } from "react-icons/fa";
import { GiFastNoodles } from "react-icons/gi";
import { GiTacos } from "react-icons/gi";
import { BiSolidSushi } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const CircleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CircularIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 8vw; 
  height: 8vw; 
  max-width: 50px; 
  max-height: 50px;
  border-radius: 50%;
  background-color: inherit;
`;

const List = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0rem;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 1.5rem;
  text-decoration: none;
  background: white;
  width: 8.3vw; 
  height: 8.3vw; 
  max-width: 6.3rem; 
  max-height: 6.3rem; 
  cursor: pointer;
  transform: scale(0.8);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);

  h4 {
    color: black;
    font-size: 0.75rem;
    margin-top: 0.5rem; 
    transition: outline 0.3s ease;
    outline: none;
  }

  &:focus h4 {
    outline: 2px solid black; 
  }

  svg {
    color: black;
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    svg {
      font-size: 1.2rem; 
    }

    h4 {
      font-size: 0.6rem; 
    }

    width: 10vw; 
    height: 10vw; 
    max-width: 6.3rem; 
    max-height: 6.3rem; 
  }

  &.active {
    background: linear-gradient(to right, #1c7445, #42a16e);
    svg {
      color: white;
    }

    h4 {
      font-weight: 500;
      color: white;
      text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
      outline: none;
    }
  }
`;

function Category() {
  return (
    <List>
      <StyledNavLink to="/cusine/American">
        <CircleContainer>
          <CircularIcon>
            <FaBurger size={30} />
          </CircularIcon>
          <h4>American</h4>
        </CircleContainer>
      </StyledNavLink>
      <StyledNavLink to="/cusine/Italian">
        <CircleContainer>
          <CircularIcon>
            <FaPizzaSlice size={25} />
          </CircularIcon>
          <h4>Italian</h4>
        </CircleContainer>
      </StyledNavLink>
      <StyledNavLink to="/cusine/Mexican">
        <CircleContainer>
          <CircularIcon>
            <GiTacos size={30} />
          </CircularIcon>
          <h4>Mexican</h4>
        </CircleContainer>
      </StyledNavLink>
      <StyledNavLink to="/cusine/Chinese">
        <CircleContainer>
          <CircularIcon>
            <GiFastNoodles size={30} />
          </CircularIcon>
          <h4>Chinese</h4>
        </CircleContainer>
      </StyledNavLink>
      <StyledNavLink to="/cusine/Japanese">
        <CircleContainer>
          <CircularIcon>
            <BiSolidSushi size={30} />
          </CircularIcon>
          <h4>Japanese</h4>
        </CircleContainer>
      </StyledNavLink>
      <StyledNavLink to="/cusine/Vietnamese">
        <CircleContainer>
          <CircularIcon>
            <GiNoodles size={30} />
          </CircularIcon>
          <h4>Vietnamese</h4>
        </CircleContainer>
      </StyledNavLink>
    </List>
  );
}

export default Category;
