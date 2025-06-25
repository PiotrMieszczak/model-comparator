import React from 'react';
import './ParametersPanel.scss';

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
    <div className="parameters-panel">
      <div className="parameters-panel__content">
        <h3 className="parameters-panel__title">
          Model Parameters
        </h3>
        
        <div className="parameters-panel__sliders">
          {/* Temperature */}
          {temperatureSlider}

          {/* Max Tokens */}
          {maxTokensSlider}

          {/* Top P */}
          {topPSlider}
        </div>
      </div>
    </div>
  );
};