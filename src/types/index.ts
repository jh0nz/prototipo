// ===== News Types =====
export interface NewsItem {
    id: number
    title: string
    date: string
    image: string
    tags: string[]
    cta: string
    ctaLink: string
    excerpt?: string
}

// ===== Timeline/Calendar Types =====
export type EventType = 'info' | 'success' | 'warning' | 'urgent'

export interface TimelineEvent {
    id: number
    date: string
    title: string
    description?: string
    type: EventType
    category: 'exams' | 'procedures' | 'holidays' | 'events' | 'all'
    time?: string
    location?: string
    isUrgent?: boolean
}

// ===== Navigation Types =====
export interface NavItem {
    label: string
    path: string
    icon?: string
    children?: NavItem[]
}

// ===== Admissions Wizard Types =====
export interface Career {
    id: string
    name: string
    icon: string
    description: string
    duration: string
    faculty: string
}

export interface AdmissionRequirement {
    id: string
    title: string
    description: string
    icon: string
    required: boolean
}

// ===== Institutional Types =====
export interface Authority {
    id: number
    name: string
    role: string
    image: string
    email?: string
}

export interface InstitutionalGoal {
    id: number
    title: string
    description: string
    icon: string
}

// ===== Schedule Types =====
export interface ScheduleSlot {
    id: string
    subject: string
    professor?: string
    room?: string
    semester: number
}

export interface DaySchedule {
    day: string
    slots: Record<string, ScheduleSlot | null>
}

// ===== Search Types =====
export interface SearchSuggestion {
    id: string
    title: string
    type: 'page' | 'event' | 'career' | 'news'
    path: string
    icon?: string
}

// ===== Toast Types =====
export interface Toast {
    id: string
    message: string
    type: 'success' | 'error' | 'info' | 'warning'
    duration?: number
}

// ===== Quick Action Types =====
export interface QuickAction {
    id: string
    title: string
    icon: string
    path: string
    description?: string
}
