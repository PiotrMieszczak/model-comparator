import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

export interface ComparisonResultsSectionProps {
  comparisonCards: React.ReactNode[];
  isVisible: boolean;
}

export const ComparisonResultsSection: React.FC<ComparisonResultsSectionProps> = ({
  comparisonCards,
  isVisible,
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Comparison Results
        </Typography>
        
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 3,
          }}
        >
          {comparisonCards}
        </Box>
      </CardContent>
    </Card>
  );
};