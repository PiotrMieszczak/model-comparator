import React from 'react';
import { Typography, Button, Avatar } from '@mui/material';
import { Settings, Chat } from '@mui/icons-material';
import './DashboardHeader.scss';

export interface DashboardHeaderProps {
  onSettingsClick: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onSettingsClick,
}) => {
  return (
    <header className="dashboard-header">
      <div className="dashboard-header__container">
        <div className="dashboard-header__brand">
          <div className="dashboard-header__brand-section">
            <Avatar className="dashboard-header__brand-logo">
              <Chat />
            </Avatar>
            <Typography className="dashboard-header__brand-tagline">
              Compare AI models side by side
            </Typography>
          </div>
        </div>

        {/* Settings Button */}
        <div className="dashboard-header__actions">
          <Button
            variant="outlined"
            startIcon={<Settings />}
            onClick={onSettingsClick}
            className="settings-button"
          >
            Settings
          </Button>
        </div>
      </div>
    </header>
  );
};