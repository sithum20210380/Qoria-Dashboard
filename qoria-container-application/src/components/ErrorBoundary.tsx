import { Component, type ReactNode, type ErrorInfo } from 'react'
import { Alert } from 'antd'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Microfrontend Error:', error, errorInfo)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Alert
          message="Component Loading Error"
          description="Failed to load the chart component. Please refresh the page."
          type="error"
          showIcon
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary