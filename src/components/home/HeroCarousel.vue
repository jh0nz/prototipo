<template>
  <section class="hero" aria-label="Noticias destacadas">
    <div class="container section-header">
      <div class="header-wrapper">
        <div>
          <h2 class="section-title">Últimas Noticias</h2>
          <p class="section-subtitle">Mantente informado sobre las novedades más recientes de la facultad</p>
        </div>
        <button @click="goToAllNews" class="btn-view-all" title="Ver todas las noticias" aria-label="Ver todas las noticias">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </button>
      </div>
    </div>
    <div class="carousel" role="region" aria-roledescription="carrusel" aria-label="Noticias principales">
      <!-- Carousel Track -->
      <div 
        class="carousel__track" 
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
          <article 
            v-for="(news, index) in newsItems" 
            :key="news.id"
            class="carousel__slide"
            :aria-hidden="index !== currentSlide"
            role="group"
            :aria-roledescription="`Slide ${index + 1} de ${newsItems.length}`"
            :aria-label="news.title"
          >
            <div class="news-card">
              <div class="news-card__image-wrapper">
                <img 
                  :src="news.image" 
                  :alt="`Imagen destacada de la noticia: ${news.title}`"
                  class="news-card__image"
                  loading="lazy"
                />
                <div class="news-card__overlay"></div>
              </div>
              <div class="news-card__content">
                <time class="news-card__date" :datetime="news.date">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {{ formatDate(news.date) }}
                </time>
                <h2 class="news-card__title">{{ news.title }}</h2>
                <p v-if="news.excerpt" class="news-card__excerpt">{{ news.excerpt }}</p>
                <button 
                  @click="goToNews(news)"
                  class="btn btn-primary btn-lg"
                >
                  {{ news.cta || 'Leer más' }}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </div>
            </div>
          </article>
        </div>

        <!-- Carousel Indicators -->
        <div class="carousel__indicators" role="tablist">
          <button 
            v-for="(news, index) in newsItems" 
            :key="index"
            class="carousel__indicator"
            :class="{ 'carousel__indicator--active': index === currentSlide }"
            @click="goToSlide(index)"
            role="tab"
            :aria-selected="index === currentSlide"
            :aria-label="`Ir a noticia ${index + 1}: ${news.title}`"
          >
            <span class="sr-only">Noticia {{ index + 1 }}</span>
          </button>
        </div>

        <!-- Progress Bar -->
        <div class="carousel__progress">
          <div 
            class="carousel__progress-bar"
            :style="{ width: `${progressWidth}%` }"
          ></div>
        </div>
      </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import type { NewsItem } from '@/types'
import noticiasData from '@/data/noticias.json'

const router = useRouter()

// Ordenar por fecha y tomar las 3 más recientes
const newsItems: NewsItem[] = (noticiasData as NewsItem[])
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3)

function goToNews(news: NewsItem) {
  router.push(`/noticias/${news.id}`)
}

function goToAllNews() {
  router.push('/noticias')
}

const currentSlide = ref(0)
const progressWidth = ref(0)
let animationFrame: ReturnType<typeof requestAnimationFrame> | null = null
let lastTime = 0
const SLIDE_DURATION = 5000

// Touch handling
let touchStartX = 0
let touchEndX = 0
const MIN_SWIPE_DISTANCE = 50

function startAutoplay() {
  stopAutoplay()
  lastTime = Date.now()
  animate()
}

function animate() {
  const now = Date.now()
  const elapsed = now - lastTime
  
  if (elapsed >= SLIDE_DURATION) {
    nextSlide()
    return 
  }
  
  progressWidth.value = (elapsed / SLIDE_DURATION) * 100
  animationFrame = requestAnimationFrame(animate)
}

function stopAutoplay() {
  if (animationFrame) cancelAnimationFrame(animationFrame)
}

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % newsItems.length
  resetTimer()
}

function prevSlide() {
  currentSlide.value = currentSlide.value === 0 
    ? newsItems.length - 1 
    : currentSlide.value - 1
  resetTimer()
}

function goToSlide(index: number) {
  currentSlide.value = index
  resetTimer()
}

