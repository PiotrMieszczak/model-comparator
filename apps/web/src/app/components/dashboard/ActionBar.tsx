import React from 'react';
import { Button, Chip } from '@mui/material';
import { PlayArrow, SelectAll, ClearAll } from '@mui/icons-material';

export interface ActionBarProps {
  onSelectAll: () => void;
  onClearAll: () => void;
  onPopularFilter: () => void;
  onRunComparison: () => void;
  isRunDisabled?: boolean;
}

export const ActionBar: React.FC<ActionBarProps> = ({
  onSelectAll,
  onClearAll,
  onPopularFilter,
  onRunComparison,
  isRunDisabled = false,
}) => {
  return (
    <div className="action-bar">
      {/* Left side - Filter actions */}
      <div className="action-bar__filters">
        <Button
          variant="text"
          startIcon={<SelectAll />}
          onClick={onSelectAll}
          size="small"
          className="filter-button"
        >
          Select All
        </Button>
        
        <Button
          variant="text"
          startIcon={<ClearAll />}
          onClick={onClearAll}
          size="small"
          className="filter-button filter-button--secondary"
        >
          Clear All
        </Button>

        <Chip
          label="Popular 3"
          onClick={onPopularFilter}
          variant="outlined"
          size="small"
          className="filter-chip"
        />
      </div>

      {/* Right side - Run comparison */}
      <Button
        variant="contained"
        startIcon={<PlayArrow />}
        onClick={onRunComparison}
        disabled={isRunDisabled}
        className={`action-bar__run-button ${isRunDisabled ? 'action-bar__run-button--disabled' : ''}`}
      >
        Run Comparison
      </Button>
    </div>
  );
};