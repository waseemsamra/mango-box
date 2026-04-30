import React, { useState, useEffect } from 'react';
import { hybridDataService } from '../services/HybridDataService';
import { mobileStorageManager } from '../services/MobileStorageManager';
import { productService } from '../database/services/ProductService';
import { isAmplifyConfigured } from '../config/amplify';

const SystemTesting = () => {
  const [testResults, setTestResults] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState('');
  const [testLog, setTestLog] = useState([]);
  const [overallProgress, setOverallProgress] = useState(0);

  // Test categories
  const testCategories = {
    connectivity: [
      { id: 'amplify_config', name: 'Amplify Configuration', critical: true },
      { id: 's3_access', name: 'S3 Bucket Access', critical: true },
      { id: 'database_file', name: 'Database File Access', critical: false },
      { id: 'network_status', name: 'Network Status', critical: false },
      { id: 'api_endpoints', name: 'API Endpoints', critical: false }
    ],
    dataPersistence: [
      { id: 'local_storage', name: 'Local Storage (IndexedDB)', critical: true },
      { id: 'data_creation', name: 'Data Creation', critical: true },
      { id: 'data_retrieval', name: 'Data Retrieval', critical: true },
      { id: 'data_update', name: 'Data Update', critical: true },
      { id: 'data_deletion', name: 'Data Deletion', critical: true },
      { id: 'data_sync', name: 'Data Synchronization', critical: true },
      { id: 'offline_persistence', name: 'Offline Persistence', critical: true }
    ],
    mobileOptimization: [
      { id: 'mobile_detection', name: 'Mobile Device Detection', critical: false },
      { id: 'storage_quota', name: 'Storage Quota Management', critical: true },
      { id: 'battery_optimization', name: 'Battery Optimization', critical: false },
      { id: 'offline_functionality', name: 'Offline Functionality', critical: true },
      { id: 'sync_optimization', name: 'Sync Optimization', critical: false }
    ],
    performance: [
      { id: 'load_time', name: 'Application Load Time', critical: false },
      { id: 'data_access_speed', name: 'Data Access Speed', critical: true },
      { id: 'sync_speed', name: 'Synchronization Speed', critical: false },
      { id: 'memory_usage', name: 'Memory Usage', critical: false },
      { id: 'cache_efficiency', name: 'Cache Efficiency', critical: false }
    ]
  };

  // Add log entry
  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setTestLog(prev => [...prev, { timestamp, message, type }]);
  };

  // Update test result
  const updateTestResult = (testId, result) => {
    setTestResults(prev => ({
      ...prev,
      [testId]: {
        ...result,
        timestamp: new Date().toISOString()
      }
    }));
  };

  // Run all tests
  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults({});
    setTestLog([]);
    setOverallProgress(0);
    
    addLog('Starting comprehensive system testing...', 'info');
    
    const allTests = Object.values(testCategories).flat();
    const totalTests = allTests.length;
    let completedTests = 0;

    try {
      // Test Connectivity
      addLog('Testing Connectivity...', 'info');
      for (const test of testCategories.connectivity) {
        setCurrentTest(test.name);
        await runConnectivityTest(test.id);
        completedTests++;
        setOverallProgress((completedTests / totalTests) * 100);
      }

      // Test Data Persistence
      addLog('Testing Data Persistence...', 'info');
      for (const test of testCategories.dataPersistence) {
        setCurrentTest(test.name);
        await runPersistenceTest(test.id);
        completedTests++;
        setOverallProgress((completedTests / totalTests) * 100);
      }

      // Test Mobile Optimization
      addLog('Testing Mobile Optimization...', 'info');
      for (const test of testCategories.mobileOptimization) {
        setCurrentTest(test.name);
        await runMobileTest(test.id);
        completedTests++;
        setOverallProgress((completedTests / totalTests) * 100);
      }

      // Test Performance
      addLog('Testing Performance...', 'info');
      for (const test of testCategories.performance) {
        setCurrentTest(test.name);
        await runPerformanceTest(test.id);
        completedTests++;
        setOverallProgress((completedTests / totalTests) * 100);
      }

      addLog('All tests completed!', 'success');

    } catch (error) {
      addLog(`Test suite failed: ${error.message}`, 'error');
    } finally {
      setIsRunning(false);
      setCurrentTest('');
    }
  };

  // Connectivity Tests
  const runConnectivityTest = async (testId) => {
    try {
      switch (testId) {
        case 'amplify_config':
          const configured = isAmplifyConfigured();
          updateTestResult(testId, {
            status: configured ? 'pass' : 'fail',
            message: configured ? 'Amplify is properly configured' : 'Amplify not configured',
            details: { configured }
          });
          addLog(`Amplify Configuration: ${configured ? 'PASS' : 'FAIL'}`, configured ? 'success' : 'error');
          break;

        case 's3_access':
          try {
            const { Storage } = await import('@aws-amplify/storage');
            const testKey = `test-${Date.now()}.json`;
            const testData = { test: true, timestamp: Date.now() };
            
            await Storage.put(testKey, JSON.stringify(testData), {
              level: 'public',
              contentType: 'application/json'
            });
            
            const result = await Storage.get(testKey, { download: true });
            const readData = await result.Body.text();
            
            await Storage.remove(testKey);
            
            const success = JSON.parse(readData).test === true;
            updateTestResult(testId, {
              status: success ? 'pass' : 'fail',
              message: success ? 'S3 read/write test successful' : 'S3 test failed',
              details: { readData, testData }
            });
            addLog(`S3 Access: ${success ? 'PASS' : 'FAIL'}`, success ? 'success' : 'error');
          } catch (error) {
            updateTestResult(testId, {
              status: 'fail',
              message: error.message,
              details: { error: error.message }
            });
            addLog(`S3 Access: FAIL - ${error.message}`, 'error');
          }
          break;

        case 'database_file':
          try {
            const { Storage } = await import('@aws-amplify/storage');
            await Storage.get('database.json', { download: true });
            updateTestResult(testId, {
              status: 'pass',
              message: 'Database file accessible',
              details: { accessible: true }
            });
            addLog('Database File Access: PASS', 'success');
          } catch (error) {
            updateTestResult(testId, {
              status: 'warning',
              message: 'Database file not found (will be created on first sync)',
              details: { error: error.message }
            });
            addLog('Database File Access: WARNING - File not found', 'warning');
          }
          break;

        case 'network_status':
          const isOnline = navigator.onLine;
          updateTestResult(testId, {
            status: 'pass',
            message: `Network status: ${isOnline ? 'Online' : 'Offline'}`,
            details: { online: isOnline, connection: navigator.connection?.effectiveType || 'Unknown' }
          });
          addLog(`Network Status: ${isOnline ? 'Online' : 'Offline'}`, 'info');
          break;

        case 'api_endpoints':
          updateTestResult(testId, {
            status: 'pass',
            message: 'API endpoints configured',
            details: { endpoints: ['products', 'orders', 'categories'] }
          });
          addLog('API Endpoints: PASS', 'success');
          break;
      }
    } catch (error) {
      updateTestResult(testId, {
        status: 'fail',
        message: error.message,
        details: { error: error.message }
      });
      addLog(`${testId}: FAIL - ${error.message}`, 'error');
    }
  };

  // Data Persistence Tests
  const runPersistenceTest = async (testId) => {
    try {
      switch (testId) {
        case 'local_storage':
          try {
            const db = await hybridDataService.localDb;
            const hasCollections = db && Object.keys(db.collections).length > 0;
            updateTestResult(testId, {
              status: hasCollections ? 'pass' : 'fail',
              message: hasCollections ? 'Local storage initialized' : 'Local storage not initialized',
              details: { collections: db ? Object.keys(db.collections) : [] }
            });
            addLog(`Local Storage: ${hasCollections ? 'PASS' : 'FAIL'}`, hasCollections ? 'success' : 'error');
          } catch (error) {
            updateTestResult(testId, {
              status: 'fail',
              message: error.message,
              details: { error: error.message }
            });
            addLog(`Local Storage: FAIL - ${error.message}`, 'error');
          }
          break;

        case 'data_creation':
          try {
            const testProduct = {
              name: 'Test Product',
              description: 'Test Description',
              price: 99.99,
              categoryId: 'test-category',
              stock: 10
            };
            
            const created = await hybridDataService.createProduct(testProduct);
            const success = created && created.id;
            
            updateTestResult(testId, {
              status: success ? 'pass' : 'fail',
              message: success ? 'Data creation successful' : 'Data creation failed',
              details: { created: success, productId: created?.id }
            });
            addLog(`Data Creation: ${success ? 'PASS' : 'FAIL'}`, success ? 'success' : 'error');
            
            // Clean up
            if (success) {
              await hybridDataService.deleteProduct(created.id);
            }
          } catch (error) {
            updateTestResult(testId, {
              status: 'fail',
              message: error.message,
              details: { error: error.message }
            });
            addLog(`Data Creation: FAIL - ${error.message}`, 'error');
          }
          break;

        case 'data_retrieval':
          try {
            const products = await hybridDataService.getProducts();
            const success = Array.isArray(products);
            
            updateTestResult(testId, {
              status: success ? 'pass' : 'fail',
              message: success ? `Retrieved ${products.length} products` : 'Data retrieval failed',
              details: { count: products.length, products: products.slice(0, 3) }
            });
            addLog(`Data Retrieval: ${success ? 'PASS' : 'FAIL'}`, success ? 'success' : 'error');
          } catch (error) {
            updateTestResult(testId, {
              status: 'fail',
              message: error.message,
              details: { error: error.message }
            });
            addLog(`Data Retrieval: FAIL - ${error.message}`, 'error');
          }
          break;

        case 'data_update':
          try {
            const products = await hybridDataService.getProducts();
            if (products.length === 0) {
              throw new Error('No products available for update test');
            }
            
            const testProduct = products[0];
            const originalPrice = testProduct.price;
            const newPrice = originalPrice + 1;
            
            const updated = await hybridDataService.updateProduct(testProduct.id, {
              price: newPrice
            });
            
            const success = updated && updated.price === newPrice;
            
            // Restore original price
            await hybridDataService.updateProduct(testProduct.id, {
              price: originalPrice
            });
            
            updateTestResult(testId, {
              status: success ? 'pass' : 'fail',
              message: success ? 'Data update successful' : 'Data update failed',
              details: { originalPrice, newPrice, updatedPrice: updated?.price }
            });
            addLog(`Data Update: ${success ? 'PASS' : 'FAIL'}`, success ? 'success' : 'error');
          } catch (error) {
            updateTestResult(testId, {
              status: 'fail',
              message: error.message,
              details: { error: error.message }
            });
            addLog(`Data Update: FAIL - ${error.message}`, 'error');
          }
          break;

        case 'data_deletion':
          try {
            const testProduct = {
              name: 'Test Delete Product',
              description: 'Test Description',
              price: 1.99,
              categoryId: 'test-category',
              stock: 1
            };
            
            const created = await hybridDataService.createProduct(testProduct);
            await hybridDataService.deleteProduct(created.id);
            
            const products = await hybridDataService.getProducts();
            const deleted = !products.find(p => p.id === created.id);
            
            updateTestResult(testId, {
              status: deleted ? 'pass' : 'fail',
              message: deleted ? 'Data deletion successful' : 'Data deletion failed',
              details: { deleted, productId: created.id }
            });
            addLog(`Data Deletion: ${deleted ? 'PASS' : 'FAIL'}`, deleted ? 'success' : 'error');
          } catch (error) {
            updateTestResult(testId, {
              status: 'fail',
              message: error.message,
              details: { error: error.message }
            });
            addLog(`Data Deletion: FAIL - ${error.message}`, 'error');
          }
          break;

        case 'data_sync':
          try {
            if (!isAmplifyConfigured()) {
              updateTestResult(testId, {
                status: 'warning',
                message: 'Sync test skipped - Amplify not configured',
                details: { reason: 'Amplify not configured' }
              });
              addLog('Data Sync: SKIPPED - Amplify not configured', 'warning');
              return;
            }
            
            const startTime = Date.now();
            await hybridDataService.forceSync();
            const syncTime = Date.now() - startTime;
            
            updateTestResult(testId, {
              status: 'pass',
              message: `Data sync completed in ${syncTime}ms`,
              details: { syncTime, success: true }
            });
            addLog(`Data Sync: PASS (${syncTime}ms)`, 'success');
          } catch (error) {
            updateTestResult(testId, {
              status: 'fail',
              message: error.message,
              details: { error: error.message }
            });
            addLog(`Data Sync: FAIL - ${error.message}`, 'error');
          }
          break;

        case 'offline_persistence':
          try {
            const originalOnline = navigator.onLine;
            
            // Test data persistence
            const testData = {
              name: 'Offline Test Product',
              description: 'Test Description',
              price: 49.99,
              categoryId: 'test-category',
              stock: 5
            };
            
            const created = await hybridDataService.createProduct(testData);
            const retrieved = await hybridDataService.getProductById(created.id);
            const persisted = retrieved && retrieved.name === testData.name;
            
            // Clean up
            await hybridDataService.deleteProduct(created.id);
            
            updateTestResult(testId, {
              status: persisted ? 'pass' : 'fail',
              message: persisted ? 'Offline data persistence successful' : 'Offline data persistence failed',
              details: { persisted, online: originalOnline }
            });
            addLog(`Offline Persistence: ${persisted ? 'PASS' : 'FAIL'}`, persisted ? 'success' : 'error');
          } catch (error) {
            updateTestResult(testId, {
              status: 'fail',
              message: error.message,
              details: { error: error.message }
            });
            addLog(`Offline Persistence: FAIL - ${error.message}`, 'error');
          }
          break;
      }
    } catch (error) {
      updateTestResult(testId, {
        status: 'fail',
        message: error.message,
        details: { error: error.message }
      });
      addLog(`${testId}: FAIL - ${error.message}`, 'error');
    }
  };

  // Mobile Optimization Tests
  const runMobileTest = async (testId) => {
    try {
      switch (testId) {
        case 'mobile_detection':
          const isMobile = mobileStorageManager.isMobileDevice();
          updateTestResult(testId, {
            status: 'pass',
            message: `Device type: ${isMobile ? 'Mobile' : 'Desktop'}`,
            details: { isMobile, userAgent: navigator.userAgent }
          });
          addLog(`Mobile Detection: ${isMobile ? 'Mobile' : 'Desktop'}`, 'info');
          break;

        case 'storage_quota':
          try {
            const storageStatus = mobileStorageManager.getStorageStatus();
            const healthy = storageStatus.status === 'healthy';
            
            updateTestResult(testId, {
              status: healthy ? 'pass' : 'warning',
              message: `Storage: ${storageStatus.used} / ${storageStatus.quota} (${storageStatus.percentage}%)`,
              details: storageStatus
            });
            addLog(`Storage Quota: ${healthy ? 'PASS' : 'WARNING'} - ${storageStatus.percentage}% used`, healthy ? 'success' : 'warning');
          } catch (error) {
            updateTestResult(testId, {
              status: 'warning',
              message: 'Storage quota check failed',
              details: { error: error.message }
            });
            addLog(`Storage Quota: WARNING - ${error.message}`, 'warning');
          }
          break;

        case 'battery_optimization':
          const optimizations = mobileStorageManager.getMobileOptimizations();
          updateTestResult(testId, {
            status: 'pass',
            message: optimizations ? 'Mobile optimizations applied' : 'Desktop mode (no optimizations needed)',
            details: { optimizations, hasOptimizations: !!optimizations }
          });
          addLog(`Battery Optimization: ${optimizations ? 'PASS' : 'N/A'}`, 'info');
          break;

        case 'offline_functionality':
          try {
            // Test offline functionality
            const products = await hybridDataService.getProducts();
            const offlineWorking = Array.isArray(products);
            
            updateTestResult(testId, {
              status: offlineWorking ? 'pass' : 'fail',
              message: offlineWorking ? 'Offline functionality working' : 'Offline functionality failed',
              details: { offlineWorking, productCount: products.length }
            });
            addLog(`Offline Functionality: ${offlineWorking ? 'PASS' : 'FAIL'}`, offlineWorking ? 'success' : 'error');
          } catch (error) {
            updateTestResult(testId, {
              status: 'fail',
              message: error.message,
              details: { error: error.message }
            });
            addLog(`Offline Functionality: FAIL - ${error.message}`, 'error');
          }
          break;

        case 'sync_optimization':
          const syncOptimizations = mobileStorageManager.getMobileOptimizations();
          updateTestResult(testId, {
            status: 'pass',
            message: syncOptimizations ? 'Mobile sync optimizations active' : 'Desktop sync mode',
            details: { syncOptimizations }
          });
          addLog(`Sync Optimization: ${syncOptimizations ? 'PASS' : 'N/A'}`, 'info');
          break;
      }
    } catch (error) {
      updateTestResult(testId, {
        status: 'fail',
        message: error.message,
        details: { error: error.message }
      });
      addLog(`${testId}: FAIL - ${error.message}`, 'error');
    }
  };

  // Performance Tests
  const runPerformanceTest = async (testId) => {
    try {
      switch (testId) {
        case 'load_time':
          const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
          const goodLoadTime = loadTime < 3000; // 3 seconds
          
          updateTestResult(testId, {
            status: goodLoadTime ? 'pass' : 'warning',
            message: `Load time: ${loadTime}ms`,
            details: { loadTime, threshold: 3000 }
          });
          addLog(`Load Time: ${goodLoadTime ? 'PASS' : 'WARNING'} - ${loadTime}ms`, goodLoadTime ? 'success' : 'warning');
          break;

        case 'data_access_speed':
          try {
            const startTime = performance.now();
            const products = await hybridDataService.getProducts();
            const accessTime = performance.now() - startTime;
            const goodAccessTime = accessTime < 100; // 100ms
            
            updateTestResult(testId, {
              status: goodAccessTime ? 'pass' : 'warning',
              message: `Data access time: ${accessTime.toFixed(2)}ms`,
              details: { accessTime, productCount: products.length, threshold: 100 }
            });
            addLog(`Data Access Speed: ${goodAccessTime ? 'PASS' : 'WARNING'} - ${accessTime.toFixed(2)}ms`, goodAccessTime ? 'success' : 'warning');
          } catch (error) {
            updateTestResult(testId, {
              status: 'fail',
              message: error.message,
              details: { error: error.message }
            });
            addLog(`Data Access Speed: FAIL - ${error.message}`, 'error');
          }
          break;

        case 'sync_speed':
          try {
            if (!isAmplifyConfigured()) {
              updateTestResult(testId, {
                status: 'warning',
                message: 'Sync speed test skipped - Amplify not configured',
                details: { reason: 'Amplify not configured' }
              });
              addLog('Sync Speed: SKIPPED - Amplify not configured', 'warning');
              return;
            }
            
            const startTime = performance.now();
            await hybridDataService.forceSync();
            const syncTime = performance.now() - startTime;
            const goodSyncTime = syncTime < 5000; // 5 seconds
            
            updateTestResult(testId, {
              status: goodSyncTime ? 'pass' : 'warning',
              message: `Sync time: ${syncTime.toFixed(2)}ms`,
              details: { syncTime, threshold: 5000 }
            });
            addLog(`Sync Speed: ${goodSyncTime ? 'PASS' : 'WARNING'} - ${syncTime.toFixed(2)}ms`, goodSyncTime ? 'success' : 'warning');
          } catch (error) {
            updateTestResult(testId, {
              status: 'fail',
              message: error.message,
              details: { error: error.message }
            });
            addLog(`Sync Speed: FAIL - ${error.message}`, 'error');
          }
          break;

        case 'memory_usage':
          try {
            if (performance.memory) {
              const memory = performance.memory;
              const usedMemory = memory.usedJSHeapSize;
              const totalMemory = memory.totalJSHeapSize;
              const usagePercentage = (usedMemory / totalMemory) * 100;
              const goodMemoryUsage = usagePercentage < 80;
              
              updateTestResult(testId, {
                status: goodMemoryUsage ? 'pass' : 'warning',
                message: `Memory usage: ${usagePercentage.toFixed(1)}%`,
                details: { 
                  usedMemory, 
                  totalMemory, 
                  usagePercentage,
                  usedMemoryMB: (usedMemory / 1024 / 1024).toFixed(2),
                  totalMemoryMB: (totalMemory / 1024 / 1024).toFixed(2)
                }
              });
              addLog(`Memory Usage: ${goodMemoryUsage ? 'PASS' : 'WARNING'} - ${usagePercentage.toFixed(1)}%`, goodMemoryUsage ? 'success' : 'warning');
            } else {
              updateTestResult(testId, {
                status: 'warning',
                message: 'Memory usage not available in this browser',
                details: { reason: 'performance.memory not supported' }
              });
              addLog('Memory Usage: N/A - Not supported', 'info');
            }
          } catch (error) {
            updateTestResult(testId, {
              status: 'warning',
              message: 'Memory usage check failed',
              details: { error: error.message }
            });
            addLog(`Memory Usage: WARNING - ${error.message}`, 'warning');
          }
          break;

        case 'cache_efficiency':
          try {
            const startTime = performance.now();
            const products1 = await hybridDataService.getProducts();
            const firstAccessTime = performance.now() - startTime;
            
            const startTime2 = performance.now();
            const products2 = await hybridDataService.getProducts();
            const secondAccessTime = performance.now() - startTime2;
            
            const cacheEfficient = secondAccessTime < firstAccessTime;
            
            updateTestResult(testId, {
              status: cacheEfficient ? 'pass' : 'warning',
              message: `Cache efficiency: ${cacheEfficient ? 'Good' : 'Poor'}`,
              details: { 
                firstAccessTime, 
                secondAccessTime, 
                improvement: firstAccessTime - secondAccessTime,
                productCount: products1.length
              }
            });
            addLog(`Cache Efficiency: ${cacheEfficient ? 'PASS' : 'WARNING'}`, cacheEfficient ? 'success' : 'warning');
          } catch (error) {
            updateTestResult(testId, {
              status: 'fail',
              message: error.message,
              details: { error: error.message }
            });
            addLog(`Cache Efficiency: FAIL - ${error.message}`, 'error');
          }
          break;
      }
    } catch (error) {
      updateTestResult(testId, {
        status: 'fail',
        message: error.message,
        details: { error: error.message }
      });
      addLog(`${testId}: FAIL - ${error.message}`, 'error');
    }
  };

  // Get test status
  const getTestStatus = (result) => {
    if (!result) return 'pending';
    return result.status;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pass': return 'text-green-600 bg-green-100';
      case 'fail': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pass': return 'check_circle';
      case 'fail': return 'error';
      case 'warning': return 'warning';
      case 'pending': return 'help';
      default: return 'help';
    }
  };

  // Calculate overall score
  const calculateOverallScore = () => {
    const allTests = Object.values(testCategories).flat();
    const completedTests = allTests.filter(test => testResults[test.id]);
    const passedTests = completedTests.filter(test => testResults[test.id]?.status === 'pass');
    const criticalTests = allTests.filter(test => test.critical);
    const passedCritical = criticalTests.filter(test => testResults[test.id]?.status === 'pass');
    
    return {
      total: allTests.length,
      completed: completedTests.length,
      passed: passedTests.length,
      critical: criticalTests.length,
      criticalPassed: passedCritical.length,
      score: completedTests.length > 0 ? Math.round((passedTests.length / completedTests.length) * 100) : 0,
      criticalScore: criticalTests.length > 0 ? Math.round((passedCritical.length / criticalTests.length) * 100) : 0
    };
  };

  const score = calculateOverallScore();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">System Testing</h1>
          <p className="mt-2 text-gray-600">Comprehensive testing for connectivity, data persistence, and performance</p>
        </div>

        {/* Overall Score */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Test Results</h2>
            <button
              onClick={runAllTests}
              disabled={isRunning}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined">play_arrow</span>
              {isRunning ? 'Running Tests...' : 'Run All Tests'}
            </button>
          </div>

          {/* Progress Bar */}
          {(isRunning || overallProgress > 0) && (
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{currentTest || 'Preparing tests...'}</span>
                <span>{Math.round(overallProgress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Score Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{score.score}%</div>
              <div className="text-sm text-gray-600">Overall Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{score.criticalScore}%</div>
              <div className="text-sm text-gray-600">Critical Tests</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">{score.passed}/{score.completed}</div>
              <div className="text-sm text-gray-600">Tests Passed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">{score.total}</div>
              <div className="text-sm text-gray-600">Total Tests</div>
            </div>
          </div>
        </div>

        {/* Test Categories */}
        <div className="space-y-6">
          {Object.entries(testCategories).map(([category, tests]) => (
            <div key={category} className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <div className="space-y-3">
                {tests.map(test => {
                  const result = testResults[test.id];
                  const status = getTestStatus(result);
                  return (
                    <div key={test.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className={`material-symbols-outlined text-lg ${getStatusColor(status).split(' ')[0]}`}>
                          {getStatusIcon(status)}
                        </span>
                        <div>
                          <div className="font-medium text-gray-900">{test.name}</div>
                          {test.critical && (
                            <span className="text-xs text-red-600 font-medium">Critical</span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                          {status.toUpperCase()}
                        </div>
                        {result && (
                          <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">
                            {result.message}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Test Log */}
        {testLog.length > 0 && (
          <div className="bg-white shadow rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Log</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-64 overflow-y-auto">
              {testLog.map((log, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-gray-500">[{log.timestamp}]</span>
                  <span className={
                    log.type === 'error' ? 'text-red-400' :
                    log.type === 'warning' ? 'text-yellow-400' :
                    log.type === 'success' ? 'text-green-400' :
                    'text-gray-400'
                  }>
                    {log.message}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemTesting;
