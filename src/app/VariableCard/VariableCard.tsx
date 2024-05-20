"use client";

import { useState } from 'react'
import { Badge, BadgeColor } from './Badge'
import {
  CheckCircleIcon,
  ClipboardIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'
import {
  CheckIcon,
  Cog6ToothIcon,
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { Radio, RadioGroup } from '@headlessui/react'
import ButtonPatternBackground from './ButtonPatternBackground'

import { Variable } from '@prisma/client';
import { Selectors, Types } from '@/lib/metadata/types';
import { deleteVariable } from '@/lib/metadata/variable';

/**
 * Contains the name and color of a tag for a variable
 */
interface VariableTag {
  name: string
  color: BadgeColor
}

interface VariableType {
  type: Selectors
  inputType?: Types
  options?: string[]
}

/**
 * Contains the value and type of a variable.
 * The value can be a string, number, or boolean.
 * The type can be a dropdown, free input, or toggle.
 */
interface VariableValue {
  value: string | number | boolean
  type: VariableType
}

// Content ________________________________________________________

interface VariableSelectorRadioOption {
  name: string
  description: string
  key: Selectors
  value: Selectors
}

const VARIABLE_SELECTOR_OPTIONS: VariableSelectorRadioOption[] = [
  {
    name: 'Free Input',
    description: 'Free input for the variable value.',
    key: Selectors.FREE_INPUT,
    value: Selectors.FREE_INPUT,
  },
  {
    name: 'Dropdown',
    description: 'Select from a list of predefined values.',
    key: Selectors.DROPDOWN,
    value: Selectors.DROPDOWN,
  },
  {
    name: 'Toggle',
    description: 'True or False value.',
    key: Selectors.TOGGLE,
    value: Selectors.TOGGLE,
  },
]

const VARIABLE_TYPES = [
  {
    name: 'String',
    description: 'A string value.',
    value: Types.STRING,
  },
  {
    name: 'Integer',
    description: 'An integer value.',
    value: Types.INTEGER,
  },
  {
    name: 'Float',
    description: 'A floating-point value.',
    value: Types.FLOAT,
  },
]

interface VariableContentProps {
  variable: Variable
  toggleEdit: () => void
}

/**
 * A form that allows the user to edit a variable's metadata (name & description).
 * @param variable The variable to edit.
 * @param toggleEdit A callback that is called when the user is done editing.
 * @returns The EditVariableContent component.
 */
const EditVariableContent: React.FC<VariableContentProps> = ({
  variable,
  toggleEdit,
}) => {
  /**
   * This state is always updated to reflect the current state of the variable
   * being edited. If saving happens, the setVariable callback is called with
   * this state to update the variable.
   */
  const [newVariable, setNewVariable] = useState(variable)

  const handleSave = async () => {
    // @TODO - Insert API call to save the variable server-side

    toggleEdit()
  }

  const handleCancel = () => {
    toggleEdit()
  }

  return (
    <>
      <div className="flex flex-col gap-5">
        <span className="flex flex-row items-center">
          <h1 className="mr-auto text-xl font-semibold">Edit Variable</h1>
          <button
            className="flex h-full flex-row items-center rounded-md px-4 py-1.5 text-sm font-semibold text-zinc-600 ring-1 ring-inset transition-all duration-150 ease-in-out hover:text-black hover:ring-white/20 data-[checked]:ring-2 dark:text-zinc-400 dark:ring-zinc-400/10 dark:hover:bg-zinc-600/10 dark:hover:text-white dark:hover:ring-white/20 dark:data-[checked]:ring-emerald-400"
            onClick={() => handleCancel()}
          >
            Cancel
          </button>
          <button
            className="ml-2 flex h-full flex-row items-center rounded-md px-4 py-1.5 text-sm font-semibold text-emerald-600 ring-1 ring-inset transition-all duration-150 ease-in-out  hover:ring-emerald-600/20  dark:bg-emerald-600/10 dark:text-emerald-400 dark:ring-zinc-400/10 dark:hover:bg-emerald-600/20 dark:hover:ring-emerald-600/50"
            onClick={() => handleSave()}
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
              value={newVariable.name}
              onChange={(e) =>
                setNewVariable({ ...newVariable, name: e.target.value })
              }
            />
            <span className="flex flex-row gap-1">
              <p className="my-auto w-fit font-mono text-sm text-zinc-600 lg:mx-0 dark:text-zinc-400">
                {newVariable.name}
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
            onChange={(e) =>
              setNewVariable({ ...newVariable, description: e.target.value })
            }
            value={newVariable.description?? ""}
          />
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-zinc-600/20 dark:bg-zinc-400/20" />

        {/* Variable Selector */}
        <div className="flex flex-col gap-2">
          <h2 className=" text-base font-semibold">Type</h2>
          {/* TODO - Add radio group here */}
          <RadioGroup
            className="flex flex-col gap-4 lg:grid lg:grid-cols-2"
            value={newVariable.selector}
            onChange={(value) =>
              setNewVariable({
                ...newVariable,
                selector: value,
              })
            }
          >
            {VARIABLE_SELECTOR_OPTIONS.map((option) => (
              <Radio
                value={option.value}
                key={option.key}
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
                <ButtonPatternBackground />
              </Radio>
            ))}
          </RadioGroup>
        </div>

        {/* Change the value depending on the type of variable that it is */}
        <div className="flex flex-col gap-2">

          {/* Only free input type is currently supported  */}
          {newVariable.selector === Selectors.FREE_INPUT && (
            <>
              <h2 className="text-base font-semibold">Free Input</h2>
              <RadioGroup
                className="flex flex-row gap-4"
                value={newVariable.value}
                onChange={(value) =>
                  setNewVariable({
                    ...newVariable,
                    value: value,
                  })
                }
              >
                {VARIABLE_TYPES.map((option, index) => (
                  <Radio
                    key={index}
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
                    <ButtonPatternBackground />
                  </Radio>
                ))}
              </RadioGroup>
            </>
          )}
          
          {/* Ignore Dropdown type for now */}
          {/* {newVariable.selector === Selectors.DROPDOWN && (
            <>
              <h2 className="text-base font-semibold">Dropdown</h2>
              <div className="flex flex-col gap-2" id="variableTypeDropdown">
                {newVariable.value.type.options?.map((option, index) => {
                  return (
                    <>
                      <span className="flex flex-row gap-2" key={option}>
                        <input
                          className="block w-full max-w-[23rem] rounded-md border-0 bg-transparent px-3 py-1.5 text-zinc-900 shadow-sm outline-none ring-1 ring-inset transition-all duration-75 placeholder:text-zinc-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 dark:text-zinc-200 dark:ring-white/10"
                          placeholder="Example variable option"
                          defaultValue={option}
                          key={index}
                          id={`option-${index}`}
                          onBlur={(e) => {
                            // Change current option to new value using index
                            const newOptions =
                              newVariable.value.type.options?.map((o, i) =>
                                i === index ? e.target.value : o,
                              ) || []

                            setNewVariable({
                              ...newVariable,
                              value: {
                                ...newVariable.value,
                                type: {
                                  ...newVariable.value.type,
                                  options: newOptions,
                                },
                              },
                            })
                          }}
                        />
                        <TrashIcon
                          className="my-auto h-5 w-5 cursor-pointer text-zinc-600 transition-all duration-150 ease-in-out hover:text-black dark:text-zinc-400 dark:hover:text-white"
                          onClick={() => {
                            // Remove current option using the index
                            const newOptions =
                              newVariable.value.type.options?.filter(
                                (_, i) => i !== index,
                              ) || []

                            setNewVariable({
                              ...newVariable,
                              value: {
                                ...newVariable.value,
                                type: {
                                  ...newVariable.value.type,
                                  options: newOptions,
                                },
                              },
                            })
                          }}
                        />
                      </span>
                    </>
                  )
                })}
                <button
                  className="group flex h-full w-full max-w-[23rem] flex-row items-center rounded-md px-4 py-1.5 text-sm font-semibold text-zinc-600 outline-dashed outline-1 transition-all duration-150 ease-in-out hover:text-black hover:ring-white/20 data-[checked]:ring-2 dark:text-zinc-400 dark:ring-zinc-400/10 dark:hover:bg-zinc-600/10 dark:hover:text-white dark:hover:ring-white/20 dark:data-[checked]:ring-emerald-400"
                  onClick={() => {
                    // Add new option
                    const currentOptions = newVariable.value.type.options || []

                    setNewVariable({
                      ...newVariable,
                      value: {
                        ...newVariable.value,
                        type: {
                          ...newVariable.value.type,
                          options: [...currentOptions, ''],
                        },
                      },
                    })
                  }}
                >
                  <PlusIcon className="mr-1.5 h-5 w-5 text-zinc-600 duration-150 ease-in-out group-hover:text-black dark:text-zinc-400 dark:group-hover:text-white " />
                  Add Option
                </button>
              </div>
            </>
          )} */}

          {/* TODO - Add radio group here */}
        </div>
      </div>
    </>
  )
}

/**
 * A static card that only allows the user to view the variable's metadata and value.
 * It can edit the tags and value within the card, but not the metadata (name and description)
 * @param variable The variable to view.
 * @param toggleEdit A callback that is called when the user starts editing the variable.
 * @returns The ViewVariableContent component.
 */
const ViewVariableContent: React.FC<VariableContentProps> = ({
  variable,
  toggleEdit,
}) => {
  return (
    <>
      <span className="flex flex-row items-center gap-2">
        <h2 className="text-lg font-semibold">{variable.name}:</h2>
        <h2 className="font-mono text-lg font-semibold text-emerald-600 dark:text-emerald-400">
          {variable.value}
        </h2>
        <PencilIcon className="h-4 w-4 cursor-pointer text-zinc-600 transition-all duration-150 ease-in-out hover:text-black dark:text-zinc-400 dark:hover:text-white" />
      </span>
      <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
        {variable.description}
      </p>
      <div className="mt-3 h-[1px] bg-zinc-600/20 dark:bg-zinc-400/20" />
      <span className="mt-3 flex flex-row gap-1.5">

        {/* Ignore Tags for now */}
        {/* {variable.tags.map((tag) => (
          <Badge key={tag.name} color={tag.color} text={tag.name} />
        ))} */}


        <PlusCircleIcon className="my-auto h-5 w-5 text-zinc-600 dark:text-zinc-400" />
        <span className="my-auto ml-auto flex flex-row gap-0.5">

        <form action={async () => {
          await deleteVariable({ id: variable.id })
        }}>
          <button>
            <TrashIcon className="h-9 w-9 cursor-pointer rounded-md p-2 text-zinc-600 transition-all duration-75 ease-in-out hover:bg-zinc-400/10 dark:text-zinc-400 dark:hover:text-white" />
          </button>
        </form>
          <Cog6ToothIcon
            className="h-9 w-9 cursor-pointer rounded-md p-2 text-zinc-600 transition-all duration-75 ease-in-out hover:bg-zinc-400/10 dark:text-zinc-400 dark:hover:text-white"
            onClick={() => toggleEdit()}
          />
        </span>
      </span>
    </>
  )
}

// Card ___________________________________________________________

interface VariableCardProps {
  variable: Variable
}

/**
 * A card that displays a variable's name, description, tags, and value.
 * @param variable The variable to display.
 * @param onStartEditing A callback that is called when the user starts editing the variable.
 * @param isEditing Whether the variable is currently being edited.
 * @returns The VariableCard component.
 */
const VariableCard: React.FC<VariableCardProps> = ({
  variable,
}) => {
  const [beingEdited, setBeingEdited] = useState(false) // This state is passed down from the higher component so it can be disabled from above
  const handleToggleEdit = (edit: boolean) => {
    // if (edit) onStartEditing(variable)
    setBeingEdited(edit)
  }

  return (
    <div
      className="flex flex-col rounded-lg px-5 py-5 shadow-xl ring-1 ring-inset ring-black/20 backdrop-blur-sm transition-all duration-500 ease-in-out hover:bg-zinc-300/10 dark:bg-zinc-600/10 dark:ring-white/10 dark:hover:bg-zinc-600/[0.12] dark:hover:ring-white/20 "
      style={{
        maxHeight: beingEdited ? '100rem' : '15rem',
        minHeight: beingEdited ? '30rem' : '1rem',
      }}
    >
      {beingEdited ? (
        <EditVariableContent
          variable={variable}
          toggleEdit={() => handleToggleEdit(false)}
        />
      ) : (
        <ViewVariableContent
          variable={variable}
          toggleEdit={() => handleToggleEdit(true)}
        />
      )}
    </div>
  )
}

export {
  type Variable,
  type VariableValue,
  type VariableTag,
  type VariableType,
  Types,
  Selectors,
  VariableCard,
}
