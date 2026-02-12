export const CATEGORIES = {
  programming: {
    name: 'Programming',
    color: 'blue',
    bgClass: 'bg-blue-500/20 text-blue-700 dark:text-blue-300',
    borderClass: 'border-blue-500/30'
  },
  lifestyle: {
    name: 'Lifestyle',
    color: 'green',
    bgClass: 'bg-green-500/20 text-green-700 dark:text-green-300',
    borderClass: 'border-green-500/30'
  },
  personal: {
    name: 'Personal',
    color: 'purple',
    bgClass: 'bg-purple-500/20 text-purple-700 dark:text-purple-300',
    borderClass: 'border-purple-500/30'
  }
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

export function getCategoryInfo(category: CategoryKey) {
  return CATEGORIES[category];
}
