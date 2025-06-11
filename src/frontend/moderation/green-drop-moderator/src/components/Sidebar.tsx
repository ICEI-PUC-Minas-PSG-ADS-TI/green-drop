import React, { FC, useEffect, useRef } from 'react';
import { Input } from './ui/input';
import { Select, SelectItem } from './ui/select';
import { Search } from 'lucide-react';
import { Report, ReportStatus } from '../types';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

interface SidebarProps {
  filter: ReportStatus;
  onFilterChange: (value: ReportStatus) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  reportsList: Report[];
  onSelect: (id: string) => void;
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export const Sidebar: FC<SidebarProps> = ({ 
  filter, 
  onFilterChange, 
  searchTerm, 
  onSearchChange, 
  reportsList, 
  onSelect,
  loading,
  hasMore,
  onLoadMore
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (
        container.scrollTop + container.clientHeight >= container.scrollHeight - 100 &&
        hasMore && 
        !loading
      ) {
        onLoadMore();
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading, onLoadMore]);

  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="w-80 border-r flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold mb-4">Report Moderation</h2>
        
        <div className="mb-4">
          <Input
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
            prefix={<Search size={18} className="text-gray-400" />}
          />
        </div>
        
        <div className="mb-4">
          <Select 
            title="Filter by status" 
            value={filter} 
            onValueChange={(value: string) => onFilterChange(value as ReportStatus)}
          >
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </Select>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto"
      >
        {reportsList.length === 0 && !loading ? (
          <div className="p-4 text-center text-gray-500">
            No reports found
          </div>
        ) : (
          <div className="space-y-2 p-2">
            {reportsList.map(report => (
              <div
                key={report.id}
                className={`border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${
                  report.status === 'approved' ? 'border-green-200 bg-green-50' :
                  report.status === 'rejected' ? 'border-red-200 bg-red-50' :
                  'border-yellow-200 bg-yellow-50'
                }`}
                onClick={() => onSelect(report.id)}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900 truncate">{report.title}</h3>
                  <span 
                    className={`w-3 h-3 rounded-full ${getStatusColor(report.status)}`}
                    title={report.status}
                  />
                </div>
                
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {report.description}
                </p>
                
                <div className="flex justify-between items-center mt-2">
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">by</span> {report.reporter.username}
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {report.reporter.points} pts
                    </span>
                    <span className="text-xs text-gray-400">
                      {report.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="space-y-3 p-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="border rounded-lg p-3">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-full mb-1" />
                    <Skeleton className="h-3 w-4/5 mb-3" />
                    <div className="flex justify-between">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-10" />
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {!hasMore && reportsList.length > 0 && (
              <div className="p-3 text-center text-gray-500 text-sm">
                No more reports
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="p-3 border-t">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Total reports: {reportsList.length}</span>
          <span className="flex items-center">
            <span className={`w-2 h-2 rounded-full ${getStatusColor('pending')} mr-1`} />
            Pending
            <span className={`w-2 h-2 rounded-full ${getStatusColor('approved')} mx-1 ml-3`} />
            Approved
            <span className={`w-2 h-2 rounded-full ${getStatusColor('rejected')} mx-1 ml-3`} />
            Rejected
          </span>
        </div>
      </div>
    </div>
  );
};