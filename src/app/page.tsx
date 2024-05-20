import React from 'react'

import {
  VariableCard,
} from './VariableCard/VariableCard'

import { getVariables } from '@/lib/metadata/variable'

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