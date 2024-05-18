import { useState } from 'react'
import { Badge, BadgeColor } from './Badge'
import { ClipboardIcon } from '@heroicons/react/24/outline'
import {
  CheckIcon,
  Cog6ToothIcon,
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'

/**
 * Contains the name and color of a tag for a variable
 */
interface VariableTag {
  name: string
  color: BadgeColor
}

/**
 * The type of a variable.
 */
enum FreeInputVariableTypes {
  STRING = 'String',
  INTEGER = 'Integer',
  FLOAT = 'Float',
}

enum VariableTypes {
  DROPDOWN = 'Dropdown',
  FREE_INPUT = 'FreeInput',
  TOGGLE = 'Toggle',
}

interface Dropdown {
  type: VariableTypes.DROPDOWN
  options: string[]
}

interface FreeInput {
  type: VariableTypes.FREE_INPUT
  inputType: FreeInputVariableTypes
}

interface Toggle {
  type: VariableTypes.TOGGLE
}

/**
 * Contains the value and type of a variable.
 * The value can be a string, number, or boolean.
 * The type can be a dropdown, free input, or toggle.
 */
interface VariableValue {
  value: string | number | boolean
  type: Dropdown | FreeInput | Toggle
}

/**
 * Contains all the information about a variable, its value,
 * and its metadata (name, description, tags, etc.)
 */
interface Variable {
  name: string
  description: string
  tags: VariableTag[]
  value: VariableValue
}

// Content ________________________________________________________

interface VariableContentProps {
  variable: Variable
  toggleEdit: () => void
  setVariable: (variable: Variable) => void
}

/**
 * A form that allows the user to edit a variable's metadata (name & description).
 * @param variable The variable to edit.
 * @param toggleEdit A callback that is called when the user is done editing.
 * @param setVariable A callback that is called when the user is done editing and the variable should be updated.
 * @returns The EditVariableContent component.
 */
const EditVariableContent: React.FC<VariableContentProps> = ({
  variable,
  toggleEdit,
  setVariable,
}) => {
  /**
   * This state is always updated to reflect the current state of the variable
   * being edited. If saving happens, the setVariable callback is called with
   * this state to update the variable.
   */
  const [newVariable, setNewVariable] = useState(variable)

  const handleSave = () => {
    // @TODO - Insert API call to save the variable server-side
    setVariable(newVariable)
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
            value={newVariable.description}
          />
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-zinc-600/20 dark:bg-zinc-400/20" />

        {/* Variable Type */}
        <div className="flex flex-col gap-2">
          <h2 className=" text-base font-semibold">Type</h2>
          {/* TODO - Add radio group here */}
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-base font-semibold">Free Input</h2>
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
 * @param setVariable A callback that is called when the user is done editing and the variable should be updated.
 * @returns The ViewVariableContent component.
 */
const ViewVariableContent: React.FC<VariableContentProps> = ({
  variable,
  toggleEdit,
  setVariable,
}) => {
  return (
    <>
      <span className="flex flex-row items-center gap-2">
        <h2 className="text-lg font-semibold">{variable.name}:</h2>
        <h2 className="font-mono text-lg font-semibold text-emerald-600 dark:text-emerald-400">
          {variable.value.value}
        </h2>
        <PencilIcon className="h-4 w-4 cursor-pointer text-zinc-600 transition-all duration-150 ease-in-out hover:text-black dark:text-zinc-400 dark:hover:text-white" />
      </span>
      <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
        {variable.description}
      </p>
      <div className="mt-3 h-[1px] bg-zinc-600/20 dark:bg-zinc-400/20" />
      <span className="mt-3 flex flex-row gap-1.5">
        {variable.tags.map((tag) => (
          <Badge key={tag.name} color={tag.color} text={tag.name} />
        ))}
        <PlusCircleIcon className="my-auto h-5 w-5 text-zinc-600 dark:text-zinc-400" />
        <span className="my-auto ml-auto flex flex-row gap-0.5">
          <TrashIcon className="h-9 w-9 cursor-pointer rounded-md p-2 text-zinc-600 transition-all duration-75 ease-in-out hover:bg-zinc-400/10 dark:text-zinc-400 dark:hover:text-white" />
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
  onStartEditing: (variable: Variable) => void // Only one variable can be edited at once, so we must notify the parent component when editing starts so it can disable editing on other VariableCard components
  isEditing: boolean
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
  onStartEditing,
  isEditing,
}) => {
  const [currentVariable, setCurrentVariable] = useState(variable) // This state will be updated when the user edits the variable, both in the backend and in the current component
  const [beingEdited, setBeingEdited] = useState(isEditing) // This state is passed down from the higher component so it can be disabled from above
  const handleToggleEdit = (edit: boolean) => {
    if (edit) onStartEditing(variable)
    setBeingEdited(edit)
  }

  return (
    <div
      className="flex flex-col rounded-lg px-5 py-5 shadow-xl ring-1 ring-inset ring-black/20 backdrop-blur-sm transition-all duration-500 ease-in-out hover:bg-zinc-300/10 dark:bg-zinc-600/10 dark:ring-white/10 dark:hover:bg-zinc-600/[0.12] dark:hover:ring-white/20 "
      style={{
        maxHeight: beingEdited ? '100rem' : '15rem',
        minHeight: beingEdited ? '43rem' : '1rem',
      }}
    >
      {beingEdited ? (
        <EditVariableContent
          variable={currentVariable}
          toggleEdit={() => handleToggleEdit(false)}
          setVariable={setCurrentVariable}
        />
      ) : (
        <ViewVariableContent
          variable={currentVariable}
          toggleEdit={() => handleToggleEdit(true)}
          setVariable={setCurrentVariable}
        />
      )}
    </div>
  )
}

export {
  type Variable,
  type VariableValue,
  type VariableTag,
  type Dropdown,
  type FreeInput,
  type Toggle,
  FreeInputVariableTypes,
  VariableTypes,
  VariableCard,
}
