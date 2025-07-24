/* eslint-disable react-hooks/exhaustive-deps */
import { auth, storeApp } from "../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ResumeDisplay } from "./resumeDisplay";

export const Structure = () => {
  const [dataBase, setDataBase] = useState(null);
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) return;
    const unsubscribe = onSnapshot(doc(storeApp, "profiles", uid), (docSnap) => {
      if (docSnap.exists()) {
        setDataBase(docSnap.data());
      }
    });
    return () => unsubscribe();
  }, [uid]);

  return <ResumeDisplay profileData={dataBase} />;
};