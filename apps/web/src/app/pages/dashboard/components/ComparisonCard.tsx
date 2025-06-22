import React from 'react';
import { Box, Card, CardContent, Typography, Chip, CircularProgress } from '@mui/material';
import { Circle } from '@mui/icons-material';

export interface ComparisonCardProps {
  modelName: string;
  provider: string;
  status: 'ready' | 'loading' | 'completed' | 'error';
  response?: string;
  placeholder?: string;
}

export const ComparisonCard: React.FC<ComparisonCardProps> = ({
  modelName,
  provider,
  status,
  response,
  placeholder = 'Waiting for prompt...',
}) => {
  const getProviderColor = (provider: string) => {
    switch (provider.toLowerCase()) {
      case 'openai':
        return 'primary';
      case 'anthropic':
        return 'secondary';
      case 'google':
        return 'success';
      case 'meta':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'ready':
        return <Circle sx={{ fontSize: 12, color: 'success.main' }} />;
      case 'loading':
        return <CircularProgress size={12} />;
      case 'completed':
        return <Circle sx={{ fontSize: 12, color: 'success.main' }} />;
      case 'error':
        return <Circle sx={{ fontSize: 12, color: 'error.main' }} />;
      default:
        return <Circle sx={{ fontSize: 12, color: 'grey.400' }} />;
    }
  };

  return (
    <Card
      sx={{
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'grey.300',
      }}
    >
      <CardContent sx={{ p: 2, pb: 1, flex: '0 0 auto' }}>
        {/* Header with model name, provider, and status */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 600 }}>
              {modelName}
            </Typography>
            {getStatusIcon()}
          </Box>
          <Chip
            label={provider}
            size="small"
            color={getProviderColor(provider) as any}
            variant="outlined"
          />
        </Box>
      </CardContent>

      {/* Response Content */}
      <CardContent sx={{ pt: 0, pb: 2, flex: 1, overflow: 'hidden' }}>
        <Box
          sx={{
            height: '100%',
            overflow: 'auto',
            backgroundColor: 'grey.50',
            borderRadius: 1,
            p: 2,
          }}
        >
          {status === 'loading' ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CircularProgress size={16} />
              <Typography variant="body2" color="text.secondary">
                Generating response...
              </Typography>
            </Box>
          ) : response ? (
            <Typography
              variant="body2"
              sx={{
                whiteSpace: 'pre-wrap',
                lineHeight: 1.5,
              }}
            >
              {response}
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              {placeholder}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};