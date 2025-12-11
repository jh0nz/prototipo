<template>
  <section class="hero" aria-label="Noticias destacadas">
    <div class="carousel" role="region" aria-roledescription="carrusel" aria-label="Noticias principales">
      <!-- Carousel Track -->
      <div 
        class="carousel__track" 
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
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
                  :alt="news.title"
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
                  @click="openNewsModal(news)"
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

        <!-- Carousel Controls -->
        <button 
          class="carousel__control carousel__control--prev"
          @click="prevSlide"
          aria-label="Noticia anterior"
          :disabled="currentSlide === 0"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <button 
          class="carousel__control carousel__control--next"
          @click="nextSlide"
          aria-label="Siguiente noticia"
          :disabled="currentSlide === newsItems.length - 1"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>

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

    <!-- News Modal (Blog Reader) -->
    <Teleport to="body">
      <Transition name="fade">
        <div 
          v-if="selectedNews" 
          class="news-modal-overlay"
          @click="closeNewsModal"
        >
          <div class="news-reader" @click.stop>
            <button 
              class="news-reader__close"
              @click="closeNewsModal"
              aria-label="Cerrar noticia"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            
            <div class="news-reader__scroll-content">
              <div class="news-reader__image-wrapper">
                <img :src="selectedNews.image" :alt="selectedNews.title" />
              </div>

              <div class="news-reader__header">
                <span class="news-reader__date">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {{ formatDate(selectedNews.date) }}
                </span>
                <h2 class="news-reader__title">{{ selectedNews.title }}</h2>
              </div>

              <div class="news-reader__content">
                <div class="news-body" v-html="selectedNews.content"></div>
                
                <div class="news-reader__footer" v-if="selectedNews.ctaLink && selectedNews.ctaLink !== '#'">
                  <a 
                    :href="selectedNews.ctaLink"
                    class="btn btn-outline"
                    target="_blank"
                  >
                    Abrir enlace externo
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { NewsItem } from '@/types'
import noticiasData from '@/data/noticias.json'

const newsItems: NewsItem[] = noticiasData as NewsItem[]
const selectedNews = ref<NewsItem | null>(null)

function openNewsModal(news: NewsItem) {
  selectedNews.value = news
  document.body.style.overflow = 'hidden'
  stopAutoplay()
}

function closeNewsModal() {
  selectedNews.value = null
  document.body.style.overflow = ''
  startAutoplay()
}

const currentSlide = ref(0)
const progressWidth = ref(0)
let animationFrame: ReturnType<typeof requestAnimationFrame> | null = null
let lastTime = 0
const SLIDE_DURATION = 5000 

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
  display: flex;
  align-items: flex-end;
}

@media (max-width: 767px) {
  .news-card {
    min-height: 350px;
  }
}

.news-card__image-wrapper {
  position: absolute;
  inset: 0;
}

.news-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(15, 23, 42, 0.95) 0%,
    rgba(15, 23, 42, 0.7) 40%,
    rgba(15, 23, 42, 0.2) 100%
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
}

@media (min-width: 768px) {
  .news-card__title {
    font-size: var(--font-size-2xl);
  }
}

.news-card__excerpt {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-6);
  max-width: 550px;
}

/* Carousel Controls */
.carousel__control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: var(--radius-full);
  color: var(--color-neutral-dark);
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-md);
  z-index: 2;
}

.carousel__control:hover:not(:disabled) {
  background-color: white;
  transform: translateY(-50%) scale(1.1);
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

/* News Modal Overlay */
.news-modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: var(--spacing-4);
}

/* News Reader Card */
.news-reader {
  background-color: white;
  width: 100%;
  max-width: 800px;
  height: 90vh;
  border-radius: var(--radius-lg);
  overflow: hidden;
  position: relative;
  box-shadow: var(--shadow-2xl);
  display: flex;
  flex-direction: column;
}

.news-reader__image-wrapper {
  position: relative;
  height: 300px;
  width: 100%;
  background-color: #f1f5f9;
}

.news-reader__image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-reader__close {
  position: absolute;
  top: var(--spacing-4);
  right: var(--spacing-4);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: none;
  color: var(--color-neutral-dark);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  z-index: 10;
}

.news-reader__close:hover {
  transform: scale(1.1);
  background: #f8fafc;
}

.news-reader__scroll-content {
  overflow-y: auto;
  flex: 1;
}

.news-reader__header {
  padding: var(--spacing-8);
  padding-bottom: var(--spacing-4);
}

.news-reader__date {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  color: var(--color-secondary);
  font-weight: 600;
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.news-reader__title {
  font-size: 2rem;
  line-height: 1.2;
  color: var(--color-neutral-dark);
  margin: 0;
  font-weight: 800;
}

.news-reader__content {
  padding: 0 var(--spacing-8) var(--spacing-8) var(--spacing-8);
}

.news-body {
  color: var(--color-neutral-dark);
  line-height: 1.8;
  font-size: 1.1rem;
}

/* Minimalist Content Styling */
.news-body :deep(h2) {
  font-size: 1.5rem;
  color: var(--color-primary);
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.news-body :deep(h3) {
  font-size: 1.25rem;
  color: var(--color-neutral-dark);
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.news-body :deep(p) {
  margin-bottom: 1.5rem;
  color: #475569;
}

.news-body :deep(ul),
.news-body :deep(ol) {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
  color: #475569;
}

.news-body :deep(li) {
  margin-bottom: 0.5rem;
}

.news-body :deep(blockquote) {
  border-left: 4px solid var(--color-accent);
  margin: 1.5rem 0;
  padding-left: 1rem;
  font-style: italic;
  color: var(--color-secondary);
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 0 8px 8px 0;
}

.news-reader__footer {
  margin-top: var(--spacing-8);
  padding-top: var(--spacing-6);
  border-top: 1px solid var(--color-neutral-light);
}

.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid var(--color-neutral-light);
  border-radius: var(--radius-md);
  color: var(--color-secondary);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.btn-outline:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: #f8fafc;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .news-reader {
    height: 100vh;
    border-radius: 0;
  }
  
  .news-reader__image-wrapper {
    height: 250px;
  }
  
  .news-reader__header {
    padding: var(--spacing-5);
    padding-bottom: var(--spacing-2);
  }
  
  .news-reader__title {
    font-size: 1.5rem;
  }
  
  .news-reader__content {
    padding: var(--spacing-5);
  }
  
  .news-reader__close {
    top: var(--spacing-4);
    right: var(--spacing-4);
  }
}
</style>
