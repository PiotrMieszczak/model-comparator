import React from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';
import { Settings, Chat } from '@mui/icons-material';

export interface DashboardHeaderProps {
  onSettingsClick: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onSettingsClick,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 3,
        borderBottom: '1px solid',
        borderColor: 'grey.200',
      }}
    >
      {/* Logo and Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          sx={{
            bgcolor: 'primary.main',
            width: 40,
            height: 40,
          }}
        >
          <Chat sx={{ color: 'white', fontSize: 20 }} />
        </Avatar>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            color: 'text.secondary',
          }}
        >
          Compare AI models side by side
        </Typography>
      </Box>

      {/* Settings Button */}
      <Button
        variant="outlined"
        startIcon={<Settings />}
        onClick={onSettingsClick}
        sx={{
          borderColor: 'grey.300',
          color: 'grey.700',
        }}
      >
        Settings
      </Button>
    </Box>
  );
};