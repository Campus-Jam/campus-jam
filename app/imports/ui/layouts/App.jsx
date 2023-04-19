import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import Home from '../pages/Home';
import BrowseArtists from '../pages/BrowseArtists';
import BrowseGigs from '../pages/BrowseGigs';
import EditProfile from '../pages/EditProfile';

import CreateJamSession from '../pages/CreateJamSession';
import ViewProfile from '../pages/ViewProfile';

/* Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  // eslint-disable-next-line no-unused-vars
  const { currentUser, loggedIn } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
    loggedIn: !!Meteor.user(),
  }));

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />

        {/* Conditional Root Directory */}
        <Routes>
          {loggedIn ? (
            <Route exact path="/" element={<BrowseGigs />} />
          ) : (
            <Route exact path="/" element={<Landing />} />
          )}
          {/* UNPROTECTED PUBLIC FACING ROUTES */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />

          {/* REGULAR USER ROUTES, MUST BE SIGNED IN */}
          <Route path="/artists" element={<ProtectedRoute><BrowseArtists /></ProtectedRoute>} />
          <Route path="/jamsessions" element={<ProtectedRoute><BrowseGigs /></ProtectedRoute>} />
          <Route path="/editprofile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path="/createjamsession" element={<ProtectedRoute><CreateJamSession /></ProtectedRoute>} />
          <Route path="/viewProfile" element={<ProtectedRoute><ViewProfile /></ProtectedRoute>} />

          {/* ADMIN ROUTES */}

          {/* PAGES FOR STUFF GOING WRONG */}
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  return isLogged ? children : <Navigate to="/signin" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Home />,
};

export default App;
