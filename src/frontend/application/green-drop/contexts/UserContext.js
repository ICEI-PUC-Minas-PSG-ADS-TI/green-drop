/* eslint-disable no-console */
/* global console */
import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { usuarioService } from '@/services/Usuario';
import { gameService } from '@/services/Game';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [conquistas, setConquistas] = useState([]);
  const [desafios, setDesafios] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [userStats, setUserStats] = useState({ pontos: 0, xp: 0 });

  useEffect(() => {
    (async () => {
      try {
        if(!loginStatus == true) return
        const profile = await usuarioService.getProfile();
        if (profile) {
          setUser(profile);
          setLoginStatus(true);
          await loadGameData();
        } else {
          usuarioService.clearToken();
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        usuarioService.clearToken();
      }
    })();
  }, [loginStatus]);

  const loadGameData = async () => {
    const [stats, cqs, dsf, hist] = await Promise.all([
      gameService.getUserStats(),
      gameService.getConquistas(),
      gameService.getDesafios(),
      gameService.getHistorico(),
    ]);
    setUserStats(stats);
    setConquistas(cqs);
    setDesafios(dsf);
    setHistorico(hist);
  };

 const loginUsuario = async (email, senha) => { 
  setLoading(true);
  try {
    const data = await usuarioService.login({ email, senha });
    if (!data) throw new Error('Login falhou');
    
    // Busca o perfil atualizado após login
    const profile = await usuarioService.getProfile();
    setUser(profile);
    
    setLoginStatus(true);
    await loadGameData();
    return true;
  } catch (error) {
    console.error("Erro ao fazer login:", error.message);
    return false;
  } finally {
    setLoading(false);
  }
};

  const logoutUsuario = () => {
    usuarioService.clearToken();
    setUser(null);
    setLoginStatus(false);
  };

  const cadastrarUsuario = async ({ nome, email, senha, telefone, imagem }) => {
    setLoading(true);
    try {
      await usuarioService.cadastro({ nome, email, senha, telefone, imagem });
      return await loginUsuario(email, senha);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userStats,
        conquistas,
        desafios,
        historico,
        loginStatus,
        loading,
        loginUsuario,
        logoutUsuario,
        cadastrarUsuario,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = { children: PropTypes.node };
export const useUserContext = () => useContext(UserContext);
