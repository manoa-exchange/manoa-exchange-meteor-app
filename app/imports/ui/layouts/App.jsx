import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import ListPost from '../pages/ListPost';
import ListPostAdmin from '../pages/ListPostAdmin';
import AddPost from '../pages/AddPost';
import EditPost from '../pages/EditPost';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import LoadingSpinner from '../components/LoadingSpinner';
import MyProfile from '../pages/MyProfile';
import ModerationPage from '../pages/ModerationPage';
import CloudinaryPage from '../pages/CloudinaryPage';
import ListSavedPost from '../pages/ListSavedPost';
import ProfilePicture from '../pages/ProfilePicture';
import UpdateIdNumber from '../components/UpdateIdNumber';
import FilterPost from '../pages/FilterPost';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/cloudinarypage" element={<CloudinaryPage />} />
          <Route path="/uploadwidget" element={<ProfilePicture />} />
          <Route path="/idNumber" element={<UpdateIdNumber />} />
          <Route path="/home" element={<ProtectedRoute><ListPost /></ProtectedRoute>} />
          <Route path="/filter/:name" element={<ProtectedRoute><FilterPost /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><ListPost /></ProtectedRoute>} />
          <Route path="/savedposts" element={<ProtectedRoute><ListSavedPost /></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute><AddPost /></ProtectedRoute>} />
          <Route path="/edit/:_id" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
          <Route path="/moderation" element={<ProtectedRoute><ModerationPage /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminProtectedRoute ready={ready}><ListPostAdmin /></AdminProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
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

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

export default App;
