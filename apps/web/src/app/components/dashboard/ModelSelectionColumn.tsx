import React from 'react';
import { Typography } from '@mui/material';
import './ModelSelectionColumn.scss';

export interface ModelSelectionColumnProps {
  actionBar: React.ReactNode;
  modelCards: React.ReactNode[];
  selectedCount: number;
  parametersPanel: React.ReactNode;
  selectedModelsPanel: React.ReactNode;
}

export const ModelSelectionColumn: React.FC<ModelSelectionColumnProps> = ({
  actionBar,
  modelCards,
  selectedCount,
  parametersPanel,
  selectedModelsPanel,
}) => {
  return (
    <div className="model-selection-column">
      {/* Left Column - Model Cards (3 per row, scrollable) */}
      <div className="model-selection-column__models-section">
        <div className="model-selection-column__header">
          <Typography className="model-selection-column__header-title">
            Select Models to Compare ({selectedCount} selected)
          </Typography>
          {actionBar}
        </div>

        {/* Scrollable Model Cards - 3 per row */}
        <div className="model-selection-column__cards-container">
          <div className="model-selection-column__cards-grid">
            {(modelCards as React.ReactElement[]).map((card) => (
              <div key={card.key}>
                {card}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Selected Models + Parameters (compact) */}
      <div className="model-selection-column__sidebar">
        {/* Selected Models Panel */}
        <div className="model-selection-column__selected-models">
          {selectedModelsPanel}
        </div>

        {/* Parameters Panel */}
        <div className="model-selection-column__parameters">
          {parametersPanel}
        </div>
      </div>
    </div>
  );
};