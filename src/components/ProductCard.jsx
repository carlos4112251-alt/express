import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  Chip, 
  IconButton, 
  Tooltip,
  Badge,
  Box,
  Menu,
  MenuItem
} from '@mui/material';
import { 
  Favorite, 
  FavoriteBorder, 
  ShoppingCart,
  LocalFireDepartment,
  Cake,
  Spa,
  Opacity,
  BatteryFull,
  Straighten,
  ArrowDropDown
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const [isFavorite, setIsFavorite] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState(
    product.priceOptions ? product.priceOptions[0] : null
  );
  const { addToCart, cart } = useCart();

  useEffect(() => {
    const isInWishlist = wishlist.items.some(item => 
      item.id === product.id && 
      (!item.selectedOption || item.selectedOption.option === selectedOption?.option)
    );
    setIsFavorite(isInWishlist);
  }, [wishlist, product.id, selectedOption]);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    handleMenuClose();
  };

  const getCategoryIcon = () => {
    switch(product.category?.toLowerCase()) {
      case 'flower': return <Spa fontSize="small" color="success" />;
      case 'edibles': return <Cake fontSize="small" color="secondary" />;
      case 'concentrates': return <Opacity fontSize="small" color="info" />;
      case 'cart': return <Straighten fontSize="small" color="primary" />;
      case 'disposable-cart': return <BatteryFull fontSize="small" color="warning" />;
      default: return <LocalFireDepartment fontSize="small" color="error" />;
    }
  };

  const isInCart = cart.items.some(item => 
    item.id === product.id && 
    item.selectedOption?.option === selectedOption?.option
  );

  const handleAddToCart = () => addToCart(product, selectedOption, 1);

  const handleWishlistToggle = () => {
    if (isFavorite) {
      removeFromWishlist(product.id, selectedOption);
    } else {
      addToWishlist(product, selectedOption);
    }
    setIsFavorite(!isFavorite);
  };

  const displayPrice = selectedOption ? selectedOption.price : product.price;

  return (
    <Card sx={{ 
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 3,
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      border: '1px solid',
      borderColor: 'divider',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
        borderColor: 'primary.main',
      }
    }}>
      {/* Product Image & Badges */}
      <Box sx={{ position: 'relative', bgcolor: 'action.hover' }}>
        <CardMedia
          component="img"
          height={{ xs: 140, sm: 180 }}
          image={product.image}
          alt={product.name}
          sx={{ objectFit: 'cover' }}
        />
        
        {/* Category Chip */}
        <Chip
          icon={getCategoryIcon()}
          label={product.category}
          size="small"
          sx={{ 
            position: 'absolute',
            top: 8,
            left: 8,
            backdropFilter: 'blur(6px)',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            fontWeight: 600,
            fontSize: '0.7rem',
            textTransform: 'capitalize',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        />
        
        {/* Favorite Button */}
        <IconButton
          aria-label="add to favorites"
          onClick={handleWishlistToggle}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: isFavorite ? 'error.main' : 'text.secondary',
            backdropFilter: 'blur(6px)',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              color: 'error.main'
            },
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          {isFavorite ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
        </IconButton>
        
        {/* New / THC Badges */}
        <Box sx={{ position: 'absolute', bottom: 8, right: 8, display: 'flex', gap: 0.5 }}>
          {product.isNew && (
            <Chip
              label="New"
              size="small"
              sx={{
                height: 22,
                backgroundColor: 'primary.main',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.65rem'
              }}
            />
          )}
          {product.thcContent && (
            <Chip
              label={`${product.thcContent}mg THC`}
              size="small"
              sx={{
                height: 22,
                backgroundColor: 'success.main',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.65rem'
              }}
            />
          )}
        </Box>
      </Box>

      {/* Card Content */}
      <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, sm: 2 }, pb: '8px !important' }}>
        <Typography 
          variant="subtitle1" 
          component="div" 
          sx={{ 
            fontWeight: 700, 
            lineHeight: 1.2, 
            mb: 0.5,
            fontSize: { xs: '0.9rem', sm: '1.1rem' },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.name}
        </Typography>
        
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
          {product.strain} {product.weight ? `• ${product.weight}` : ''}
        </Typography>

        {/* Effects & Flavors */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
          {product.effects?.slice(0, 2).map((effect, index) => (
            <Chip key={`effect-${index}`} label={effect} size="small" variant="outlined" sx={{ fontSize: '0.65rem', height: 20 }} />
          ))}
          {product.flavors?.slice(0, 2).map((flavor, index) => (
            <Chip key={`flavor-${index}`} label={flavor} size="small" variant="outlined" color="secondary" sx={{ fontSize: '0.65rem', height: 20 }} />
          ))}
        </Box>
      </CardContent>

      {/* Actions & Price */}
      <CardActions sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        p: { xs: 1.5, sm: 2 },
        pt: 0,
        gap: 1.5
      }}>
        {product.priceOptions ? (
          <>
            {/* Modern Modern Option Selector & Price Bar for all sizes */}
            <Box 
              onClick={handleMenuOpen}
              sx={{
                display: 'flex',
                alignItem: 'center',
                justifyContent: 'space-between',
                width: '100%',
                p: 1.25,
                borderRadius: 2,
                backgroundColor: 'action.selected',
                border: '1px solid',
                borderColor: 'divider',
                cursor: 'pointer',
                transition: 'border-color 0.2s',
                '&:hover': {
                  borderColor: 'primary.main',
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
                  Size:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  {selectedOption?.option}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="subtitle1" color="primary.main" sx={{ fontWeight: 800, fontSize: '1rem' }}>
                  ${displayPrice?.toFixed(2)}
                </Typography>
                <ArrowDropDown fontSize="small" color="action" />
              </Box>
            </Box>

            <Menu 
              anchorEl={anchorEl} 
              open={Boolean(anchorEl)} 
              onClose={handleMenuClose}
              PaperProps={{
                sx: { width: anchorEl ? anchorEl.offsetWidth : 'auto', mt: 1, borderRadius: 2 }
              }}
            >
              {product.priceOptions.map((option, index) => (
                <MenuItem 
                  key={index} 
                  onClick={() => handleOptionSelect(option)} 
                  selected={selectedOption?.option === option.option} 
                  sx={{ 
                    fontSize: '0.9rem', 
                    py: 1.25,
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography component="span" sx={{ fontWeight: 600 }}>{option.option}</Typography>
                  <Typography component="span" color="primary.main" sx={{ fontWeight: 700 }}>${option.price}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', px: 0.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>Price</Typography>
            <Typography variant="h6" color="primary.main" sx={{ fontWeight: 800, fontSize: '1.25rem' }}>
              ${displayPrice?.toFixed(2)}
            </Typography>
          </Box>
        )}
        
        <Button
          size="medium"
          variant={isInCart ? 'outlined' : 'contained'}
          color="primary"
          startIcon={<ShoppingCart fontSize="small" />}
          onClick={handleAddToCart}
          fullWidth
          sx={{
            fontWeight: 700,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '0.85rem',
            py: 1,
            boxShadow: isInCart ? 'none' : '0 4px 10px rgba(0,0,0,0.1)'
          }}
        >
          {isInCart ? 'Added to Cart' : 'Add to Cart'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;