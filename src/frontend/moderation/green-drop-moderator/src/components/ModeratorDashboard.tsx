import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Report, ReportStatus } from '../types';
import { fetchReports, approveReport, rejectReport } from '../services/reportService';
import { Sidebar } from './Sidebar';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

// Leaflet marker icon fix
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export const ModeratorDashboard: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState<ReportStatus>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadReports = useCallback(async (reset = false) => {
    const currentPage = reset ? 1 : page;
    
    setLoading(true);
    setError(null);
    try {
      // Simulação de paginação - em produção, a API deve retornar dados paginados
      const data = await fetchReports(filter);
      
      if (reset) {
        setReports(data.slice(0, 10));
      } else {
        setReports(prev => [...prev, ...data.slice((currentPage - 1) * 10, currentPage * 10)]);
      }
      
      setHasMore(data.length > currentPage * 10);
      
      // Seleciona o primeiro relatório se não houver seleção
      if (reset && data.length > 0 && !selectedId) {
        setSelectedId(data[0].id);
      }
    } catch {
      setError('Failed to load reports.');
    } finally {
      setLoading(false);
    }
  }, [filter, page, selectedId]);

  useEffect(() => {
    loadReports(true);
  }, [filter]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (page > 1) {
      loadReports();
    }
  }, [page]);

  const filtered = useMemo(
    () => reports.filter(r => 
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [reports, searchTerm]
  );

  const selectedReport = useMemo(
    () => reports.find(r => r.id === selectedId) || null,
    [reports, selectedId]
  );

  const mapCenter: LatLngExpression = useMemo(() => {
    if (selectedReport) {
      return [selectedReport.location.lat, selectedReport.location.lng];
    }
    return filtered.length > 0
      ? [filtered[0].location.lat, filtered[0].location.lng]
      : [-23.533773, -46.625290]; // Coordenadas padrão (São Paulo)
  }, [filtered, selectedReport]);

  const mapZoom = filtered.length > 0 ? 13 : 10; // Zoom mais próximo

  const handleAction = async (actionFn: (id: string) => Promise<void>) => {
    if (!selectedId) return;
    
    setActionLoading(true);
    setActionError(null);
    
    try {
      await actionFn(selectedId);
      
      // Atualiza o status localmente para feedback imediato
      setReports(prev => prev.map(report => 
        report.id === selectedId 
          ? { ...report, status: actionFn === approveReport ? 'approved' : 'rejected' } 
          : report
      ));
      
      setSelectedId(null);
    } catch {
      setActionError('Failed to perform action.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        filter={filter}
        onFilterChange={value => {
          setFilter(value);
          setPage(1);
        }}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        reportsList={filtered}
        onSelect={setSelectedId}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
      />

      <div className="flex-1 relative">
        {loading && !reports.length && (
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-white bg-opacity-70">
            <div className="text-center p-4 bg-white rounded-lg shadow-lg">
              <p className="text-lg font-medium">Loading reports...</p>
              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-32 mx-auto" />
                <Skeleton className="h-4 w-40 mx-auto" />
              </div>
            </div>
          </div>
        )}

        <MapContainer 
          center={mapCenter} 
          zoom={mapZoom} 
          className="h-full w-full"
          key={JSON.stringify(mapCenter)} // Força recarregar ao mudar centro
        >
          <TileLayer 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {filtered.map(r => (
            <Marker 
              key={r.id} 
              position={[r.location.lat, r.location.lng]}
              eventHandlers={{
                click: () => setSelectedId(r.id),
              }}
            >
              <Popup>
                <div className="min-w-[200px]">
                  <h3 className="font-bold">{r.title}</h3>
                  <p className="text-sm mt-1">{r.description.substring(0, 80)}...</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className={`px-2 py-1 text-xs rounded ${
                      r.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      r.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {r.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {r.reporter.username}
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {selectedReport && (
          <Card className="absolute top-4 right-4 w-96 z-[1000] shadow-xl">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">{selectedReport.title}</h3>
                <span className={`px-2 py-1 text-xs rounded ${
                  selectedReport.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  selectedReport.status === 'approved' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {selectedReport.status}
                </span>
              </div>
              
              {selectedReport.imageUrl && (
                <img 
                  src={selectedReport.imageUrl} 
                  alt="report" 
                  className="my-3 rounded-lg w-full h-40 object-cover border"
                />
              )}
              
              <p className="text-sm text-gray-700 mb-3">{selectedReport.description}</p>
              
              <div className="text-xs text-gray-500 mb-4 space-y-1">
                <p>
                  <span className="font-medium">Reported by:</span> {selectedReport.reporter.username}
                </p>
                <p>
                  <span className="font-medium">Reputation:</span> {selectedReport.reporter.points} pts
                </p>
                <p>
                  <span className="font-medium">Date:</span> {selectedReport.createdAt.toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Location:</span> {selectedReport.location.lat.toFixed(4)}, {selectedReport.location.lng.toFixed(4)}
                </p>
              </div>

              {actionError && (
                <p className="text-red-500 mb-3 text-sm">{actionError}</p>
              )}
              
              <div className="flex justify-between space-x-3">
                <Button 
                  className="flex-1"
                  onClick={() => handleAction(approveReport)} 
                  disabled={actionLoading || selectedReport.status === 'approved'}
                  variant={selectedReport.status === 'approved' ? "secondary" : "default"}
                >
                  {actionLoading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2">↻</span> Processing...
                    </span>
                  ) : selectedReport.status === 'approved' ? (
                    "Approved ✓"
                  ) : (
                    "Approve"
                  )}
                </Button>
                
                <Button 
                  className="flex-1"
                  variant={selectedReport.status === 'rejected' ? "secondary" : "destructive"}
                  onClick={() => handleAction(rejectReport)} 
                  disabled={actionLoading || selectedReport.status === 'rejected'}
                >
                  {actionLoading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2">↻</span> Processing...
                    </span>
                  ) : selectedReport.status === 'rejected' ? (
                    "Rejected ✗"
                  ) : (
                    "Reject"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};