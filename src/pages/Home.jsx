import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  LocalFireDepartment,
  Cake,
  Spa,
  Opacity,
  Straighten,
  BatteryAlert,
  CheckCircleRounded,
  ArrowForwardRounded
} from '@mui/icons-material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();

  const featuredProducts = products.slice(0, 4);

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get actual counts from products data safely
  const getCategoryCount = (category) =>
    products.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase()).length;

  const categories = [
    { name: 'Exotic-Flower', icon: <Spa fontSize="large" />, count: getCategoryCount('Exotic-Flower'), filter: 'Exotic-Flower' },
    { name: 'Flower', icon: <Spa fontSize="large" />, count: getCategoryCount('flower'), filter: 'flower' },
    { name: 'Cartridges', icon: <Straighten fontSize="large" />, count: getCategoryCount('cart'), filter: 'cart' },
    { name: 'Disposables', icon: <BatteryAlert fontSize="large" />, count: getCategoryCount('disposable-cart'), filter: 'disposable-cart' },
    { name: 'Edibles', icon: <Cake fontSize="large" />, count: getCategoryCount('edibles'), filter: 'edibles' },
    { name: 'Shake', icon: <LocalFireDepartment fontSize="large" />, count: getCategoryCount('shake'), filter: 'shake' },
    { name: 'Concentrates', icon: <Opacity fontSize="large" />, count: getCategoryCount('concentrates'), filter: 'concentrates' },
    { name: 'Pre-rolls', icon: <LocalFireDepartment fontSize="large" />, count: getCategoryCount('pre-rolls'), filter: 'pre-rolls' }
  ];

  const sectionHeadingStyles = {
    fontWeight: 800,
    color: '#111827',
    mb: { xs: 4, md: 6 },
    position: 'relative',
    '&:after': {
      content: '""',
      display: 'block',
      width: '50px',
      height: '4px',
      backgroundColor: '#059669',
      borderRadius: '2px',
      margin: '14px auto 0'
    }
  };

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {/* Hero Banner */}
      <Hero />

      {/* Featured Products Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            alignItems: { xs: 'center', sm: 'flex-end' }, 
            justifyContent: 'space-between', 
            mb: { xs: 4, md: 6 },
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          <Box>
            <Typography 
              id="featured-products"
              variant="h4" 
              component="h2" 
              sx={{
                fontWeight: 800,
                color: '#111827',
                mb: 1,
                position: 'relative',
                '&:after': {
                  content: { xs: '""', sm: 'none' },
                  display: { xs: 'block', sm: 'none' },
                  width: '40px',
                  height: '4px',
                  backgroundColor: '#059669',
                  borderRadius: '2px',
                  margin: '10px auto 0'
                }
              }}
            >
              Featured Products
            </Typography>
            <Typography variant="body1" sx={{ color: '#6b7280', fontSize: '1rem' }}>
              Handpicked customer favorites available right now.
            </Typography>
          </Box>

          <Button
            component={RouterLink}
            to="/shop"
            onClick={scrollToTop}
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              gap: 1,
              color: '#059669',
              fontWeight: 700,
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: 'rgba(5, 150, 105, 0.05)',
                transform: 'translateX(4px)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            View All <ArrowForwardRounded fontSize="small" />
          </Button>
        </Box>

        {/* Responsive Grid Layout - Adjusted sizing to prevent oversized desktop cards */}
        <Grid container spacing={{ xs: 2, sm: 3, md: 3 }} justifyContent="center">
          {featuredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} lg={3} key={product.id} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ width: '100%', maxWidth: { md: 280, lg: 300 }, display: 'flex', flexDirection: 'column' }}>
                <ProductCard product={product} />
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Mobile View All CTA Button */}
        <Box sx={{ textAlign: 'center', mt: 6, display: { sm: 'none' } }}>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/shop"
            onClick={scrollToTop}
            fullWidth
            sx={{
              py: 1.5,
              fontWeight: 700,
              fontSize: '1rem',
              borderRadius: '12px',
              backgroundColor: '#059669',
              boxShadow: '0 4px 14px rgba(5, 150, 105, 0.25)',
              '&:hover': {
                backgroundColor: '#047857',
              },
            }}
          >
            View All Products
          </Button>
        </Box>
      </Container>

      {/* Categories Section */}
      <Box sx={{ backgroundColor: '#f8fafc', py: { xs: 6, md: 10 }, borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" sx={sectionHeadingStyles}>
            Shop By Category
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  component={RouterLink}
                  to={`/shop?category=${category.filter}`}
                  onClick={scrollToTop}
                  sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    p: 3,
                    textAlign: 'center',
                    height: '100%',
                    width: '100%',
                    maxWidth: 280,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                    border: '1px solid #f1f5f9',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 12px 24px -6px rgba(5, 150, 105, 0.12)',
                      borderColor: 'rgba(5, 150, 105, 0.3)'
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    textTransform: 'none',
                    color: 'inherit'
                  }}
                >
                  <Box sx={{
                    width: 64,
                    height: 64,
                    backgroundColor: 'rgba(5, 150, 105, 0.08)',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    color: '#059669',
                  }}>
                    {category.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1f2937', mb: 0.5, fontSize: '1.05rem' }}>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                    {category.count} {category.count === 1 ? 'item' : 'items'}
                  </Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Why Choose Us Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 12 } }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 8 } }}>
          <Typography variant="h4" component="h2" sx={sectionHeadingStyles}>
            Why Choose Pot Express
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.1rem',
              color: '#4b5563',
              maxWidth: 650,
              margin: '0 auto',
              mt: 1
            }}
          >
            We're committed to providing the highest quality cannabis products with exceptional service.
          </Typography>
        </Box>

        <Grid container spacing={6} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box component="ul" sx={{ pl: 0, listStyle: 'none', m: 0 }}>
              {[
                "Fast, discreet local delivery within 1 hour",
                "100% lab-tested and premium quality products",
                "Knowledgeable and friendly support staff",
                "Competitive pricing and daily special offers",
                "Sourced directly from top local growers & producers"
              ].map((item, index) => (
                <Box
                  component="li"
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                    p: 2.2,
                    borderRadius: '12px',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                    border: '1px solid #f1f5f9',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#334155',
                    transition: 'transform 0.2s ease',
                    '&:hover': { transform: 'translateX(4px)' }
                  }}
                >
                  <Box sx={{ 
                    width: 28, 
                    height: 28, 
                    borderRadius: '50%', 
                    backgroundColor: 'rgba(5, 150, 105, 0.1)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mr: 2,
                    color: '#059669',
                    flexShrink: 0
                  }}>
                    <CheckCircleRounded sx={{ fontSize: '18px' }} />
                  </Box>
                  {item}
                </Box>
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              component="img"
              src="/images/zip.png"
              alt="Premium cannabis products"
              sx={{
                width: '100%',
                maxWidth: 440,
                borderRadius: '20px',
                boxShadow: '0 20px 40px -15px rgba(0,0,0,0.1)',
                border: '1px solid #f1f5f9'
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box sx={{
        backgroundImage: 'linear-gradient(rgba(17, 24, 39, 0.88), rgba(17, 24, 39, 0.88)), url(/images/cta-bg.JPG)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#ffffff',
        py: { xs: 8, md: 12 },
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography variant={isMobile ? 'h4' : 'h3'} component="h2" gutterBottom sx={{ fontWeight: 800, mb: 2 }}>
            Ready to Experience Premium Cannabis?
          </Typography>
          <Typography variant="body1" component="p" sx={{ mb: 4, color: '#94a3b8', fontSize: '1.1rem', maxWidth: 600, mx: 'auto' }}>
            Order now for fast, secure I-71 compliant delivery across Washington DC.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/shop"
            onClick={scrollToTop}
            sx={{
              px: 6,
              py: 1.6,
              fontWeight: 700,
              fontSize: '1.05rem',
              borderRadius: '12px',
              backgroundColor: '#059669',
              boxShadow: '0 4px 16px rgba(5, 150, 105, 0.4)',
              '&:hover': {
                backgroundColor: '#047857',
                boxShadow: '0 6px 24px rgba(5, 150, 105, 0.6)',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.25s ease',
            }}
          >
            Shop Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;