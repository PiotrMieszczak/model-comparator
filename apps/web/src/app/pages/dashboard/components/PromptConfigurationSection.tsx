import React from 'react';
import { Box, Card, CardContent, Typography, TextField } from '@mui/material';
import { AutoFixHigh } from '@mui/icons-material';

export interface PromptConfigurationSectionProps {
  prompt: string;
  onPromptChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const PromptConfigurationSection: React.FC<PromptConfigurationSectionProps> = ({
  prompt,
  onPromptChange,
}) => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        {/* Section Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AutoFixHigh sx={{ color: 'primary.main', mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Prompt & Configuration
          </Typography>
        </Box>

        {/* Prompt Input */}
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Your Prompt to test across multiple AI models..."
          variant="outlined"
          value={prompt}
          onChange={onPromptChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'grey.50',
            },
          }}
        />
      </CardContent>
    </Card>
  );
};