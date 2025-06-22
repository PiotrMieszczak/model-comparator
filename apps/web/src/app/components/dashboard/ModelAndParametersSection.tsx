import React from 'react';

export interface ModelAndParametersSectionProps {
  modelSelectionColumn: React.ReactNode;
  modelConfigurationColumn: React.ReactNode;
}

export const ModelAndParametersSection: React.FC<ModelAndParametersSectionProps> = ({
  modelSelectionColumn,
  modelConfigurationColumn,
}) => {
  return (
    <div className="model-parameters-section">
      {/* Left Column - Model Selection */}
      <div className="model-parameters-section__left-column">
        {modelSelectionColumn}
      </div>

      {/* Right Column - Configuration */}
      <div className="model-parameters-section__right-column">
        {modelConfigurationColumn}
      </div>
    </div>
  );
};