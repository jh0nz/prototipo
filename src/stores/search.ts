import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { SearchSuggestion } from '@/types'

export const useSearchStore = defineStore('search', () => {
    const query = ref('')
    const isOpen = ref(false)
    const recentSearches = ref<string[]>([])

    // All searchable content
    const searchableContent: SearchSuggestion[] = [
        // Pages
        { id: '1', title: 'Inicio', type: 'page', path: '/', icon: '🏠' },
        { id: '2', title: 'Calendario Académico', type: 'page', path: '/#calendar', icon: '📅' },
        { id: '3', title: 'Horarios de Clases', type: 'page', path: '/horarios', icon: '🕒' },
        { id: '4', title: 'Admisión', type: 'page', path: '/admision', icon: '📝' },
        { id: '5', title: 'Institucional', type: 'page', path: '/institucional', icon: '🏛️' },
        { id: '6', title: 'Contacto', type: 'page', path: '/contacto', icon: '📧' },

        // Events
        { id: '10', title: 'Examen de Ingreso', type: 'event', path: '/admision', icon: '📋' },
        { id: '11', title: 'Exámenes Finales', type: 'event', path: '/#calendar', icon: '📚' },
        { id: '12', title: 'Primeros Parciales', type: 'event', path: '/#calendar', icon: '✍️' },
        { id: '13', title: 'Segundos Parciales', type: 'event', path: '/#calendar', icon: '✍️' },
        { id: '14', title: 'Inicio de Clases', type: 'event', path: '/#calendar', icon: '🎓' },
        { id: '15', title: 'Fin de Semestre', type: 'event', path: '/#calendar', icon: '🏁' },

        // Careers
        { id: '20', title: 'Ingeniería Informática', type: 'career', path: '/admision', icon: '💻' },
        { id: '21', title: 'Ingeniería de Sistemas', type: 'career', path: '/admision', icon: '⚙️' },
        { id: '22', title: 'Ingeniería Civil', type: 'career', path: '/admision', icon: '🏗️' },
        { id: '23', title: 'Ingeniería Electrónica', type: 'career', path: '/admision', icon: '🔌' },
        { id: '24', title: 'Ingeniería Industrial', type: 'career', path: '/admision', icon: '🏭' },
        { id: '25', title: 'Ingeniería Química', type: 'career', path: '/admision', icon: '⚗️' },
        { id: '26', title: 'Ingeniería Mecánica', type: 'career', path: '/admision', icon: '🔧' },
        { id: '27', title: 'Ingeniería Eléctrica', type: 'career', path: '/admision', icon: '⚡' },

        // News
        { id: '30', title: 'Convocatoria Examen de Ingreso', type: 'news', path: '/', icon: '📰' },
        { id: '31', title: 'Foro de Investigación', type: 'news', path: '/', icon: '📰' },
        { id: '32', title: 'Posesión Delegados', type: 'news', path: '/', icon: '📰' },
    ]

    const suggestions = computed(() => {
        if (!query.value.trim()) return []

        const searchTerm = query.value.toLowerCase()
        return searchableContent
            .filter(item =>
                item.title.toLowerCase().includes(searchTerm)
            )
            .slice(0, 8)
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
        if (!term.trim()) return

        // Remove if exists, then add to front
        recentSearches.value = recentSearches.value.filter(s => s !== term)
        recentSearches.value.unshift(term)

        // Keep only last 3
        if (recentSearches.value.length > 3) {
            recentSearches.value = recentSearches.value.slice(0, 3)
        }

        // Persist to localStorage
        localStorage.setItem('fcyt-recent-searches', JSON.stringify(recentSearches.value))
    }

    function loadRecentSearches() {
        try {
            const saved = localStorage.getItem('fcyt-recent-searches')
            if (saved) {
                recentSearches.value = JSON.parse(saved)
            }
        } catch {
            recentSearches.value = []
        }
    }

    // Load on init
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
        addToRecent
    }
})
