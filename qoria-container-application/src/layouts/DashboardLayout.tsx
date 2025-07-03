import React, { useEffect } from 'react'
import { Layout, Typography, Row, Col, Divider } from 'antd'
import { DashboardOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsRequest } from '../store/slices/dataSlices'
import { type RootState } from '../store'
import FilterPanel from '../components/molecules/FilterPanel'
import ChartContainer from '../components/organisms/ChartContainer'

const { Header, Content } = Layout
const { Title, Text } = Typography

const DashboardLayout: React.FC = () => {
  const dispatch = useDispatch()
  useSelector((state: RootState) => state.data)

  useEffect(() => {
    dispatch(fetchProductsRequest())
  }, [dispatch])

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header style={{ 
        background: 'linear-gradient(90deg, #1890ff 0%, #722ed1 100%)',
        padding: '0 24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
      }}>
        <Row align="middle" justify="space-between">
          <Col>
            <Title level={2} style={{ color: 'white', margin: 0 }}>
              <DashboardOutlined style={{ marginRight: 12 }} />
              Qoria Product Dashboard
            </Title>
          </Col>
          <Col>
            <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
              Micro Frontend Architecture
            </Text>
          </Col>
        </Row>
      </Header>

      <Content style={{ padding: '24px', background: '#f0f2f5' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ marginBottom: 24, textAlign: 'center' }}>
            <Title level={3} style={{ color: '#1890ff' }}>
              Product Category & Analysis Dashboard
            </Title>
            <Text type="secondary">
              Filter products by category and generate detailed reports with interactive charts
            </Text>
          </div>

          <Divider />

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={8}>
              <FilterPanel />
            </Col>
            <Col xs={24} lg={16}>
              <ChartContainer />
            </Col>
          </Row>

          <div style={{ 
            marginTop: 48, 
            textAlign: 'center', 
            padding: '24px 0',
            borderTop: '1px solid #f0f0f0'
          }}>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Qoria Dashboard v1.0 | Built with React + TypeScript + Ant Design + Redux Saga
              <br />
              Container Application - Micro Frontend Architecture
            </Text>
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default DashboardLayout
