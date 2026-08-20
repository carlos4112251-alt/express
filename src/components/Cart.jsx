import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  TextField,
  Paper,
  Grid,
  Badge,
  Chip,
  useMediaQuery,
  useTheme,
  alpha
} from '@mui/material';
import { 
  Delete as DeleteIcon, 
  ShoppingCart as ShoppingCartIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  LocalOffer as OfferIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Cart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallMobile = useMediaQuery('(max-width:400px)');
  const location = useLocation();

  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    savings
  } = useCart();

  // Scroll to top when component mounts or location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuantityChange = (productId, selectedOption, newQuantity) => {
    const quantity = Math.max(1, Math.min(99, parseInt(newQuantity) || 1));
    updateQuantity(productId, selectedOption, quantity);
  };

  const incrementQuantity = (item) => {
    updateQuantity(item.id, item.selectedOption, item.quantity + 1);
  };

  const decrementQuantity = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.selectedOption, item.quantity - 1);
    }
  };

  const hasDiscount = (item) => {
    return item.originalPrice && item.originalPrice > item.price;
  };

  return (
    <Box sx={{ 
      width: '100%',
      minHeight: '100vh',
      py: isMobile ? 4 : 6,
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)',
    }}>
      <Box sx={{ 
        maxWidth: 1200, 
        margin: '0 auto', 
        px: isMobile ? 2 : 3,
      }}>
        {/* Header Section */}
        <Box sx={{ 
          mb: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            component="h1"
            sx={{ 
              fontWeight: 800,
              display: 'flex', 
              alignItems: 'center', 
              letterSpacing: '-0.5px'
            }}
          >
            <Badge badgeContent={cartCount} color="primary" sx={{ mr: 2.5 }}>
              <ShoppingCartIcon fontSize={isMobile ? "medium" : "large"} />
            </Badge>
            Your Shopping Cart
          </Typography>

          {cart.items.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              onClick={clearCart}
              startIcon={<DeleteIcon />}
              size="small"
              sx={{ borderRadius: 2, fontWeight: 600 }}
            >
              Clear Cart
            </Button>
          )}
        </Box>

        {cart.items.length === 0 ? (
          <Paper 
            elevation={0}
            sx={{ 
              textAlign: 'center', 
              py: 8, 
              px: 3, 
              borderRadius: 4,
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              background: '#ffffff'
            }}
          >
            <ShoppingCartIcon sx={{ fontSize: 64, color: 'text.secondary', opacity: 0.4, mb: 2 }} />
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Your cart is empty
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
              Looks like you haven't added anything to your cart yet. Explore our menu to find top-quality products.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/shop"
              onClick={scrollToTop}
              startIcon={<ShoppingCartIcon />}
              size="large"
              sx={{ 
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontWeight: 700,
                boxShadow: '0 4px 14px rgba(76, 175, 80, 0.3)'
              }}
            >
              Browse Menu
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={4}>
            {/* Cart Items List */}
            <Grid item xs={12} md={8}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: isMobile ? 2 : 3, 
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  background: '#ffffff'
                }}
              >
                <List sx={{ p: 0 }}>
                  {cart.items.map((item, index) => (
                    <React.Fragment key={`${item.id}-${item.selectedOption?.option || 'default'}`}>
                      <ListItem
                        sx={{
                          flexDirection: isMobile ? 'column' : 'row',
                          alignItems: isMobile ? 'flex-start' : 'center',
                          padding: '16px 0',
                          width: '100%',
                          position: 'relative'
                        }}
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => removeFromCart(item.id, item.selectedOption)}
                            color="error"
                            sx={{ 
                              position: isMobile ? 'absolute' : 'static',
                              right: isMobile ? 0 : 'auto',
                              top: isMobile ? 12 : 'auto',
                              '&:hover': { backgroundColor: alpha(theme.palette.error.main, 0.1) }
                            }}
                          >
                            <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar sx={{ 
                          minWidth: isSmallMobile ? 60 : 75,
                          mr: 2
                        }}>
                          <Avatar
                            alt={item.name}
                            src={item.image}
                            variant="rounded"
                            sx={{ 
                              width: isSmallMobile ? 60 : 75, 
                              height: isSmallMobile ? 60 : 75,
                              borderRadius: 2,
                              backgroundColor: '#e0e0e0'
                            }}
                          />
                        </ListItemAvatar>
                        
                        <ListItemText
                          primary={
                            <Box sx={{ pr: isMobile ? 4 : 0 }}>
                              <Typography 
                                variant={isMobile ? "subtitle1" : "h6"} 
                                component="div"
                                sx={{ 
                                  lineHeight: 1.2,
                                  fontWeight: 700,
                                  mb: 0.5
                                }}
                              >
                                {item.name}
                              </Typography>
                              {hasDiscount(item) && (
                                <Chip
                                  icon={<OfferIcon sx={{ fontSize: '0.9rem !important' }} />}
                                  label={`Save $${((item.originalPrice - item.price) * item.quantity).toFixed(2)}`}
                                  color="success"
                                  size="small"
                                  sx={{ 
                                    fontWeight: 600,
                                    fontSize: '0.7rem',
                                    height: 22,
                                    borderRadius: 1.5
                                  }}
                                />
                              )}
                            </Box>
                          }
                          secondary={
                            <Box sx={{ mt: 1 }}>
                              {item.selectedOption?.option && (
                                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                                  Size/Option: <strong>{item.selectedOption.option}</strong>
                                </Typography>
                              )}
                              <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 1, 
                                mt: 0.5,
                                flexWrap: 'wrap'
                              }}>
                                {hasDiscount(item) ? (
                                  <>
                                    <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                      ${item.originalPrice.toFixed(2)}
                                    </Typography>
                                    <Typography variant="body2" color="success.main" fontWeight="700">
                                      ${item.price.toFixed(2)} each
                                    </Typography>
                                  </>
                                ) : (
                                  <Typography variant="body2" color="text.secondary" fontWeight={500}>
                                    ${item.price.toFixed(2)} each
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          }
                          sx={{ 
                            flex: 1,
                            mr: isMobile ? 0 : 3,
                            mb: isMobile ? 2 : 0
                          }}
                        />
                        
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          width: isMobile ? '100%' : 'auto',
                          justifyContent: isMobile ? 'space-between' : 'flex-start',
                          mt: isMobile ? 1.5 : 0,
                          pt: isMobile ? 1.5 : 0,
                          borderTop: isMobile ? `1px dashed ${theme.palette.divider}` : 'none'
                        }}>
                          {/* Quantity Controls */}
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            backgroundColor: '#f1f3f5',
                            borderRadius: 2,
                            p: 0.5
                          }}>
                            <IconButton 
                              onClick={() => decrementQuantity(item)}
                              disabled={item.quantity <= 1}
                              size="small"
                              sx={{ p: 0.5 }}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            
                            <TextField
                              size="small"
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, item.selectedOption, e.target.value)}
                              inputProps={{ 
                                min: 1,
                                max: 99,
                                style: { 
                                  textAlign: 'center',
                                  padding: '2px',
                                  fontWeight: 600,
                                  fontSize: '0.9rem'
                                }
                              }}
                              sx={{ 
                                width: 45,
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': { border: 'none' },
                                }
                              }}
                            />
                            
                            <IconButton 
                              onClick={() => incrementQuantity(item)}
                              size="small"
                              sx={{ p: 0.5 }}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>
                          
                          {/* Item Subtotal */}
                          <Typography 
                            variant="subtitle1" 
                            fontWeight="800" 
                            color="primary.main"
                            sx={{ 
                              ml: isMobile ? 0 : 3,
                              minWidth: 70,
                              textAlign: 'right'
                            }}
                          >
                            ${(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        </Box>
                      </ListItem>
                      {index < cart.items.length - 1 && <Divider sx={{ my: 1 }} />}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>
            
            {/* Order Summary Sidebar */}
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 3, 
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  background: '#ffffff',
                  position: { md: 'sticky' },
                  top: { md: 24 }
                }}
              >
                <Typography variant="h6" fontWeight={800} gutterBottom sx={{ mb: 2 }}>
                  Order Summary
                </Typography>
                
                {savings > 0 && (
                  <Box sx={{ 
                    backgroundColor: alpha(theme.palette.success.main, 0.1), 
                    color: theme.palette.success.dark, 
                    p: 1.5, 
                    borderRadius: 2, 
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <OfferIcon fontSize="small" />
                    <Typography variant="body2" fontWeight="700">
                      You are saving ${savings.toFixed(2)} on this order!
                    </Typography>
                  </Box>
                )}
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography variant="body1" color="text.secondary">
                    Subtotal ({cartCount} items)
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    ${cartTotal.toFixed(2)}
                  </Typography>
                </Box>
                
                {savings > 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body1" color="success.main">
                      Total Discounts
                    </Typography>
                    <Typography variant="body1" color="success.main" fontWeight={600}>
                      -${savings.toFixed(2)}
                    </Typography>
                  </Box>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography variant="body1" color="text.secondary">
                    Estimated Delivery
                  </Typography>
                  <Typography variant="body1" fontWeight={600} color="success.main">
                    FREE
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" fontWeight={800}>
                    Estimated Total
                  </Typography>
                  <Typography variant="h6" fontWeight={800} color="primary.main">
                    ${cartTotal.toFixed(2)}
                  </Typography>
                </Box>
                
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  component={RouterLink}
                  to="/checkout"
                  onClick={scrollToTop}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    py: 1.5,
                    fontWeight: 700,
                    borderRadius: 3,
                    boxShadow: '0 4px 14px rgba(76, 175, 80, 0.3)',
                    mb: 1.5
                  }}
                >
                  Proceed to Checkout
                </Button>
                
                <Button
                  fullWidth
                  variant="outlined"
                  color="inherit"
                  component={RouterLink}
                  to="/shop"
                  onClick={scrollToTop}
                  size="large"
                  sx={{ 
                    py: 1.5,
                    fontWeight: 600,
                    borderRadius: 3,
                    color: 'text.secondary',
                    borderColor: 'divider',
                    '&:hover': {
                      borderColor: 'text.primary',
                      backgroundColor: 'transparent'
                    }
                  }}
                >
                  Continue Shopping
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Cart;