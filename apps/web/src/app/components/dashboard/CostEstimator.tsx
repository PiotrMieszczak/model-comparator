import React from 'react';
import { Box, Typography } from '@mui/material';
import { AttachMoney } from '@mui/icons-material';

export interface CostEstimatorProps {
  estimatedCost: string;
  unit: string;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({
  estimatedCost,
  unit,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        p: 2,
        backgroundColor: 'primary.50',
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'primary.200',
      }}
    >
      <AttachMoney sx={{ color: 'primary.main', fontSize: 20 }} />
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
          Est. cost: {estimatedCost}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {unit}
        </Typography>
      </Box>
    </Box>
  );
};