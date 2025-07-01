import React, { Suspense } from 'react'
import { Card, Spin, Alert, Row, Col, Typography } from 'antd'
import { PieChartOutlined, BarChartOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { type RootState } from '../../store'
import type { PieChartData, ColumnChartData } from '../../types'

const { Title } = Typography

// Lazy load the remote chart components when child app is ready
// For now, we'll create placeholder components
const PieChartPlaceholder: React.FC<{ data: PieChartData[] }> = ({ data }) => (
  <div style={{ 
    height: 400, 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: 8,
    color: 'white'
  }}>
    <div style={{ textAlign: 'center' }}>
      <PieChartOutlined style={{ fontSize: 48, marginBottom: 16 }} />
      <div>Pie Chart Component</div>
      <div style={{ fontSize: 12, marginTop: 8 }}>
        {data.length} categories ready to display
      </div>
    </div>
  </div>
)

const ColumnChartPlaceholder: React.FC<{ data: ColumnChartData[] }> = ({ data }) => (
  <div style={{ 
    height: 400, 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    borderRadius: 8,
    color: 'white'
  }}>
    <div style={{ textAlign: 'center' }}>
      <BarChartOutlined style={{ fontSize: 48, marginBottom: 16 }} />
      <div>Column Chart Component</div>
      <div style={{ fontSize: 12, marginTop: 8 }}>
        {data.length} products ready to display
      </div>
    </div>
  </div>
)

/**
 * ChartContainer Component - Manages chart display logic
 * Implements atomic design principles as an organism component
 */
const ChartContainer: React.FC = () => {
  const { products, categories, loading, error } = useSelector((state: RootState) => state.data)
  const { 
    selectedCategory, 
    selectedProducts, 
    hasReportRun 
  } = useSelector((state: RootState) => state.filter)

  /**
   * Generate pie chart data based on current filters
   */
  const generatePieChartData = (): PieChartData[] => {
    if (selectedCategory && selectedProducts.length > 0) {
      // Show selected products from the category
      const filteredProducts = products.filter(p => 
        p.category === selectedCategory && selectedProducts.includes(p.title)
      )
      
      return filteredProducts.map(product => ({
        name: product.title,
        value: product.price,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`
      }))
    } else if (selectedCategory) {
      // Show all products from the selected category
      const categoryProducts = products.filter(p => p.category === selectedCategory)
      return categoryProducts.map(product => ({
        name: product.title,
        value: product.price,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`
      }))
    } else {
      // Show all categories (default view)
      return categories.map(category => ({
        name: category.name,
        value: category.count,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`
      }))
    }
  }

  /**
   * Generate column chart data for the report
   */
  const generateColumnChartData = (): ColumnChartData[] => {
    if (!hasReportRun) return []

    if (selectedCategory && selectedProducts.length > 0) {
      // Show selected products
      const filteredProducts = products.filter(p => 
        p.category === selectedCategory && selectedProducts.includes(p.title)
      )
      
      return filteredProducts.map(product => ({
        name: product.title,
        value: product.stock,
        category: product.category
      }))
    } else if (selectedCategory) {
      // Show top 10 products from category by stock
      const categoryProducts = products
        .filter(p => p.category === selectedCategory)
        .sort((a, b) => b.stock - a.stock)
        .slice(0, 10)
      
      return categoryProducts.map(product => ({
        name: product.title,
        value: product.stock,
        category: product.category
      }))
    } else {
      // Show category totals
      const categoryStocks = categories.map(category => {
        const categoryProducts = products.filter(p => p.category === category.name)
        const totalStock = categoryProducts.reduce((sum, p) => sum + p.stock, 0)
        
        return {
          name: category.name,
          value: totalStock,
          category: category.name
        }
      })
      
      return categoryStocks.sort((a, b) => b.value - a.value)
    }
  }

  const pieChartData = generatePieChartData()
  const columnChartData = generateColumnChartData()

  if (loading) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <Spin size="large" />
          <div style={{ marginTop: 16 }}>Loading dashboard data...</div>
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert
        message="Error Loading Data"
        description={error}
        type="error"
        showIcon
        style={{ margin: '20px 0' }}
      />
    )
  }

  return (
    <div>
      <Row gutter={[24, 24]}>
        {/* Pie Chart Section */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Title level={4} style={{ margin: 0 }}>
                <PieChartOutlined style={{ marginRight: 8 }} />
                Product Distribution
              </Title>
            }
            bordered={false}
            style={{ 
              borderRadius: 12,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Suspense fallback={<Spin size="large" />}>
              <PieChartPlaceholder data={pieChartData} />
            </Suspense>
          </Card>
        </Col>

        {/* Column Chart Section */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Title level={4} style={{ margin: 0 }}>
                <BarChartOutlined style={{ marginRight: 8 }} />
                Report Analysis
              </Title>
            }
            bordered={false}
            style={{ 
              borderRadius: 12,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          >
            {hasReportRun ? (
              <Suspense fallback={<Spin size="large" />}>
                <ColumnChartPlaceholder data={columnChartData} />
              </Suspense>
            ) : (
              <div style={{ 
                height: 400, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: '#f5f5f5',
                borderRadius: 8,
                border: '2px dashed #d9d9d9'
              }}>
                <div style={{ textAlign: 'center', color: '#8c8c8c' }}>
                  <BarChartOutlined style={{ fontSize: 48, marginBottom: 16 }} />
                  <div>Click "Run Report" to generate column chart</div>
                </div>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      {/* Chart Data Summary */}
      {(pieChartData.length > 0 || columnChartData.length > 0) && (
        <Card 
          title="Chart Data Summary" 
          style={{ 
            marginTop: 24, 
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <div>
                <strong>Pie Chart:</strong> {pieChartData.length} items
                <div style={{ fontSize: '12px', color: '#666', marginTop: 4 }}>
                  {selectedCategory ? `Showing products in ${selectedCategory}` : 'Showing all categories'}
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <strong>Column Chart:</strong> {hasReportRun ? `${columnChartData.length} items` : 'Not generated'}
                <div style={{ fontSize: '12px', color: '#666', marginTop: 4 }}>
                  {hasReportRun ? 'Report data ready' : 'Click Run Report to generate'}
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  )
}

export default ChartContainer