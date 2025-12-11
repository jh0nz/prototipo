<template>
  <div class="skeleton-card" :class="variantClass">
    <div v-if="hasImage" class="skeleton-image"></div>
    <div class="skeleton-content">
      <div v-if="title" class="skeleton-title" :style="{ width: titleWidth }"></div>
      <div v-if="subtitle" class="skeleton-subtitle" :style="{ width: subtitleWidth }"></div>
      <div v-if="lines > 0" class="skeleton-lines">
        <div v-for="n in lines" :key="n" class="skeleton-line"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'card' | 'list' | 'stat' | 'carousel'
  hasImage?: boolean
  title?: boolean
  subtitle?: boolean
  lines?: number
  titleWidth?: string
  subtitleWidth?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'card',
  hasImage: false,
  title: true,
  subtitle: false,
  lines: 2,
  titleWidth: '70%',
  subtitleWidth: '50%'
})

const variantClass = computed(() => `skeleton-card--${props.variant}`)
</script>

<style scoped>
.skeleton-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.skeleton-card--card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.skeleton-card--list {
  display: flex;
  gap: var(--spacing-4);
  padding: var(--spacing-4);
}

.skeleton-card--stat {
  padding: var(--spacing-6);
  text-align: center;
}

.skeleton-card--carousel {
  height: 400px;
  position: relative;
}

.skeleton-image {
  width: 100%;
  height: 200px;
  background-color: #E2E8F0;
  position: relative;
  overflow: hidden;
}

.skeleton-image::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  animation: shimmer 2s infinite;
}

.skeleton-card--carousel .skeleton-image {
  height: 100%;
}

.skeleton-content {
  padding: var(--spacing-4);
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

.skeleton-card--stat .skeleton-content {
  padding: 0;
  align-items: center;
}

.skeleton-title,
.skeleton-subtitle,
.skeleton-line {
  height: 16px;
  background-color: #E2E8F0;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.skeleton-title::after,
.skeleton-subtitle::after,
.skeleton-line::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  animation: shimmer 2s infinite;
}

.skeleton-title {
  height: 20px;
}

.skeleton-subtitle {
  height: 14px;
}

.skeleton-lines {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  margin-top: var(--spacing-2);
}

.skeleton-line:nth-child(2) {
  width: 85%;
}

.skeleton-line:nth-child(3) {
  width: 60%;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .skeleton-image {
    height: 150px;
  }
  
  .skeleton-card--carousel .skeleton-image {
    height: 100%;
  }
}
</style>
