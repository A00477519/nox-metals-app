// src/components/LoadingButton.tsx
import { ReactNode } from 'react';
import { CircularProgress } from '@mui/material';

const LoadingButton = ({
  loading,
  children,
  ...props
}: {
  loading: boolean;
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`${props.className} relative`}
    >
      {loading && (
        <CircularProgress
          size={24}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      )}
      <span className={loading ? 'invisible' : ''}>{children}</span>
    </button>
  );
};

export default LoadingButton;