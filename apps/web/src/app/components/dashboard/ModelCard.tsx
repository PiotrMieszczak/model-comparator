import React from 'react';
import { Card, CardContent, Typography, Checkbox, Chip } from '@mui/material';

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
  const getProviderClass = (provider: string) => {
    switch (provider.toLowerCase()) {
      case 'openai':
        return 'provider--openai';
      case 'anthropic':
        return 'provider--anthropic';
      case 'google':
        return 'provider--google';
      case 'meta':
        return 'provider--meta';
      default:
        return '';
    }
  };

  return (
    <Card
      className={`model-card ${isSelected ? 'model-card--selected' : ''}`}
      onClick={() => onSelectionChange(id, !isSelected)}
    >
      <CardContent className="model-card__content">
        {/* Header with checkbox and provider */}
        <div className="model-card__header">
          <Checkbox
            className="checkbox"
            checked={isSelected}
            onChange={(e) => onSelectionChange(id, e.target.checked)}
            onClick={(e) => e.stopPropagation()}
          />
          <Chip
            label={provider}
            size="small"
            variant="outlined"
            className={getProviderClass(provider)}
          />
        </div>

        {/* Model name */}
        <Typography variant="h6" className="model-card__name">
          {name}
        </Typography>

        {/* Description */}
        <Typography variant="body2" className="model-card__description">
          {description}
        </Typography>

        {/* Pricing and limits */}
        <div className="model-card__footer">
          <Typography variant="body2" className="cost">
            {costPer1K}
          </Typography>
          <Typography variant="caption" className="tokens">
            {tokenLimit}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};