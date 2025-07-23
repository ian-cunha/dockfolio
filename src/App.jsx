import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { ProtectedRoute } from "./components/protectedRoute";
import { Home } from "./pages/home";
import React, { Suspense, useEffect, useState } from "react";

const Link = React.lazy(() => import('./pages/link').then(module => ({ default: module.Link })));
const Private = React.lazy(() => import('./pages/private').then(module => ({ default: module.Private })));
const Profile = React.lazy(() => import('./pages/profile').then(module => ({ default: module.Profile })));
const Fail = React.lazy(() => import('./pages/fail').then(module => ({ default: module.Fail })));

function App() {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
        return;
      }
      setUser(null);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  const loadingFallback = (
    <div className="loading">
      <span className="loader"></span>
      <h2>Carregando...</h2>
    </div>
  );

  if (isFetching) {
    return loadingFallback;
  }

  return (
    <BrowserRouter>
      <Suspense fallback={loadingFallback}>
        <Routes>
          <Route path='*' element={<Fail />} />
          <Route index path="/" element={<Home user={user} />} />
          <Route index path="/share" element={<Fail />} />
          <Route index path="/share/:uid" element={<Link />} />
          <Route
            index
            path="/private"
            element={
              <ProtectedRoute user={user}>
                <Private />
              </ProtectedRoute>
            }
          />
          <Route
            index
            path="/profile"
            element={
              <ProtectedRoute user={user}>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;