function resetTimer() {
  stopAutoplay()
  progressWidth.value = 0
  setTimeout(() => {
    startAutoplay()
  }, 10)
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-BO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

function handleTouchStart(e: TouchEvent) {
  if (e.touches[0]) {
    touchStartX = e.touches[0].clientX
    stopAutoplay()
  }
}

function handleTouchMove(e: TouchEvent) {
  if (e.touches[0]) {
    touchEndX = e.touches[0].clientX
  }
}

function handleTouchEnd() {
  const swipeDistance = touchStartX - touchEndX
  
  if (Math.abs(swipeDistance) > MIN_SWIPE_DISTANCE) {
    if (swipeDistance > 0) {
      // Swipe left - next slide
      nextSlide()
    } else {
      // Swipe right - previous slide
      prevSlide()
    }
  } else {
    // No significant swipe, restart autoplay
    startAutoplay()
  }
  
  // Reset touch positions
  touchStartX = 0
  touchEndX = 0
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<style scoped>
.hero {
  height: 100%;
}

.section-header {
  padding-top: 48px;
  padding-bottom: 24px;
}

.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

@media (max-width: 767px) {
  .header-wrapper {
    align-items: flex-start;
    gap: 12px;
  }
}

.section-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--color-neutral-dark);
  margin: 0 0 8px 0;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #64748B;
  margin: 0;
  font-weight: 400;
}

.btn-view-all {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: white;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.btn-view-all:hover {
  background: var(--color-primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

.btn-view-all svg {
  transition: transform 0.2s;
}

.btn-view-all:hover svg {
  transform: scale(1.1);
}

.carousel {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
}

.carousel__track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}

.carousel__slide {
  flex: 0 0 100%;
  min-width: 100%;
}

/* News Card */
.news-card {
  position: relative;
  min-height: 380px;
  height: 380px;
  display: flex;
  align-items: flex-end;
  cursor: pointer;
  overflow: hidden;
}

@media (max-width: 767px) {
  .news-card {
    min-height: 400px;
    height: 400px;
  }
}

.news-card__image-wrapper {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.news-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: transform 0.5s ease;
}

.news-card:hover .news-card__image {
  transform: scale(1.03);
}

.news-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.75) 35%,
    rgba(0, 0, 0, 0.5) 70%,
    rgba(0, 0, 0, 0.3) 100%
  );
}

.news-card__content {
  position: relative;
  z-index: 1;
  padding: var(--spacing-8);
  color: white;
  max-width: 700px;
}

@media (max-width: 767px) {
  .news-card__content {
    padding: var(--spacing-6);
    padding-bottom: 70px;
  }
}

.news-card__date {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: var(--spacing-3);
}

.news-card__title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  margin-bottom: var(--spacing-4);
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

@media (min-width: 768px) {
  .news-card__title {
    font-size: var(--font-size-2xl);
  }
}

.news-card__excerpt {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.95);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-6);
  max-width: 550px;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
}

/* Carousel Controls */
.carousel__control {
  position: absolute;
  top: 35%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: var(--radius-full);
  color: var(--color-neutral-dark);
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.carousel__control:hover:not(:disabled) {
  background-color: white;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

.carousel__control:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.carousel__control--prev {
  left: var(--spacing-4);
}

.carousel__control--next {
  right: var(--spacing-4);
}

@media (max-width: 767px) {
  .carousel__control {
    width: 40px;
    height: 40px;
  }
  
  .carousel__control--prev {
    left: var(--spacing-2);
  }
  
  .carousel__control--next {
    right: var(--spacing-2);
  }
}

/* Carousel Indicators */
.carousel__indicators {
  position: absolute;
  bottom: var(--spacing-6);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: var(--spacing-2);
  z-index: 2;
}

.carousel__indicator {
  width: 12px;
  height: 12px;
  background-color: rgba(255, 255, 255, 0.4);
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.carousel__indicator:hover {
  background-color: rgba(255, 255, 255, 0.7);
}

.carousel__indicator--active {
  background-color: white;
  width: 32px;
}

/* Progress Bar */
.carousel__progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.2);
}

.carousel__progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  transition: width 0.05s linear;
}
</style>
