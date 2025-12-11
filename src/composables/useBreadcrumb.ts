import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

export interface BreadcrumbItem {
    label: string
    path?: string
    hash?: string
    isActive?: boolean
}

export interface PageSection {
    id: string
    label: string
    element?: HTMLElement
}

// Estado global compartido
const sections = ref<PageSection[]>([])
const activeSection = ref<string | null>(null)
const dynamicBreadcrumb = ref<string | null>(null)

export function useBreadcrumb() {
    const route = useRoute()

    // Generar breadcrumbs basados en la ruta actual y sección activa
    const breadcrumbs = computed<BreadcrumbItem[]>(() => {
        const items: BreadcrumbItem[] = [
            { label: 'Inicio', path: '/' }
        ]

        // Agregar página actual si no es home
        if (route.path !== '/') {
            const pageLabel = (route.meta.breadcrumb as string) || route.name?.toString() || 'Página'
            
            // Si es una ruta de noticia detalle, agregar el nivel intermedio
            if (route.path.startsWith('/noticias/') && route.params.id) {
                // Agregar "Noticias" como nivel intermedio
                items.push({
                    label: 'Noticias',
                    path: '/noticias',
                    isActive: false
                })
                
                // Agregar el título dinámico de la noticia si existe
                if (dynamicBreadcrumb.value) {
                    items.push({
                        label: dynamicBreadcrumb.value,
                        path: route.path,
                        isActive: !activeSection.value
                    })
                } else {
                    items.push({
                        label: `Noticia ${route.params.id}`,
                        path: route.path,
                        isActive: !activeSection.value
                    })
                }
            } else {
                items.push({
                    label: pageLabel,
                    path: route.path,
                    isActive: !activeSection.value
                })
            }
        }

        // Agregar sección activa si existe
        if (activeSection.value && sections.value.length > 0) {
            const section = sections.value.find(s => s.id === activeSection.value)
            if (section) {
                items.push({
                    label: section.label,
                    hash: `#${section.id}`,
                    isActive: true
                })
            }
        }

        return items
    })

    // Registrar secciones de la página
    function registerSections(pageSections: PageSection[]) {
        sections.value = pageSections
        activeSection.value = null
    }

    // Limpiar secciones al desmontar
    function clearSections() {
        sections.value = []
        activeSection.value = null
    }

    // Establecer sección activa
    function setActiveSection(sectionId: string | null) {
        activeSection.value = sectionId
    }

    // Navegar a una sección
    function navigateToSection(sectionId: string) {
        const section = sections.value.find(s => s.id === sectionId)
        if (section?.element) {
            const headerOffset = 90 // Header (64px) + Breadcrumb (28px)
            const elementPosition = section.element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        }
    }

    // Establecer breadcrumb dinámico (para páginas de detalle)
    function setDynamicBreadcrumb(label: string | null) {
        dynamicBreadcrumb.value = label
    }

    // Limpiar breadcrumb dinámico
    function clearDynamicBreadcrumb() {
        dynamicBreadcrumb.value = null
    }

    return {
        breadcrumbs,
        sections: computed(() => sections.value),
        activeSection: computed(() => activeSection.value),
        registerSections,
        clearSections,
        setActiveSection,
        navigateToSection,
        setDynamicBreadcrumb,
        clearDynamicBreadcrumb
    }
}
