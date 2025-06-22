import React from 'react';
import { Box, Button, Chip } from '@mui/material';
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
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
        p: 2,
        backgroundColor: 'grey.50',
        borderRadius: 1,
      }}
    >
      {/* Left side - Filter actions */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant="text"
          startIcon={<SelectAll />}
          onClick={onSelectAll}
          size="small"
          sx={{ color: 'primary.main' }}
        >
          Select All
        </Button>
        
        <Button
          variant="text"
          startIcon={<ClearAll />}
          onClick={onClearAll}
          size="small"
          sx={{ color: 'text.secondary' }}
        >
          Clear All
        </Button>

        <Chip
          label="Popular 3"
          onClick={onPopularFilter}
          variant="outlined"
          size="small"
          sx={{
            borderColor: 'primary.main',
            color: 'primary.main',
            cursor: 'pointer',
          }}
        />
      </Box>

      {/* Right side - Run comparison */}
      <Button
        variant="contained"
        startIcon={<PlayArrow />}
        onClick={onRunComparison}
        disabled={isRunDisabled}
        sx={{
          px: 3,
          py: 1,
        }}
      >
        Run Comparison
      </Button>
    </Box>
  );
};