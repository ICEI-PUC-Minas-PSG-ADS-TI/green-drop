import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { list, validateReport, type Report } from '../../../api/reports';
import { getImageBase64 } from '../../../api/image';

export function Dashboard() {
  const queryClient = useQueryClient();
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [imageData, setImageData] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const { data: reports = [], isLoading, isError } = useQuery<Report[], Error>({
    queryKey: ['reports'],
    queryFn: list,
    retry: false,
    onError: () => toast.error('Erro ao carregar os reportes'),
  });

  const handleRowClick = (report: Report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  useEffect(() => {
  const fetchImage = async () => {
    if (!selectedReport?.photoUrl) return;
    
    setIsLoadingImage(true);
    setImageData(null);
    
    try {
      const result = await getImageBase64(selectedReport.photoUrl);
      // result pode ser "data:image/jpeg;base64,…" ou só "/9j/4AAQ…"
      const dataUrl = result.startsWith('data:')
        ? result
        : `data:image/${mimeType};base64,${result}`;
      
      setImageData(dataUrl);
    } catch (error) {
      toast.error('Erro ao carregar a imagem');
      setImageData(null);
    } finally {
      setIsLoadingImage(false);
    }
  };

  if (isModalOpen && selectedReport) {
    fetchImage();
  }
}, [selectedReport, isModalOpen]);


  const handleValidate = async (status: string) => {
    if (!selectedReport) return;
    
    setIsValidating(true);
    try {
      await validateReport(selectedReport.id, status);
      toast.success(`Reporte ${status === 'VALIDATED' ? 'validado' : 'rejeitado'} com sucesso!`);
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Erro ao atualizar o status do reporte');
    } finally {
      setIsValidating(false);
    }
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)] bg-gray-900 p-4">
        <div className="text-center p-8 rounded-xl bg-gray-800 border border-red-500/30 max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-red-400 mb-2">Erro ao carregar dados</h2>
          <p className="text-gray-400 mb-4">
            Não foi possível carregar os reportes. Por favor, tente novamente mais tarde.
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
      <title>Reportes | green.drop</title>
      <div className="min-h-screen bg-gradient-to-br from-transparent-900 to-gray-950 text-gray-300 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                Reportes
              </h1>
              <p className="text-gray-500 mt-1">
                Gerencie todos os reportes de problemas ambientais
              </p>
            </div>
            
            <div className="flex gap-3">
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="text-xs text-gray-500">Total de reportes</div>
                <div className="text-xl font-bold text-emerald-400">{reports.length}</div>
              </div>
              
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="text-xs text-gray-500">Status</div>
                <div className="text-lg font-bold">
                  <span className="text-emerald-400">
                    {reports.filter(r => r.status === 'VALIDATED').length}
                  </span>
                  <span className="text-gray-500">/</span>
                  <span className="text-amber-400">
                    {reports.filter(r => r.status === 'PENDING').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-800 border-b border-gray-700/50">
                  <tr>
                    {[
                      'ID', 'Usuário', 'Descrição', 'Foto', 'Status',
                      'Criado em', 'Validado em', 'Localização', 'Categoria', 'Tipo', 'Relevância'
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index} className="animate-pulse">
                        <td className="px-4 py-4"><div className="h-4 bg-gray-700 rounded w-3/4"></div></td>
                        <td className="px-4 py-4"><div className="h-4 bg-gray-700 rounded w-3/4"></div></td>
                        <td className="px-4 py-4"><div className="h-4 bg-gray-700 rounded w-full"></div></td>
                        <td className="px-4 py-4"><div className="h-12 w-12 bg-gray-700 rounded"></div></td>
                        <td className="px-4 py-4"><div className="h-4 bg-gray-700 rounded w-16"></div></td>
                        <td className="px-4 py-4"><div className="h-4 bg-gray-700 rounded w-32"></div></td>
                        <td className="px-4 py-4"><div className="h-4 bg-gray-700 rounded w-32"></div></td>
                        <td className="px-4 py-4"><div className="h-4 bg-gray-700 rounded w-24"></div></td>
                        <td className="px-4 py-4"><div className="h-4 bg-gray-700 rounded w-20"></div></td>
                        <td className="px-4 py-4"><div className="h-4 bg-gray-700 rounded w-16"></div></td>
                        <td className="px-4 py-4"><div className="h-4 bg-gray-700 rounded w-16"></div></td>
                      </tr>
                    ))
                  ) : (
                    reports.map((r) => (
                      <tr 
                        key={r.id} 
                        className="hover:bg-gray-800/30 transition-colors cursor-pointer"
                        onClick={() => handleRowClick(r)}
                      >
                        <td className="px-4 py-4 font-mono text-sm text-emerald-300">#{r.id}</td>
                        <td className="px-4 py-4 font-medium text-gray-300">Usuário {r.userId}</td>
                        <td className="px-4 py-4 max-w-xs text-gray-400">{r.description}</td>
                        <td className="px-4 py-4">
                          <img
                            src={r.photoUrl}
                            alt={`Reporte ${r.id}`}
                            className="h-12 w-12 object-cover rounded-lg border border-gray-700/50"
                          />
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            r.status === 'VALIDATED' 
                              ? 'bg-emerald-900/50 text-emerald-400' 
                              : r.status === 'PENDING' 
                                ? 'bg-amber-900/50 text-amber-400' 
                                : 'bg-red-900/50 text-red-400'
                          }`}>
                            {r.status === 'VALIDATED' ? 'Validado' : r.status === 'PENDING' ? 'Pendente' : 'Rejeitado'}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-400">
                          {format(new Date(r.createdAt), 'dd/MM/yyyy HH:mm')}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-400">
                          {r.validatedAt
                            ? format(new Date(r.validatedAt), 'dd/MM/yyyy HH:mm')
                            : <span className="text-gray-500">-</span>}
                        </td>
                        <td className="px-4 py-4 text-xs font-mono">
                          <div className="flex flex-col">
                            <span>{r.latitude.toFixed(6)}</span>
                            <span>{r.longitude.toFixed(6)}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-sm">
                            {r.category}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-gray-300">{r.problemType}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-700 rounded-full h-2 mr-2">
                              <div 
                                className="h-2 rounded-full bg-emerald-500" 
                                style={{ width: `${r.relevance * 10}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-400">{r.relevance}/10</span>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 bg-gray-800 border-t border-gray-700/50 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Mostrando <span className="font-medium text-gray-300">{reports.length}</span> de{" "}
                <span className="font-medium text-gray-300">{reports.length}</span> reportes
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
                  Anterior
                </button>
                <button className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300">
                  Próximo
                </button>
              </div>
            </div>
          </div>
          {isModalOpen && selectedReport && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-gray-800 rounded-xl border border-gray-700/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-emerald-400">
                      Detalhes do Reporte #{selectedReport.id}
                    </h2>
                    <button 
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-500 hover:text-gray-300 text-xl"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <label className="block text-sm text-gray-500 mb-1">Descrição</label>
                        <p className="text-gray-300">{selectedReport.description}</p>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm text-gray-500 mb-1">Status</label>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            selectedReport.status === 'VALIDATED' 
                              ? 'bg-emerald-900/50 text-emerald-400' 
                              : selectedReport.status === 'PENDING' 
                                ? 'bg-amber-900/50 text-amber-400' 
                                : 'bg-red-900/50 text-red-400'
                        }`}>
                          {selectedReport.status === 'VALIDATED' ? 'Validado' : selectedReport.status === 'PENDING' ? 'Pendente' : 'Rejeitado'}
                        </span>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm text-gray-500 mb-1">Categoria</label>
                        <p className="text-gray-300">{selectedReport.category}</p>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm text-gray-500 mb-1">Tipo de Problema</label>
                        <p className="text-gray-300">{selectedReport.problemType}</p>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm text-gray-500 mb-1">Relevância</label>
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-700 rounded-full h-2 mr-2">
                            <div 
                              className="h-2 rounded-full bg-emerald-500" 
                              style={{ width: `${selectedReport.relevance * 10}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-400">{selectedReport.relevance}/10</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm text-gray-500 mb-1">Usuário</label>
                        <p className="text-gray-300">ID {selectedReport.userId}</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Imagem</label>
                      {isLoadingImage ? (
                        <div className="h-48 bg-gray-700/50 rounded-lg flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
                        </div>
                      ) : imageData ? (
                        <img 
                          src={imageData} 
                          alt={`Reporte ${selectedReport.id}`}
                          className="w-full h-48 object-cover rounded-lg border border-gray-700/50"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = selectedReport.photoUrl;
                            (e.target as HTMLImageElement).onerror = null;
                          }}
                        />
                      ) : (
                        <div className="h-48 bg-gray-700/50 rounded-lg flex items-center justify-center">
                          <img 
                            src={selectedReport.photoUrl} 
                            alt={`Reporte ${selectedReport.id} - fallback`}
                            className="w-full h-full object-cover rounded-lg border border-gray-700/50"
                          />
                        </div>
                      )}

                      <div className="mt-4">
                        <label className="block text-sm text-gray-500 mb-1">Localização</label>
                        <div className="text-sm font-mono">
                          <div>Lat: {selectedReport.latitude.toFixed(6)}</div>
                          <div>Lng: {selectedReport.longitude.toFixed(6)}</div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm text-gray-500 mb-1">Criado em</label>
                        <p className="text-gray-300 text-sm">
                          {format(new Date(selectedReport.createdAt), 'dd/MM/yyyy HH:mm')}
                        </p>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm text-gray-500 mb-1">Validado em</label>
                        <p className="text-gray-300 text-sm">
                          {selectedReport.validatedAt
                            ? format(new Date(selectedReport.validatedAt), 'dd/MM/yyyy HH:mm')
                            : <span className="text-gray-500">-</span>}
                        </p>
                      </div>
                    </div>
                  </div>
                  {selectedReport.status === 'PENDING' && (
                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        onClick={() => handleValidate('REJECTED')}
                        disabled={isValidating}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          isValidating 
                            ? 'bg-gray-600 cursor-not-allowed' 
                            : 'bg-red-600 hover:bg-red-700'
                        } text-white`}
                      >
                        {isValidating ? 'Processando...' : 'Rejeitar'}
                      </button>
                      <button
                        onClick={() => handleValidate('VALIDATED')}
                        disabled={isValidating}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          isValidating 
                            ? 'bg-gray-600 cursor-not-allowed' 
                            : 'bg-emerald-600 hover:bg-emerald-700'
                        } text-white`}
                      >
                        {isValidating ? 'Processando...' : 'Validar'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {!isLoading && reports.length === 0 && (
            <div className="mt-12 text-center py-12">
              <div className="text-5xl mb-4 text-gray-600">📭</div>
              <h3 className="text-xl font-medium text-gray-400 mb-2">Nenhum reporte encontrado</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Parece que ainda não há reportes cadastrados. Quando novos reportes forem criados, eles aparecerão aqui.
              </p>
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