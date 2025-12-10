import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Toast } from '@/types'

export const useToastStore = defineStore('toast', () => {
    const toasts = ref<Toast[]>([])

    function addToast(message: string, type: Toast['type'] = 'info', duration = 4000) {
        const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        const toast: Toast = { id, message, type, duration }

        toasts.value.push(toast)

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id)
            }, duration)
        }

        return id
    }

    function removeToast(id: string) {
        const index = toasts.value.findIndex(t => t.id === id)
        if (index > -1) {
            toasts.value.splice(index, 1)
        }
    }

    function success(message: string, duration?: number) {
        return addToast(message, 'success', duration)
    }

    function error(message: string, duration?: number) {
        return addToast(message, 'error', duration)
    }

    function info(message: string, duration?: number) {
        return addToast(message, 'info', duration)
    }

    function warning(message: string, duration?: number) {
        return addToast(message, 'warning', duration)
    }

    return {
        toasts,
        addToast,
        removeToast,
        success,
        error,
        info,
        warning
    }
})
