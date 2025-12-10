import { ref, onMounted, onUnmounted } from 'vue'
import { useBreadcrumb, type PageSection } from './useBreadcrumb'

export function usePageSections() {
    const { registerSections, clearSections, setActiveSection } = useBreadcrumb()
    const observer = ref<IntersectionObserver | null>(null)

    // Detectar secciones automáticamente en el DOM
    function detectSections(): PageSection[] {
        const sectionElements = document.querySelectorAll('section[id]')
        const detectedSections: PageSection[] = []

        sectionElements.forEach((element) => {
            const id = element.getAttribute('id')
            if (!id) return

            // Intentar obtener el título de la sección
            let label = id
            const heading = element.querySelector('h2, h3')
            if (heading?.textContent) {
                label = heading.textContent.trim()
            }

            detectedSections.push({
                id,
                label,
                element: element as HTMLElement
            })
        })

        return detectedSections
    }

    // Configurar Intersection Observer para detectar sección visible
    function setupIntersectionObserver(sections: PageSection[]) {
        const options = {
            root: null,
            rootMargin: '-140px 0px -60% 0px', // Offset para header + breadcrumb
            threshold: 0
        }

        observer.value = new IntersectionObserver((entries) => {
            // Encontrar la primera sección visible
            const visibleEntry = entries.find(entry => entry.isIntersecting)

            if (visibleEntry) {
                const sectionId = visibleEntry.target.getAttribute('id')
                if (sectionId) {
                    setActiveSection(sectionId)
                }
            }
        }, options)

        // Observar todas las secciones
        sections.forEach(section => {
            if (section.element) {
                observer.value?.observe(section.element)
            }
        })
    }

    // Inicializar detección de secciones
    function initSections() {
        // Esperar a que el DOM esté listo
        setTimeout(() => {
            const detectedSections = detectSections()
            if (detectedSections.length > 0) {
                registerSections(detectedSections)
                setupIntersectionObserver(detectedSections)
            }
        }, 100)
    }

    // Limpiar observer al desmontar
    function cleanup() {
        if (observer.value) {
            observer.value.disconnect()
            observer.value = null
        }
        clearSections()
    }

    onMounted(() => {
        initSections()
    })

    onUnmounted(() => {
        cleanup()
    })

    return {
        initSections,
        cleanup
    }
}
