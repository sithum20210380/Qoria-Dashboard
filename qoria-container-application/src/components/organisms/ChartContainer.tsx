import React, { Suspense } from 'react'
import { Card, Spin, Alert } from 'antd'
import { useSelector } from 'react-redux'
import { type RootState } from '../../store'
import type { PieChartData, ColumnChartData } from '../../types'
import ErrorBoundary from '../ErrorBoundary'

// Lazy load the remote chart components
const ChartComponents = React.lazy(() => import('chartComponents/ChartComponents'))

/**
 * ChartContainer Component - Manages chart display logic and integrates with child app
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
   * Generate pie chart data based on ONLY category filter
   * Pie chart ignores product selections and only shows category-level data
   */
  const generatePieChartData = (): PieChartData[] => {
    if (selectedCategory) {
      // Show all products from the selected category (ignore product selections)
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
   * Generate column chart data based on BOTH category and product filters
   * Column chart respects both category and product selections
   */
  const generateColumnChartData = (): ColumnChartData[] => {
    if (!hasReportRun) return []

    if (selectedCategory && selectedProducts.length > 0) {
      const filteredProducts = products.filter(p => 
        p.category === selectedCategory && selectedProducts.includes(p.title)
      )
      
      return filteredProducts.map(product => ({
        name: product.title,
        value: product.stock,
        category: product.category
      }))
    } else if (selectedCategory) {
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
      <ErrorBoundary>
      <Suspense 
        fallback={
          <Card>
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <Spin size="large" />
              <div style={{ marginTop: 16 }}>Loading Chart Components...</div>
            </div>
          </Card>
        }
      >
        <ChartComponents
          pieData={pieChartData}
          columnData={columnChartData}
          showColumnChart={hasReportRun}
          loading={loading}
          error={error}
        />
      </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default ChartContainer