import { expect, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'

// Note: matchers are usually automatically added by the import above in Vitest 6+

vi.mock('lucide-react', () => ({
    BookOpen: () => 'BookOpen',
    User: () => 'User',
    Layers: () => 'Layers',
    Calendar: () => 'Calendar',
    Package: () => 'Package',
    Eye: () => 'Eye',
    Pencil: () => 'Pencil',
    Trash2: () => 'Trash2',
    Plus: () => 'Plus',
    Search: () => 'Search',
    Heart: () => 'Heart',
}))
