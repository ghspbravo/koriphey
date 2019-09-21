import React from 'react'
import { Link } from 'react-router-dom';
import { useActions } from 'easy-peasy';

export default function SocialAuth(router) {
  const login = useActions(actions => actions.auth.login)

  let isError = false;
  // get info from url
  if (router.location && router.location.search) {
    const redirectedSearch = router.location.search

    const formated = decodeURIComponent(redirectedSearch)
    const params = {}

    formated.slice(1).split('&').forEach(item => {
      const parts = item.split("=")
      params[parts[0]] = parts[1]
    })

    login(params.token);
    router.history.push("/");
  } else {
    isError = true;
    setTimeout(() => router.history.push("/"), 5000);
  }

  return (
    <div className="container">
      <p>Авторизация в процессе...</p>
      {isError && <div>
        <p>Ошибка в процессе авторизации</p>
        <Link to="/">Вернуться на главную</Link>
      </div>}
    </div>
  )
}
