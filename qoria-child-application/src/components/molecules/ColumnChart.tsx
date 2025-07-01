import React, { memo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card } from 'antd';
import type { ColumnChartData } from '../../types';
import { getColumnChartOptions } from '../../utils/chartUtils';
import LoadingSpinner from '../atoms/LoadingSpinner';
import ErrorMessage from '../atoms/ErrorMessage';

interface ColumnChartProps {
  data: {
    categories: string[];
    series: ColumnChartData[];
  };
  loading?: boolean;
  error?: string | null;
  title?: string;
  visible?: boolean;
}

/**
 * Column Chart component using Highcharts
 */
const ColumnChart: React.FC<ColumnChartProps> = memo(({
  data,
  loading = false,
  error = null,
  title = 'Product Analytics',
  visible = true
}) => {
  // Don't render if not visible
  if (!visible) {
    return null;
  }

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
        <LoadingSpinner tip="Generating chart..." />
      </Card>
    );
  }

  // Handle empty data
  if (!data || !data.categories || data.categories.length === 0) {
    return (
      <Card title={title}>
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          color: '#999'
        }}>
          <p>No data available to display</p>
          <p>Please select filters and click "Run Report"</p>
        </div>
      </Card>
    );
  }

  const chartOptions = getColumnChartOptions(data);

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

ColumnChart.displayName = 'ColumnChart';

export default ColumnChart;