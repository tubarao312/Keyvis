'use client'

import { type Metadata } from 'next'
import glob from 'fast-glob'

import { FC, useState } from 'react'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { type Section } from '@/components/SectionProvider'
import { Radio, RadioGroup, Field } from '@headlessui/react'

import {
  PlusCircleIcon,
  TrashIcon,
  PencilIcon,
  CheckCircleIcon,
  Cog6ToothIcon,
  ClipboardIcon,
} from '@heroicons/react/24/outline'

import { CheckIcon } from '@heroicons/react/20/solid'

import '@/styles/tailwind.css'
import { GridPattern } from '@/components/GridPattern'
import {
  type MotionValue,
  motion,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion'

const GlowyCard: FC<{}> = ({}) => {
  const gridProps: Omit<
    React.ComponentPropsWithoutRef<typeof GridPattern>,
    'width' | 'height' | 'x'
  > = {
    y: 16,
    squares: [
      [0, 1],
      [1, 3],
    ],
  }

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-white/1 dark:stroke-white/2.5"
          {...gridProps}
        />
      </div>
      <motion.div className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-50">
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:fill-white/2.5 dark:stroke-white/10"
          {...gridProps}
        />
      </motion.div>
    </div>
  )
}

interface VariableTaga {
  name: string
  className: string
}

enum VariableType {
  FREE_INPUT,
  DROPDOWN,
  BOOLEAN,
  // SLIDER,
}

interface VariableCardProps {
  name: string
  description: string
  tags: VariableTag[]
  type: VariableType
  value: string | number | boolean
}

interface RadioGroupOption {
  name: string
  description: string
  key: string
  value: VariableType
}

const RADIO_GROUP_OPTIONS: RadioGroupOption[] = [
  {
    name: 'Free Input',
    description: 'Free input for the variable value.',
    key: 'free-input',
    value: VariableType.FREE_INPUT,
  },
  {
    name: 'Dropdown',
    description: 'Select from a list of predefined values.',
    key: 'dropdown',
    value: VariableType.DROPDOWN,
  },
  {
    name: 'Boolean',
    description: 'True or False value.',
    key: 'boolean',
    value: VariableType.BOOLEAN,
  },
  // {
  //   name: 'Slider',
  //   description: 'Select a value from a range.',
  //   key: 'slider',
  //   value: VariableType.SLIDER,
  // },
]

interface FreeInputVariableType {
  name: string
  description: string
}

const FREE_INPUT_VARIABLE_TYPES: FreeInputVariableType[] = [
  {
    name: 'Integer',
    description: 'A whole number value.',
  },
  {
    name: 'String',
    description: 'A text value.',
  },
  {
    name: 'Float',
    description: 'A decimal number value.',
  },
]

