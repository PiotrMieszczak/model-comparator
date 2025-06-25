import React, { useRef, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Paper,
  IconButton,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Send } from '@mui/icons-material';

export interface PromptConfigurationSectionProps {
  prompt: string;
  onPromptChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSend?: () => void;
  loading?: boolean;
}

export const PromptConfigurationSection: React.FC<PromptConfigurationSectionProps> = ({
  prompt,
  onPromptChange,
  onSend,
  loading = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hiddenTextareaRef = useRef<HTMLTextAreaElement>(null);

  const maxHeight = isMobile ? 150 : 240;
  const minHeight = 24; // Single line height

  // Auto-resize function
  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    const hiddenTextarea = hiddenTextareaRef.current;
    
    if (!textarea || !hiddenTextarea) return;

    // Copy content to hidden textarea to measure height
    hiddenTextarea.value = textarea.value;
    
    // Get the scroll height (natural content height)
    const scrollHeight = hiddenTextarea.scrollHeight;
    
    // Calculate new height within bounds
    const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
    
    // Apply the height
    textarea.style.height = `${newHeight}px`;
    
    // Handle overflow
    if (scrollHeight > maxHeight) {
      textarea.style.overflowY = 'auto';
    } else {
      textarea.style.overflowY = 'hidden';
    }
  }, [maxHeight, minHeight]);

  // Initialize height on mount
  useEffect(() => {
    adjustTextareaHeight();
  }, [adjustTextareaHeight]);

  // Adjust height when prompt changes
  useEffect(() => {
    adjustTextareaHeight();
  }, [prompt, adjustTextareaHeight]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onPromptChange(event);
    // Height adjustment will happen via useEffect
  };

  const handleSend = () => {
    const trimmedMessage = prompt.trim();
    if (trimmedMessage && onSend && !loading) {
      onSend();
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const isValidMessage = prompt.trim().length > 0;

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        py: theme.spacing(2),
      }}
    >
      <Container maxWidth="xl">
        <Paper
          elevation={2}
          sx={{
            p: theme.spacing(2),
            borderRadius: theme.spacing(2),
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            transition: theme.transitions.create(['border-color', 'box-shadow'], {
              duration: theme.transitions.duration.short,
            }),
            '&:focus-within': {
              borderColor: theme.palette.primary.main,
              boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: theme.spacing(1.5),
              position: 'relative',
            }}
          >
            {/* Hidden textarea for height measurement */}
            <textarea
              ref={hiddenTextareaRef}
              style={{
                position: 'absolute',
                top: '-9999px',
                left: '-9999px',
                width: '100%',
                padding: theme.spacing(1.5),
                border: 'none',
                outline: 'none',
                resize: 'none',
                fontSize: theme.typography.body1.fontSize,
                fontFamily: theme.typography.body1.fontFamily,
                lineHeight: theme.typography.body1.lineHeight,
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                overflow: 'hidden',
              }}
              tabIndex={-1}
              readOnly
            />
            
            {/* Main textarea */}
            <Box
              sx={{
                flex: 1,
                position: 'relative',
                borderRadius: theme.spacing(1.5),
                backgroundColor: 'transparent',
                transition: theme.transitions.create(['background-color'], {
                  duration: theme.transitions.duration.short,
                }),
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
                '&:focus-within': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <Box
                component="textarea"
                ref={textareaRef}
                value={prompt}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder="Message AI models..."
                disabled={loading}
                sx={{
                  width: '100%',
                  minHeight: `${minHeight}px`,
                  maxHeight: `${maxHeight}px`,
                  padding: theme.spacing(1.5),
                  border: 'none',
                  outline: 'none',
                  resize: 'none',
                  backgroundColor: 'transparent',
                  fontSize: theme.typography.body1.fontSize,
                  fontFamily: theme.typography.body1.fontFamily,
                  lineHeight: theme.typography.body1.lineHeight,
                  color: theme.palette.text.primary,
                  borderRadius: theme.spacing(1.5),
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                  overflowY: 'hidden',
                  transition: 'height 0.1s ease-out',
                  scrollbarWidth: 'thin',
                  scrollbarColor: `${theme.palette.action.disabled} transparent`,
                  '&::placeholder': {
                    color: theme.palette.text.secondary,
                    opacity: 1,
                  },
                  '&::-webkit-scrollbar': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: 'transparent',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: theme.palette.action.disabled,
                    borderRadius: '3px',
                    '&:hover': {
                      backgroundColor: theme.palette.action.active,
                    },
                  },
                }}
              />
            </Box>
            
            <IconButton
              onClick={handleSend}
              disabled={!isValidMessage || loading}
              color="primary"
              size="large"
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                backgroundColor: isValidMessage && !loading 
                  ? theme.palette.primary.main 
                  : theme.palette.action.disabled,
                color: isValidMessage && !loading 
                  ? theme.palette.primary.contrastText 
                  : theme.palette.action.disabled,
                transition: theme.transitions.create(['background-color', 'transform', 'box-shadow'], {
                  duration: theme.transitions.duration.short,
                }),
                '&:hover': {
                  backgroundColor: isValidMessage && !loading 
                    ? theme.palette.primary.dark 
                    : theme.palette.action.disabled,
                  transform: isValidMessage && !loading ? 'scale(1.05)' : 'none',
                  boxShadow: isValidMessage && !loading 
                    ? theme.shadows[4] 
                    : 'none',
                },
                '&:active': {
                  transform: isValidMessage && !loading ? 'scale(0.95)' : 'none',
                },
                '&.Mui-disabled': {
                  backgroundColor: theme.palette.action.disabled,
                  color: theme.palette.action.disabled,
                },
              }}
              aria-label="Send message"
            >
              {loading ? (
                <CircularProgress 
                  size={20} 
                  sx={{ 
                    color: theme.palette.primary.contrastText 
                  }} 
                />
              ) : (
                <Send sx={{ fontSize: 20 }} />
              )}
            </IconButton>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};