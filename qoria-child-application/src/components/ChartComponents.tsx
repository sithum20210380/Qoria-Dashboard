import React, { useEffect, useRef, useState } from 'react'
import { Card, Typography, Row, Col, Spin, Alert } from 'antd'
import { PieChartOutlined, BarChartOutlined } from '@ant-design/icons'
import * as Highcharts from 'highcharts'
import type { PieChartData, ColumnChartData } from '../types'

const { Title } = Typography

export interface ChartComponentsProps {
  pieData?: PieChartData[]
  columnData?: ColumnChartData[]
  showColumnChart?: boolean
  loading?: boolean
  error?: string | null
}

/**
 * PieChart Component using Highcharts
 */
const PieChart: React.FC<{ data: PieChartData[]; loading?: boolean }> = ({
  data,
  loading = false
}) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<Highcharts.Chart | null>(null)
  const [isDestroyed, setIsDestroyed] = useState(false)

  useEffect(() => {
    if (!chartRef.current || loading || isDestroyed) return

    // Safe cleanup of existing chart
    const cleanupChart = () => {
      if (chartInstance.current) {
        try {
          // Check if chart is still valid before destroying
          if (chartInstance.current.container && chartInstance.current.container.parentNode) {
            chartInstance.current.destroy()
          }
        } catch (err) {
          console.warn('Error destroying previous pie chart:', err)
        }
        chartInstance.current = null
      }
    }

    cleanupChart()

    // Only create chart if we have data
    if (!data || data.length === 0) {
      return
    }

    try {
      // Create new chart with error handling
      chartInstance.current = Highcharts.chart(chartRef.current, {
        chart: {
          type: 'pie',
          height: 400,
          backgroundColor: 'transparent',
          style: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }
        },
        title: {
          text: '',
          style: {
            display: 'none'
          }
        },
        tooltip: {
          pointFormat: '<b>{point.fullName}</b><br/>{series.name}: <b>{point.percentage:.1f}%</b><br/>Value: <b>{point.y}</b>',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          style: {
            color: 'white',
            fontSize: '11px'
          },
          borderRadius: 8,
          shadow: true
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b><br/>{point.percentage:.1f}%',
              style: {
                fontSize: '10px',
                fontWeight: 'normal',
                textOutline: 'none'
              },
              distance: 20,
              connectorWidth: 1,
              connectorColor: '#000'
            },
            showInLegend: true,
            borderWidth: 1,
            borderColor: 'white',
            size: '75%'
          }
        },
        legend: {
          align: 'center',
          verticalAlign: 'bottom',
          layout: 'horizontal',
          itemStyle: {
            fontSize: '11px'
          },
          maxHeight: 80,
          navigation: {
            enabled: true
          }
        },
        series: [{
          type: 'pie',
          name: 'Distribution',
          colorByPoint: true,
          data: data.map((item, index) => ({
            name: item.name.length > 15 ? item.name.substring(0, 15) + '...' : item.name,
            y: item.value,
            color: `hsl(${(index * 137.5) % 360}, 70%, 60%)`,
            fullName: item.name // Store full name for tooltip
          }))
        } as Highcharts.SeriesPieOptions],
        credits: {
          enabled: false
        }
      })
    } catch (err) {
      console.error('Error creating pie chart:', err)
    }

    // Cleanup function
    return () => {
      cleanupChart()
    }
  }, [data, loading, isDestroyed])

  // Component unmount cleanup
  useEffect(() => {
    return () => {
      setIsDestroyed(true)
      if (chartInstance.current) {
        try {
          if (chartInstance.current.container && chartInstance.current.container.parentNode) {
            chartInstance.current.destroy()
          }
        } catch (err) {
          console.warn('Error destroying pie chart on unmount:', err)
        }
        chartInstance.current = null
      }
    }
  }, [])

  if (loading) {
    return (
      <div style={{
        height: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Spin size="large" />
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div style={{
        height: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 8,
        border: '2px dashed rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ textAlign: 'center', color: '#666' }}>
          <PieChartOutlined style={{ fontSize: 48, marginBottom: 16 }} />
          <div>No data available for pie chart</div>
        </div>
      </div>
    )
  }

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
}

/**
 * ColumnChart Component using Highcharts
 */
const ColumnChart: React.FC<{ data: ColumnChartData[]; loading?: boolean }> = ({
  data,
  loading = false
}) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<Highcharts.Chart | null>(null)
  const [isDestroyed, setIsDestroyed] = useState(false)

  useEffect(() => {
    if (!chartRef.current || loading || isDestroyed) return

    // Safe cleanup of existing chart
    const cleanupChart = () => {
      if (chartInstance.current) {
        try {
          // Check if chart is still valid before destroying
          if (chartInstance.current.container && chartInstance.current.container.parentNode) {
            chartInstance.current.destroy()
          }
        } catch (err) {
          console.warn('Error destroying previous column chart:', err)
        }
        chartInstance.current = null
      }
    }

    cleanupChart()

    // Only create chart if we have data
    if (!data || data.length === 0) {
      return
    }

    try {
      // Create new chart with error handling
      chartInstance.current = Highcharts.chart(chartRef.current, {
        chart: {
          type: 'column',
          height: 400,
          backgroundColor: 'transparent',
          style: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }
        },
        title: {
          text: '',
          style: {
            display: 'none'
          }
        },
        xAxis: {
          categories: data.map(item => {
            // Truncate long product names for better display
            const name = item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name
            return name
          }),
          title: {
            text: 'Products/Categories',
            style: {
              fontSize: '12px'
            }
          },
          labels: {
            rotation: -45,
            style: {
              fontSize: '9px'
            },
            useHTML: true,
            formatter: function () {
              return '<div style="width: 80px; text-align: center;">' + this.value + '</div>'
            }
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Stock/Count',
            style: {
              fontSize: '12px'
            }
          },
          labels: {
            style: {
              fontSize: '10px'
            }
          }
        },
        tooltip: {
          headerFormat: '<b>{point.key}</b><br/>',
          pointFormat: '{series.name}: <b>{point.y}</b><br/>',
          shared: false,
          useHTML: true,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          style: {
            color: 'white',
            fontSize: '11px'
          },
          borderRadius: 8,
          shadow: true
        },
        plotOptions: {
          column: {
            pointPadding: 0.1,
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              style: {
                fontSize: '9px',
                fontWeight: 'bold',
                textOutline: 'none'
              },
              color: '#000',
              y: -5
            },
            colorByPoint: true,
            colors: data.map((_, index) => `hsl(${(index * 137.5) % 360}, 70%, 50%)`),
            borderRadius: 3
          }
        },
        series: [{
          type: 'column',
          name: 'Stock',
          data: data.map((item, index) => ({
            name: item.name,
            y: item.value,
            color: `hsl(${(index * 137.5) % 360}, 70%, 50%)`
          }))
        } as Highcharts.SeriesColumnOptions],
        credits: {
          enabled: false
        }
      })
    } catch (err) {
      console.error('Error creating column chart:', err)
    }

    // Cleanup function
    return () => {
      cleanupChart()
    }
  }, [data, loading, isDestroyed])

  // Component unmount cleanup
  useEffect(() => {
    return () => {
      setIsDestroyed(true)
      if (chartInstance.current) {
        try {
          if (chartInstance.current.container && chartInstance.current.container.parentNode) {
            chartInstance.current.destroy()
          }
        } catch (err) {
          console.warn('Error destroying column chart on unmount:', err)
        }
        chartInstance.current = null
      }
    }
  }, [])

  if (loading) {
    return (
      <div style={{
        height: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Spin size="large" />
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div style={{
        height: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
        border: '2px dashed rgba(255, 255, 255, 0.3)',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <BarChartOutlined style={{ fontSize: 48, marginBottom: 16 }} />
          <div>No data available for column chart</div>
        </div>
      </div>
    )
  }

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
}

/**
 * Main ChartComponents Container
 * Exported for use in Container Application
 */
const ChartComponents: React.FC<ChartComponentsProps> = ({
  pieData = [],
  columnData = [],
  showColumnChart = false,
  loading = false,
  error = null
}) => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Simulate component initialization
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  if (!isReady) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>Initializing Chart Components...</div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert
        message="Chart Error"
        description={error}
        type="error"
        showIcon
        style={{ margin: '20px 0' }}
      />
    )
  }

  return (
    <div>
      <Row gutter={[16, 16]}>
        {/* Pie Chart Section */}
        <Col xs={24} xl={12}>
          <Card
            title={
              <Title level={4} style={{ margin: 0, fontSize: '16px' }}>
                <PieChartOutlined style={{ marginRight: 8 }} />
                 Product Categories
              </Title>
            }
            style={{
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              background: '#fff',
              minHeight: 480
            }}
            bodyStyle={{ padding: '16px' }}
          >
            <PieChart data={pieData} loading={loading} />
          </Card>
        </Col>

        {/* Column Chart Section */}
        <Col xs={24} xl={12}>
          <Card
            title={
              <Title level={4} style={{ margin: 0, fontSize: '16px', color: 'black' }}>
                <BarChartOutlined style={{ marginRight: 8 }} />
                {showColumnChart ? 'Stock Analysis' : 'Products in selected category'}
              </Title>
            }
            style={{
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              background: showColumnChart ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f8f9fa',
              minHeight: 480
            }}
            bodyStyle={{ padding: '16px' }}
          >
            {showColumnChart ? (
              <ColumnChart data={columnData} loading={loading} />
            ) : (
              <div style={{
                height: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 8,
                border: '2px dashed rgba(0, 0, 0, 0.1)',
                color: '#666'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <BarChartOutlined style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }} />
                  <div style={{ fontSize: '14px', fontWeight: 500 }}>Click "Run Report" to generate analysis</div>
                  <div style={{ fontSize: '12px', marginTop: 8, opacity: 0.7 }}>
                    Select filters and run report to see detailed stock analysis
                  </div>
                </div>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      {/* Chart Data Summary */}
      {(pieData.length > 0 || columnData.length > 0) && (
        <Card
          title={
            <Title level={5} style={{ margin: 0, fontSize: '14px' }}>
              Chart Data Summary
            </Title>
          }
          style={{
            marginTop: 16,
            borderRadius: 8,
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
            background: '#fafafa'
          }}
          bodyStyle={{ padding: '12px 16px' }}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <div style={{ textAlign: 'center', padding: '8px' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1890ff' }}>
                  {pieData.length}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  Pie Chart Items
                </div>
                <div style={{ fontSize: '11px', color: '#999', marginTop: 2 }}>
                  Real-time distribution
                </div>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div style={{ textAlign: 'center', padding: '8px' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: showColumnChart ? '#52c41a' : '#d9d9d9' }}>
                  {showColumnChart ? columnData.length : 0}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  Column Chart Items
                </div>
                <div style={{ fontSize: '11px', color: '#999', marginTop: 2 }}>
                  {showColumnChart ? 'Report analysis ready' : 'Awaiting report'}
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  )
}

export default ChartComponents