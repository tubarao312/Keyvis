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

export default async function Home() {
  const variables = await getVariables()  

  return (
    <>
      <div className="h-10"/>
          <div className="flex flex-col gap-8">
            {variables.map((variable) => 
              <VariableCard variable={variable} key={variable.id} />
            )}
        </div>
    </>
  )
}