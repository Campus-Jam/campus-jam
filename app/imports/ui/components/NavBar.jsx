import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Button, Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { ComponentIDs } from '../utilities/ids';
import './NavbarStyle.css';

const NavBar = () => {
  const { currentUser, loggedIn } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
    loggedIn: !!Meteor.user(),
  }), []);

  const [activePage, setActivePage] = useState('home');

  const handleNavClick = (page) => {
    setActivePage(page);
  };

  const menuStyle = { marginBottom: '0px' };
  const navbarClassName = loggedIn ? 'bg-dark' : 'bg-light';

  return (
    <div className="navBarStyle">
      <Navbar expand="lg" style={menuStyle} className={navbarClassName}>
        <Container>

          <Navbar.Brand as={NavLink} to="/" className="align-items-center" onClick={() => handleNavClick('/')}>
            <span style={{ fontWeight: 800, fontSize: '24px' }}>
              <Image src="/images/logo-transparent.png" width={80} style={{ marginBottom: 3 }} />
              jamb-UH-ree
            </span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls={ComponentIDs.basicNavbarNav} />

          <Navbar.Collapse id={ComponentIDs.basicNavbarNav}>
            <Nav className="me-auto justify-content-start">

              {loggedIn && (
                <>
                  <Button
                    className={`${activePage === '/artists' ? 'activeBtn' : ''} navbar-button`}
                  >
                    <Nav.Link
                      as={NavLink}
                      id={ComponentIDs.artistsMenuItem}
                      to="/artists"
                      key="artists"
                      onClick={() => handleNavClick('/artists')}
                    >
                      Artists
                    </Nav.Link>
                  </Button>

                  <Button
                    className={`${activePage === '/createJamSession' ? 'activeBtn' : ''} navbar-button`}
                  >
                    <Nav.Link
                      as={NavLink}
                      id={ComponentIDs.createJamSession}
                      to="/createJamSession"
                      key="createJamSession"
                      onClick={() => handleNavClick('/createJamSession')}
                    >
                      Add Jam Session
                    </Nav.Link>
                  </Button>
                </>
              )}

            </Nav>

            <Nav className="justify-content-end">
              {currentUser === '' ? (
                <NavDropdown id={ComponentIDs.loginDropdown} title="Login">
                  <NavDropdown.Item id={ComponentIDs.loginDropdownSignIn} as={NavLink} to="/signin" onClick={() => handleNavClick('/signin')}>
                    <PersonFill />
                    Sign-in
                  </NavDropdown.Item>
                  <NavDropdown.Item id={ComponentIDs.loginDropdownSignUp} as={NavLink} to="/signup" onClick={() => handleNavClick('/signup')}>
                    <PersonPlusFill />
                    Sign-up
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown id={ComponentIDs.currentUserDropdown} title={currentUser}>
                  <NavDropdown.Item
                    id={ComponentIDs.editProfile}
                    as={NavLink}
                    to="/editProfile"
                    key="editProfile"
                    onClick={() => handleNavClick('/editProfile')}
                  >
                    Edit Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item id={ComponentIDs.currentUserDropdownSignOutOut} as={NavLink} to="/signout" onClick={() => handleNavClick('/signout')}>
                    <BoxArrowRight />
                    {' '}
                    Sign-out
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
