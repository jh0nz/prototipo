<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <div class="header__container container">
      <!-- Logo -->
      <RouterLink to="/" class="header__logo" aria-label="FCyT UMSS - Ir al inicio">
        <div class="logo">
          <div class="logo__icon">
            <img src="@/assets/fcyt.png" alt="Facultad de Ciencias y Tecnología - UMSS" class="logo__image" />
          </div>
        </div>
      </RouterLink>

      <!-- Desktop Navigation -->
      <nav class="header__nav hide-mobile" aria-label="Navegación principal">
        <ul class="nav-list">
          <li v-for="item in navItems" :key="item.path" class="nav-item">
            <RouterLink 
              :to="item.path" 
              class="nav-link"
              :class="{ 'nav-link--active': isActive(item.path) }"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <!-- Actions -->
      <div class="header__actions">
        <!-- Search Button -->
        <button 
          class="btn btn-icon" 
          @click="openSearch"
          aria-label="Buscar"
        >
          <span class="material-symbols-rounded">search</span>
        </button>

        <!-- Mobile Menu Button -->
        <button 
          class="btn btn-icon hide-desktop" 
          @click="toggleMobileMenu"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Menú de navegación"
        >
          <span v-if="!isMobileMenuOpen" class="material-symbols-rounded">menu</span>
          <span v-else class="material-symbols-rounded">close</span>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Overlay -->
    <Transition name="slide">
      <div v-if="isMobileMenuOpen" class="mobile-menu hide-desktop">
        <nav aria-label="Navegación móvil">
          <ul class="mobile-nav-list">
            <li v-for="item in navItems" :key="item.path">
              <RouterLink 
                :to="item.path" 
                class="mobile-nav-link"
                :class="{ 'mobile-nav-link--active': isActive(item.path) }"
                @click="closeMobileMenu"
              >
                <span class="material-symbols-rounded mobile-nav-icon">{{ item.icon }}</span>
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </Transition>

    <!-- Search Modal -->
    <SearchModal />
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSearchStore } from '@/stores/search'
import SearchModal from '@/components/search/SearchModal.vue'

const route = useRoute()
const searchStore = useSearchStore()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navItems = [
  { label: 'Inicio', path: '/', icon: 'home' },
  { label: 'Nosotros', path: '/institucional', icon: 'account_balance' },
  { label: 'Calendario', path: '/calendario', icon: 'calendar_month' },
  { label: 'Horarios', path: '/horarios', icon: 'schedule' },
  { label: 'Admisión', path: '/admision', icon: 'edit_document' },
  { label: 'Contacto', path: '/contacto', icon: 'mail' }
]

function isActive(path: string) {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

function openSearch() {
  searchStore.open()
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background-color: var(--color-surface);
  border-bottom: 1px solid transparent;
  transition: all var(--transition-normal);
}

.header--scrolled {
  box-shadow: var(--shadow-md);
  border-bottom-color: var(--color-neutral-light);
}

.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  gap: var(--spacing-5);
}

/* Logo Styles */
.header__logo {
  text-decoration: none;
  color: inherit;
}

.header__logo:hover {
  text-decoration: none;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

.logo__icon {
  width: auto;
  height: 52px; /* Aumentado para mejor visibilidad dentro del header de 64px */
  display: flex;
  align-items: center;
}

.logo__image {
  height: 100%;
  width: auto;
  object-fit: contain;
  max-width: 240px; /* Límite de ancho para no ocupar todo el header */
}

/* En mobile, reducir un poco si es necesario */
@media (max-width: 767px) {
  .logo__image {
    max-width: 200px;
  }
}

.logo__text {
  display: flex;
  flex-direction: column;
}

.logo__title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-dark);
  line-height: 1.2;
}

.logo__subtitle {
  font-size: var(--font-size-xs);
  color: var(--color-secondary);
  font-weight: var(--font-weight-medium);
}

/* Desktop Navigation */
.header__nav {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-list {
  display: flex;
  list-style: none;
  gap: var(--spacing-1);
}

.nav-link {
  display: block;
  padding: var(--spacing-2) var(--spacing-4);
  color: var(--color-neutral-dark);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  position: relative;
}

.nav-link:hover {
  color: var(--color-primary);
  background-color: var(--color-primary-light);
  text-decoration: none;
}

.nav-link--active {
  color: var(--color-primary);
  background-color: var(--color-primary-light);
}

.nav-link--active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 3px;
  background-color: var(--color-primary);
  border-radius: var(--radius-full);
}

/* Header Actions */
.header__actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-surface);
  z-index: var(--z-fixed);
  padding: var(--spacing-6);
  overflow-y: auto;
}

.mobile-nav-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  padding: var(--spacing-4) var(--spacing-4);
  color: var(--color-neutral-dark);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);
}

.mobile-nav-link:hover,
.mobile-nav-link--active {
  color: var(--color-primary);
  background-color: var(--color-primary-light);
  text-decoration: none;
}

.mobile-nav-icon {
  font-size: var(--font-size-xl);
}

/* Slide Transition */
.slide-enter-active,
.slide-leave-active {
  transition: all var(--transition-normal);
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
