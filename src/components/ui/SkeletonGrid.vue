<template>
  <div class="skeleton-grid" :class="`skeleton-grid--${variant}`">
    <SkeletonCard 
      v-for="n in count" 
      :key="n"
      :variant="cardVariant"
      :has-image="hasImage"
      :title="title"
      :subtitle="subtitle"
      :lines="lines"
    />
  </div>
</template>

<script setup lang="ts">
import SkeletonCard from './SkeletonCard.vue'

interface Props {
  count?: number
  variant?: 'news' | 'stats' | 'careers' | 'calendar'
  cardVariant?: 'card' | 'list' | 'stat' | 'carousel'
  hasImage?: boolean
  title?: boolean
  subtitle?: boolean
  lines?: number
}

withDefaults(defineProps<Props>(), {
  count: 3,
  variant: 'news',
  cardVariant: 'card',
  hasImage: true,
  title: true,
  subtitle: false,
  lines: 2
})
</script>

<style scoped>
.skeleton-grid {
  display: grid;
  gap: var(--spacing-6);
}

.skeleton-grid--news {
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: var(--spacing-6);
}

.skeleton-grid--stats {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-4);
}

.skeleton-grid--careers {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-4);
}

.skeleton-grid--calendar {
  grid-template-columns: repeat(7, 1fr);
  gap: var(--spacing-2);
}

@media (max-width: 768px) {
  .skeleton-grid--news {
    grid-template-columns: 1fr;
  }
  
  .skeleton-grid--stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .skeleton-grid--careers {
    grid-template-columns: 1fr;
  }
}
</style>
