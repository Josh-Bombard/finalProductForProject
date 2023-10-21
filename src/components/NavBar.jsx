import '../Stylesheets/Navbar.css'
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
} from 'reactstrap';


function NavBar() {


  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand className='pretty' href="/"><span className='brand-text'>Movie</span> <span className='fancy-text'>Reviews</span></NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to="/">
                <Button>Home</Button>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/movie-search">
                <Button>Movie Search</Button>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/users">
                <Button>Users</Button>
              </Link>
            </NavItem>
            <NavItem>
              <Link to='/sign-up'>
              <Button>Sign Up!</Button>
              </Link>
            </NavItem>
          </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;