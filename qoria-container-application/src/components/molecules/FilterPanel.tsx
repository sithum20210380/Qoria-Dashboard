import React, { useMemo } from 'react'
import { Card, Select, Button, Space, Typography, Row, Col, Divider } from 'antd'
import { ClearOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { type RootState } from '../../store'
import {
  setSelectedCategory,
  setSelectedProducts,
  clearCategoryFilter,
  clearProductsFilter,
  clearAllFilters,
  runReport,
} from '../../store/slices/filterSlice'

const { Title, Text } = Typography
const { Option } = Select

/**
 * FilterPanel Component - Handles category and product filtering
 * Implements atomic design principles as a molecule component
 */
const FilterPanel: React.FC = () => {
  const dispatch = useDispatch()
  
  // Redux state selectors
  const { categories, products, loading } = useSelector((state: RootState) => state.data)
  const { 
    selectedCategory, 
    selectedProducts, 
    isRunReportEnabled 
  } = useSelector((state: RootState) => state.filter)

  /**
   * Get filtered products based on selected category
   * Memoized for performance optimization
   */
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return []
    return products.filter(product => product.category === selectedCategory)
  }, [products, selectedCategory])

  /**
   * Handle category selection change
   */
  const handleCategoryChange = (value: string | null) => {
    dispatch(setSelectedCategory(value))
  }

  /**
   * Handle product selection change
   */
  const handleProductChange = (values: string[]) => {
    dispatch(setSelectedProducts(values))
  }

  /**
   * Handle individual filter clearing
   */
  const handleClearCategory = () => {
    dispatch(clearCategoryFilter())
  }

  const handleClearProducts = () => {
    dispatch(clearProductsFilter())
  }

  /**
   * Handle clearing all filters
   */
  const handleClearAll = () => {
    dispatch(clearAllFilters())
  }

  /**
   * Handle run report action
   */
  const handleRunReport = () => {
    dispatch(runReport())
  }

  return (
    <Card 
      title={
        <Title level={4} style={{ margin: 0 }}>
          Qoria Dashboard Filters
        </Title>
      }
      bordered={false}
      style={{ 
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        
        {/* Category Filter Section */}
        <div>
          <Row justify="space-between" align="middle">
            <Col>
              <Text strong>Product Category</Text>
              <Text type="secondary" style={{ marginLeft: 8 }}>
                (Select one category)
              </Text>
            </Col>
            <Col>
              {selectedCategory && (
                <Button 
                  type="text" 
                  size="small" 
                  icon={<ClearOutlined />}
                  onClick={handleClearCategory}
                >
                  Clear
                </Button>
              )}
            </Col>
          </Row>
          
          <Select
            placeholder="Select a product category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            style={{ width: '100%', marginTop: 8 }}
            size="large"
            allowClear
            loading={loading}
            showSearch
            filterOption={(input, option) =>
              (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
            }
          >
            {categories.map(category => (
              <Option key={category.id} value={category.name}>
                {category.name} ({category.count} products)
              </Option>
            ))}
          </Select>
        </div>

        <Divider style={{ margin: '12px 0' }} />

        {/* Product Filter Section */}
        <div>
          <Row justify="space-between" align="middle">
            <Col>
              <Text strong>Products</Text>
              <Text type="secondary" style={{ marginLeft: 8 }}>
                (Select multiple products)
              </Text>
            </Col>
            <Col>
              {selectedProducts.length > 0 && (
                <Button 
                  type="text" 
                  size="small" 
                  icon={<ClearOutlined />}
                  onClick={handleClearProducts}
                >
                  Clear
                </Button>
              )}
            </Col>
          </Row>
          
          <Select
            mode="multiple"
            placeholder={
              selectedCategory 
                ? "Select products from the chosen category" 
                : "Please select a category first"
            }
            value={selectedProducts}
            onChange={handleProductChange}
            style={{ width: '100%', marginTop: 8 }}
            size="large"
            disabled={!selectedCategory || loading}
            showSearch
            filterOption={(input, option) =>
              (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
            }
            maxTagCount="responsive"
          >
            {filteredProducts.map(product => (
              <Option key={product.id} value={product.title}>
                {product.title} - ${product.price}
              </Option>
            ))}
          </Select>
          
          {!selectedCategory && (
            <Text type="secondary" style={{ fontSize: '12px', marginTop: 4 }}>
              Select a category first to enable product selection
            </Text>
          )}
        </div>

        <Divider style={{ margin: '12px 0' }} />

        {/* Action Buttons */}
        <Row gutter={12}>
          <Col flex="auto">
            <Button
              type="primary"
              size="large"
              icon={<PlayCircleOutlined />}
              onClick={handleRunReport}
              disabled={!isRunReportEnabled}
              style={{ 
                width: '100%',
                background: isRunReportEnabled ? '#1890ff' : undefined,
                borderColor: isRunReportEnabled ? '#1890ff' : undefined,
              }}
            >
              Run Report
            </Button>
          </Col>
          <Col>
            <Button
              size="large"
              icon={<ClearOutlined />}
              onClick={handleClearAll}
              disabled={!selectedCategory && selectedProducts.length === 0}
            >
              Clear All
            </Button>
          </Col>
        </Row>

        {/* Filter Summary */}
        {(selectedCategory || selectedProducts.length > 0) && (
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.7)', 
            padding: 12, 
            borderRadius: 8,
            border: '1px solid #f0f0f0'
          }}>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              <strong>Current Selection:</strong><br />
              Category: {selectedCategory || 'None'}<br />
              Products: {selectedProducts.length} selected
            </Text>
          </div>
        )}
      </Space>
    </Card>
  )
}

export default FilterPanel