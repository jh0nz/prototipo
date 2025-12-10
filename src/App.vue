<template>
  <div id="app">
    <!-- Skip Link for Accessibility -->
    <a href="#main-content" class="skip-link">
      Saltar al contenido principal
    </a>
    
    <AppHeader />
    
    <!-- Breadcrumb Navigation -->
    <Breadcrumb />
    
    <main id="main-content">
      <RouterView v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    
    <AppFooter />
    
    <!-- Toast Notifications -->
    <Teleport to="body">
      <ToastContainer />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import ToastContainer from '@/components/ui/ToastContainer.vue'
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

/* Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
