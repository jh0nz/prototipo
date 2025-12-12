import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type {
    Authority,
    ManualFunctionEntry,
    NewsItem,
    SearchSuggestion,
    TimelineEvent
} from '@/types'
import newsData from '@/data/noticias.json'
import calendarEventsData from '@/data/calendar-events.json'
import manualFunctionsData from '@/data/manual-funciones.json'
import schedulesData from '@/data/horarios.json'
import authoritiesData from '@/data/autoridades.json'

const RECENT_KEY = 'fcyt-recent-searches'
const MAX_RESULTS = 8

type RawScheduleSlot = {
    subject: string
    professor?: string
    room?: string
    semester: number
}

type RawSchedules = Record<string, Record<string, Record<string, Record<string, RawScheduleSlot | null>>>>

interface SearchIndexItem extends Omit<SearchSuggestion, 'snippet'> {
    content: string
    searchable: string
    titleSearch: string
    contentSearch: string
    sourceSearch: string
}

const searchIndex: SearchIndexItem[] = buildSearchIndex()

export const useSearchStore = defineStore('search', () => {
    const query = ref('')
    const isOpen = ref(false)
    const recentSearches = ref<string[]>([])

    const suggestions = computed<SearchSuggestion[]>(() => {
        const tokens = getSearchTokens(query.value)
        if (!tokens.length) {
            return []
        }

        return searchIndex
            .map((item) => {
                if (!tokens.every((word) => item.searchable.includes(word))) {
                    return null
                }

                const score = tokens.reduce((total, word) => {
                    let weight = 0
                    if (item.titleSearch.includes(word)) weight += 3
                    if (item.sourceSearch.includes(word)) weight += 1
                    if (item.contentSearch.includes(word)) weight += 1
                    return total + weight
                }, 0)

                return {
                    score,
                    suggestion: {
                        id: item.id,
                        title: item.title,
                        type: item.type,
                        path: item.path,
                        icon: item.icon,
                        source: item.source,
                        snippet: buildSnippet(item.content, tokens)
                    } as SearchSuggestion
                }
            })
            .filter((entry): entry is { score: number; suggestion: SearchSuggestion } => Boolean(entry))
            .sort((a, b) => b.score - a.score)
            .slice(0, MAX_RESULTS)
            .map((entry) => entry.suggestion)
    })

    function setQuery(value: string) {
        query.value = value
    }

    function open() {
        isOpen.value = true
    }

    function close() {
        isOpen.value = false
        query.value = ''
    }

    function toggle() {
        if (isOpen.value) {
            close()
        } else {
            open()
        }
    }

    function addToRecent(term: string) {
        const cleaned = term.trim()
        if (!cleaned) return

        recentSearches.value = recentSearches.value.filter((search) => search !== cleaned)
        recentSearches.value.unshift(cleaned)

        if (recentSearches.value.length > 3) {
            recentSearches.value = recentSearches.value.slice(0, 3)
        }

        persistRecent()
    }

    function clearRecent() {
        recentSearches.value = []
        if (typeof window !== 'undefined') {
            localStorage.removeItem(RECENT_KEY)
        }
    }

    function persistRecent() {
        if (typeof window === 'undefined') return
        localStorage.setItem(RECENT_KEY, JSON.stringify(recentSearches.value))
    }

    function loadRecentSearches() {
        if (typeof window === 'undefined') return
        try {
            const saved = localStorage.getItem(RECENT_KEY)
            if (saved) {
                recentSearches.value = JSON.parse(saved)
            }
        } catch {
            recentSearches.value = []
        }
    }

    loadRecentSearches()

    return {
        query,
        isOpen,
        suggestions,
        recentSearches,
        setQuery,
        open,
        close,
        toggle,
        addToRecent,
        clearRecent
    }
})

function buildSearchIndex(): SearchIndexItem[] {
    return [
        ...createPageEntries(),
        ...createCareerEntries(),
        ...createCalendarEntries(),
        ...createNewsEntries(),
        ...createManualEntries(),
        ...createAuthorityEntries(),
        ...createScheduleEntries()
    ]
}

