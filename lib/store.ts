import { create } from 'zustand';
import {
  GenerationState,
  defaultOptions,
  stepLabels,
  GenerationStep,
  ProgressStep,
} from './types';

export const useGenerationStore = create<GenerationState>((set) => ({
  // Input state
  topic: '',
  setTopic: (topic) => set({ topic }),

  options: defaultOptions,
  setOptions: (options) =>
    set((state) => ({
      options: { ...state.options, ...options },
    })),

  // Progress state
  isGenerating: false,
  currentStep: 'research',
  progressSteps: [
    {
      id: 'research',
      label: stepLabels.research.label,
      description: stepLabels.research.description,
      status: 'pending',
    },
    {
      id: 'script',
      label: stepLabels.script.label,
      description: stepLabels.script.description,
      status: 'pending',
    },
    {
      id: 'images',
      label: stepLabels.images.label,
      description: stepLabels.images.description,
      status: 'pending',
    },
    {
      id: 'audio',
      label: stepLabels.audio.label,
      description: stepLabels.audio.description,
      status: 'pending',
    },
    {
      id: 'assemble',
      label: stepLabels.assemble.label,
      description: stepLabels.assemble.description,
      status: 'pending',
    },
  ],
  setGenerating: (isGenerating) => set({ isGenerating }),
  setCurrentStep: (currentStep) => set({ currentStep }),
  updateProgressStep: (stepId, updates) =>
    set((state) => ({
      progressSteps: state.progressSteps.map((step) =>
        step.id === stepId ? { ...step, ...updates } : step
      ),
    })),
  resetProgress: () =>
    set({
      isGenerating: false,
      currentStep: 'research',
      progressSteps: [
        {
          id: 'research',
          label: stepLabels.research.label,
          description: stepLabels.research.description,
          status: 'pending',
        },
        {
          id: 'script',
          label: stepLabels.script.label,
          description: stepLabels.script.description,
          status: 'pending',
        },
        {
          id: 'images',
          label: stepLabels.images.label,
          description: stepLabels.images.description,
          status: 'pending',
        },
        {
          id: 'audio',
          label: stepLabels.audio.label,
          description: stepLabels.audio.description,
          status: 'pending',
        },
        {
          id: 'assemble',
          label: stepLabels.assemble.label,
          description: stepLabels.assemble.description,
          status: 'pending',
        },
      ],
    }),

  // Result state
  result: null,
  setResult: (result) => set({ result }),

  // Actions
  startGeneration: () =>
    set({
      isGenerating: true,
      currentStep: 'research',
      result: null,
    }),

  cancelGeneration: () =>
    set({
      isGenerating: false,
      currentStep: 'research',
      progressSteps: [
        {
          id: 'research',
          label: stepLabels.research.label,
          description: stepLabels.research.description,
          status: 'pending',
        },
        {
          id: 'script',
          label: stepLabels.script.label,
          description: stepLabels.script.description,
          status: 'pending',
        },
        {
          id: 'images',
          label: stepLabels.images.label,
          description: stepLabels.images.description,
          status: 'pending',
        },
        {
          id: 'audio',
          label: stepLabels.audio.label,
          description: stepLabels.audio.description,
          status: 'pending',
        },
        {
          id: 'assemble',
          label: stepLabels.assemble.label,
          description: stepLabels.assemble.description,
          status: 'pending',
        },
      ],
    }),
}));
