import React from 'react';
import { TextField } from '@mui/material';
import { Send } from '@mui/icons-material';
import './PromptConfigurationSection.scss';

export interface PromptConfigurationSectionProps {
  prompt: string;
  onPromptChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSend?: () => void;
}

export const PromptConfigurationSection: React.FC<PromptConfigurationSectionProps> = ({
  prompt,
  onPromptChange,
  onSend,
}) => {
  const handleSend = () => {
    if (prompt.trim() && onSend) {
      onSend();
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-prompt">
      <div className="chat-prompt__container">
        <div className="chat-prompt__input-wrapper">
          <TextField
            className="chat-prompt__input"
            placeholder="Message AI models..."
            value={prompt}
            onChange={onPromptChange}
            onKeyDown={handleKeyPress}
            multiline
            variant="outlined"
            fullWidth
            minRows={1}
            maxRows={8}
            slotProps={{
              input: {
                sx: {
                  maxHeight: '200px',
                  overflowY: 'auto'
                }
              }
            }}
          />
          {prompt.length > 0 && (
            <div className="chat-prompt__character-count">
              {prompt.length} characters
            </div>
          )}
        </div>
        
        <button
          className={`chat-prompt__send-button ${prompt.trim() ? 'chat-prompt__send-button--active' : ''}`}
          onClick={handleSend}
          disabled={!prompt.trim()}
          aria-label="Send message"
        >
          <Send className="send-icon" />
        </button>
      </div>
    </div>
  );
};