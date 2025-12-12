<template>
  <div class="news-view">
    <header class="page-header">
      <div class="container header-content">
        <div class="header-text">
          <h1 class="page-header__title">Noticias</h1>
          <p class="page-header__subtitle">
            Mantente informado sobre las últimas novedades de la Facultad de Ciencias y Tecnología
          </p>
        </div>
      </div>
    </header>

    <section class="section container">
      <SkeletonGrid v-if="loading" variant="news" :count="6" :has-image="true" :lines="2" />
      <div v-else class="news-grid">
        <article 
          v-for="news in filteredNews" 
          :key="news.id"
          class="news-card"
          @click="goToNews(news.id)"
        >
          <div class="news-card__image">
            <img :src="news.image" :alt="`Imagen de la noticia: ${news.title}`" loading="lazy" />
            <div class="news-card__date">
              <span class="mdi mdi-calendar"></span>
              {{ formatDate(news.date) }}
            </div>
          </div>
          <div class="news-card__content">
            <h3 class="news-card__title">{{ news.title }}</h3>
            <p class="news-card__excerpt">{{ news.excerpt }}</p>
            <div class="news-card__footer">
              <span class="read-more">
                Leer más
                <span class="mdi mdi-arrow-right"></span>
              </span>
            </div>
          </div>
        </article>
      </div>

      <div v-if="filteredNews.length === 0" class="empty-state">
        <span class="mdi mdi-newspaper-variant-outline empty-icon"></span>
        <p>No se encontraron noticias</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import noticiasData from '@/data/noticias.json'
import SkeletonGrid from '@/components/ui/SkeletonGrid.vue'
import type { NewsItem } from '@/types'

document.title = 'Noticias - FCyT UMSS'

const router = useRouter()
const loading = ref(true)

onMounted(() => {
  // Simulate loading delay for images
  setTimeout(() => { loading.value = false }, 600)
})

const filteredNews = computed(() => {
  const news = noticiasData as NewsItem[]
  return news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

function goToNews(id: number) {
  router.push(`/noticias/${id}`)
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-BO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>

<style scoped>
.news-view { min-height: 100vh; background: #F8FAFC; }

.page-header {
  background: linear-gradient(135deg, var(--color-primary) 0%, #002D7A 100%);
  color: white;
  padding: 48px 20px;
  margin-bottom: 48px;
}

.header-content {
  max-width: 1200px;
  text-align: left;
}

.page-header__title { 
  font-size: 2.5rem; 
  font-weight: 700; 
  margin-bottom: 12px; 
  color: white; 
}

.page-header__subtitle {
  font-size: 1.1rem;
  opacity: 0.95;
  line-height: 1.6;
  color: white;
  margin: 0;
}

@media (max-width: 768px) {
  .page-header {
    padding: 32px 20px;
    margin-bottom: 32px;
  }
  
  .page-header__title {
    font-size: 1.75rem;
  }
  
  .page-header__subtitle {
    font-size: 0.95rem;
  }
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 28px;
}

@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .news-card:active {
    transform: scale(0.98);
  }
}

.news-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 61, 165, 0.12);
}

.news-card:active {
  transform: translateY(-2px);
  transition: all 0.1s ease;
}

.news-card__image {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.news-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.news-card:hover .news-card__image img {
  transform: scale(1.05);
}

.news-card__date {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.95);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-primary);
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.news-card__content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.news-card__title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-neutral-dark);
  margin: 0 0 12px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-card__excerpt {
  font-size: 0.95rem;
  color: #64748B;
  line-height: 1.6;
  margin: 0 0 20px 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .news-card__title {
    font-size: 1.1rem;
  }
  
  .news-card__excerpt {
    font-size: 0.9rem;
  }
}

.news-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F1F5F9;
}

.read-more {
  color: var(--color-primary);
  font-weight: 600;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: gap 0.2s ease;
}

.news-card:hover .read-more {
  gap: 10px;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: #94A3B8;
}

.empty-icon {
  font-size: 64px;
  opacity: 0.4;
  display: block;
  margin-bottom: 16px;
}

.empty-state p {
  font-size: 1.1rem;
  margin: 0;
}

@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
}
</style>
