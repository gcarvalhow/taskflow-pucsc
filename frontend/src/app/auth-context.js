"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) {
      setToken(t);
      // Opcional: buscar dados do usuário
      fetch("http://localhost:3001/users/me", {
        headers: { Authorization: `Bearer ${t}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.user) setUser(data.user);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
