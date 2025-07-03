import React, { useEffect } from 'react'
import { Layout, Typography, Row, Col, Divider } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsRequest } from '../store/slices/dataSlices'
import { type RootState } from '../store'
import FilterPanel from '../components/filterPanel/FilterPanel'
import ChartContainer from '../components/chartContainer/ChartContainer'
import styles from './DashboardLayout.module.css'

import Logo from '../assets/qoria-logo.webp'

const { Header, Content } = Layout
const { Title, Text } = Typography

const DashboardLayout: React.FC = () => {
  const dispatch = useDispatch()
  useSelector((state: RootState) => state.data)

  useEffect(() => {
    dispatch(fetchProductsRequest())
  }, [dispatch])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className={styles.header}>

          <div className={styles.logoTitle}>
            <div>
              <img src={Logo} alt="Qoria Logo" className={styles.logoImage} />
            </div>

            <div>
              <Text className={styles.subtitle}>
                Product Dashboard
              </Text>
            </div>

          </div>

      </Header>

      <Content className={styles.content}>
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
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

          <div className={styles.footer}>
            <Text className={styles.footerText}>
              Qoria Dashboard v1.0
              <br />
              © Develop by Sithum Raveesha
            </Text>
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default DashboardLayout
