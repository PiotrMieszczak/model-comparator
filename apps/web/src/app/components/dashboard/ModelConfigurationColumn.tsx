import React from 'react';
import { Box } from '@mui/material';

export interface ModelConfigurationColumnProps {
  selectedModelsPanel: React.ReactNode;
  parametersPanel: React.ReactNode;
}

export const ModelConfigurationColumn: React.FC<ModelConfigurationColumnProps> = ({
  selectedModelsPanel,
  parametersPanel,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '100%',
      }}
    >
      {/* Selected Models Panel */}
      <Box sx={{ flex: '0 0 auto' }}>
        {selectedModelsPanel}
      </Box>

      {/* Parameters Panel */}
      <Box sx={{ flex: 1 }}>
        {parametersPanel}
      </Box>
    </Box>
  );
};