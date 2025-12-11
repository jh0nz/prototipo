<template>
  <div class="news-detail-view">
    <!-- Header with Breadcrumb Style -->
    <header class="page-header">
      <div class="container">
        <h1 class="page-header__title">Noticias</h1>
        <div class="breadcrumb">
          <router-link to="/" class="breadcrumb-item">Inicio</router-link>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">{{ currentNews?.title || 'Detalle' }}</span>
        </div>
      </div>
    </header>

    <div class="container section">
      <div v-if="currentNews" class="news-content-wrapper">
        <article class="news-article">
          <div class="news-article__header">
            <h1 class="news-title">{{ currentNews.title }}</h1>
            <div class="news-meta">
              <span class="news-date">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                {{ formatDate(currentNews.date) }}
              </span>
              <div class="news-tags" v-if="currentNews.tags">
                <span v-for="tag in currentNews.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
            <img :src="currentNews.image" :alt="currentNews.title" class="news-hero-image" />
          </div>

          <div class="news-body" v-html="currentNews.content || `<p>${currentNews.excerpt}</p>`"></div>

          <div class="news-footer" v-if="currentNews.ctaLink && currentNews.ctaLink !== '#'">
            <a :href="currentNews.ctaLink" class="btn btn-primary" target="_blank">
              {{ currentNews.cta || 'Más Información' }}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 4px;">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </article>

        <aside class="news-sidebar">
          <h3>Otras Noticias</h3>
          <div class="related-news">
             <div v-for="item in relatedNews" :key="item.id" class="related-card" @click="goToNews(item.id)">
               <img :src="item.image" :alt="item.title" class="related-image" />
               <div class="related-info">
                 <span class="related-date">{{ formatDate(item.date) }}</span>
                 <h4 class="related-title">{{ item.title }}</h4>
               </div>
             </div>
          </div>
        </aside>
      </div>

      <div v-else class="loading-state">
        <p>Cargando noticia...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import noticiasData from '@/data/noticias.json'
import type { NewsItem } from '@/types'

const route = useRoute()
const router = useRouter()
const currentNews = ref<NewsItem | null>(null)

const relatedNews = computed(() => {
  return (noticiasData as NewsItem[])
    .filter(n => n.id !== currentNews.value?.id)
    .slice(0, 3)
})

function loadNews() {
  const id = Number(route.params.id)
  const found = noticiasData.find((n: any) => n.id === id)
  if (found) {
    currentNews.value = found as NewsItem
  } else {
    // Redirect or show error, for now just stay
  }
}

function GoToNews(id: number) {
  router.push(`/noticias/${id}`)
}
// Fix GoToNews casing
const goToNews = GoToNews

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-BO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

onMounted(() => {
  loadNews()
  window.scrollTo(0, 0)
})

watch(() => route.params.id, () => {
  loadNews()
  window.scrollTo(0, 0)
})
</script>

<style scoped>
.page-header {
  background: linear-gradient(135deg, var(--color-primary) 0%, #002D7A 100%);
  color: white;
  padding: 40px 0;
  margin-bottom: 40px;
}

.page-header__title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  opacity: 0.9;
}

.breadcrumb-item {
  color: white;
  text-decoration: none;
}

.breadcrumb-item:hover {
  text-decoration: underline;
}

.news-content-wrapper {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 40px;
}

@media (max-width: 900px) {
  .news-content-wrapper {
    grid-template-columns: 1fr;
  }
}

.news-article {
  background: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.news-article__header {
  margin-bottom: 2rem;
}

.news-title {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  color: var(--color-neutral-dark);
  margin-bottom: 1rem;
}

.news-meta {
  display: flex;
  align-items: center;
  gap: 20px;
  color: var(--color-secondary);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}

.news-date {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
}

.news-hero-image {
  width: 100%;
  height: auto;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  margin-bottom: 2rem;
}

.news-body {
  color: var(--color-neutral-dark);
  line-height: 1.8;
  font-size: 1.1rem;
}

.news-body :deep(h2) {
  font-size: 1.8rem;
  color: var(--color-primary);
  margin-top: 2.5rem;
  margin-bottom: 1.2rem;
  font-weight: 700;
}

.news-body :deep(h3) {
  font-size: 1.4rem;
  color: #334155;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.news-body :deep(p) {
  margin-bottom: 1.5rem;
  color: #475569;
}

.news-body :deep(ul) {
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
  list-style-type: disc;
}

.news-body :deep(li) {
  margin-bottom: 0.5rem;
}

.news-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-neutral-light);
}

/* Sidebar */
.news-sidebar h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--color-primary);
  display: inline-block;
}

.related-card {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  cursor: pointer;
  group: hover;
}

.related-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.related-info {
  flex: 1;
}

.related-date {
  font-size: 0.8rem;
  color: var(--color-secondary);
  display: block;
  margin-bottom: 4px;
}

.related-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.4;
  color: var(--color-neutral-dark);
  transition: color 0.2s;
}

.related-card:hover .related-title {
  color: var(--color-primary);
}
</style>
