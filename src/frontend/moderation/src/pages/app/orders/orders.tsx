import React, { useState, useEffect, ChangeEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { listUsers, type User } from '../../../api/users';
import { getImageBase64 } from '../../../api/image';

export function Orders() {
  const { data: users = [], isLoading, isError } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: listUsers,
    retry: false,
    onError: () => toast.error('Erro ao carregar os usuários'),
  });
  const totalPoints = users.reduce((sum, u) => sum + u.points, 0);
  const avgPoints = users.length > 0 ? Math.round(totalPoints / users.length) : 0;
  const activeUsers = users.filter(u => u.points > 0).length;
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userImageData, setUserImageData] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const openModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  useEffect(() => {
    if (!isModalOpen || !selectedUser?.photoUrl) return;
    let cancelled = false;

    async function fetchImage() {
      setIsLoadingImage(true);
      setUserImageData(null);
      try {
        const result = await getImageBase64(selectedUser.photoUrl);
        const ext = selectedUser.photoUrl.split('.').pop()?.toLowerCase();
        const mime = ext === 'png' ? 'png' : ext === 'gif' ? 'gif' : 'jpeg';
        const dataUrl = result.startsWith('data:')
          ? result
          : `data:image/${mime};base64,${result}`;
        if (!cancelled) setUserImageData(dataUrl);
      } catch {
        toast.error('Erro ao carregar a imagem do usuário');
      } finally {
        if (!cancelled) setIsLoadingImage(false);
      }
    }

    fetchImage();
    return () => { cancelled = true; };
  }, [isModalOpen, selectedUser]);
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setSearchName(e.target.value);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setSearchEmail(e.target.value);
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => setSearchPhone(e.target.value);
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(searchName.toLowerCase()) &&
    u.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
    u.phone.toLowerCase().includes(searchPhone.toLowerCase())
  );

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)] bg-gray-900 p-4">
        <div className="text-center p-8 rounded-xl bg-gray-800 border border-red-500/30 max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-red-400 mb-2">Erro ao carregar dados</h2>
          <p className="text-gray-400 mb-4">
            Não foi possível carregar os usuários. Por favor, tente novamente mais tarde.
          </p>
          <button
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            onClick={() => window.location.reload()}
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <title>Usuários | green.drop</title>
      <div className="min-h-screen bg-gradient-to-br from-transparent-900 to-gray-950 text-gray-300 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho e buscas */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                Usuários
              </h1>
              <p className="text-gray-500 mt-1">Gerencie todos os usuários da plataforma</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Buscar por nome"
                value={searchName}
                onChange={handleNameChange}
                className="px-3 py-2 bg-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none flex-1"
              />
              <input
                type="text"
                placeholder="Buscar por email"
                value={searchEmail}
                onChange={handleEmailChange}
                className="px-3 py-2 bg-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none flex-1"
              />
              <input
                type="text"
                placeholder="Buscar por telefone"
                value={searchPhone}
                onChange={handlePhoneChange}
                className="px-3 py-2 bg-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none flex-1"
              />
            </div>
          </div>
          <div className="flex gap-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg flex-1">
              <div className="text-xs text-gray-500">Total de usuários</div>
              <div className="text-xl font-bold text-emerald-400">{users.length}</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg flex-1">
              <div className="text-xs text-gray-500">Pontos totais</div>
              <div className="text-xl font-bold text-emerald-400">{totalPoints}</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg flex-1">
              <div className="text-xs text-gray-500">Média de pontos</div>
              <div className="text-xl font-bold text-amber-400">{avgPoints}</div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-800 border-b border-gray-700/50">
                  <tr>
                    {['ID','Usuário','Email','Telefone','Foto','Criado em','Firebase UID','Pontos','Status'].map(h => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        {Array.from({ length: 9 }).map((__, j) => (
                          <td key={j} className="px-4 py-4">
                            <div className="h-4 bg-gray-700 rounded w-full"></div>
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    filtered.map(u => (
                      <tr
                        key={u.id}
                        onClick={() => openModal(u)}
                        className="hover:bg-gray-800/30 transition-colors cursor-pointer"
                      >
                        <td className="px-4 py-4 font-mono text-sm text-emerald-300">
                          #{u.id}
                        </td>
                        <td className="px-4 py-4 font-medium text-gray-300">{u.name}</td>
                        <td className="px-4 py-4 text-gray-400">{u.email}</td>
                        <td className="px-4 py-4 text-gray-400">{u.phone}</td>
                        <td className="px-4 py-4">
                          <img
                            src={u.photoUrl}
                            alt={u.name}
                            className="h-12 w-12 object-cover rounded-lg border border-gray-700/50"
                          />
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-400">
                          {format(new Date(u.createdAt), 'dd/MM/yyyy HH:mm')}
                        </td>
                        <td className="px-4 py-4 text-xs font-mono text-gray-400 truncate max-w-xs">
                          {u.firebaseUid}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-700 rounded-full h-2 mr-2">
                              <div
                                className="h-2 rounded-full bg-emerald-500"
                                style={{ width: `${Math.min(u.points, 100)}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-400">{u.points}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              u.points > 50
                                ? 'bg-emerald-900/50 text-emerald-400'
                                : u.points > 0
                                ? 'bg-amber-900/50 text-amber-400'
                                : 'bg-gray-700/50 text-gray-400'
                            }`}
                          >
                            {u.points > 50 ? 'Ativo' : u.points > 0 ? 'Iniciante' : 'Novo'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
            </table>
            </div>
            <div className="px-4 py-3 bg-gray-800 border-t border-gray-700/50 flex items-center justify-between text-sm text-gray-500">
              Mostrando <span className="font-medium text-gray-300">{filtered.length}</span> de{' '}
              <span className="font-medium text-gray-300">{users.length}</span> usuários
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-emerald-400">Top Contribuidores</h3>
                  <p className="text-gray-500 text-sm">Usuários com mais pontos</p>
                </div>
                <div className="text-2xl font-bold text-emerald-400">🏆</div>
              </div>
              <div className="mt-4 space-y-3">
                {users
                  .sort((a, b) => b.points - a.points)
                  .slice(0, 3)
                  .map((u, i) => (
                    <div key={u.id} className="flex items-center">
                      <div className="mr-3 w-8 h-8 rounded-full bg-emerald-900/50 flex items-center justify-center text-emerald-400">
                        {i + 1}
                      </div>
                      <img
                        src={u.photoUrl}
                        alt={u.name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-700/50 mr-3"
                      />
                      <div>
                        <div className="font-medium text-gray-300">{u.name}</div>
                        <div className="text-sm text-emerald-400">{u.points} pontos</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-emerald-400">Atividade</h3>
                  <p className="text-gray-500 text-sm">Distribuição de pontos</p>
                </div>
                <div className="text-2xl font-bold text-emerald-400">📊</div>
              </div>
              <div className="mt-4 space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-emerald-400 mb-1">
                    <span>Ativos ({activeUsers})</span>
                    <span>{Math.round((activeUsers / users.length) * 100 || 0)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-emerald-500"
                      style={{ width: `${Math.round((activeUsers / users.length) * 100 || 0)}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-amber-400 mb-1">
                    <span>
                      Iniciantes (
                      {users.filter(u => u.points > 0 && u.points <= 50).length})
                    </span>
                    <span>
                      {Math.round(
                        (users.filter(u => u.points > 0 && u.points <= 50).length / users.length) *
                          100 ||
                          0
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-amber-500"
                      style={{
                        width: `${Math.round(
                          (users.filter(u => u.points > 0 && u.points <= 50).length / users.length) *
                            100 ||
                            0
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-emerald-400">Novos usuários</h3>
                  <p className="text-gray-500 text-sm">Registrados recentemente</p>
                </div>
                <div className="text-2xl font-bold text-emerald-400">🆕</div>
              </div>
              <div className="mt-4 space-y-3">
                {users
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .slice(0, 3)
                  .map(u => (
                    <div key={u.id} className="flex items-center">
                      <img
                        src={u.photoUrl}
                        alt={u.name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-700/50 mr-3"
                      />
                      <div>
                        <div className="font-medium text-gray-300">{u.name}</div>
                        <div className="text-sm text-emerald-400">
                          {format(new Date(u.createdAt), 'dd/MM/yyyy')}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {!isLoading && filtered.length === 0 && (
            <div className="mt-12 text-center py-12">
              <div className="text-5xl mb-4 text-gray-600">👤</div>
              <h3 className="text-xl font-medium text-gray-400 mb-2">Nenhum usuário encontrado</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Ajuste seus filtros de busca para encontrar usuários.
              </p>
            </div>
          )}
          {isModalOpen && selectedUser && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-gray-800 rounded-xl border border-gray-700/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-emerald-400">
                      Detalhes do Usuário #{selectedUser.id}
                    </h2>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-500 hover:text-gray-300 text-xl"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-500 mb-1">Nome</label>
                        <p className="text-gray-300">{selectedUser.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500 mb-1">Email</label>
                        <p className="text-gray-300">{selectedUser.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500 mb-1">Telefone</label>
                        <p className="text-gray-300">{selectedUser.phone}</p>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500 mb-1">Firebase UID</label>
                        <p className="text-gray-300 font-mono truncate">{selectedUser.firebaseUid}</p>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500 mb-1">Criado em</label>
                        <p className="text-gray-300 text-sm">
                          {format(new Date(selectedUser.createdAt), 'dd/MM/yyyy HH:mm')}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Foto do usuário</label>
                      {isLoadingImage ? (
                        <div className="h-48 bg-gray-700/50 rounded-lg flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500" />
                        </div>
                      ) : (
                        <img
                          src={userImageData ?? selectedUser.photoUrl}
                          alt={selectedUser.name}
                          className="w-full h-48 object-cover rounded-lg border border-gray-700/50"
                          onError={e => {
                            (e.target as HTMLImageElement).src = selectedUser.photoUrl;
                            (e.target as HTMLImageElement).onerror = null;
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="mt-8 text-center text-sm text-gray-600 py-4 border-t border-gray-800">
            <p>green.drop © {new Date().getFullYear()} - Todos os direitos reservados</p>
          </div>
        </div>
      </div>
    </>
  );
}
