import React from 'react';
import { Container } from '@mui/material';
import {
  DashboardHeader,
  PromptConfigurationSection,
  ConversationSection,
  ModelSelectionColumn,
  ActionBar,
  SelectedModelsPanel,
  ParametersPanel,
  ModelCard,
  ModelChip,
  ParameterSlider,
  ComparisonResultsSection,
  ComparisonCard,
  CostEstimator,
} from '../../../components/dashboard';
import type { Message } from '../../../components/dashboard/ConversationSection';

// Define the shape of the model data
interface Model {
  id: string;
  name: string;
  provider: string;
  description: string;
  costPer1K: string;
  tokenLimit: string;
  isSelected: boolean;
}

// Define the shape of the handlers
interface Handlers {
  onSettingsClick: () => void;
  onPromptChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onPromptSend: () => void;
  onSelectAll: () => void;
  onClearAll: () => void;
  onPopularFilter: () => void;
  onRunComparison: () => void;
  onModelSelectionChange: (id: string, isSelected: boolean) => void;
  onModelRemove: (id: string) => void;
  onTemperatureChange: (value: number | number[]) => void;
  onMaxTokensChange: (value: number | number[]) => void;
  onTopPChange: (value: number | number[]) => void;
}

export interface DashboardPresenterProps {
  models: Model[];
  selectedModels: Model[];
  prompt: string;
  messages: Message[];
  handlers: Handlers;
}

export const DashboardPresenter: React.FC<DashboardPresenterProps> = ({
  models,
  selectedModels,
  prompt,
  messages,
  handlers,
}) => {
  return (
    <div className="dashboard">
      <DashboardHeader onSettingsClick={handlers.onSettingsClick} />
      <Container maxWidth="xl" className="dashboard__content">
        <ConversationSection messages={messages} />
        <PromptConfigurationSection
          prompt={prompt}
          onPromptChange={handlers.onPromptChange}
          onSend={handlers.onPromptSend}
        />
        <ModelSelectionColumn
          selectedCount={selectedModels.length}
          actionBar={
            <ActionBar
              onSelectAll={handlers.onSelectAll}
              onClearAll={handlers.onClearAll}
              onPopularFilter={handlers.onPopularFilter}
              onRunComparison={handlers.onRunComparison}
              isRunDisabled={selectedModels.length === 0}
            />
          }
      
          modelCards={models.map(model => (
            <ModelCard
              key={model.id}
              {...model}
              onSelectionChange={handlers.onModelSelectionChange}
            />
          ))}
          selectedModelsPanel={
            <SelectedModelsPanel
              selectedModels={selectedModels.map(model => (
                <ModelChip
                  key={model.id}
                  id={model.id}
                  name={model.name}
                  provider={model.provider}
                  onRemove={() => handlers.onModelRemove(model.id)}
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
                  onChange={handlers.onTemperatureChange}
                />
              }
              maxTokensSlider={
                <ParameterSlider
                  label="Max Tokens"
                  value={1000}
                  min={1}
                  max={4000}
                  step={1}
                  onChange={handlers.onMaxTokensChange}
                />
              }
              topPSlider={
                <ParameterSlider
                  label="Top P"
                  value={1}
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={handlers.onTopPChange}
                />
              }
            />
          }
        />
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
