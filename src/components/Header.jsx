import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tooltip
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart,
  Close,
  LocalMall,
  FavoriteBorder,
  Phone,
  Call,
  Message,
  Close as CloseIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [textDialogOpen, setTextDialogOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const phoneNumber = '2024288187';
  const formattedNumber = '(202) 428-8187';

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
  ];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handlePhoneClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePhoneClose = () => {
    setAnchorEl(null);
  };

  const handleCall = () => {
    window.open(`tel:${phoneNumber}`);
    handlePhoneClose();
  };

  const handleText = () => {
    setTextDialogOpen(true);
    handlePhoneClose();
  };

  const handleSendText = () => {
    window.open(`sms:${phoneNumber}${message ? `?body=${encodeURIComponent(message)}` : ''}`);
    setTextDialogOpen(false);
    setMessage('');
  };

  const handleCloseTextDialog = () => {
    setTextDialogOpen(false);
    setMessage('');
  };

  // Handler for navigation with scroll to top
  const handleNavigation = () => {
    scrollToTop();
    if (drawerOpen) {
      setDrawerOpen(false);
    }
  };

  return (
    <AppBar position="sticky" sx={{
      backgroundColor: '#ffffff',
      color: '#1f2937',
      boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
    }}>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
        {/* Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          onClick={scrollToTop}
          sx={{
            fontWeight: 800,
            color: '#059669',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          <LocalMall sx={{ mr: 1, fontSize: { xs: 24, sm: 28 }, color: '#059669' }} />
          PotExpress
        </Typography>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                component={Link}
                to={item.path}
                onClick={scrollToTop}
                sx={{
                  color: '#4b5563',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  borderRadius: '8px',
                  px: 2,
                  py: 0.8,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: '#059669',
                    backgroundColor: 'rgba(5, 150, 105, 0.08)'
                  }
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        )}

        {/* Action Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
          {/* Phone Contact Button */}
          <Tooltip title="Contact Us">
            <IconButton
              onClick={handlePhoneClick}
              sx={{
                color: '#4b5563',
                backgroundColor: 'rgba(0, 0, 0, 0.03)',
                '&:hover': { color: '#059669', backgroundColor: 'rgba(5, 150, 105, 0.08)' }
              }}
            >
              <Phone fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Wishlist">
            <IconButton
              component={Link}
              to="/wishlist"
              onClick={scrollToTop}
              sx={{
                color: '#4b5563',
                backgroundColor: 'rgba(0, 0, 0, 0.03)',
                '&:hover': { color: '#059669', backgroundColor: 'rgba(5, 150, 105, 0.08)' }
              }}
            >
              <Badge badgeContent={wishlistCount} color="success" sx={{ '& .MuiBadge-badge': { backgroundColor: '#059669', color: '#fff' } }}>
                <FavoriteBorder fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Cart">
            <IconButton
              component={Link}
              to="/cart"
              onClick={scrollToTop}
              sx={{
                color: '#4b5563',
                backgroundColor: 'rgba(0, 0, 0, 0.03)',
                '&:hover': { color: '#059669', backgroundColor: 'rgba(5, 150, 105, 0.08)' }
              }}
            >
              <Badge badgeContent={cartCount} color="success" sx={{ '& .MuiBadge-badge': { backgroundColor: '#059669', color: '#fff' } }}>
                <ShoppingCart fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{
                color: '#4b5563',
                backgroundColor: 'rgba(0, 0, 0, 0.03)',
                ml: 0.5,
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.06)' }
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Phone Contact Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handlePhoneClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 220,
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            border: '1px solid rgba(0,0,0,0.05)'
          }
        }}
      >
        <MenuItem onClick={handleCall} sx={{ py: 1.2, '&:hover': { backgroundColor: 'rgba(5, 150, 105, 0.08)', color: '#059669' } }}>
          <ListItemIcon sx={{ color: 'inherit' }}>
            <Call fontSize="small" />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem' }}>Call {formattedNumber}</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleText} sx={{ py: 1.2, '&:hover': { backgroundColor: 'rgba(5, 150, 105, 0.08)', color: '#059669' } }}>
          <ListItemIcon sx={{ color: 'inherit' }}>
            <Message fontSize="small" />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem' }}>Text {formattedNumber}</ListItemText>
        </MenuItem>
      </Menu>

      {/* Text Message Dialog */}
      <Dialog
        open={textDialogOpen}
        onClose={handleCloseTextDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Send Text Message</Typography>
          <Typography variant="body2" color="text.secondary">
            To: {formattedNumber}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Your message (optional)"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                '&.Mui-focused fieldset': { borderColor: '#059669' },
              },
              '& .MuiInputLabel-root.Mui-focused': { color: '#059669' }
            }}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseTextDialog} startIcon={<CloseIcon />} sx={{ color: '#6b7280', fontWeight: 600 }}>
            Cancel
          </Button>
          <Button
            onClick={handleSendText}
            variant="contained"
            startIcon={<Message />}
            disabled={message.length > 160}
            sx={{
              backgroundColor: '#059669',
              borderRadius: '10px',
              fontWeight: 700,
              px: 3,
              '&:hover': { backgroundColor: '#047857' }
            }}
          >
            Send Text
          </Button>
        </DialogActions>

        {message.length > 0 && (
          <Typography variant="caption" color="text.secondary" sx={{ px: 3, pb: 2 }}>
            Characters: {message.length}/160
          </Typography>
        )}
      </Dialog>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            backgroundColor: '#ffffff'
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#059669' }}>
            Menu
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: '#4b5563' }}>
            <Close />
          </IconButton>
        </Box>
        <Divider />

        {/* Navigation Links */}
        <List sx={{ px: 1, py: 2 }}>
          {navItems.map((item) => (
            <ListItem
              key={item.name}
              component={Link}
              to={item.path}
              onClick={() => {
                scrollToTop();
                setDrawerOpen(false);
              }}
              sx={{
                borderRadius: '10px',
                mb: 1,
                textDecoration: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(5, 150, 105, 0.08)',
                  color: '#059669'
                }
              }}
            >
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{ fontWeight: 600, fontSize: '1rem' }}
                sx={{ color: '#374151' }}
              />
            </ListItem>
          ))}
        </List>
        <Divider />

        {/* Utility Links (Wishlist & Cart) */}
        <List sx={{ px: 1, py: 2 }}>
          <ListItem
            component={Link}
            to="/wishlist"
            onClick={() => {
              scrollToTop();
              setDrawerOpen(false);
            }}
            sx={{
              borderRadius: '10px',
              mb: 1,
              textDecoration: 'none',
              '&:hover': { backgroundColor: 'rgba(5, 150, 105, 0.08)' }
            }}
          >
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <Typography sx={{ fontWeight: 600, color: '#374151' }}>Wishlist</Typography>
                  <Badge
                    badgeContent={wishlistCount}
                    color="success"
                    sx={{ '& .MuiBadge-badge': { backgroundColor: '#059669', color: '#fff' } }}
                  />
                </Box>
              }
            />
          </ListItem>

          <ListItem
            component={Link}
            to="/cart"
            onClick={() => {
              scrollToTop();
              setDrawerOpen(false);
            }}
            sx={{
              borderRadius: '10px',
              textDecoration: 'none',
              '&:hover': { backgroundColor: 'rgba(5, 150, 105, 0.08)' }
            }}
          >
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <Typography sx={{ fontWeight: 600, color: '#374151' }}>Cart</Typography>
                  <Badge
                    badgeContent={cartCount}
                    color="success"
                    sx={{ '& .MuiBadge-badge': { backgroundColor: '#059669', color: '#fff' } }}
                  />
                </Box>
              }
            />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;