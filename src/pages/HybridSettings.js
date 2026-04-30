import React, { useState, useEffect } from 'react';
import { hybridDataService } from '../services/HybridDataService';
import { isAmplifyConfigured, amplifyConfig } from '../config/amplify';

const HybridSettings = () => {
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const [syncStatus, setSyncStatus] = useState({});
  const [isReplicating, setIsReplicating] = useState(false);
  const [replicationProgress, setReplicationProgress] = useState(0);
  const [replicationLog, setReplicationLog] = useState([]);
  const [testResults, setTestResults] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    checkConnection();
    loadSyncStatus();
    
    const handleSyncEvent = (event, data) => {
      loadSyncStatus();
      addReplicationLog(`Sync event: ${event}`, 'info');
    };
    
    hybridDataService.addListener(handleSyncEvent);
    
    return () => {
      hybridDataService.removeListener(handleSyncEvent);
    };
  }, []);

  const checkConnection = async () => {
    setConnectionStatus('checking');
    try {
      const results = await testAmplifyConnection();
      setTestResults(results);
      setConnectionStatus(results.success ? 'connected' : 'failed');
    } catch (error) {
      setTestResults({ success: false, error: error.message });
      setConnectionStatus('failed');
    }
  };

  const testAmplifyConnection = async () => {
    const results = {
      success: true,
      tests: [],
      error: null
    };

    // Test 1: Amplify Configuration
    try {
      const configured = isAmplifyConfigured();
      results.tests.push({
        name: 'Amplify Configuration',
        status: configured ? 'pass' : 'fail',
        message: configured ? 'Amplify is properly configured' : 'Amplify not configured'
      });
      
      if (!configured) {
        results.success = false;
        results.error = 'Amplify not configured';
        return results;
      }
    } catch (error) {
      results.tests.push({
        name: 'Amplify Configuration',
        status: 'fail',
        message: error.message
      });
      results.success = false;
      results.error = error.message;
      return results;
    }

    // Test 2: S3 Bucket Access
    try {
      const { Storage } = await import('@aws-amplify/storage');
      const testKey = 'connection-test.json';
      const testData = { test: true, timestamp: Date.now() };
      
      // Test write
      await Storage.put(testKey, JSON.stringify(testData), {
        level: 'public',
        contentType: 'application/json'
      });
      
      // Test read
      const result = await Storage.get(testKey, { download: true });
      const readData = await result.Body.text();
      
      // Clean up
      await Storage.remove(testKey);
      
      results.tests.push({
        name: 'S3 Bucket Access',
        status: 'pass',
        message: 'S3 bucket read/write test successful'
      });
    } catch (error) {
      results.tests.push({
        name: 'S3 Bucket Access',
        status: 'fail',
        message: error.message
      });
      results.success = false;
      results.error = error.message;
    }

    // Test 3: Database File Access
    try {
      const { Storage } = await import('@aws-amplify/storage');
      const dbKey = 'database.json';
      await Storage.get(dbKey, { download: true });
      results.tests.push({
        name: 'Database File Access',
        status: 'pass',
        message: 'Database file accessible'
      });
    } catch (error) {
      // This is expected if database doesn't exist yet
      results.tests.push({
        name: 'Database File Access',
        status: 'warning',
        message: 'Database file not found (will be created on first sync)'
      });
    }

    return results;
  };

  const loadSyncStatus = () => {
    setSyncStatus(hybridDataService.getSyncStatus());
  };

  const addReplicationLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setReplicationLog(prev => [...prev, { timestamp, message, type }]);
  };

  const handleReplicateData = async () => {
    if (!isAmplifyConfigured()) {
      alert('Amplify is not configured. Please configure Amplify first.');
      return;
    }

    setIsReplicating(true);
    setReplicationProgress(0);
    setReplicationLog([]);

    try {
      addReplicationLog('Starting data replication...', 'info');
      setReplicationProgress(10);

      // Step 1: Get current local data
      addReplicationLog('Reading local database...', 'info');
      const localData = await hybridDataService.getAllLocalData();
      setReplicationProgress(30);

      addReplicationLog(`Found ${localData.products.length} products, ${localData.orders.length} orders, ${localData.categories.length} categories`, 'success');

      // Step 2: Sync to S3
      addReplicationLog('Uploading data to S3...', 'info');
      await hybridDataService.syncToS3();
      setReplicationProgress(60);

      addReplicationLog('Data uploaded to S3 successfully', 'success');

      // Step 3: Sync from S3 (to verify)
      addReplicationLog('Verifying S3 data...', 'info');
      await hybridDataService.syncFromS3();
      setReplicationProgress(80);

      addReplicationLog('S3 data verified', 'success');

      // Step 4: Final verification
      addReplicationLog('Performing final verification...', 'info');
      const finalData = await hybridDataService.getAllLocalData();
      
      const verification = {
        products: finalData.products.length === localData.products.length,
        orders: finalData.orders.length === localData.orders.length,
        categories: finalData.categories.length === localData.categories.length
      };

      if (Object.values(verification).every(v => v)) {
        addReplicationLog('Replication completed successfully!', 'success');
        setReplicationProgress(100);
      } else {
        addReplicationLog('Replication completed with data mismatches', 'warning');
        setReplicationProgress(100);
      }

      // Refresh connection status
      await checkConnection();
      loadSyncStatus();

    } catch (error) {
      addReplicationLog(`Replication failed: ${error.message}`, 'error');
      setReplicationProgress(0);
    } finally {
      setIsReplicating(false);
    }
  };

  const handleClearData = async () => {
    if (!confirm('Are you sure you want to clear all data? This will delete both local and S3 data.')) {
      return;
    }

    try {
      addReplicationLog('Clearing all data...', 'warning');
      await hybridDataService.clearAllData();
      addReplicationLog('All data cleared successfully', 'success');
      loadSyncStatus();
    } catch (error) {
      addReplicationLog(`Failed to clear data: ${error.message}`, 'error');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'checking': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTestStatusColor = (status) => {
    switch (status) {
      case 'pass': return 'text-green-600';
      case 'fail': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Hybrid Settings</h1>
          <p className="mt-2 text-gray-600">Manage RxDB and S3 synchronization settings</p>
        </div>

        {/* Connection Status Card */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Connection Status</h2>
            <button
              onClick={checkConnection}
              disabled={connectionStatus === 'checking'}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {connectionStatus === 'checking' ? 'Testing...' : 'Test Connection'}
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(connectionStatus)}`}>
              {connectionStatus === 'connected' ? 'Connected' :
               connectionStatus === 'failed' ? 'Failed' :
               connectionStatus === 'checking' ? 'Checking...' :
               'Unknown'}
            </div>
            {syncStatus.isAmplifyConfigured && (
              <span className="text-sm text-gray-600">
                Amplify configured • Sync mode: {syncStatus.isAmplifyConfigured ? 'Hybrid' : 'Local Only'}
              </span>
            )}
          </div>

          {testResults && (
            <div className="mt-4 space-y-2">
              {testResults.tests.map((test, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center space-x-3">
                    <span className={`material-symbols-outlined ${getTestStatusColor(test.status)}`}>
                      {test.status === 'pass' ? 'check_circle' :
                       test.status === 'fail' ? 'error' :
                       'warning'}
                    </span>
                    <span className="font-medium">{test.name}</span>
                  </div>
                  <span className={`text-sm ${getTestStatusColor(test.status)}`}>
                    {test.message}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Data Replication Card */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Replication</h2>
          
          <div className="mb-4">
            <p className="text-gray-600 mb-4">
              Manually synchronize data between local RxDB and S3 storage. This ensures all data is properly backed up and available across all users.
            </p>
            
            {syncStatus.lastSyncTime && (
              <p className="text-sm text-gray-500">
                Last sync: {new Date(syncStatus.lastSyncTime).toLocaleString()}
              </p>
            )}
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={handleReplicateData}
              disabled={isReplicating || connectionStatus !== 'connected'}
              className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <span className="material-symbols-outlined">sync</span>
              <span>{isReplicating ? 'Replicating...' : 'Replicate Data'}</span>
            </button>

            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center space-x-2"
            >
              <span className="material-symbols-outlined">settings</span>
              <span>Advanced</span>
            </button>
          </div>

          {/* Progress Bar */}
          {isReplicating && (
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Replication Progress</span>
                <span>{replicationProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${replicationProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Replication Log */}
          {replicationLog.length > 0 && (
            <div className="border rounded-lg p-4 bg-gray-50 max-h-64 overflow-y-auto">
              <h3 className="font-medium text-gray-900 mb-2">Replication Log</h3>
              <div className="space-y-1">
                {replicationLog.map((log, index) => (
                  <div key={index} className="flex items-start space-x-2 text-sm">
                    <span className="text-gray-500 font-mono">{log.timestamp}</span>
                    <span className={`${
                      log.type === 'error' ? 'text-red-600' :
                      log.type === 'success' ? 'text-green-600' :
                      log.type === 'warning' ? 'text-yellow-600' :
                      'text-gray-600'
                    }`}>
                      {log.message}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Advanced Settings */}
        {showAdvanced && (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Advanced Settings</h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Danger Zone</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>These actions can permanently delete data. Please be careful.</p>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={handleClearData}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                      >
                        Clear All Data
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Sync Statistics</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Sync Status:</span>
                    <span className="ml-2 font-medium">{syncStatus.status || 'Unknown'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Amplify Configured:</span>
                    <span className="ml-2 font-medium">{syncStatus.isAmplifyConfigured ? 'Yes' : 'No'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Sync in Progress:</span>
                    <span className="ml-2 font-medium">{syncStatus.isInProgress ? 'Yes' : 'No'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Database Name:</span>
                    <span className="ml-2 font-medium">kisanfresh_db_v4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Configuration Info */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Configuration Information</h2>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Hybrid Mode:</span>
              <span className="font-medium">{syncStatus.isAmplifyConfigured ? 'Enabled' : 'Disabled'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Local Storage:</span>
              <span className="font-medium">RxDB (IndexedDB)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cloud Storage:</span>
              <span className="font-medium">AWS S3 (Amplify)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Auto Sync:</span>
              <span className="font-medium">Every 30-60 seconds</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sync File:</span>
              <span className="font-medium">database.json</span>
            </div>
          </div>

          {!syncStatus.isAmplifyConfigured && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Amplify is not configured. The system is running in local-only mode. 
                Configure Amplify to enable cloud synchronization.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HybridSettings;
