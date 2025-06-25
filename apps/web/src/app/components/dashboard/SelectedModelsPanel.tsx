import React from 'react';
import './SelectedModelsPanel.scss';

export interface SelectedModelsPanelProps {
  selectedModels: React.ReactNode[];
  costEstimator: React.ReactNode;
}

export const SelectedModelsPanel: React.FC<SelectedModelsPanelProps> = ({
  selectedModels,
  costEstimator,
}) => {
  return (
    <div className="selected-models-panel">
      <div className="selected-models-panel__content">
        <h3 className="selected-models-panel__title">
          Selected Models ({selectedModels.length})
        </h3>
        
        {/* Selected Model Chips */}
        <div className="selected-models-panel__chips">
          {selectedModels.length > 0 ? (
            selectedModels
          ) : (
            <span className="selected-models-panel__empty-state">
              No models selected
            </span>
          )}
        </div>

        {/* Cost Estimator */}
        <div className="selected-models-panel__cost-estimator">
          {costEstimator}
        </div>
      </div>
    </div>
  );
};