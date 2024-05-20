import React from 'react'

import {
  Variable,
  VariableCard,
  VariableTag,
} from './VariableCard/VariableCard'


import { BadgeColor } from './VariableCard/Badge'
import { getVariables } from '@/lib/metadata/variable'

enum VariableTypes {
  DROPDOWN = 'Dropdown',
  FREE_INPUT = 'FreeInput',
  TOGGLE = 'Toggle',
}

enum FreeInputVariableTypes {
  STRING = 'String',
  INTEGER = 'Integer',
  FLOAT = 'Float',
}

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

// const variables: Variable[] = [
//   {
//     name: 'Food XP Multiplier',
//     description:
//       'How much XP users should gain per food point consumed or exceeded while in a hotel.',
//     tags: [DangerousTag, PerformanceTag],
//     value: {
//       type: {
//         type: VariableTypes.FREE_INPUT,
//         inputType: FreeInputVariableTypes.FLOAT,
//       },
//       value: 3.21,
//     },
//   },
//   {
//     name: 'Pet Revival Time (Hours)',
//     description:
//       'How many hours after the pet dies the user can take to revive it.',
//     tags: [DangerousTag],
//     value: {
//       type: {
//         type: VariableTypes.FREE_INPUT,
//         inputType: FreeInputVariableTypes.INTEGER,
//       },
//       value: 48,
//     },
//   },
//   {
//     name: 'OpenAI Model',
//     description:
//       'Model used for responding to PetBot users. Tune for better performance and cost saving.',
//     tags: [SensitiveTag],
//     value: {
//       type: {
//         type: VariableTypes.DROPDOWN,
//         options: ['gpt-3.5-turbo', 'gpt-4.0-turbo', 'gpt-4o'],
//       },
//       value: 'gpt-3.5-turbo',
//     },
//   },
// ]
  
export default async function Home() {
  const variables = await getVariables()  

  return (
    <>
      <div className="h-10"/>
          <div className="flex flex-col gap-8">
            {variables.map((variable) => {
              // const v: Variable = {
              //   name: variable.name,
              //   description: variable.description as string,
              //   tags: variable.tags.map((tag) => {
              //     return {
              //       name: tag.name,
              //       color: tag.color,
              //     }
              //   }) as VariableTag[],
              //   value: {
              //     type: {
              //       type: VariableTypes.FREE_INPUT,
              //       inputType: FreeInputVariableTypes.FLOAT,
              //     },
              //     value: variable.value,
              //   },
              // }


              return (
                <VariableCard variable={variable} key={variable.id} />
              )}
            )}
        </div>
    </>
  )
}