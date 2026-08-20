import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import { Box, Container, Typography, Button } from '@mui/material';
import './Shop.css';

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get('category');
  
  const category = urlCategory || 'all';

  const setCategory = (newCategory) => {
    if (newCategory === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', newCategory);
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [urlCategory]);

  const filteredProducts = category === 'all' 
    ? products 
    : products.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase());

  const filterButtons = [
    { label: 'All Products', value: 'all' },
    { label: 'Top Shelf', value: 'Exotic-Flower' },
    { label: 'Flower', value: 'flower' },
    { label: 'Cart', value: 'cart' },
    { label: 'Disposable Cart', value: 'disposable-cart' },
    { label: 'Edibles', value: 'edibles' },
    { label: 'Pre-rolls', value: 'pre-rolls' },
    { label: 'Shake', value: 'shake' },
    { label: 'Concentrates', value: 'concentrates' }
  ];

  return (
    <Box sx={{ py: 6, backgroundColor: '#f9fafb', minHeight: '80vh' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 800, 
              color: '#1f2937', 
              mb: 2,
              position: 'relative',
              display: 'inline-block',
              '&:after': {
                content: '""',
                display: 'block',
                width: '60px',
                height: '4px',
                backgroundColor: '#2E7D32',
                borderRadius: '2px',
                margin: '12px auto 0'
              }
            }}
          >
            Our Products
          </Typography>
          <Typography variant="body1" sx={{ color: '#4b5563', maxWidth: 600, mx: 'auto', mt: 1 }}>
            Explore our curated menu of premium Washington DC compliant cannabis selections.
          </Typography>
        </Box>

        {/* Filter Buttons */}
        <Box className="shop-filters" sx={{ mb: 6 }}>
          {filterButtons.map((btn) => {
            const isActive = category === btn.value;
            return (
              <Button
                key={btn.value}
                variant={isActive ? 'contained' : 'outlined'}
                onClick={() => setCategory(btn.value)}
                sx={{
                  borderRadius: '20px',
                  textTransform: 'none',
                  fontWeight: 500,
                  px: 3,
                  py: 1,
                  borderColor: '#2E7D32',
                  backgroundColor: isActive ? '#2E7D32' : 'transparent',
                  color: isActive ? '#ffffff' : '#2E7D32',
                  '&:hover': {
                    backgroundColor: isActive ? '#1b5e20' : 'rgba(46, 125, 50, 0.08)',
                    borderColor: '#2E7D32',
                  }
                }}
              >
                {btn.label}
              </Button>
            );
          })}
        </Box>
        
        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8, backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #f3f4f6' }}>
            <Typography variant="h6" sx={{ color: '#4b5563', fontWeight: 600, mb: 1 }}>
              No products found in this category.
            </Typography>
            <Typography variant="body2" sx={{ color: '#9ca3af', mb: 3 }}>
              Try selecting a different filter or check back later for updates.
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => setCategory('all')}
              sx={{
                backgroundColor: '#2E7D32',
                borderRadius: '10px',
                fontWeight: 700,
                px: 3,
                py: 1.2,
                '&:hover': { backgroundColor: '#1b5e20' }
              }}
            >
              View All Products
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Shop;