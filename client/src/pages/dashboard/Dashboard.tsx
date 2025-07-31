// const Dashboard = () => {
//   return (
//     <div>
//       <h1>User Dashboard</h1>
//     </div>
//   );
// };

// export default Dashboard;

// src/pages/dashboard/Dashboard.tsx
import { useNavigate } from 'react-router-dom';
import { Logout } from '@mui/icons-material';


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
  Pagination,
  MenuItem,
  Select,
  FormControl,
  InputLabel
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
  const {logout, user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [sort, setSort] = useState('createdAt:desc');
  const [stockFilter, setStockFilter] = useState('');
  const limit = 9;

  const navigate = useNavigate();
//   const { logout, user } = useAuthStore();

    // Debounce search term to avoid too many API calls
    useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPage(1); // Reset to first page when searching
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);
  // Fetch products
//   const {
//     data: productsData,
//     isLoading,
//     isError,
//     error
//   } = useQuery(
//     ['products', { page, limit, search: searchTerm, category: selectedCategory, stock: stockFilter, sort  }],
//     () => getProducts({ 
//       page, 
//       limit, 
//       search: debouncedSearchTerm || undefined, // Only pass search if not empty
//       category: selectedCategory || undefined,
//       stock: stockFilter ? Number(stockFilter) : undefined,
//       sort: sort
//     }),
//     {
//       keepPreviousData: true,
//       enabled: true // Always enabled
//     }
//   );

    // Fix the useQuery section (around lines 70-85):
const {
  data: productsData,
  isLoading,
  isError,
  error
} = useQuery(
  // Fix 1: Update query key to include ALL filter states
  ['products', { 
    page, 
    limit, 
    search: debouncedSearchTerm,  // Use debounced, not searchTerm
    category: selectedCategory,
    sort: sort,                   // Add sort to query key
    stock: stockFilter           // Add stock to query key
  }],
  // Fix 2: Pass dynamic sort instead of hard-coded
  () => getProducts({ 
    page, 
    limit, 
    search: debouncedSearchTerm || undefined,
    category: selectedCategory || undefined,
    stock: stockFilter ? Number(stockFilter) : undefined,
    sort: sort  // Use dynamic sort, not 'createdAt:desc'
  }),
  {
    keepPreviousData: true,
    enabled: true
  }
);

// Fix 3: Add useEffect to reset page when filters change
useEffect(() => {
  setPage(1);
}, [selectedCategory, stockFilter, sort]);

  const products = productsData?.data || [];
  const totalPages = Math.ceil((productsData?.total || 0) / limit);

  // Clear search function
  const handleClearSearch = () => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
    setPage(1);
  };

  const handleAddToCart = (productId: string) => {
    // Implement add to cart functionality
    console.log('Added to cart:', productId);
  };

  const handleAddToFavorites = (productId: string) => {
    // Implement add to favorites functionality
    console.log('Added to favorites:', productId);
  };

  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      logout();
      navigate('/login');
    }
  };

  if (isLoading) return <LoadingSpinner />;

  // Add debug logging here - around line 142
  console.log('Dashboard filter values:', {
    searchTerm,
    debouncedSearchTerm,
    selectedCategory,
    stockFilter,
    sort,
    page
  });

  console.log('API call parameters:', {
    page, 
    limit, 
    search: debouncedSearchTerm || undefined,
    category: selectedCategory || undefined,
    stock: stockFilter ? Number(stockFilter) : undefined,
    sort: sort
  });

  console.log('Products response:', productsData);


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
              Welcome back, {user?.firstName || JSON.parse(localStorage.getItem('pendingUserData') || '{}').firstName || 'User'}!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user?.email}
            </Typography>

            <Button
                variant="outlined"
                color="error"
                startIcon={<Logout />}
                onClick={handleSignOut}
                sx={{ 
                    height: 'fit-content',
                    '&:hover': {
                      backgroundColor: 'error.light',
                      color: 'white'
                    }
                  }}
                >
                  Sign Out
                </Button>
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
                 endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <Button
                      size="small"
                      onClick={handleClearSearch}
                      sx={{ minWidth: 'auto', p: 0.5 }}
                    >
                      ×
                    </Button>
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 250 }}
            />
            {/* Category Filter */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Category"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Steel">Steel</MenuItem>
                <MenuItem value="Aluminum">Aluminum</MenuItem>
                </Select>
                </FormControl>
                {/* Stock Filter */}
                <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Stock</InputLabel>
                <Select
                value={stockFilter}
                label="Stock"
                onChange={(e) => setStockFilter(e.target.value)}
                >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="0">Out of Stock</MenuItem>
                <MenuItem value="1">In Stock</MenuItem>
                </Select>
                </FormControl>
                {/* Sort Filter */}
                <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                value={sort}
                label="Sort By"
                onChange={(e) => setSort(e.target.value)}
                >
                <MenuItem value="createdAt:desc">Newest</MenuItem>
                <MenuItem value="price:asc">Price: Low to High</MenuItem>
                <MenuItem value="price:desc">Price: High to Low</MenuItem>
                {/* Add more sort options as needed */}
                </Select>
                </FormControl>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => {/* Implement filter logic */}}
            >
              Filter
            </Button>
          </Box>
        </Box>

        {/* Search Results Info */}
        {debouncedSearchTerm && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {isLoading 
                ? 'Searching...' 
                : `Found ${productsData?.total || 0} results for "${debouncedSearchTerm}"`
              }
            </Typography>
          </Box>
        )}

        {isError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            Error loading products: {(error as Error)?.message}
          </Alert>
        )}

        {/* Products Grid */}
        <Grid container spacing={3}>
          {products.map((product: Product) => (
            <Grid xs={12} sm={6} md={4} width='40%' key={product.id} {...({} as any)}>
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
                  component="img"
                  sx={{
                    height: 200,
                    objectFit: 'cover',
                    bgcolor: 'grey.200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  image={product.imageUrl && product.imageUrl !== '' ? product.imageUrl : undefined}
                  alt={product.name}
                />


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
                
                {/* <CardActions sx={{ p: 2 }}>
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
                </CardActions> */}
              </Card>
            </Grid>
          ))}
        </Grid>

          {/* No Results Message */}
        {products.length === 0 && !isLoading && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              {debouncedSearchTerm ? 'No products found' : 'No products available'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {debouncedSearchTerm 
                ? `Try different keywords or clear your search` 
                : 'Check back later for new products'
              }
            </Typography>
            {debouncedSearchTerm && (
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                onClick={() => {
                    // Clear all filters
                    setSearchTerm('');
                    setDebouncedSearchTerm('');
                    setSelectedCategory('');
                    setStockFilter('');
                    setSort('createdAt:desc');
                    setPage(1);
                }}
                >
                Clear Filters
                </Button>
            )}
          </Box>
        )}

        
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