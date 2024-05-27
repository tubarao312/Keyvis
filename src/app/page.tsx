import { VariableCard } from './VariableCard/VariableCard'

import { getVariables, createVariable } from '@/lib/metadata/variable'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

export default async function Home() {
  const variables = await getVariables()

  const createNewVariable = async () => {
    'use server'

    await createVariable({
      name: `New Variable #${variables.length + 1}`,
      description: '',
      value: '',
      defaultValue: '',
      type: 'String',
      selector: 'FreeInput',
    })
  }

  return (
    <>
      <div className="h-10" />
      <div className="flex flex-col gap-8">
        {variables.map((variable) => (
          <VariableCard variable={variable} key={variable.id} />
        ))}
        <form action={createNewVariable}>
          <button className="group flex h-20 w-full items-center rounded-md outline-dashed outline-1 transition-all duration-150 ease-in-out dark:text-zinc-400 dark:ring-zinc-400/10 dark:hover:bg-zinc-600/10 dark:hover:text-white  dark:hover:ring-white/20">
            <h1 className="m-auto flex flex-row items-center gap-2 text-xl font-semibold">
              <PlusCircleIcon className="mt-0.5 inline-block h-7 w-7" />
              Add a new variable
            </h1>
          </button>
        </form>
      </div>
    </>
  )
}
