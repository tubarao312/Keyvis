"use client";

import React from 'react'

import {
    Variable,
    VariableCard,
    VariableTag,
    VariableTypes,
    VariableValue,
    FreeInputVariableTypes,
  } from './VariableCard/VariableCard'
  
import { BadgeColor } from './VariableCard/Badge'

const DangerousTag = {
  name: 'Dangerous',
  color: BadgeColor.RED,
}

const PerformanceTag = {
  name: 'Performance',
  color: BadgeColor.BLUE,
}

const SensitiveTag = {
  name: 'Sensitive',
  color: BadgeColor.ORANGE,
}

const variables: Variable[] = [
  {
    name: 'Food XP Multiplier',
    description:
      'How much XP users should gain per food point consumed or exceeded while in a hotel.',
    tags: [DangerousTag, PerformanceTag],
    value: {
      type: {
        type: VariableTypes.FREE_INPUT,
        inputType: FreeInputVariableTypes.FLOAT,
      },
      value: 3.21,
    },
  },
  {
    name: 'Pet Revival Time (Hours)',
    description:
      'How many hours after the pet dies the user can take to revive it.',
    tags: [DangerousTag],
    value: {
      type: {
        type: VariableTypes.FREE_INPUT,
        inputType: FreeInputVariableTypes.INTEGER,
      },
      value: 48,
    },
  },
  {
    name: 'OpenAI Model',
    description:
      'Model used for responding to PetBot users. Tune for better performance and cost saving.',
    tags: [SensitiveTag],
    value: {
      type: {
        type: VariableTypes.DROPDOWN,
        options: ['gpt-3.5-turbo', 'gpt-4.0-turbo', 'gpt-4o'],
      },
      value: 'gpt-3.5-turbo',
    },
  },
]
  

export default function Home() {
    return (
      <>
        <div className="h-10"/>
            <div className="flex flex-col gap-8">
            <VariableCard
                variable={variables[0]}
                onStartEditing={() => {}}
                isEditing={false}
            />
            <VariableCard
                variable={variables[1]}
                onStartEditing={() => {}}
                isEditing={false}
            />
            <VariableCard
                variable={variables[2]}
                onStartEditing={() => {}}
                isEditing={false}
            />
          </div>
      </>
    )
}