import React from "react";
import Login from "./components/Login";
import Recipe from "./components/Recipe";
import Home from "./components/Home";
import RecipePost from "./components/RecipePost";
import { Route, Routes } from "react-router-dom";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config.js";

function App() {
  
  const [isAuth, setIsAuth] = React.useState(false);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
    })
  }

  return (
    <>
      <nav className="nav">
        <Link to="/" className="site-name">M&M Recipe Book</Link>
        <ul>
            <CustomLink to="/">Home</CustomLink>
            <CustomLink to="/recipe">Recipes</CustomLink>
            {!isAuth ? <CustomLink to="/login">Login</CustomLink> : <CustomLink to="/login" onClick={signUserOut}>Log Out</CustomLink>}
        </ul>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe" element={<Recipe isAuth={isAuth}/>} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/recipepost" element={<RecipePost isAuth={isAuth}/>} />
        </Routes>
      </div>
    </>
  );
}

function CustomLink({ to, children, ...props}) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
      <li className={isActive ? "active" : ""}>
          <Link to={to} {...props}>
              {children}
          </Link>
      </li>
  )
}

export default App;
