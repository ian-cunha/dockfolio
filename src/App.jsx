import { BrowserRouter, Routes, Route } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"

import { auth } from "./config/firebase"
import { ProtectedRoute } from "./components/protectedRoute"
import { Home } from "./pages/home"
import { Link } from "./pages/link"
import { Private } from "./pages/private"
import { useEffect, useState } from "react"
import { Profile } from "./pages/profile"

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

  if (isFetching) {
    return <div className="loading">
      <span className="loader"></span>
      <h2>Carregando...</h2>
    </div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home user={user} />} />
        <Route index path="/share/:uid" element={<Link />} />
        <Route index path="/private" element={
          <ProtectedRoute user={user}>
            <Private />
          </ProtectedRoute>} />
        <Route index path="/profile" element={
          <ProtectedRoute user={user}>
            <Profile />
          </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
