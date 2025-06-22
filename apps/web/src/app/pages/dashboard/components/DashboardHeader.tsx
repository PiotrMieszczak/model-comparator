import React from 'react';
import { Typography, Button, Avatar } from '@mui/material';
import { Settings, Chat } from '@mui/icons-material';

export interface DashboardHeaderProps {
  onSettingsClick: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onSettingsClick,
}) => {
  return (
    <div className="dashboard__header">
      {/* Logo and Title */}
      <div className="logo">
        <Avatar className="avatar">
          <Chat />
        </Avatar>
        <Typography variant="h6" className="title">
          Compare AI models side by side
        </Typography>
      </div>

      {/* Settings Button */}
      <Button
        variant="outlined"
        startIcon={<Settings />}
        onClick={onSettingsClick}
        className="settings-button"
      >
        Settings
      </Button>
    </div>
  );
};