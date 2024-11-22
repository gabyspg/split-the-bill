import Box from '@mui/material/Box';
import ReceiptIcon from '@mui/icons-material/Receipt';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { resetReceipt } from '../slices/receiptSlice.js';
import { resetSplitSummary } from '../slices/splitSlice.js';
import { resetSplitHistory } from '../slices/historySlice.js';

function ResponsiveAppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(resetReceipt());
    dispatch(resetSplitSummary());
    dispatch(resetSplitHistory());
    navigate('/newReceipt');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c387e' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ReceiptIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Split
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              component={Link}
              to="/"
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Home
            </Button>
            <Button
              onClick={handleClick}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              New Split
            </Button>
            <Button
              component={Link}
              to="/pastSplits"
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Past Splits
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
