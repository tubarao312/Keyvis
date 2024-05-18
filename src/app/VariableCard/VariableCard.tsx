import { useState } from 'react'
import { Badge, BadgeColor } from './Badge'

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
enum VariableType {
  STRING = 'String',
  NUMBER = 'Number',
  BOOLEAN = 'Boolean',
}

/**
 * Contains the value and type of a variable.
 */
interface VariableValue {
  value: string | number | boolean
  type: VariableType
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
const EditVariableContent: React.FC<VariableContentProps> = ({ variable }) => {}

/**
 * A static card that only allows the user to view the variable's metadata and value.
 * It can edit the tags and value within the card, but not the metadata (name and description)
 * @param variable The variable to view.
 * @param toggleEdit A callback that is called when the user starts editing the variable.
 * @param setVariable A callback that is called when the user is done editing and the variable should be updated.
 * @returns The ViewVariableContent component.
 */
const ViewVariableContent: React.FC<VariableContentProps> = ({ variable }) => {}

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
        maxHeight: isEditing ? '100rem' : '15rem',
        minHeight: isEditing ? '43rem' : '1rem',
      }}
    >
      {beingEdited ? (
        <EditVariableContent
          variable={variable}
          toggleEdit={() => handleToggleEdit(false)}
          setVariable={setCurrentVariable}
        />
      ) : (
        <ViewVariableContent
          variable={variable}
          toggleEdit={() => handleToggleEdit(true)}
          setVariable={setCurrentVariable}
        />
      )}
    </div>
  )
}
