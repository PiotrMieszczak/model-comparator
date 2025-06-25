import React from 'react';
import { Close } from '@mui/icons-material';
import './ModelChip.scss';

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
  const getProviderClass = (provider: string) => {
    switch (provider.toLowerCase()) {
      case 'openai':
        return 'model-chip--openai';
      case 'anthropic':
        return 'model-chip--anthropic';
      case 'google':
        return 'model-chip--google';
      case 'meta':
        return 'model-chip--meta';
      default:
        return 'model-chip--default';
    }
  };

  return (
    <div className={`model-chip ${getProviderClass(provider)}`}>
      <span className="model-chip__label">{name}</span>
      <button 
        className="model-chip__delete" 
        onClick={() => onRemove(id)}
        aria-label="Remove model"
      >
        <Close sx={{ fontSize: 10 }} />
      </button>
    </div>
  );
};