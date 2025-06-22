import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
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
    <Card className="prompt-section">
      <CardContent>
        {/* Section Header */}
        <div className="prompt-section__header">
          <AutoFixHigh className="icon" />
          <Typography variant="h6" className="title">
            Prompt & Configuration
          </Typography>
        </div>

        {/* Chat-like Prompt Input */}
        <div className="prompt-section__input-container">
          {/* Main Input Area */}
          <textarea
            className="prompt-section__input"
            placeholder="Enter your prompt to test across multiple AI models..."
            value={prompt}
            onChange={onPromptChange}
          />

          {/* Bottom Toolbar */}
          <div className="prompt-section__toolbar">
            <span className="character-count">{prompt.length} characters</span>
            <button
              className={`send-button ${prompt.trim() ? 'send-button--active' : ''}`}
              disabled={!prompt.trim()}
            >
              <Send className="send-icon" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};