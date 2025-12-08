import React, { useState, useEffect } from 'react';
import {
  Box,
  Modal,
  Typography,
  Button,
  IconButton,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Close,
  Star,
  LocalOffer
} from '@mui/icons-material';

const GoogleReviewPopup = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Check if popup has been shown recently (using localStorage)
    const popupShown = localStorage.getItem('reviewPopupShown');
    const lastShownDate = localStorage.getItem('reviewPopupLastShown');
    const today = new Date().toDateString();

    // Show popup if:
    // 1. It hasn't been shown before OR
    // 2. It hasn't been shown today
    if (!popupShown || lastShownDate !== today) {
      // Delay popup by 3 seconds for better UX
      const timer = setTimeout(() => {
        setOpen(true);
        localStorage.setItem('reviewPopupShown', 'true');
        localStorage.setItem('reviewPopupLastShown', today);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleLeaveReview = () => {
    // Replace with your actual Google review link
    window.open('https://www.google.com/search?sca_esv=f3c15013da1a5a7a&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E1vTpD96YJIpv8jB27Q1HJL-DbJKC_Z3f2klhpBZ26LJchgVPghfy-VRXEAE-Ayf13wxm9D2yuRIVAhLlQtBJcnfy3OVYPZpra18tNISxgIukKWnXgwwif8rQBTwqW-UTBz2h1o%3D&q=Pot+Express+Weed+Dispensary+%26+delivery+Reviews&sa=X&ved=2ahUKEwjHxP301K6RAxV4lIkEHWptBrQQ0bkNegQIMxAD&biw=1600&bih=740&dpr=1', '_blank');
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="review-popup-title"
      aria-describedby="review-popup-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Paper
        sx={{
          position: 'relative',
          maxWidth: 500,
          width: '100%',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 24
        }}
      >
        {/* Header with decorative element */}
        <Box
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            p: 3,
            textAlign: 'center',
            position: 'relative'
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white'
            }}
          >
            <Close />
          </IconButton>

          <LocalOffer sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h5" component="h2" fontWeight="bold">
            $10 OFF Your Order!
          </Typography>
        </Box>

        {/* Content */}
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                sx={{
                  color: '#FFD700',
                  fontSize: 32,
                  mx: 0.5
                }}
              />
            ))}
          </Box>

          <Typography variant="h6" gutterBottom fontWeight="bold">
            Love Our Products?
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            Share your experience on Google and receive <strong>$10 OFF</strong>on your order!
          </Typography>

          <Box sx={{
            backgroundColor: '#FFF9E6',
            p: 2,
            borderRadius: 1,
            mb: 3,
            border: '1px solid #FFE082'
          }}>
            <Typography variant="body2">
              <strong>How to redeem:</strong>
              <Box component="ol" sx={{ textAlign: 'left', pl: 2, mt: 1 }}>
                <li>Leave a review on Google</li>
                <li>Take a screenshot of your review</li>
                <li>Text it to 202-428-8187</li>
                <li>You'll recive a $10 discount on your order!</li>
              </Box>
            </Typography>
          </Box>

          {/* Buttons */}
          <Box sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 2,
            justifyContent: 'center'
          }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLeaveReview}
              size="large"
              fullWidth={isMobile}
              startIcon={<Star />}
              sx={{
                fontWeight: 'bold',
                py: 1.5
              }}
            >
              Leave a Review
            </Button>

            <Button
              variant="outlined"
              onClick={handleClose}
              size="large"
              fullWidth={isMobile}
              sx={{
                py: 1.5
              }}
            >
              Maybe Later
            </Button>
          </Box>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 3, display: 'block' }}>
            Offer valid for first-time reviewers. One discount per customer.
          </Typography>
        </Box>
      </Paper>
    </Modal>
  );
};

export default GoogleReviewPopup;