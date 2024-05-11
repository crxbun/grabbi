import { Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
    margin: 0; 
    padding: 0; 
  }
`;

const NavBar = ({ isLoggedIn, handleLogout }) => {
  const handleSignOut = () => {
    handleLogout();
  };

  return (
    <>
      <GlobalStyle />
      <Nav>
        <Logo to="/">Grabbi</Logo>
        <Menu>
          <NavItem>
            <NavLink to="/" exact>Home</NavLink>
          </NavItem>
          {isLoggedIn && (
            <>
              <NavItem>
                <NavLink to="/myfeed">My Feed</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/manage-recipes">Manage Recipes</NavLink>
              </NavItem>
            </>

          )}
          <NavItem>
            <NavLink to="/shopping-list">Annotated Shopping List</NavLink>
          </NavItem>
        </Menu>
        <Auth>
          {isLoggedIn ? (
            <>
              <AuthLink to='/login' onClick={ handleSignOut }>Sign Out</AuthLink>
              <AuthLink to="/profile/:user-id">Profile</AuthLink>

            </>
          ) : (
            <>
              <AuthLink to="/login">Login</AuthLink>
              <AuthLink to="/signup">Sign Up</AuthLink>
            </>
          )}
        </Auth>
      </Nav>
    </>
  );
};

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1c7445;
  padding: 20px 80px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
`;

const Logo = styled(Link)`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 600;
  text-decoration: none;
`;

const Menu = styled.ul`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  list-style: none;
  margin: 0 20px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  color: #fff;
  transition: 0.3s ease-in-out;

  &:hover {
    color: #dcdedd;
  }
`;

const Auth = styled.div`
  display: flex;
  align-items: center;
`;

const AuthLink = styled(Link)`
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 600;
  color: #fff;
  margin-left: 20px;
  transition: 0.3s ease-in-out;

  &:hover {
    color: #dcdedd;
  }
`;

export default NavBar;
