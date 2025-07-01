import React, { useEffect, useCallback } from 'react';
import { Row, Col, Typography, Space } from 'antd';
import { useChartData } from '../../hooks/useChartData';
import type { FilterState, MicrofrontendMessage } from '../../types';
import { MESSAGE_TYPES } from '../../utils/constants';
import PieChart from '../molecules/PieChart';
import ColumnChart from '../molecules/ColumnChart';
import ErrorMessage from '../atoms/ErrorMessage';

const { Title } = Typography;

/**
 * Main dashboard component that manages all charts
 */
const ChartDashboard: React.FC = () => {
  const {
    pieChartData,
    columnChartData,
    showColumnChart,
    loading,
    error,
    updatePieChart,
    generateChart,
    clearCharts,
    initializeCharts
  } = useChartData();

  /**
   * Handle messages from container application
   */
  const handleMicrofrontendMessage = useCallback((event: MessageEvent<MicrofrontendMessage>) => {
    const { type, payload } = event.data;

    switch (type) {
      case MESSAGE_TYPES.FILTER_CHANGE:
        updatePieChart(payload as FilterState);
        break;
        
      case MESSAGE_TYPES.RUN_REPORT:
        generateChart(payload as FilterState);
        break;
        
      case MESSAGE_TYPES.CLEAR_FILTERS:
        clearCharts();
        initializeCharts();
        break;
        
      default:
        console.warn('Unknown message type:', type);
    }
  }, [updatePieChart, generateChart, clearCharts, initializeCharts]);

  /**
   * Set up microfrontend communication
   */
  useEffect(() => {
    // Listen for messages from container app
    window.addEventListener('message', handleMicrofrontendMessage);
    
    // Initialize charts on mount
    initializeCharts();

    // Send ready message to container
    if (window.parent) {
      window.parent.postMessage({
        type: MESSAGE_TYPES.CHART_READY,
        payload: { ready: true }
      }, '*');
    }

    return () => {
      window.removeEventListener('message', handleMicrofrontendMessage);
    };
  }, [handleMicrofrontendMessage, initializeCharts]);

  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
            Product Analytics Dashboard
          </Title>
          <p style={{ color: '#666', marginTop: '8px' }}>
            Interactive charts powered by microfrontend architecture
          </p>
        </div>

        {error && (
          <ErrorMessage 
            message="Dashboard Error" 
            description={error}
            closable
          />
        )}

        <Row gutter={[24, 24]}>
          {/* Pie Chart Section */}
          <Col xs={24} lg={showColumnChart ? 12 : 24}>
            <PieChart
              data={pieChartData}
              loading={loading}
              error={error}
              title="Product Distribution by Category"
            />
          </Col>

          {/* Column Chart Section */}
          {showColumnChart && (
            <Col xs={24} lg={12}>
              <ColumnChart
                data={columnChartData}
                loading={loading}
                error={error}
                title="Detailed Product Analytics"
                visible={showColumnChart}
              />
            </Col>
          )}
        </Row>

        {!showColumnChart && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            border: '2px dashed #d9d9d9'
          }}>
            <Title level={4} style={{ color: '#999' }}>
              Column Chart Area
            </Title>
            <p style={{ color: '#999' }}>
              Select filters and click "Run Report" to generate detailed analytics
            </p>
          </div>
        )}
      </Space>
    </div>
  );
};

export default ChartDashboard;