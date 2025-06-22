import React from 'react';
import { Box, Card, CardContent, Typography, Checkbox, Chip } from '@mui/material';

export interface ModelCardProps {
  id: string;
  name: string;
  provider: string;
  description: string;
  costPer1K: string;
  tokenLimit: string;
  isSelected: boolean;
  onSelectionChange: (id: string, selected: boolean) => void;
}

export const ModelCard: React.FC<ModelCardProps> = ({
  id,
  name,
  provider,
  description,
  costPer1K,
  tokenLimit,
  isSelected,
  onSelectionChange,
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

  return (
    <Card
      sx={{
        border: isSelected ? '2px solid' : '1px solid',
        borderColor: isSelected ? 'primary.main' : 'grey.300',
        backgroundColor: isSelected ? 'primary.50' : 'white',
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: 1,
        },
      }}
      onClick={() => onSelectionChange(id, !isSelected)}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header with checkbox and provider */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Checkbox
            checked={isSelected}
            onChange={(e) => onSelectionChange(id, e.target.checked)}
            onClick={(e) => e.stopPropagation()}
            sx={{ p: 0, mr: 1 }}
          />
          <Chip
            label={provider}
            size="small"
            color={getProviderColor(provider) as any}
            variant="outlined"
          />
        </Box>

        {/* Model name */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1,
            fontSize: '16px',
          }}
        >
          {name}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            lineHeight: 1.4,
            minHeight: '40px',
          }}
        >
          {description}
        </Typography>

        {/* Pricing and limits */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {costPer1K}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {tokenLimit}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};