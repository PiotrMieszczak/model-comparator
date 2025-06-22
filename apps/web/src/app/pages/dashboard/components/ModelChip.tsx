import React from 'react';
import { Chip } from '@mui/material';

export interface ModelChipProps {
  id: string;
  name: string;
  provider: string;
  onRemove: (id: string) => void;
}

export const ModelChip: React.FC<ModelChipProps> = ({
  id,
  name,
  provider,
  onRemove,
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
    <Chip
      label={name}
      onDelete={() => onRemove(id)}
      color={getProviderColor(provider) as any}
      variant="filled"
      size="small"
      sx={{
        maxWidth: '200px',
        '& .MuiChip-label': {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
      }}
    />
  );
};