
// const Dashboard = () => {
//   return (
//     <div>
//       <h1>User Dashboard</h1>
//     </div>
//   );
// };

// export default Dashboard;

// src/pages/dashboard/Dashboard.tsx

import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Avatar,
  Chip,
  Alert,
  TextField,
  InputAdornment,
  Pagination
} from '@mui/material';
import {
  Person,
  Search,
  ShoppingCart,
  Favorite,
  FilterList
} from '@mui/icons-material';
import { useAuthStore } from '../../stores/authStore';
import { getProducts } from '../../api/products';
import LoadingSpinner from '../../components/common/LoadingSpinner';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
  stock: number;
}

const Dashboard = () => {
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const limit = 9;

  // Fetch products
  const {
    data: productsData,
    isLoading,
    isError,
    error
  } = useQuery(
    ['products', { page, limit, search: searchTerm, category: selectedCategory }],
    () => getProducts({ 
      page, 
      limit, 
      search: searchTerm,
      category: selectedCategory,
      sort: 'createdAt:desc' 
    }),
    {
      keepPreviousData: true
    }
  );

  const products = productsData?.data || [];
  const totalPages = Math.ceil((productsData?.total || 0) / limit);

  const handleAddToCart = (productId: string) => {
    // Implement add to cart functionality
    console.log('Added to cart:', productId);
  };

  const handleAddToFavorites = (productId: string) => {
    // Implement add to favorites functionality
    console.log('Added to favorites:', productId);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{ 
              width: 64, 
              height: 64, 
              mr: 3,
              bgcolor: 'primary.main',
              fontSize: '1.5rem'
            }}
          >
            <Person sx={{ fontSize: '2rem' }} />
          </Avatar>
          <Box>
            <Typography variant="h5">
              Welcome back, {user?.firstName || 'User'}!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Products Section */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5">
            Available Products
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              placeholder="Search products..."
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 250 }}
            />
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => {/* Implement filter logic */}}
            >
              Filter
            </Button>
          </Box>
        </Box>

        {isError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            Error loading products: {(error as Error)?.message}
          </Alert>
        )}

        {/* Products Grid */}
        <Grid container spacing={3}>
          {products.map((product: Product) => (
            <Grid xs={12} sm={6} md={4} key={product.id} {...({} as any)}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    height: 200,
                    bgcolor: 'grey.200',
                    backgroundImage: product.imageUrl ? `url(${product.imageUrl})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {!product.imageUrl && (
                    <Typography variant="body2" color="text.secondary">
                      No Image Available
                    </Typography>
                  )}
                </CardMedia>
                
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {product.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" color="primary.main">
                      ${product.price}
                    </Typography>
                    <Chip 
                      label={`Stock: ${product.stock}`} 
                      size="small"
                      color={product.stock > 10 ? "success" : product.stock > 0 ? "warning" : "error"}
                    />
                  </Box>
                  
                  {product.category && (
                    <Chip label={product.category} size="small" variant="outlined" />
                  )}
                </CardContent>
                
                <CardActions sx={{ p: 2 }}>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    onClick={() => handleAddToCart(product.id)}
                    disabled={product.stock === 0}
                    fullWidth
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleAddToFavorites(product.id)}
                  >
                    <Favorite />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, newPage) => setPage(newPage)}
              color="primary"
            />
          </Box>
        )}

        {products.length === 0 && !isLoading && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No products found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search criteria
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Dashboard;