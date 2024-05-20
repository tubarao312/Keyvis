import clsx from 'clsx'

import { BadgeColor } from '@/lib/metadata/types'

const COLOR_CLASS_MAP: Record<BadgeColor, string> = {
  [BadgeColor.RED]:
    'dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/25 bg-red-50 text-red-700 ring-red-600/10',
  [BadgeColor.GREEN]:
    'dark:bg-green-400/10 dark:text-green-400 dark:ring-green-400/25 bg-green-50 text-green-700 ring-green-600/10',
  [BadgeColor.BLUE]:
    'dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/25 bg-blue-50 text-blue-700 ring-blue-600/10',
  [BadgeColor.ORANGE]:
    'dark:bg-orange-400/10 dark:text-orange-400 dark:ring-orange-400/25 bg-orange-50 text-orange-700 ring-orange-600/10',
  [BadgeColor.YELLOW]:
    'dark:bg-yellow-400/10 dark:text-yellow-400 dark:ring-yellow-400/25 bg-yellow-50 text-yellow-700 ring-yellow-600/10',
  [BadgeColor.PURPLE]:
    'dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/25 bg-purple-50 text-purple-700 ring-purple-600/10',
}

interface BadgeProps {
  color: BadgeColor
  text: string
  Icon?: any
}

const Badge: React.FC<BadgeProps> = ({ color, text, Icon }) => {
  return (
    <span
      className={clsx(
        'my-auto inline-flex h-fit rounded-full px-3 py-[0.09rem] text-xs font-semibold ring-1 ring-inset',
        COLOR_CLASS_MAP[color],
      )}
    >
      {text}
      {/* <Icon className="h-5 w-5 cursor-pointer rounded-md text-zinc-600 transition-all duration-75 ease-in-out hover:bg-zinc-400/10 dark:text-zinc-400 dark:hover:text-white" /> */}
    </span>
  )
}

export { Badge, BadgeColor }