function createPageEntries(): SearchIndexItem[] {
    const pages = [
        {
            id: createId('page', 'inicio'),
            title: 'Inicio',
            type: 'page' as const,
            path: '/',
            icon: 'mdi-compass-outline',
            source: 'Página Inicio',
            content:
                'Resumen general de la facultad con noticias destacadas, calendario académico, accesos rápidos y experiencias estudiantiles.'
        },
        {
            id: createId('page', 'calendario'),
            title: 'Calendario Académico',
            type: 'page' as const,
            path: '/calendario',
            icon: 'mdi-calendar-month-outline',
            source: 'Página Calendario',
            content:
                'Fechas clave para inscripciones, parciales, finales, feriados y todos los hitos del semestre académico 2025.'
        },
        {
            id: createId('page', 'horarios'),
            title: 'Horarios de Clases',
            type: 'page' as const,
            path: '/horarios',
            icon: 'mdi-table-clock',
            source: 'Página Horarios',
            content:
                'Consulta bloques por día, docentes asignados, aulas y turnos disponibles para cada carrera y semestre.'
        },
        {
            id: createId('page', 'admision'),
            title: 'Admisión',
            type: 'page' as const,
            path: '/admision',
            icon: 'mdi-account-check-outline',
            source: 'Página Admisión',
            content:
                'Requisitos, cronograma, documentación, cursos de nivelación y pasos para postular al examen de ingreso.'
        },
        {
            id: createId('page', 'acerca-de'),
            title: 'Acerca de',
            type: 'page' as const,
            path: '/acerca-de',
            icon: 'mdi-domain',
            source: 'Página Institucional',
            content:
                'Información institucional, misión, visión, objetivos estratégicos y estructura orgánica de la FCyT.'
        },
        {
            id: createId('page', 'noticias'),
            title: 'Noticias',
            type: 'page' as const,
            path: '/noticias',
            icon: 'mdi-newspaper-variant-outline',
            source: 'Página Noticias',
            content:
                'Convocatorias, logros académicos, ferias tecnológicas y comunicados oficiales de la facultad.'
        }
    ]

    return pages.map(buildIndexItem)
}

function createCareerEntries(): SearchIndexItem[] {
    const careers = [
        {
            id: createId('career', 'informatica'),
            title: 'Ingeniería Informática',
            type: 'career' as const,
            path: '/admision',
            icon: 'mdi-laptop',
            source: 'Oferta Académica',
            content:
                'Carrera orientada al desarrollo de software, arquitectura de computadoras, redes, bases de datos y proyectos digitales.'
        },
        {
            id: createId('career', 'sistemas'),
            title: 'Ingeniería de Sistemas',
            type: 'career' as const,
            path: '/admision',
            icon: 'mdi-application-brackets-outline',
            source: 'Oferta Académica',
            content:
                'Automatización de procesos, análisis de datos, diseño de plataformas tecnológicas y gestión de proyectos de TI.'
        },
        {
            id: createId('career', 'civil'),
            title: 'Ingeniería Civil',
            type: 'career' as const,
            path: '/admision',
            icon: 'mdi-bridge',
            source: 'Oferta Académica',
            content:
                'Diseño de infraestructura vial, estructuras, hidráulica y gestión de obras civiles con enfoque sostenible.'
        },
        {
            id: createId('career', 'electronica'),
            title: 'Ingeniería Electrónica',
            type: 'career' as const,
            path: '/admision',
            icon: 'mdi-resistor',
            source: 'Oferta Académica',
            content:
                'Sistemas embebidos, automatización industrial, telecomunicaciones, instrumentación y control.'
        },
        {
            id: createId('career', 'industrial'),
            title: 'Ingeniería Industrial',
            type: 'career' as const,
            path: '/admision',
            icon: 'mdi-factory',
            source: 'Oferta Académica',
            content:
                'Optimización de procesos productivos, logística, calidad total, seguridad industrial y gestión de operaciones.'
        },
        {
            id: createId('career', 'quimica'),
            title: 'Ingeniería Química',
            type: 'career' as const,
            path: '/admision',
            icon: 'mdi-flask-outline',
            source: 'Oferta Académica',
            content:
                'Procesos químicos industriales, materiales, control de calidad, seguridad y sostenibilidad ambiental.'
        },
        {
            id: createId('career', 'mecanica'),
            title: 'Ingeniería Mecánica',
            type: 'career' as const,
            path: '/admision',
            icon: 'mdi-engine-outline',
            source: 'Oferta Académica',
            content:
                'Diseño de maquinaria, termodinámica, manufactura avanzada y mantenimiento de sistemas mecánicos.'
        },
        {
            id: createId('career', 'electrica'),
            title: 'Ingeniería Eléctrica',
            type: 'career' as const,
            path: '/admision',
            icon: 'mdi-lightning-bolt-outline',
            source: 'Oferta Académica',
            content:
                'Generación, transmisión y distribución de energía, sistemas de potencia y automatización eléctrica.'
        }
    ]

    return careers.map(buildIndexItem)
}

function createCalendarEntries(): SearchIndexItem[] {
    const events = calendarEventsData as TimelineEvent[]

    return events.map((event) =>
        buildIndexItem({
            id: createId('event', `${event.id}-${event.title}`),
            title: event.title,
            type: 'event',
            path: '/calendario',
            icon: 'mdi-calendar-star',
            source: 'Calendario Académico',
            content: [event.description, event.category, event.location, event.time].filter(Boolean).join(' ')
        })
    )
}

