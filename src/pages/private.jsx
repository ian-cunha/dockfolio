/* eslint-disable no-undef */
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { Navigate } from "react-router-dom";
import { NavBar } from "../components/navbar";
import { Structure } from "../components/structure";

export const Private = () => {
  const user = auth.currentUser;

  if (user && !user.displayName) {
    return <Navigate to="/profile" />;
  }

  const handleSignOut = () => {
    signOut(auth).catch(console.log);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <NavBar />

      <main className="pt-20 pb-28 print:pt-0 print:pb-0">
        <Structure />
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-3 shadow-t-lg print:hidden">
        <div className="container mx-auto flex items-center justify-center gap-4">
          <button
            className="cursor-pointer px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
            onClick={() => window.print()}
          >
            <i className="bi bi-cloud-arrow-down"></i>
            <span className="hidden sm:inline">Download</span>
          </button>
          <button
            className="cursor-pointer px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
            onClick={handleSignOut}
          >
            <i className="bi bi-x-circle"></i>
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </div>
    </div>
  );
};