const Variablea: FC<VariableCardProps> = ({
  name,
  description,
  tags,
  type,
  value,
}: VariableCardProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedType, setSelectedType] = useState<RadioGroupOption>(
    RADIO_GROUP_OPTIONS[0],
  )

  const [selectedFreeInputType, setSelectedFreeInputType] =
    useState<FreeInputVariableType>(FREE_INPUT_VARIABLE_TYPES[0])

  // Convert name to all caps and replace spaces with underscores
  const variableName = name.toUpperCase().replaceAll(' ', '_')

  return (
    <div
      className="flex flex-col rounded-lg px-5 py-5 shadow-xl ring-1 ring-inset ring-black/20 backdrop-blur-sm transition-all duration-500 ease-in-out hover:bg-zinc-300/10 dark:bg-zinc-600/10 dark:ring-white/10 dark:hover:bg-zinc-600/[0.12] dark:hover:ring-white/20 "
      style={{
        maxHeight: isEditing ? '100rem' : '15rem',
        minHeight: isEditing ? '43rem' : '1rem',
      }}
    >
      {isEditing ? (
        <>
          <div className="flex flex-col gap-5">
            <span className="flex flex-row items-center">
              <h1 className="mr-auto text-xl font-semibold">Edit Variable</h1>
              <button
                className="flex h-full flex-row items-center rounded-md px-4 py-1.5 text-sm font-semibold text-zinc-600 ring-1 ring-inset transition-all duration-150 ease-in-out hover:text-black hover:ring-white/20 data-[checked]:ring-2 dark:text-zinc-400 dark:ring-zinc-400/10 dark:hover:bg-zinc-600/10 dark:hover:text-white dark:hover:ring-white/20 dark:data-[checked]:ring-emerald-400"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="ml-2 flex h-full flex-row items-center rounded-md px-4 py-1.5 text-sm font-semibold text-emerald-600 ring-1 ring-inset transition-all duration-150 ease-in-out  hover:ring-emerald-600/20  dark:bg-emerald-600/10 dark:text-emerald-400 dark:ring-zinc-400/10 dark:hover:bg-emerald-600/20 dark:hover:ring-emerald-600/50"
                onClick={() => setIsEditing(false)}
              >
                Save
                <CheckIcon className="ml-1 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </button>
              {/* Cancel Button */}
            </span>
            <div className="h-[1px] bg-zinc-600/20 dark:bg-zinc-400/20" />

            {/* Variable Name */}
            <div className="flex flex-col gap-2">
              <h2 className="text-base font-semibold">Variable Name</h2>
              <span className="flex w-full flex-col gap-2 lg:flex-row">
                <input
                  id="variable-name"
                  className="block w-full max-w-[23rem] rounded-md border-0 bg-transparent px-3 py-1.5 text-zinc-900 shadow-sm outline-none ring-1 ring-inset transition-all duration-75 placeholder:text-zinc-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 dark:text-zinc-200 dark:ring-white/10"
                  placeholder="Example Variable Name"
                />
                <span className="flex flex-row gap-1">
                  <p className="my-auto w-fit font-mono text-sm text-zinc-600 lg:mx-0 dark:text-zinc-400">
                    {variableName}
                  </p>
                  <ClipboardIcon
                    className="my-auto ml-1 h-5 w-5 cursor-pointer text-zinc-600 transition-all
                  duration-150 ease-in-out hover:text-black dark:text-zinc-400 dark:hover:text-white
                  "
                  />
                </span>
              </span>
            </div>

            {/* Description  */}
            <div className="flex flex-col gap-2">
              <h2 className=" text-base font-semibold">Description</h2>
              <textarea
                id="variable-name"
                className=" block max-w-[40rem] rounded-md border-0 bg-transparent px-3 py-1.5 text-zinc-900 shadow-sm outline-none ring-1 ring-inset transition-all duration-75 placeholder:text-zinc-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 dark:text-zinc-200 dark:ring-white/10"
                placeholder="Long and in-depth description of what the variable does and how it affects the system."
              />
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-zinc-600/20 dark:bg-zinc-400/20" />

            {/* Variable Type */}
            <div className="flex flex-col gap-2">
              <h2 className=" text-base font-semibold">Type</h2>
              <RadioGroup
                className="flex flex-col gap-4 lg:grid lg:grid-cols-2"
                value={selectedType}
                onChange={setSelectedType}
              >
                {RADIO_GROUP_OPTIONS.map((option) => (
                  <Radio
                    value={option}
                    className="group relative flex cursor-pointer flex-row items-center gap-1 overflow-hidden rounded-md p-4 ring-1 ring-inset transition-all duration-75 ease-in-out hover:ring-white/20 data-[checked]:ring-2 data-[checked]:ring-emerald-400 dark:ring-zinc-400/10 dark:hover:bg-zinc-600/10 dark:hover:ring-white/20 dark:data-[checked]:ring-emerald-400"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-normal font-semibold">
                        {option.name}
                      </span>
                      <span className="block text-sm text-zinc-600 lg:block dark:text-zinc-400">
                        {option.description}
                      </span>
                    </div>
                    <CheckCircleIcon className="ml-auto size-8 opacity-0 transition group-data-[checked]:opacity-100 dark:text-emerald-400" />
                    <GlowyCard />
                  </Radio>
                ))}
              </RadioGroup>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-base font-semibold">Free Input</h2>
              <RadioGroup
                className="flex flex-row gap-4"
                value={selectedFreeInputType}
                onChange={setSelectedFreeInputType}
              >
                {FREE_INPUT_VARIABLE_TYPES.map((option) => (
                  <Radio
                    value={option}
                    className="group relative flex w-full cursor-pointer flex-row items-center gap-1 overflow-hidden rounded-md p-4 ring-1 ring-inset transition-all duration-75 ease-in-out hover:ring-white/20 data-[checked]:ring-2 data-[checked]:ring-emerald-400 dark:ring-zinc-400/10 dark:hover:bg-zinc-600/10 dark:hover:ring-white/20 dark:data-[checked]:ring-emerald-400"
                  >
                    <div className="flex w-full flex-col gap-0.5">
                      <span className="text-normal mx-auto font-semibold lg:mx-0">
                        {option.name}
                      </span>
                      <span className="hidden text-sm text-zinc-600 lg:block dark:text-zinc-400">
                        {option.description}
                      </span>
                    </div>
                    <CheckCircleIcon className="ml-auto hidden size-8 opacity-0 transition group-data-[checked]:opacity-100 lg:block dark:text-emerald-400" />
                    <GlowyCard />
                  </Radio>
                ))}
              </RadioGroup>
            </div>
          </div>
        </>
      ) : (
        <>
          <span className="flex flex-row items-center gap-2">
            <h2 className="text-lg font-semibold">{name}:</h2>
            <h2 className="font-mono text-lg font-semibold text-emerald-600 dark:text-emerald-400">
              {value}
            </h2>
            <PencilIcon className="h-4 w-4 cursor-pointer text-zinc-600 transition-all duration-150 ease-in-out hover:text-black dark:text-zinc-400 dark:hover:text-white" />
          </span>
          <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
          <div className="mt-3 h-[1px] bg-zinc-600/20 dark:bg-zinc-400/20" />
          <span className="mt-3 flex flex-row gap-1.5">
            {tags.map((tag) => (
              <span
                className={`my-auto inline-flex h-fit rounded-full px-3 py-[0.09rem] text-xs font-semibold ring-1 ring-inset`}
              >
                {tag.name}
              </span>
            ))}

            <PlusCircleIcon className="my-auto h-5 w-5 text-zinc-600 dark:text-zinc-400" />
            <span className="my-auto ml-auto flex flex-row gap-0.5">
              <TrashIcon className="h-9 w-9 cursor-pointer rounded-md p-2 text-zinc-600 transition-all duration-75 ease-in-out hover:bg-zinc-400/10 dark:text-zinc-400 dark:hover:text-white" />
              <Cog6ToothIcon
                className="h-9 w-9 cursor-pointer rounded-md p-2 text-zinc-600 transition-all duration-75 ease-in-out hover:bg-zinc-400/10 dark:text-zinc-400 dark:hover:text-white"
                onClick={() => setIsEditing(true)}
              />
            </span>
          </span>
        </>
      )}
    </div>
  )
}

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

export default async function RootLayout({}: {}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="flex min-h-full bg-white antialiased dark:bg-zinc-900">
        <Providers>
          <div className="w-full">
            <Layout>
              <div className="h-10" />
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
            </Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
