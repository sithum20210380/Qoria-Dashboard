import React, { memo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card } from 'antd';
import type { ChartDataPoint } from '../../types';
import { getPieChartOptions } from '../../utils/chartUtils';
import LoadingSpinner from '../atoms/LoadingSpinner';
import ErrorMessage from '../atoms/ErrorMessage';

interface PieChartProps {
  data: ChartDataPoint[];
  loading?: boolean;
  error?: string | null;
  title?: string;
}

/**
 * Pie Chart component using Highcharts
 */
const PieChart: React.FC<PieChartProps> = memo(({
  data,
  loading = false,
  error = null,
  title = 'Product Distribution'
}) => {
  // Handle error state
  if (error) {
    return (
      <Card title={title}>
        <ErrorMessage 
          message="Chart Error" 
          description={error}
          type="error"
        />
      </Card>
    );
  }

  // Handle loading state
  if (loading) {
    return (
      <Card title={title}>
        <LoadingSpinner tip="Loading chart data..." />
      </Card>
    );
  }

  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <Card title={title}>
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          color: '#999'
        }}>
          <p>No data available to display</p>
        </div>
      </Card>
    );
  }

  const chartOptions = getPieChartOptions(data);

  return (
    <Card 
      title={title}
      style={{ marginBottom: '20px' }}
      bodyStyle={{ padding: '20px' }}
    >
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        containerProps={{ style: { height: '400px' } }}
      />
    </Card>
  );
});

PieChart.displayName = 'PieChart';

export default PieChart;