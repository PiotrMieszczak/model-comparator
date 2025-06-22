import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

export interface ModelSelectionColumnProps {
  actionBar: React.ReactNode;
  modelCards: React.ReactNode[];
  selectedCount: number;
}

export const ModelSelectionColumn: React.FC<ModelSelectionColumnProps> = ({
  actionBar,
  modelCards,
  selectedCount,
}) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ pb: 1 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Select Models to Compare ({selectedCount} selected)
        </Typography>
        {actionBar}
      </CardContent>

      {/* Scrollable Model Cards */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          px: 2,
          pb: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {modelCards}
        </Box>
      </Box>
    </Card>
  );
};