// const Admin = () => {
//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//     </div>
//   );
// };

// export default Admin;

// src/pages/user/Admin.tsx
import { useNavigate } from 'react-router-dom';
import { Logout } from '@mui/icons-material';
import { useAuthStore } from '../../stores/authStore';
import { useState } from 'react';
import { getUserCount } from '../../api/auth'; // Add this import

import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Chip,
  IconButton,
  Fab,
  FormControl,  
  InputLabel,   
  Select,       
  MenuItem 
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Dashboard,
  Inventory,
  People,
  Analytics
} from '@mui/icons-material';
import { getProducts, createProduct, deleteProduct, updateProduct } from '../../api/products';

interface Product {
  id: string;
  _id?: string; // Allow _id for backend compatibility
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl?: string;
}

const Admin = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    imageUrl: ''
  });
  const [error, setError] = useState('');

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  // Fetch products
  const { data: products, isLoading } = useQuery(
    'admin-products',
    () => getProducts({ page: 1, limit: 50 }),
    {
      onError: (error) => {
        console.error('Failed to fetch products:', error);
      }
    }
  );

  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      logout();
      navigate('/login');
    }
  };

  // Create product mutation
  const createMutation = useMutation(createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('admin-products');
      setOpenDialog(false);
      resetForm();
    },
    onError: (error) => {
      setError('Failed to create product');
    }
  });

  // Update product mutation
  const updateMutation = useMutation(
    (product: Product) => {
      if (selectedProduct) {
        // Remove 'id' from the payload to match the expected type
        const { id, ...productData } = product;
        return updateProduct(id, productData);
      }
      // Optionally, throw an error or return a rejected promise if selectedProduct is not set
      return Promise.reject(new Error('No product selected for update'));
    }
  , {
    onSuccess: () => {
      queryClient.invalidateQueries('admin-products');
      setOpenDialog(false);
      resetForm();
    },
    onError: (error) => {
      setError('Failed to update product');
    }
  });

  // Delete product mutation
  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('admin-products');
    },
    onError: (error) => {
      setError('Failed to delete product');
    }
  });

  const handleInputChange = (field: string, value: string | number) => {
    setProductForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setProductForm({
      name: '',
      description: '',
      price: 0,
      category: '',
      stock: 0,
      imageUrl: ''
    });
    setSelectedProduct(null);
    setError('');
  };

  const handleAddProduct = () => {
    resetForm();
    setOpenDialog(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      imageUrl: product.imageUrl || ''
    });
    setOpenDialog(true);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(productId);
    }
  };

  const handleSubmit = () => {
    if (!productForm.name || !productForm.description || productForm.price <= 0) {
      setError('Please fill in all required fields');
      return;
    }
    // console.log(selectedProduct._id);
    if (selectedProduct && selectedProduct._id) {
      updateMutation.mutate({ ...productForm, id: selectedProduct._id });
    } else {
      createMutation.mutate(productForm);
    }

  };


  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetForm();
  };

  const { data: userCountData } = useQuery(
    'user-count',
    getUserCount,
    {
      onError: (error) => {
        console.error('Failed to fetch user count:', error);
      }
    }
  );

  // Mock stats data
  const stats = [
    { title: 'Total Products', value: products?.total || 0, icon: <Inventory />, color: 'primary' },
    { title: 'Total Users', value: userCountData?.count || 0, icon: <People />, color: 'success' }, // Updated this line
    // { title: 'Revenue', value: '$45,230', icon: <Analytics />, color: 'warning' },
    // { title: 'Orders', value: 89, icon: <Dashboard />, color: 'info' }
  ];


  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your Nox Metals inventory and business operations
        </Typography>
      </Box>

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

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} {...({} as any)}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" color={`${stat.color}.main`}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                  <Box sx={{ color: `${stat.color}.main` }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Products Section */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">
            Product Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddProduct}
          >
            Add Product
          </Button>
        </Box>

        <Grid container spacing={3}>
          {products?.data?.map((product: Product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id} width={'45%'} {...({} as any)} >
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {product.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Chip label={`$${product.price}`} color="primary" />
                    <Chip label={`Stock: ${product.stock}`} variant="outlined" />
                  </Box>
                </CardContent>
                <CardActions>
                  <IconButton 
                    onClick={() => handleEditProduct(product)}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleDeleteProduct(product.id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Add/Edit Product Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedProduct ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} {...({} as any)}>
              <TextField
                label="Product Name"
                fullWidth
                required
                value={productForm.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} {...({} as any)}>
              <TextField
                label="Description"
                fullWidth
                required
                multiline
                rows={3}
                value={productForm.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} {...({} as any)}>
              <TextField
                label="Price"
                type="number"
                fullWidth
                required
                value={productForm.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} sm={6} {...({} as any)}>
              <TextField
                label="Stock"
                type="number"
                fullWidth
                required
                value={productForm.stock}
                onChange={(e) => handleInputChange('stock', parseInt(e.target.value))}
              />
            </Grid>
            {/* <Grid item xs={12} {...({} as any)}>
              <TextField
                label="Category"
                fullWidth
                required
                value={productForm.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
              />
            </Grid> */}
            <Grid item xs={12} sm={6} {...({} as any)} width={'36%'}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                value={productForm.category}
                label="Category"
                onChange={(e) => handleInputChange('category', e.target.value)}
              >
                <MenuItem value="">Select Category</MenuItem>
                <MenuItem value="Steel">Steel</MenuItem>
                <MenuItem value="Aluminum">Aluminum</MenuItem>
              </Select>
            </FormControl>
          </Grid>
            <Grid item xs={12} sm={6} {...({} as any)}>
              <TextField
                label="Image URL"
                fullWidth
                value={productForm.imageUrl}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={createMutation.isLoading}
          >
            {createMutation.isLoading ? 'Saving...' : 'Save Product'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Admin;