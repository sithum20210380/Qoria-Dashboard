import React, { Suspense } from 'react'
import { Card, Spin, Alert } from 'antd'
import { useSelector } from 'react-redux'
import { type RootState } from '../../store'
import type { PieChartData, ColumnChartData } from '../../types'
import ErrorBoundary from '../ErrorBoundary'
import styles from './ChartContainer.module.css'

// Lazy load the remote chart components
const ChartComponents = React.lazy(() => import('chartComponents/ChartComponents'))

const ChartContainer: React.FC = () => {
  const { products, categories, loading, error } = useSelector((state: RootState) => state.data)
  const {
    selectedCategory,
    selectedProducts,
    hasReportRun
  } = useSelector((state: RootState) => state.filter)

  // Generate pie chart data based on selected category or all categories
  const generatePieChartData = (): PieChartData[] => {
    if (selectedCategory) {
      const categoryProducts = products.filter(p => p.category === selectedCategory)
      return categoryProducts.map(product => ({
        name: product.title,
        value: product.price,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`
      }))
    } else {
      return categories.map(category => ({
        name: category.name,
        value: category.count,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`
      }))
    }
  }

  // Generate column chart data based on selected category or all categories
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
        <div className={styles.loaderContainer}>
          <Spin size="large" />
          <div className={styles.loaderText}>Loading dashboard data...</div>
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
        className={styles.errorAlert}
      />
    )
  }

  return (
    <div>
      <ErrorBoundary>
        <Suspense
          fallback={
            <Card>
              <div className={styles.loaderContainer}>
                <Spin size="large" />
                <div className={styles.loaderText}>Loading Chart Components...</div>
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