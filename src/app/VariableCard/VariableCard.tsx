'use client'

import { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { Badge, BadgeColor } from './Badge'
import {
  CheckCircleIcon,
  ChevronDownIcon,
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
import {
  Dialog,
  DialogPanel,
  Field,
  Radio,
  RadioGroup,
  Select,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import ButtonPatternBackground from './ButtonPatternBackground'

import { Variable } from '@prisma/client'
import { Selectors, Types } from '@/lib/metadata/types'
import {
  deleteVariable,
  updateVariable,
  updateVariableValue,
  updateVariableOptions,
} from '@/lib/metadata/variable'

import type { VariableExt } from '@/lib/metadata/variable'
import clsx from 'clsx'

/**
 * Contains the name and color of a tag for a variable
 */
interface VariableTag {
  name: string
  color: BadgeColor
}

// Content ________________________________________________________

interface VariableAliasCopyProps {
  alias: string
}

const VariableAliasClipboard: React.FC<VariableAliasCopyProps> = ({
  alias,
}) => {
  return (
    <span className="flex flex-row gap-1">
      <p className="my-auto w-fit font-mono text-sm text-zinc-600 lg:mx-0 dark:text-zinc-400">
        {alias}
      </p>
      {alias != '' ? (
        <ClipboardIcon
          className="my-auto ml-1 h-5 w-5 cursor-pointer text-zinc-600 transition-all
          duration-150 ease-in-out hover:text-black dark:text-zinc-400 dark:hover:text-white
          "
        />
      ) : null}
    </span>
  )
}

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
  variable: VariableExt
  toggleEdit: () => void
}

// Card Content __________________________________________________

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
  const [options, setOptions] = useState<string[]>([])

  // On load, set the options to the current options
  useEffect(() => {
    const newOptions = newVariable.options.map((option) => option.value)
    setOptions(newOptions)
  }, [])

  const handleDeleteOption = useCallback(
    (index: number) => {
      const newOptions = [...options]
      newOptions.splice(index, 1)
      setOptions(newOptions)
    },
    [options],
  )

  const handleAddOption = useCallback(() => {
    setOptions([...options, ''])
  }, [options])

  const handleUpdateOption = useCallback(
    (index: number, value: string) => {
      const newOptions = [...options]
      newOptions[index] = value
      setOptions(newOptions)
    },
    [options],
  )

  const handleSave = async () => {
    // Create object with the different parameters from the newVariable state

    //@TODO Replace this mess with zod validation and useForm
    const updatedVariable = {
      id: newVariable.id,
      name: newVariable.name,
      description: newVariable.description,
      value: variable.value,
      type: newVariable.type,
      selector: newVariable.selector,
      alias: newVariable.alias,
    }

    try {
      // Save the variable and options if they exist
      await updateVariable(updatedVariable)
      await updateVariableOptions({ id: newVariable.id, options })
    } catch (error) {
      // For now just log into the console
      console.error('Error saving variable:', error)
    }

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
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="ml-2 flex h-full flex-row items-center rounded-md px-4 py-1.5 text-sm font-semibold text-emerald-600 ring-1 ring-inset transition-all duration-150 ease-in-out  hover:ring-emerald-600/20  dark:bg-emerald-600/10 dark:text-emerald-400 dark:ring-zinc-400/10 dark:hover:bg-emerald-600/20 dark:hover:ring-emerald-600/50"
            onClick={handleSave}
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
          <input
            id="variable-name"
            className="block w-full max-w-[23rem] rounded-md border-0 bg-transparent px-3 py-1.5 text-zinc-900 shadow-sm outline-none ring-1 ring-inset transition-all duration-75 placeholder:text-zinc-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 dark:text-zinc-200 dark:ring-white/10"
            placeholder="Example Variable Name"
            value={newVariable.name}
            onChange={(e) =>
              setNewVariable({ ...newVariable, name: e.target.value })
            }
          />
        </div>

        {/* Variable Alias */}
        <div className="flex flex-col">
          <h2 className="text-base font-semibold">Variable Alias</h2>
          <p className="mt-1 max-w-[40rem] text-sm text-zinc-600 dark:text-zinc-400">
            The alias is used to reference this variable in the code. Naming
            convetion should be uppercase with underscores, like a constant.
          </p>
          <span className="mt-2 flex w-full flex-col gap-2 lg:flex-row">
            <input
              id="variable-alias"
              className="block w-full max-w-[23rem] rounded-md border-0 bg-transparent px-3 py-1.5 text-zinc-900 shadow-sm outline-none ring-1 ring-inset transition-all duration-75 placeholder:text-zinc-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 dark:text-zinc-200 dark:ring-white/10"
              placeholder="EXAMPLE_VARIABLE_ALIAS"
              value={newVariable.alias}
              onChange={(e) =>
                setNewVariable({ ...newVariable, alias: e.target.value })
              }
            />
            <span className="hidden items-center lg:flex">
              <VariableAliasClipboard alias={newVariable.alias} />
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
            value={newVariable.description ?? ''}
          />
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-zinc-600/20 dark:bg-zinc-400/20" />

        {/* Variable Selector */}
        <div className="flex flex-col gap-2">
          <h2 className=" text-base font-semibold">Selector</h2>
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
              <h2 className="text-base font-semibold">Type</h2>
              <RadioGroup
                className="flex flex-row gap-4"
                value={newVariable.type}
                onChange={(value) =>
                  setNewVariable({
                    ...newVariable,
                    type: value,
                  })
                }
              >
                {VARIABLE_TYPES.map((option, index) => (
                  <Radio
                    key={index}
                    value={option.value}
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
          {newVariable.selector === Selectors.DROPDOWN && (
            <>
              <h2 className="text-base font-semibold">Dropdown</h2>
              <div className="flex flex-col gap-2" id="variableTypeDropdown">
                {options.map((option, index) => {
                  return (
                    <>
                      <span
                        className="flex flex-row gap-2"
                        key={`${option}-${index}`}
                      >
                        <input
                          className="block w-full max-w-[23rem] rounded-md border-0 bg-transparent px-3 py-1.5 text-zinc-900 shadow-sm outline-none ring-1 ring-inset transition-all duration-75 placeholder:text-zinc-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 dark:text-zinc-200 dark:ring-white/10"
                          placeholder="Example variable option"
                          defaultValue={option}
                          id={`option-${index}`}
                          onBlur={(e) => {
                            handleUpdateOption(index, e.target.value)
                          }}
                        />
                        <TrashIcon
                          className="my-auto h-5 w-5 cursor-pointer text-zinc-600 transition-all duration-150 ease-in-out hover:text-black dark:text-zinc-400 dark:hover:text-white"
                          onClick={() => {
                            handleDeleteOption(index)
                          }}
                        />
                      </span>
                    </>
                  )
                })}
                <button
                  className="group flex h-full w-full max-w-[23rem] flex-row items-center rounded-md px-4 py-1.5 text-sm font-semibold text-zinc-600 outline-dashed outline-1 transition-all duration-150 ease-in-out hover:text-black hover:ring-white/20 data-[checked]:ring-2 dark:text-zinc-400 dark:ring-zinc-400/10 dark:hover:bg-zinc-600/10 dark:hover:text-white dark:hover:ring-white/20 dark:data-[checked]:ring-emerald-400"
                  onClick={() => {
                    handleAddOption()
                  }}
                >
                  <PlusIcon className="mr-1.5 h-5 w-5 text-zinc-600 duration-150 ease-in-out group-hover:text-black dark:text-zinc-400 dark:group-hover:text-white " />
                  Add Option
                </button>
              </div>
            </>
          )}

          {/* TODO - Add radio group here */}
        </div>
      </div>
    </>
  )
}

// Edit Variable Value & Inputs __________________________________

interface ValueInputProps {
  variable: VariableExt
  value: string
  onChange: (value: string) => void
  onClose: () => void
  onSave: () => void
}

const ValueFreeInput: React.FC<ValueInputProps> = ({
  variable,
  value,
  onChange,
  onClose,
  onSave,
}) => {
  const inputMode = useMemo(() => {
    switch (variable.type) {
      case Types.INTEGER:
        return 'numeric'
      case Types.FLOAT:
        return 'decimal'
      default:
        return 'text'
    }
  }, [variable.type])

  const inputType = useMemo(() => {
    switch (variable.type) {
      case Types.INTEGER:
        return 'number'
      case Types.FLOAT:
        return 'number'
      default:
        return 'text'
    }
  }, [variable.type])

  // Validate the input value
  const isValid = useMemo(() => {
    switch (variable.type) {
      case Types.INTEGER:
        return Number.isInteger(Number(value))
      case Types.FLOAT:
        return !Number.isNaN(Number(value))
      default:
        return true
    }
  }, [variable.type, value])

  return (
    <>
      <div
        className={clsx(
          'group relative flex h-full w-full items-center rounded-lg bg-zinc-50 shadow-xl ring-1 ring-inset ring-zinc-900/7.5 dark:bg-zinc-900 dark:ring-zinc-800',
          !isValid && 'ring-red-600 dark:ring-red-400',
        )}
      >
        <PencilIcon className="pointer-events-none absolute left-3 top-0 h-full w-5 stroke-zinc-500" />
        <input
          data-autofocus
          inputMode={inputMode}
          className={clsx(
            ' m-1 h-full w-full flex-auto appearance-none bg-transparent pl-10 pr-[5rem] font-mono text-zinc-900 outline-none placeholder:text-zinc-500 focus:w-full focus:flex-none sm:text-sm dark:text-white',
          )}
          onKeyDown={(event) => {
            switch (event.key) {
              case 'Escape':
                onClose()
                break
              case 'Enter':
                if (isValid) {
                  onSave()
                } else {
                  console.error('Value is not valid:', value, variable.type)
                }
                break
            }
          }}
          defaultValue={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <h3 className="pointer-events-none absolute right-3 my-auto mb-1 text-zinc-500">
          {variable.type}
        </h3>
      </div>
      <button
        className="flex h-full flex-row items-center rounded-md px-4 py-1.5 text-sm font-semibold text-emerald-600 ring-1 ring-inset transition-all duration-150 ease-in-out  hover:ring-emerald-600/20  dark:bg-emerald-600/10 dark:text-emerald-400 dark:ring-zinc-400/10 dark:hover:bg-emerald-600/20 dark:hover:ring-emerald-600/50"
        onClick={
          isValid
            ? onSave
            : () => console.error('Value is not valid:', value, variable.type)
        }
      >
        Save
        <CheckIcon className="ml-1 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
      </button>
    </>
  )
}

const ValueDropdown: React.FC<ValueInputProps> = ({
  variable,
  value,
  onChange,
  onClose,
  onSave,
}) => {
  // When this appears for the first time, check if the current value is in the options. If it isn't, set the current value to the first option.
  const [defaultValue, setDefaultValue] = useState(value)
  useEffect(() => {
    if (!variable.options.find((option) => option.value === value)) {
      onChange(variable.options[0].value)
      setDefaultValue(variable.options[0].value)
    }
  }, [])

  return (
    <>
      <div className="group relative flex h-full w-full items-center ">
        <ChevronDownIcon className="pointer-events-none absolute left-3 top-0 h-full w-5 stroke-zinc-500" />
        <Select
          data-autofocus
          className="h-full w-full appearance-none rounded-lg border-none bg-zinc-50 pl-10 shadow-xl ring-1 ring-inset ring-zinc-900/7.5 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 dark:bg-zinc-900 dark:ring-zinc-800"
          onChange={(e) => onChange(e.target.value)}
          defaultValue={defaultValue}
        >
          {variable.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.value}
            </option>
          ))}
        </Select>
      </div>
      <button
        className="flex h-full flex-row items-center rounded-md px-4 py-1.5 text-sm font-semibold text-emerald-600 ring-1 ring-inset transition-all duration-150 ease-in-out  hover:ring-emerald-600/20  dark:bg-emerald-600/10 dark:text-emerald-400 dark:ring-zinc-400/10 dark:hover:bg-emerald-600/20 dark:hover:ring-emerald-600/50"
        onClick={onSave}
      >
        Save
        <CheckIcon className="ml-1 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
      </button>
    </>
  )
}

const EditVariableValue: React.FC<VariableExt> = (variable) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(variable.value)

  /**
   * Saves the new value of the variable and close the modal.
   */
  const handleSave = async () => {
    try {
      await updateVariableValue({ id: variable.id, value })
    } catch (error) {
      console.error('Error saving variable value:', error)
    }

    // Update the variable with the new value
    setIsOpen(false)
  }

  /**
   * Cancels the variable editing and closes the modal.
   */
  const handleCancel = () => {
    setIsOpen(false)
  }

  return (
    <>
      <PencilIcon
        onClick={() => setIsOpen(true)}
        className="h-4 w-4 cursor-pointer text-zinc-600 transition-all duration-150 ease-in-out hover:text-black dark:text-zinc-400 dark:hover:text-white"
      />
      <Suspense fallback={null}>
        <Transition show={isOpen}>
          <Dialog onClose={setIsOpen} className={clsx('fixed inset-0 z-50')}>
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-zinc-400/25 backdrop-blur-sm dark:bg-black/40" />
            </TransitionChild>

            <div className="fixed inset-0 overflow-y-auto px-4 py-32 sm:px-6 md:py-32 lg:px-8 lg:py-[15vh]">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="mx-auto flex h-12  transform-gpu flex-row items-center gap-2 overflow-hidden sm:max-w-xl">
                  {variable.selector === Selectors.FREE_INPUT && (
                    <ValueFreeInput
                      variable={variable}
                      value={value}
                      onChange={setValue}
                      onClose={handleCancel}
                      onSave={handleSave}
                    />
                  )}
                  {variable.selector === Selectors.DROPDOWN && (
                    <ValueDropdown
                      variable={variable}
                      value={value}
                      onChange={setValue}
                      onClose={handleCancel}
                      onSave={handleSave}
                    />
                  )}
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>
      </Suspense>
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
        <EditVariableValue {...variable} />
        <span className="ml-auto mr-2 hidden lg:block">
          <VariableAliasClipboard alias={variable.alias} />
        </span>
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

        <PlusCircleIcon className="my-auto hidden h-5 w-5 text-zinc-600 dark:text-zinc-400" />
        <span className="my-auto ml-auto flex flex-row gap-0.5">
          <form
            action={async () => {
              await deleteVariable({ id: variable.id })
            }}
          >
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
  variable: VariableExt
}

/**
 * A card that displays a variable's name, description, tags, and value.
 * @param variable The variable to display.
 * @param onStartEditing A callback that is called when the user starts editing the variable.
 * @param isEditing Whether the variable is currently being edited.
 * @returns The VariableCard component.
 */
const VariableCard: React.FC<VariableCardProps> = ({ variable }) => {
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

export { type Variable, type VariableTag, Types, Selectors, VariableCard }
