import React from 'react';
import { Box, Card, CardContent, Typography, TextField, IconButton } from '@mui/material';
import { AutoFixHigh, Send } from '@mui/icons-material';

export interface PromptConfigurationSectionProps {
  prompt: string;
  onPromptChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const PromptConfigurationSection: React.FC<PromptConfigurationSectionProps> = ({
  prompt,
  onPromptChange,
}) => {

  return (
    <Card sx={{ mb: 2, width: '100%', flex: '0 0 auto' }}>
      <CardContent sx={{ pb: 2 }}>
        {/* Section Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AutoFixHigh sx={{ color: 'primary.main', mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Prompt & Configuration
          </Typography>
        </Box>

        {/* Chat-like Prompt Input */}
        <Box
          sx={{
            border: '1px solid',
            borderColor: 'grey.300',
            borderRadius: 2,
            backgroundColor: 'white',
            height: '120px',
            display: 'flex',
            flexDirection: 'column',
            '&:focus-within': {
              borderColor: 'primary.main',
              boxShadow: '0 0 0 1px rgba(25, 118, 210, 0.25)',
            },
          }}
        >
          {/* Main Input Area */}
          <TextField
            fullWidth
            multiline
            placeholder="Enter your prompt to test across multiple AI models..."
            variant="outlined"
            value={prompt}
            onChange={onPromptChange}
            sx={{
              flex: 1,
              '& .MuiOutlinedInput-root': {
                border: 'none',
                height: '100%',
                '& fieldset': {
                  border: 'none',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
                fontSize: '14px',
                lineHeight: 1.4,
              },
              '& .MuiOutlinedInput-input': {
                padding: '12px 16px',
                height: '100% !important',
                overflow: 'auto !important',
              },
              '& textarea': {
                height: '100% !important',
                overflow: 'auto !important',
                resize: 'none',
              },
              '& textarea::placeholder': {
                color: 'text.secondary',
                opacity: 0.7,
              },
            }}
          />

          {/* Bottom Toolbar */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              px: 2,
              py: 1,
              borderTop: '1px solid',
              borderColor: 'grey.200',
              backgroundColor: 'grey.50',
              minHeight: '40px',
              flex: '0 0 auto',
            }}
          >
            {/* Character count and send */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="caption" color="text.secondary">
                {prompt.length} characters
              </Typography>
              <IconButton
                size="small"
                disabled={!prompt.trim()}
                sx={{
                  bgcolor: prompt.trim() ? 'primary.main' : 'grey.300',
                  color: 'white',
                  '&:hover': {
                    bgcolor: prompt.trim() ? 'primary.dark' : 'grey.300',
                  },
                  '&.Mui-disabled': {
                    color: 'grey.500',
                  },
                }}
              >
                <Send fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};