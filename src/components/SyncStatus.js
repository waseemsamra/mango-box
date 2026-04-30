import React, { useState, useEffect } from 'react';
import { hybridDataService } from '../services/HybridDataService';

const SyncStatus = () => {
  const [syncStatus, setSyncStatus] = useState('idle');
  const [lastSync, setLastSync] = useState(null);
  const [isAmplifyConfigured, setIsAmplifyConfigured] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const updateSyncStatus = () => {
      const status = hybridDataService.getSyncStatus();
      setSyncStatus(status.status);
      setLastSync(status.lastSyncTime);
      setIsAmplifyConfigured(status.isAmplifyConfigured);
    };

    // Initial status
    updateSyncStatus();

    // Listen for sync events
    const handleSyncEvent = (event, data) => {
      updateSyncStatus();
      
      if (event === 'syncError') {
        console.error('Sync error:', data);
      }
    };

    hybridDataService.addListener(handleSyncEvent);

    // Update status every second
    const interval = setInterval(updateSyncStatus, 1000);

    return () => {
      hybridDataService.removeListener(handleSyncEvent);
      clearInterval(interval);
    };
  }, []);

  const handleForceSync = async () => {
    if (!isAmplifyConfigured) {
      alert('Amplify is not configured. Sync is not available.');
      return;
    }

    setSyncStatus('syncing');
    try {
      await hybridDataService.forceSync();
      setSyncStatus('success');
      setTimeout(() => setSyncStatus('idle'), 2000);
    } catch (error) {
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 2000);
      console.error('Force sync failed:', error);
    }
  };

  const getStatusColor = () => {
    switch (syncStatus) {
      case 'syncing':
        return 'bg-yellow-500';
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'local-only':
        return 'bg-blue-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusText = () => {
    switch (syncStatus) {
      case 'syncing':
        return 'Syncing...';
      case 'success':
        return 'Synced';
      case 'error':
        return 'Sync Error';
      case 'local-only':
        return 'Local Only';
      default:
        return 'Ready';
    }
  };

  const getStatusIcon = () => {
    switch (syncStatus) {
      case 'syncing':
        return 'sync';
      case 'success':
        return 'cloud_done';
      case 'error':
        return 'cloud_off';
      case 'local-only':
        return 'storage';
      default:
        return 'cloud_queue';
    }
  };

  // Don't show if not configured and user doesn't want to see details
  if (!isAmplifyConfigured && !showDetails) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-50">
      <div className="flex items-center gap-3">
        {/* Status Indicator */}
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${getStatusColor()} ${
            syncStatus === 'syncing' ? 'animate-pulse' : ''
          }`} />
          <span className="material-symbols-outlined text-lg text-gray-600">
            {getStatusIcon()}
          </span>
        </div>

        {/* Status Text */}
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-700">
            {getStatusText()}
          </span>
          {lastSync && (
            <span className="text-xs text-gray-500">
              {new Date(lastSync).toLocaleTimeString()}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {isAmplifyConfigured && (
            <button
              onClick={handleForceSync}
              disabled={syncStatus === 'syncing'}
              className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {syncStatus === 'syncing' ? 'Syncing...' : 'Force Sync'}
            </button>
          )}
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 transition-colors"
          >
            {showDetails ? 'Hide' : 'Details'}
          </button>
        </div>
      </div>

      {/* Details Panel */}
      {showDetails && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-600">Amplify Configured:</span>
              <span className={`font-medium ${isAmplifyConfigured ? 'text-green-600' : 'text-red-600'}`}>
                {isAmplifyConfigured ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Current Status:</span>
              <span className="font-medium text-gray-700">{getStatusText()}</span>
            </div>
            {lastSync && (
              <div className="flex justify-between">
                <span className="text-gray-600">Last Sync:</span>
                <span className="font-medium text-gray-700">
                  {new Date(lastSync).toLocaleString()}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Sync Mode:</span>
              <span className="font-medium text-gray-700">
                {isAmplifyConfigured ? 'Hybrid (Local + S3)' : 'Local Only'}
              </span>
            </div>
          </div>
          
          {!isAmplifyConfigured && (
            <div className="mt-2 p-2 bg-yellow-50 rounded text-xs text-yellow-800">
              <strong>Note:</strong> Amplify is not configured. Data is stored locally only.
              Configure Amplify to enable cloud synchronization.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SyncStatus;
