import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

export interface SelectedModelsPanelProps {
  selectedModels: React.ReactNode[];
  costEstimator: React.ReactNode;
}

export const SelectedModelsPanel: React.FC<SelectedModelsPanelProps> = ({
  selectedModels,
  costEstimator,
}) => {
  return (
    <Card sx={{ height: 'fit-content' }}>
      <CardContent sx={{ pb: 2 }}>
        <Typography variant="h6" sx={{ mb: 1.5, fontSize: '14px', fontWeight: 600 }}>
          Selected Models ({selectedModels.length})
        </Typography>
        
        {/* Selected Model Chips */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0.5,
            mb: 1.5,
            minHeight: '32px',
          }}
        >
          {selectedModels.length > 0 ? (
            selectedModels
          ) : (
            <Typography variant="caption" color="text.secondary">
              No models selected
            </Typography>
          )}
        </Box>

        {/* Cost Estimator */}
        {costEstimator}
      </CardContent>
    </Card>
  );
};