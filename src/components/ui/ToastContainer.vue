<template>
  <TransitionGroup 
    name="toast" 
    tag="div" 
    class="toast-container"
    aria-live="polite"
    aria-label="Notificaciones"
  >
    <div 
      v-for="toast in toasts" 
      :key="toast.id" 
      class="toast"
      :class="`toast--${toast.type}`"
      role="alert"
    >
      <div class="toast__icon">
        <svg v-if="toast.type === 'success'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        <svg v-else-if="toast.type === 'error'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
        <svg v-else-if="toast.type === 'warning'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
      </div>
      <p class="toast__message">{{ toast.message }}</p>
      <button 
        class="toast__close" 
        @click="removeToast(toast.id)"
        aria-label="Cerrar notificación"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()
const { toasts } = storeToRefs(toastStore)
const { removeToast } = toastStore
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: var(--spacing-6);
  right: var(--spacing-6);
  z-index: var(--z-tooltip);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  max-width: 400px;
  width: calc(100% - var(--spacing-12));
}

@media (max-width: 639px) {
  .toast-container {
    left: var(--spacing-4);
    right: var(--spacing-4);
    bottom: var(--spacing-4);
    width: auto;
  }
}

.toast {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-4);
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  border-left: 4px solid;
}

.toast--success {
  border-left-color: var(--color-success);
}

.toast--success .toast__icon {
  color: var(--color-success);
}

.toast--error {
  border-left-color: var(--color-error);
}

.toast--error .toast__icon {
  color: var(--color-error);
}

.toast--warning {
  border-left-color: var(--color-warning);
}

.toast--warning .toast__icon {
  color: #946D00;
}

.toast--info {
  border-left-color: var(--color-info);
}

.toast--info .toast__icon {
  color: var(--color-info);
}

.toast__icon {
  flex-shrink: 0;
}

.toast__message {
  flex: 1;
  font-size: var(--font-size-sm);
  color: var(--color-neutral-dark);
  margin: 0;
}

.toast__close {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: #6B7280;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.toast__close:hover {
  background-color: var(--color-neutral-light);
  color: var(--color-neutral-dark);
}

/* Toast Transitions */
.toast-enter-active,
.toast-leave-active {
  transition: all var(--transition-normal);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform var(--transition-normal);
}
</style>
