import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './Navigation';
import Home from './Home';
import SignUpForm from './users/SignUpForm';
import LoginForm from './users/LoginForm';
import PlaceIndex from './places/PlaceIndex';
import NewPlaceForm from './places/NewPlaceForm';
import PlaceDetails from './places/PlaceDetails';
import EditPlaceForm from './places/EditPlaceForm';
import Error404 from './Error404';
import { CurrentUserProvider } from './contexts/CurrentUser'; 

function App() {
  return (
    <CurrentUserProvider>
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/sign-up" component={SignUpForm} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/places" component={PlaceIndex} />
          <Route exact path="/places/new" component={NewPlaceForm} />
          <Route exact path="/places/:placeId" component={PlaceDetails} />
          <Route exact path="/places/:placeId/edit" component={EditPlaceForm} />
          <Route path="/" component={Error404} />
        </Switch>
      </BrowserRouter>
    </CurrentUserProvider>
  );
}

export default App;
