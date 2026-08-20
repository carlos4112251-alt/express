import React from 'react';
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  Container,
  Grid,
  IconButton,
  Fade
} from '@mui/material';
import {
  ShoppingCart,
  ExpandMore,
  Whatshot
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to featured products section
  const scrollToFeatured = () => {
    const featuredSection = document.getElementById('featured-products');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  const features = [
    { icon: '🌿', text: 'Organic Quality' },
    { icon: '🚚', text: '1-Hour Delivery' },
    { icon: '🔒', text: 'Secure I-71' }
  ];

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        height: { xs: '88vh', sm: '92vh', md: '100vh' },
        minHeight: { xs: 520, sm: 600, md: 700 },
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        // Matches the clean white / light theme foundation of the Header
        bgcolor: '#ffffff',
      }}
    >
      {/* Background with a softer, lighter gradient overlay matching the header's crisp design */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(to bottom, rgba(31, 41, 55, 0.75), rgba(17, 24, 39, 0.65)),
            url('/images/weees.PNG')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 2, sm: 4 } }}>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <Fade in timeout={800}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography
                  variant="overline"
                  component="p"
                  sx={{
                    mb: 1,
                    display: 'inline-block',
                    fontWeight: 700,
                    letterSpacing: 2.5,
                    fontSize: { xs: '0.65rem', sm: '0.75rem' },
                    // Matches header's emerald badge styling
                    color: '#059669',
                    bgcolor: 'rgba(5, 150, 105, 0.15)',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '6px',
                  }}
                >
                  PREMIUM DC CANNABIS
                </Typography>

                <Typography
                  variant={isMobile ? (isSmallMobile ? 'h4' : 'h3') : 'h2'}
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    lineHeight: 1.15,
                    mb: 2,
                    color: '#ffffff',
                    fontSize: {
                      xs: '1.75rem',
                      sm: '2.4rem',
                      md: '2.8rem',
                    },
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                  }}
                >
                  Quality Cannabis Delivered Discreetly
                </Typography>

                <Typography
                  variant="body1"
                  component="p"
                  sx={{
                    mb: 3,
                    color: 'rgba(255,255,255,0.85)',
                    maxWidth: 540,
                    mx: { xs: 'auto', md: '0' },
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    lineHeight: 1.6,
                  }}
                >
                  Discover exclusive flower, edibles, cartridges, and potent concentrates. Fast, reliable local delivery serving Washington DC under full I-71 compliance.
                </Typography>

                {/* Call To Action Buttons */}
                <Box sx={{ 
                  display: 'flex', 
                  gap: 1.5, 
                  mb: 3.5, 
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  alignItems: 'stretch'
                }}>
                  <Button
                    component={RouterLink}
                    to="/shop"
                    variant="contained"
                    size="large"
                    startIcon={<ShoppingCart />}
                    onClick={scrollToTop}
                    sx={{
                      py: 1.4,
                      px: 3,
                      fontWeight: 700,
                      borderRadius: '10px',
                      // Exact Header Emerald primary color match (#059669)
                      backgroundColor: '#059669',
                      boxShadow: '0 4px 14px rgba(5, 150, 105, 0.4)',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      '&:hover': {
                        backgroundColor: '#047857',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(5, 150, 105, 0.6)',
                      },
                      transition: 'all 0.25s ease',
                    }}
                  >
                    Shop Now
                  </Button>

                  <Button
                    component={RouterLink}
                    to="/specials"
                    variant="outlined"
                    size="large"
                    startIcon={<Whatshot sx={{ color: '#fb923c' }} />}
                    onClick={scrollToTop}
                    sx={{
                      py: 1.4,
                      px: 3,
                      fontWeight: 700,
                      borderRadius: '10px',
                      borderColor: 'rgba(255,255,255,0.25)',
                      color: '#ffffff',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        borderColor: '#fb923c',
                        backgroundColor: 'rgba(251, 146, 60, 0.1)',
                      },
                      transition: 'all 0.25s ease',
                    }}
                  >
                    Special Offers
                  </Button>
                </Box>

                {/* Features Row */}
                <Box sx={{ 
                  display: 'flex', 
                  gap: 1.5, 
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}>
                  {features.map((feature, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: 'rgba(255, 255, 255, 0.07)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        px: { xs: 1.5, sm: 2 },
                        py: 0.8,
                        borderRadius: '8px',
                        backdropFilter: 'blur(6px)',
                        flex: { xs: '1 1 40%', sm: '0 0 auto' },
                        justifyContent: { xs: 'center', sm: 'flex-start' }
                      }}
                    >
                      <Typography component="span" sx={{ mr: 1, fontSize: { xs: '0.9rem', sm: '1.1rem' } }}>
                        {feature.icon}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#e5e7eb', fontSize: { xs: '0.75rem', sm: '0.85rem' }, fontWeight: 500 }}>
                        {feature.text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Fade>
          </Grid>

          {/* Desktop Right Image Side */}
          {!isMobile && (
            <Grid item md={6}>
              <Fade in timeout={1000}>
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    height: { md: '480px', lg: '520px' },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '&:hover img': {
                      transform: 'scale(1.03)',
                    }
                  }}
                >
                  <Box
                    component="img"
                    src="/images/imm1.png"
                    alt="Premium cannabis products"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                </Box>
              </Fade>
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Scroll indicator */}
      <IconButton
        onClick={scrollToFeatured}
        sx={{
          position: 'absolute',
          bottom: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#ffffff',
          zIndex: 2,
          animation: 'bounce 2s infinite',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(4px)',
          p: 1,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
          },
        }}
        aria-label="Scroll down to featured products"
      >
        <ExpandMore />
      </IconButton>

      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateX(-50%) translateY(0);
            }
            40% {
              transform: translateX(-50%) translateY(-6px);
            }
            60% {
              transform: translateX(-50%) translateY(-3px);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default Hero;