import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import demo from './pages/demo';
import moment from 'moment'
import 'moment/locale/ru'
import Header from './components/header/header';
import home from './pages/home';
import requests from './pages/requests/requests';
import peoples from './pages/people/people';
import news from './pages/news/news';
import search from './pages/search';
import requestSingle from './pages/requests/requestSingle';
import newsSingle from './pages/news/newsSingle';
import Profile from './pages/profile/profile';
import ProfileEdit from './pages/profile/profileEdit';
import requestCreate from './pages/requests/requestCreate';
import ProfileRequests from './pages/profile/profileRequests';
import requestEdit from './pages/requests/requestEdit';
import Welcome from './pages/welcome';

import { useStore } from 'easy-peasy';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import NotFound from './pages/404';

function App(router) {
  const isAuth = useStore(store => store.auth.isAuth)
  useEffect(() => {
    // set moment locale globally
    moment.locale('ru');
  }, [])

  useEffect(() => {
    if (['/login', '/register', '/recover', '/welcome'].includes(router.location.pathname)
      && isAuth) router.history.replace('/')
    if (!['/login', '/register', '/recover', '/welcome'].includes(router.location.pathname)
      && !isAuth) router.history.replace('/welcome')
    // eslint-disable-next-line
  }, [router.location.pathname, isAuth])
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Switch>

          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />

          <Route exact path="/" component={home} />
          <Route exact path="/welcome" component={Welcome} />

          <Route exact path="/requests" component={requests} />
          <Route exact path="/requests/create" component={requestCreate} />
          <Route exact path="/requests/:id" component={requestSingle} />
          <Route exact path="/requests/:id/edit" component={requestEdit} />

          <Route exact path="/people" component={peoples} />

          <Route exact path="/news" component={news} />
          <Route exact path="/news/:id" component={newsSingle} />

          <Route path="/search" component={search} />

          <Route exact path="/profile/requests" component={ProfileRequests} />
          <Route exact path="/profile/edit" component={ProfileEdit} />
          <Route exact path="/profile/:id" component={Profile} />

          <Route path="/demo" component={demo} />

          <Route component={NotFound} />

        </Switch>
      </main>
    </div>
  );
}

export default App;