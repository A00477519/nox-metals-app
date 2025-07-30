import { Alert, AlertProps } from '@mui/material';

interface ErrorAlertProps extends Omit<AlertProps, 'severity'> {
  message?: string;
}

const ErrorAlert = ({ message = 'An error occurred', ...props }: ErrorAlertProps) => {
  return (
    <Alert severity="error" {...props}>
      {message}
    </Alert>
  );
};

export default ErrorAlert;

