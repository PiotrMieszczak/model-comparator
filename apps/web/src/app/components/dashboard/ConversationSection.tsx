import React, { useEffect, useRef } from 'react';
import { ChatBubbleOutline, Person } from '@mui/icons-material';
import './ConversationSection.scss';

export interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  modelName?: string;
  provider?: string;
  isLoading?: boolean;
}

export interface ConversationSectionProps {
  messages: Message[];
}

export const ConversationSection: React.FC<ConversationSectionProps> = ({
  messages,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }, [messages]);

  const getProviderClass = (provider?: string) => {
    if (!provider) return '';
    switch (provider.toLowerCase()) {
      case 'openai':
        return 'avatar--openai';
      case 'anthropic':
        return 'avatar--anthropic';
      case 'google':
        return 'avatar--google';
      case 'meta':
        return 'avatar--meta';
      default:
        return '';
    }
  };

  const getProviderInitials = (provider?: string) => {
    if (!provider) return 'AI';
    switch (provider.toLowerCase()) {
      case 'openai':
        return 'GP';
      case 'anthropic':
        return 'CL';
      case 'google':
        return 'GM';
      case 'meta':
        return 'LM';
      default:
        return 'AI';
    }
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = (message: Message) => {
    const isUser = message.type === 'user';

    if (message.isLoading) {
      return (
        <div key={message.id} className="message message--ai">
          <div className={`message__avatar ${getProviderClass(message.provider)}`}>
            {getProviderInitials(message.provider)}
          </div>
          <div className="message__content">
            <div className="message__loading">
              <div className="loading-dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
              <span className="loading-text">
                {message.modelName} is thinking...
              </span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div key={message.id} className={`message ${isUser ? 'message--user' : 'message--ai'}`}>
        <div className={`message__avatar ${isUser ? 'avatar--user' : getProviderClass(message.provider)}`}>
          {isUser ? <Person sx={{ fontSize: 18 }} /> : getProviderInitials(message.provider)}
        </div>
        <div className="message__content">
          <div className="message__bubble">
            {message.content}
          </div>
          <div className={`message__meta ${isUser ? 'message__meta--user' : ''}`}>
            {!isUser && message.modelName && (
              <span className="message__model-name">{message.modelName}</span>
            )}
            <span className="message__timestamp">
              {formatTime(message.timestamp)}
            </span>
          </div>
        </div>
      </div>
    );
  };

  if (messages.length === 0) {
    return (
      <div className="conversation">
        <div className="conversation__empty-state">
          <ChatBubbleOutline className="empty-icon" />
          <h3 className="empty-title">Start a conversation</h3>
          <p className="empty-subtitle">
            Send a message to compare responses from different AI models
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="conversation">
      <div className="conversation__messages">
        {messages.map(renderMessage)}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};