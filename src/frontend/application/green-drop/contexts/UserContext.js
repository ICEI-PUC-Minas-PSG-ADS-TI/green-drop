import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { usuarioService } from '@/services/Usuario';

const EXPIRATION_TIME = 3 * 24 * 60 * 60 * 1000; // 3 dias em milissegundos
export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loginStatus, setLoginStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [conquistas, setConquistas] = useState([]);
    const [desafios, setDesafios] = useState([]);

    useEffect(() => {
        if (__DEV__) simularLoginDev();
    }, []);

    const simularLoginDev = () => {
        setLoginStatus(true);
        const userMock = {
            displayName: "Usuário de Teste",
            email: "teste@gmail.com",
            telefone: "1234567890",
            pontos: 150,
            xp: 50,
        };
        const conquistasMock = [
            { id: 1, titulo: "Primeiros Passos", descricao: "Faça sua primeira contribuição", completo: true },
            { id: 2, titulo: "Explorador Nato", descricao: "Visite 50 locais diferentes", completo: false },
        ];
        const desafiosMock = [
            { id: 1, titulo: "Explorador Iniciante", descricao: "Adicione 5 novos locais", progresso: "3/5", completo: false },
            { id: 2, titulo: "Contribuidor Ativo", descricao: "Faça 10 contribuições este mês", progresso: "7/10", completo: false },
        ];

        setUser(userMock);
        setConquistas(conquistasMock);
        setDesafios(desafiosMock);
    };

    const loginUsuario = async (identificador, senha) => {
        setLoading(true);
        try {
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identificador);
            const isTelefone = /^\+?\d{10,15}$/.test(identificador);

            if (!isEmail && !isTelefone) {
                throw new Error("Identificador inválido. Use um e-mail ou telefone válido.");
            }

            const data = await usuarioService.login({
                email: isEmail ? identificador : undefined,
                telefone: isTelefone ? identificador : undefined,
                senha,
            });

            setUser(data);
            setLoginStatus(true);
            return true;
        } catch (error) {
            console.error("Erro ao fazer login:", error.message || error);
            return false;
        }
        finally {
            setLoading(false);
        }
    };


    const logoutUsuario = () => {
        setUser(null);
        setLoginStatus(false);
    };

    const cadastrarUsuario = async ({ nome, email, senha, telefone }) => {
        setLoading(true);
        try {
            await usuarioService.cadastro({ nome, email, senha, telefone })
            await loginUsuario(email, senha);
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
                conquistas,
                desafios,
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