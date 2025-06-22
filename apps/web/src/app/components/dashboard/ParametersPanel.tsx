import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

export interface ParametersPanelProps {
  temperatureSlider: React.ReactNode;
  maxTokensSlider: React.ReactNode;
  topPSlider: React.ReactNode;
}

export const ParametersPanel: React.FC<ParametersPanelProps> = ({
  temperatureSlider,
  maxTokensSlider,
  topPSlider,
}) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3, fontSize: '16px', fontWeight: 600 }}>
          Model Parameters
        </Typography>
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          {/* Temperature */}
          {temperatureSlider}

          {/* Max Tokens */}
          {maxTokensSlider}

          {/* Top P */}
          {topPSlider}
        </Box>
      </CardContent>
    </Card>
  );
};