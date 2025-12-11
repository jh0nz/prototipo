<template>
  <div class="news-detail-view">
    <header class="page-header">
      <div class="container">
        <div class="breadcrumb">
          <router-link to="/" class="breadcrumb-item">
            <span class="mdi mdi-home"></span>
            Inicio
          </router-link>
          <span class="breadcrumb-separator">/</span>
          <router-link to="/noticias" class="breadcrumb-item">Noticias</router-link>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">{{ currentNews?.id || '...' }}</span>
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
  padding: 24px 20px;
  margin-bottom: 40px;
}

@media (max-width: 768px) {
  .page-header {
    padding: 20px;
    margin-bottom: 28px;
  }
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  font-weight: 500;
  flex-wrap: wrap;
}

@media (max-width: 480px) {
  .breadcrumb {
    font-size: 0.85rem;
    gap: 8px;
  }
}

.breadcrumb-item {
  color: white;
  text-decoration: none;
  opacity: 0.9;
  transition: opacity 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.breadcrumb-item:hover {
  opacity: 1;
}

.breadcrumb-separator {
  opacity: 0.6;
}

.breadcrumb-current {
  opacity: 1;
  font-weight: 600;
}

.news-content-wrapper {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 48px;
  align-items: start;
}

@media (max-width: 1024px) {
  .news-content-wrapper {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

@media (max-width: 768px) {
  .news-content-wrapper {
    gap: 32px;
  }
}

.news-article {
  background: white;
  border-radius: 16px;
  padding: 48px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

@media (max-width: 1024px) {
  .news-article {
    padding: 36px;
  }
}

@media (max-width: 768px) {
  .news-article {
    padding: 24px;
    border-radius: 12px;
  }
}

@media (max-width: 480px) {
  .news-article {
    padding: 16px;
  }
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

@media (max-width: 768px) {
  .news-title {
    font-size: 1.75rem;
  }
}

@media (max-width: 480px) {
  .news-title {
    font-size: 1.5rem;
  }
}

.news-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  color: var(--color-secondary);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 480px) {
  .news-meta {
    gap: 10px;
    font-size: 0.9rem;
    margin-bottom: 1.25rem;
  }
}

.news-date {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
}

@media (max-width: 480px) {
  .news-date {
    font-size: 0.85rem;
  }
}

.news-hero-image {
  width: 100%;
  height: auto;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  margin-bottom: 2rem;
  max-height: 500px;
  object-fit: cover;
}

@media (max-width: 768px) {
  .news-hero-image {
    border-radius: 12px;
    margin-bottom: 1.5rem;
    max-height: 300px;
  }
}

.news-body {
  color: var(--color-neutral-dark);
  line-height: 1.8;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .news-body {
    font-size: 1rem;
    line-height: 1.7;
  }
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

@media (max-width: 768px) {
  .news-body :deep(h2) {
    font-size: 1.5rem;
    margin-top: 2rem;
  }
  
  .news-body :deep(h3) {
    font-size: 1.2rem;
    margin-top: 1.5rem;
  }
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

.news-body :deep(a) {
  color: var(--color-primary);
  text-decoration: underline;
}

.news-body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1.5rem 0;
}

.news-footer {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid #E2E8F0;
}

@media (max-width: 480px) {
  .news-footer {
    margin-top: 2rem;
    padding-top: 1.5rem;
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

@media (max-width: 480px) {
  .btn {
    padding: 10px 20px;
    font-size: 0.95rem;
    width: 100%;
    justify-content: center;
  }
}

.btn-primary {
  background: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background: #002D7A;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 61, 165, 0.3);
}

.news-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

@media (max-width: 480px) {
  .news-tags {
    gap: 6px;
  }
}

.tag {
  display: inline-block;
  padding: 4px 12px;
  background: #F1F5F9;
  color: #475569;
  border-radius: 16px;
  font-size: 0.85rem;
  font-weight: 500;
}

@media (max-width: 480px) {
  .tag {
    padding: 3px 10px;
    font-size: 0.8rem;
  }
}

.news-sidebar {
  position: sticky;
  top: 24px;
}

@media (max-width: 1024px) {
  .news-sidebar {
    position: static;
    background: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
}

@media (max-width: 768px) {
  .news-sidebar {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .news-sidebar {
    padding: 16px;
  }
}

.news-sidebar h3 {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--color-neutral-dark);
}

@media (max-width: 480px) {
  .news-sidebar h3 {
    font-size: 1rem;
    margin-bottom: 16px;
  }
}

.related-news {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (max-width: 480px) {
  .related-news {
    gap: 12px;
  }
}

.related-card {
  display: flex;
  gap: 14px;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: white;
  border: 1px solid #F1F5F9;
}

@media (max-width: 480px) {
  .related-card {
    gap: 10px;
    padding: 10px;
    border-radius: 10px;
  }
}

.related-card:hover {
  background: #F8FAFC;
  border-color: #E2E8F0;
  transform: translateX(4px);
}

.related-image {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
}

@media (max-width: 480px) {
  .related-image {
    width: 70px;
    height: 70px;
    border-radius: 8px;
  }
}

.related-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.related-date {
  font-size: 0.75rem;
  color: #94A3B8;
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
}

@media (max-width: 480px) {
  .related-date {
    font-size: 0.7rem;
    margin-bottom: 4px;
  }
}

.related-title {
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.4;
  color: var(--color-neutral-dark);
  transition: color 0.2s;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 480px) {
  .related-title {
    font-size: 0.85rem;
    -webkit-line-clamp: 2;
  }
}

.related-card:hover .related-title {
  color: var(--color-primary);
}

.loading-state {
  text-align: center;
  padding: 60px 20px;
  color: #94A3B8;
  font-size: 1.1rem;
}
</style>
