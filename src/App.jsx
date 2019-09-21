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
import search from './pages/search/search';
import requestSingle from './pages/requests/requestSingle';
import newsSingle from './pages/news/newsSingle';
import Profile from './pages/profile/profile';
import ProfileEdit from './pages/profile/profileEdit';
import requestCreate from './pages/requests/requestCreate';
import ProfileRequests from './pages/profile/profileRequests';
import requestEdit from './pages/requests/requestEdit';
import Welcome from './pages/welcome';

import { useStore, useActions } from 'easy-peasy';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import NotFound from './pages/404';
import MyProfile from './pages/profile/myProfile';
import Recover from './pages/auth/recover';
import Footer from './components/footer/footer';
import SocialsRegister from './pages/auth/socialsRegister';
import Policy from './pages/policy';
import SocialAuth from './pages/auth/socialAuth';

function App(router) {
  const isAuth = useStore(store => store.auth.isAuth)

  const newsList = useStore(store => store.news.newsList)
  const loadNews = useActions(actions => actions.news.loadNews)

  const requestList = useStore(store => store.requests.requestList)
  const loadRequests = useActions(actions => actions.requests.loadRequests)

  const user = useStore(store => store.profile.user)
  const getUser = useActions(actions => actions.profile.getUser)

  const userList = useStore(store => store.profile.userList)
  const getUserList = useActions(actions => actions.profile.getUserList)

  const statistics = useStore(store => store.statistics.statistics)
  const loadStatistics = useActions(actions => actions.statistics.loadStatistics)

  useEffect(() => {
    if (!isAuth) return
    !Object.values(user).length && getUser()

    !newsList.length && loadNews()
    !requestList.length && loadRequests()
    !Object.values(userList).length && getUserList()
    // eslint-disable-next-line
  }, [isAuth])

  useEffect(() => {
    !Object.values(statistics).length && loadStatistics()
    // set moment locale globally
    moment.locale('ru');
  }, [loadStatistics, statistics])

  const redirectIfUserNotAuth = () => (!['/login', '/register', '/recover', '/welcome', '/auth', '/auth/sucess', '/policy'].includes(router.location.pathname)
    && !isAuth) && router.history.replace('/welcome')

  const redirectIfUserNotAccepted = () => (!['/welcome', '/policy'].includes(router.location.pathname)
    && isAuth && user.status !== 1) && router.history.replace('/welcome')

  const redirectIfUserAccepted = () => (['/login', '/register', '/recover', '/welcome'].includes(router.location.pathname)
    && isAuth && user.status === 1) && router.history.replace('/')

  // redirect user depending on status
  useEffect(() => {
    if (isAuth !== undefined && Object.entries(user).length > 0) {
      redirectIfUserAccepted()
      redirectIfUserNotAccepted()
      redirectIfUserNotAuth()
    } else if (isAuth === false) redirectIfUserNotAuth()
    // eslint-disable-next-line
  }, [router.location.pathname, isAuth, user])

  useEffect(() => {
    window.scrollTo(0, 0)

  }, [router.location.pathname])
  return (
    <div>
      <header>
        <Header router={router} />
      </header>
      <main>
        <Switch>

          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/recover" component={Recover} />

          <Route exact path="/auth" component={SocialsRegister} />
          <Route exact path="/auth/sucess" component={SocialAuth} />

          <Route exact path="/" component={home} />
          <Route exact path="/welcome" component={Welcome} />

          <Route exact path="/requests" component={requests} />
          <Route exact path="/requests/create" component={requestCreate} />
          <Route exact path="/requests/:id" component={requestSingle} />
          <Route exact path="/requests/:id/edit" component={requestEdit} />

          <Route exact path="/people" component={peoples} />

          <Route exact path="/news" component={news} />
          <Route exact path="/news/:id" component={newsSingle} />

          <Route path="/search/:query?" component={search} />

          <Route exact path="/profile/requests" component={ProfileRequests} />
          <Route exact path="/profile/edit" component={ProfileEdit} />
          <Route exact path="/profile/my" component={MyProfile} />
          <Route exact path="/profile/:id" component={Profile} />

          <Route path="/demo" component={demo} />

          <Route excat path="/policy" component={Policy} />

          <Route component={NotFound} />

        </Switch>
      </main>

      <footer>
        <Footer></Footer>
      </footer>

      <div id="modal-root"></div>
    </div>
  );
}

export default App;