import React from 'react';
import { Alert } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface ErrorMessageProps {
  message: string;
  description?: string;
  showIcon?: boolean;
  closable?: boolean;
  onClose?: () => void;
  type?: 'error' | 'warning';
}

/**
 * Reusable error message component
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  description,
  showIcon = true,
  closable = false,
  onClose,
  type = 'error'
}) => {
  return (
    <div style={{ margin: '16px 0' }}>
      <Alert
        message={message}
        description={description}
        type={type}
        showIcon={showIcon}
        closable={closable}
        onClose={onClose}
        icon={<ExclamationCircleOutlined />}
        style={{
          borderRadius: '6px'
        }}
      />
    </div>
  );
};

export default ErrorMessage;