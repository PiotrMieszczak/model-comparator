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
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontSize: '16px', fontWeight: 600 }}>
          Selected Models ({selectedModels.length})
        </Typography>
        
        {/* Selected Model Chips */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            mb: 2,
            minHeight: '40px',
          }}
        >
          {selectedModels.length > 0 ? (
            selectedModels
          ) : (
            <Typography variant="body2" color="text.secondary">
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