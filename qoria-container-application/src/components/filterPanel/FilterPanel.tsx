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
import styles from './FilterPanel.module.css'

const { Title, Text } = Typography
const { Option } = Select

const FilterPanel: React.FC = () => {
  const dispatch = useDispatch()

  const { categories, products, loading } = useSelector((state: RootState) => state.data)
  const { selectedCategory, selectedProducts, isRunReportEnabled } = useSelector((state: RootState) => state.filter)

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return []
    return products.filter(product => product.category === selectedCategory)
  }, [products, selectedCategory])

  const handleCategoryChange = (value: string | null) => dispatch(setSelectedCategory(value))
  const handleProductChange = (values: string[]) => dispatch(setSelectedProducts(values))
  const handleClearCategory = () => dispatch(clearCategoryFilter())
  const handleClearProducts = () => dispatch(clearProductsFilter())
  const handleClearAll = () => dispatch(clearAllFilters())
  const handleRunReport = () => dispatch(runReport())

  return (
    <Card
      title={<Title level={4} className={styles.title}>Qoria Dashboard Filters</Title>}
      className={styles.card}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Category Filter Section */}
        <div>
          <Row justify="space-between" align="middle">
            <Col>
              <Text strong>Product Category</Text>
              <Text type="secondary" style={{ marginLeft: 8 }}>(Select one category)</Text>
            </Col>
            <Col>
              {selectedCategory && (
                <Button type="text" size="small" icon={<ClearOutlined />} onClick={handleClearCategory}>
                  Clear
                </Button>
              )}
            </Col>
          </Row>

          <Select
            placeholder="Select a product category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className={styles.select}
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

        <Divider className={styles.divider} />

        {/* Product Filter Section */}
        <div>
          <Row justify="space-between" align="middle">
            <Col>
              <Text strong>Products</Text>
              <Text type="secondary" style={{ marginLeft: 8 }}>(Select multiple products)</Text>
            </Col>
            <Col>
              {selectedProducts.length > 0 && (
                <Button type="text" size="small" icon={<ClearOutlined />} onClick={handleClearProducts}>
                  Clear
                </Button>
              )}
            </Col>
          </Row>

          <Select
            mode="multiple"
            placeholder={
              selectedCategory
                ? 'Select products from the chosen category'
                : 'Please select a category first'
            }
            value={selectedProducts}
            onChange={handleProductChange}
            className={styles.select}
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
            <Text type="secondary" className={styles.disabledText}>
              Select a category first to enable product selection
            </Text>
          )}
        </div>

        <Divider className={styles.divider} />

        {/* Action Buttons */}
        <Row gutter={12}>
          <Col flex="auto">
            <Button
              type="primary"
              size="large"
              icon={<PlayCircleOutlined />}
              onClick={handleRunReport}
              disabled={!isRunReportEnabled}
              className={styles.runReportButton}
              style={{
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
          <div className={styles.selectionSummary}>
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