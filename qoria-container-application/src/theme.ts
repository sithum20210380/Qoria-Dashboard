import type { ThemeConfig } from 'antd'

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1890ff',
    borderRadius: 8,
    wireframe: false,
  },
  components: {
    Layout: {
      bodyBg: '#f0f2f5',
      headerBg: '#1890ff',
    },
    Card: {
      borderRadiusLG: 12,
    },
    Button: {
      borderRadiusLG: 8,
    },
    Select: {
      borderRadius: 8,
    },
  },
}

export default theme