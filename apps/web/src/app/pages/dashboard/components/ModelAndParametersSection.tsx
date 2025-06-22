import React from 'react';
import { Box } from '@mui/material';

export interface ModelAndParametersSectionProps {
  modelSelectionColumn: React.ReactNode;
  modelConfigurationColumn: React.ReactNode;
}

export const ModelAndParametersSection: React.FC<ModelAndParametersSectionProps> = ({
  modelSelectionColumn,
  modelConfigurationColumn,
}) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: 3,
        mb: 3,
        height: '600px',
      }}
    >
      {/* Left Column - Model Selection */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {modelSelectionColumn}
      </Box>

      {/* Right Column - Configuration */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {modelConfigurationColumn}
      </Box>
    </Box>
  );
};