import React from 'react';
import { Box, Container } from '@mui/material';
import {
  DashboardHeader,
  PromptConfigurationSection,
  ModelAndParametersSection,
  ModelSelectionColumn,
  ModelConfigurationColumn,
  ActionBar,
  SelectedModelsPanel,
  ParametersPanel,
  ModelCard,
  ModelChip,
  ParameterSlider,
  ComparisonResultsSection,
  ComparisonCard,
  CostEstimator,
} from './components';

export const DashboardPage: React.FC = () => {
  // Mock data - these would come from state/props in real implementation
  const mockModels = [
    {
      id: '1',
      name: 'GPT-4 Turbo',
      provider: 'OpenAI',
      description: 'Most capable GPT-4 model with optimized performance',
      costPer1K: '$0.01-$0.03/1K',
      tokenLimit: '128K tokens',
      isSelected: true,
    },
    {
      id: '2',
      name: 'Claude 3 Opus',
      provider: 'Anthropic',
      description: 'Most powerful Claude model for complex reasoning',
      costPer1K: '$0.015-$0.075/1K',
      tokenLimit: '200K tokens',
      isSelected: true,
    },
    {
      id: '3',
      name: 'GPT-4',
      provider: 'OpenAI',
      description: 'Advanced reasoning and complex task handling',
      costPer1K: '$0.03-$0.06/1K',
      tokenLimit: '8K tokens',
      isSelected: false,
    },
    {
      id: '4',
      name: 'Claude 3 Sonnet',
      provider: 'Anthropic',
      description: 'Balanced performance and speed for everyday tasks',
      costPer1K: '$0.003-$0.015/1K',
      tokenLimit: '200K tokens',
      isSelected: false,
    },
    {
      id: '5',
      name: 'Gemini Pro',
      provider: 'Google',
      description: 'Google\'s versatile multimodal model',
      costPer1K: '$0.0005-$0.0015/1K',
      tokenLimit: '31K tokens',
      isSelected: false,
    },
    {
      id: '6',
      name: 'Llama 2 70B',
      provider: 'Meta',
      description: 'Open source large language model',
      costPer1K: '$0.0007-$0.0009/1K',
      tokenLimit: '4K tokens',
      isSelected: false,
    },
  ];

  const selectedModels = mockModels.filter(model => model.isSelected);

  // Mock handlers - these would be real handlers in implementation
  const mockHandlers = {
    onSettingsClick: () => console.log('Settings clicked'),
    onPromptChange: () => console.log('Prompt changed'),
    onSelectAll: () => console.log('Select all clicked'),
    onClearAll: () => console.log('Clear all clicked'),
    onPopularFilter: () => console.log('Popular filter clicked'),
    onRunComparison: () => console.log('Run comparison clicked'),
    onModelSelectionChange: () => console.log('Model selection changed'),
    onModelRemove: () => console.log('Model removed'),
    onTemperatureChange: () => console.log('Temperature changed'),
    onMaxTokensChange: () => console.log('Max tokens changed'),
    onTopPChange: () => console.log('Top P changed'),
  };

  return (
    <div className="dashboard">
      {/* Dashboard Header */}
      <DashboardHeader onSettingsClick={mockHandlers.onSettingsClick} />

      {/* Main Content */}
      <Container maxWidth="xl" className="dashboard__content">
        {/* Prompt Configuration */}
        <PromptConfigurationSection
          prompt=""
          onPromptChange={mockHandlers.onPromptChange}
        />

        {/* Model Selection and Parameters */}
        <ModelAndParametersSection
          modelSelectionColumn={
            <ModelSelectionColumn
              selectedCount={selectedModels.length}
              actionBar={
                <ActionBar
                  onSelectAll={mockHandlers.onSelectAll}
                  onClearAll={mockHandlers.onClearAll}
                  onPopularFilter={mockHandlers.onPopularFilter}
                  onRunComparison={mockHandlers.onRunComparison}
                  isRunDisabled={selectedModels.length === 0}
                />
              }
              modelCards={mockModels.map(model => (
                <ModelCard
                  key={model.id}
                  {...model}
                  onSelectionChange={mockHandlers.onModelSelectionChange}
                />
              ))}
            />
          }
          modelConfigurationColumn={
            <ModelConfigurationColumn
              selectedModelsPanel={
                <SelectedModelsPanel
                  selectedModels={selectedModels.map(model => (
                    <ModelChip
                      key={model.id}
                      id={model.id}
                      name={model.name}
                      provider={model.provider}
                      onRemove={mockHandlers.onModelRemove}
                    />
                  ))}
                  costEstimator={
                    <CostEstimator
                      estimatedCost="$0.043"
                      unit="per 1K tokens"
                    />
                  }
                />
              }
              parametersPanel={
                <ParametersPanel
                  temperatureSlider={
                    <ParameterSlider
                      label="Temperature"
                      value={0.7}
                      min={0}
                      max={2}
                      step={0.1}
                      onChange={mockHandlers.onTemperatureChange}
                    />
                  }
                  maxTokensSlider={
                    <ParameterSlider
                      label="Max Tokens"
                      value={1000}
                      min={1}
                      max={4000}
                      step={1}
                      onChange={mockHandlers.onMaxTokensChange}
                    />
                  }
                  topPSlider={
                    <ParameterSlider
                      label="Top P"
                      value={1}
                      min={0}
                      max={1}
                      step={0.01}
                      onChange={mockHandlers.onTopPChange}
                    />
                  }
                />
              }
            />
          }
        />

        {/* Comparison Results */}
        <ComparisonResultsSection
          isVisible={selectedModels.length > 0}
          comparisonCards={selectedModels.map(model => (
            <ComparisonCard
              key={model.id}
              modelName={model.name}
              provider={model.provider}
              status="ready"
              placeholder="Waiting for prompt..."
            />
          ))}
        />
      </Container>
    </div>
  );
};