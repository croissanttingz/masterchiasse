import { TrendingUp, Clock, Trophy, Flame } from 'lucide-react'

type SortType = 'hot' | 'new' | 'top' | 'rising'

interface SortingTabsProps {
  currentSort: SortType
  onSortChange: (sort: SortType) => void
}

const sortOptions = [
  { 
    value: 'hot' as const, 
    label: 'Hot', 
    icon: Flame,
    description: 'Trending content with high engagement'
  },
  { 
    value: 'new' as const, 
    label: 'New', 
    icon: Clock,
    description: 'Latest chiasses by creation time'
  },
  { 
    value: 'top' as const, 
    label: 'Top', 
    icon: Trophy,
    description: 'Highest voted chiasses'
  },
  { 
    value: 'rising' as const, 
    label: 'Rising', 
    icon: TrendingUp,
    description: 'New content gaining momentum'
  },
]

export const SortingTabs = ({ currentSort, onSortChange }: SortingTabsProps) => {
  return (
    <div className="flex items-center gap-1 mb-6 bg-gray-50 p-1 rounded-lg">
      {sortOptions.map(({ value, label, icon: Icon, description }) => (
        <button
          key={value}
          onClick={() => onSortChange(value)}
          title={description}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium ${
            currentSort === value
              ? 'bg-white text-blue-600 shadow-sm border border-blue-100'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  )
}