function createNewsEntries(): SearchIndexItem[] {
    const newsItems = newsData as NewsItem[]

    return newsItems.map((news) =>
        buildIndexItem({
            id: createId('news', news.id.toString()),
            title: news.title,
            type: 'news',
            path: `/noticias/${news.id}`,
            icon: 'mdi-newspaper',
            source: 'Noticias FCyT',
            content: [news.excerpt ?? '', stripHtml(news.content ?? '')].join(' ')
        })
    )
}

function createManualEntries(): SearchIndexItem[] {
    const manualItems = manualFunctionsData as ManualFunctionEntry[]

    return manualItems.map((item) =>
        buildIndexItem({
            id: createId('manual', item.id.toString()),
            title: item.title,
            type: 'document',
            path: '/acerca-de',
            icon: 'mdi-file-document-outline',
            source: 'Manual de Funciones',
            content: [
                item.unit,
                item.dependency,
                item.dependents,
                item.objective,
                item.authority,
                item.relations,
                (item.functions ?? []).join('. '),
                (item.responsibilities ?? []).join('. '),
                item.requirements ? Object.values(item.requirements).join('. ') : ''
            ]
                .filter(Boolean)
                .join(' ')
        })
    )
}

function createAuthorityEntries(): SearchIndexItem[] {
    const authorityItems = authoritiesData as Authority[]

    return authorityItems.map((authority) =>
        buildIndexItem({
            id: createId('authority', authority.id.toString()),
            title: authority.name,
            type: 'authority',
            path: '/acerca-de',
            icon: 'mdi-account-tie',
            source: 'Autoridades FCyT',
            content: [authority.role, authority.email].filter(Boolean).join(' ')
        })
    )
}

function createScheduleEntries(): SearchIndexItem[] {
    const schedules = schedulesData as RawSchedules
    const entries: SearchIndexItem[] = []

    Object.entries(schedules).forEach(([careerKey, semesters]) => {
        Object.entries(semesters).forEach(([semester, days]) => {
            Object.entries(days).forEach(([dayName, timeSlots]) => {
                Object.entries(timeSlots).forEach(([timeRange, slot]) => {
                    if (!slot) return

                    const careerName = formatCareerName(careerKey)
                    entries.push(
                        buildIndexItem({
                            id: createId('schedule', `${careerKey}-${semester}-${dayName}-${timeRange}`),
                            title: `${slot.subject} • ${dayName} ${timeRange}`,
                            type: 'schedule',
                            path: '/horarios',
                            icon: 'mdi-timetable',
                            source: `Horarios ${careerName}`,
                            content: [
                                slot.subject,
                                slot.professor,
                                slot.room,
                                `Semestre ${slot.semester}`,
                                careerName,
                                dayName,
                                timeRange
                            ]
                                .filter(Boolean)
                                .join(' ')
                        })
                    )
                })
            })
        })
    })

    return entries
}

function buildIndexItem(entry: Omit<SearchSuggestion, 'snippet'> & { content: string }): SearchIndexItem {
    const sanitizedContent = cleanText(entry.content)

    return {
        ...entry,
        content: sanitizedContent,
        titleSearch: normalizeText(entry.title),
        sourceSearch: normalizeText(entry.source),
        contentSearch: normalizeText(sanitizedContent),
        searchable: normalizeText(`${entry.title} ${entry.source} ${sanitizedContent}`)
    }
}

function getSearchTokens(value: string): string[] {
    return normalizeText(value)
        .split(/\s+/)
        .filter(Boolean)
}

function normalizeText(value: string): string {
    return value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
}

function cleanText(value: string): string {
    return stripHtml(value)
        .replace(/\s+/g, ' ')
        .trim()
}

function stripHtml(value: string): string {
    return value.replace(/<[^>]+>/g, ' ')
}

function buildSnippet(content: string, searchWords: string[]): string | undefined {
    if (!content) {
        return undefined
    }

    const normalizedContent = normalizeText(content)
    const radius = 70

    for (const word of searchWords) {
        const index = normalizedContent.indexOf(word)
        if (index !== -1) {
            const start = Math.max(0, index - radius)
            const end = Math.min(content.length, index + word.length + radius)
            const prefix = start > 0 ? '...' : ''
            const suffix = end < content.length ? '...' : ''
            return `${prefix}${content.slice(start, end).trim()}${suffix}`
        }
    }

    return content.length > 180 ? `${content.slice(0, 180).trim()}...` : content
}

function createId(prefix: string, value: string): string {
    return `${prefix}-${slugify(value)}`
}

function slugify(value: string): string {
    return normalizeText(value)
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

function formatCareerName(key: string): string {
    const labels: Record<string, string> = {
        info: 'Ingeniería Informática',
        sistemas: 'Ingeniería de Sistemas',
        industrial: 'Ingeniería Industrial'
    }
    return labels[key] ?? key
}
