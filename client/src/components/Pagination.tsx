// src/components/Pagination.tsx
import { Button } from '@mui/material';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <div className="flex justify-center space-x-2 mt-4">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'contained' : 'outlined'}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;