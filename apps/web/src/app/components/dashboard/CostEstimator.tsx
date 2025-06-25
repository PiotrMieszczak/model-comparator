import React from 'react';
import { AttachMoney } from '@mui/icons-material';
import './CostEstimator.scss';

export interface CostEstimatorProps {
  estimatedCost: string;
  unit: string;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({
  estimatedCost,
  unit,
}) => {
  return (
    <div className="cost-estimator">
      <div className="cost-estimator__icon">
        <AttachMoney />
      </div>
      <div className="cost-estimator__content">
        <div className="cost-estimator__cost">
          Est. cost: {estimatedCost}
        </div>
        <div className="cost-estimator__unit">
          {unit}
        </div>
      </div>
    </div>
  );
};