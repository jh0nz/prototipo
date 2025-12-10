<template>
  <div class="contact-page">
    <!-- Breadcrumb -->
    <nav class="breadcrumb container" aria-label="Ubicación">
      <RouterLink to="/" class="breadcrumb__link">Inicio</RouterLink>
      <span class="breadcrumb__separator">/</span>
      <span class="breadcrumb__current">Contacto</span>
    </nav>

    <!-- Page Header -->
    <header class="page-header">
      <div class="container">
        <h1 class="page-header__title">Contáctanos</h1>
        <p class="page-header__subtitle">
          Estamos aquí para ayudarte. Comunícate con nosotros por cualquier medio.
        </p>
      </div>
    </header>

    <!-- Contact Info Section -->
    <section class="contact-info section">
      <div class="container">
        <div class="contact-grid">
          <!-- Contact Cards -->
          <div class="contact-cards">
            <a 
              href="https://wa.me/59144231765" 
              target="_blank"
              class="contact-card contact-card--whatsapp"
            >
              <div class="contact-card__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
              </div>
              <div class="contact-card__content">
                <h3>WhatsApp</h3>
                <p>+591 4 4231765</p>
                <span class="contact-card__cta">Enviar mensaje →</span>
              </div>
            </a>

            <a 
              href="mailto:fcyt@umss.edu.bo" 
              class="contact-card contact-card--email"
            >
              <div class="contact-card__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div class="contact-card__content">
                <h3>Correo Electrónico</h3>
                <p>fcyt@umss.edu.bo</p>
                <span class="contact-card__cta">Enviar correo →</span>
              </div>
            </a>

            <a 
              href="tel:+59144231765" 
              class="contact-card contact-card--phone"
            >
              <div class="contact-card__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div class="contact-card__content">
                <h3>Teléfono</h3>
                <p>+591 4 4231765</p>
                <span class="contact-card__cta">Llamar ahora →</span>
              </div>
            </a>

            <a 
              href="https://www.facebook.com/FCyT.UMSS.bo" 
              target="_blank"
              class="contact-card contact-card--facebook"
            >
              <div class="contact-card__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div class="contact-card__content">
                <h3>Facebook</h3>
                <p>@FCyT.UMSS.bo</p>
                <span class="contact-card__cta">Ver página →</span>
              </div>
            </a>
          </div>

          <!-- Map and Address -->
          <div class="location-info">
            <div class="location-card">
              <div class="location-card__header">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <h3>Nuestra Ubicación</h3>
              </div>
              <address class="location-card__address">
                <strong>Facultad de Ciencias y Tecnología</strong><br>
                Universidad Mayor de San Simón<br>
                Calle Sucre y Parque la Torre<br>
                Cochabamba, Bolivia
              </address>
              <a 
                href="https://www.google.com/maps/place/Facultad+de+Ciencias+y+Tecnolog%C3%ADa+-+UMSS/@-17.3937,-66.1478,17z" 
                target="_blank"
                class="btn btn-secondary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                </svg>
                Abrir en Google Maps
              </a>
            </div>

            <!-- Map Embed (Placeholder) -->
            <div class="map-container">
              <div class="map-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <p>Campus FCyT - UMSS</p>
                <span>Calle Sucre y Parque la Torre, Cochabamba</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Office Hours Section -->
    <section class="hours section">
      <div class="container">
        <h2 class="section-title">Horarios de Atención</h2>
        
        <div class="hours-grid">
          <div class="hours-card">
            <div class="hours-card__icon">🏛️</div>
            <h3 class="hours-card__title">Oficinas Administrativas</h3>
            <ul class="hours-card__list">
              <li>
                <span>Lunes a Viernes</span>
                <span>08:30 - 12:30 / 14:30 - 18:30</span>
              </li>
              <li>
                <span>Sábados</span>
                <span>09:00 - 12:00</span>
              </li>
            </ul>
          </div>

          <div class="hours-card">
            <div class="hours-card__icon">📚</div>
            <h3 class="hours-card__title">Dirección Académica</h3>
            <ul class="hours-card__list">
              <li>
                <span>Lunes a Viernes</span>
                <span>09:00 - 12:00 / 15:00 - 18:00</span>
              </li>
            </ul>
          </div>

          <div class="hours-card">
            <div class="hours-card__icon">📝</div>
            <h3 class="hours-card__title">Admisiones</h3>
            <ul class="hours-card__list">
              <li>
                <span>Lunes a Viernes</span>
                <span>08:30 - 12:30 / 14:30 - 18:30</span>
              </li>
              <li>
                <span>Período de Inscripción</span>
                <span>Horario extendido disponible</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section class="form-section section">
      <div class="container">
        <h2 class="section-title">Envíanos un Mensaje</h2>
        
        <form class="contact-form" @submit.prevent="handleSubmit">
          <div class="form-row">
            <div class="form-group">
              <label for="name">Nombre Completo *</label>
              <input 
                type="text" 
                id="name" 
                v-model="form.name"
                class="input"
                placeholder="Tu nombre"
                required
              />
            </div>
            <div class="form-group">
              <label for="email">Correo Electrónico *</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email"
                class="input"
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="subject">Asunto *</label>
            <select id="subject" v-model="form.subject" class="input" required>
              <option value="">Selecciona un asunto</option>
              <option value="admissions">Información de Admisión</option>
              <option value="schedules">Horarios y Clases</option>
              <option value="certificates">Trámites y Certificados</option>
              <option value="academic">Consulta Académica</option>
              <option value="other">Otro</option>
            </select>
          </div>

          <div class="form-group">
            <label for="message">Mensaje *</label>
            <textarea 
              id="message" 
              v-model="form.message"
              class="input textarea"
              placeholder="Escribe tu mensaje aquí..."
              rows="5"
              required
            ></textarea>
          </div>

          <button type="submit" class="btn btn-primary btn-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            Enviar Mensaje
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToastStore } from '@/stores/toast'

document.title = 'Contacto - FCyT UMSS'

const toastStore = useToastStore()

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

function handleSubmit() {
  // Simulate form submission
  toastStore.success('¡Mensaje enviado correctamente! Te responderemos pronto.')
  
  // Reset form
  form.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
}
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding-top: var(--spacing-6);
  padding-bottom: var(--spacing-4);
  font-size: var(--font-size-sm);
}

.breadcrumb__link {
  color: var(--color-secondary);
}

.breadcrumb__separator {
  color: #9CA3AF;
}

.breadcrumb__current {
  color: #6B7280;
}

/* Page Header */
.page-header {
  padding: var(--spacing-8) 0 var(--spacing-12);
  background: linear-gradient(135deg, var(--color-secondary) 0%, #002D7A 100%);
  color: white;
  margin-bottom: var(--spacing-8);
}

.page-header__title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-3);
  color: white;
}

.page-header__subtitle {
  font-size: var(--font-size-lg);
  opacity: 0.9;
  max-width: 600px;
  margin: 0;
}

/* Contact Info Section */
.contact-info {
  background-color: var(--color-surface);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-10);
}

@media (max-width: 1023px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

.contact-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-4);
}

@media (max-width: 639px) {
  .contact-cards {
    grid-template-columns: 1fr;
  }
}

.contact-card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  padding: var(--spacing-6);
  background-color: var(--color-surface-variant);
  border: 2px solid transparent;
  border-radius: var(--radius-xl);
  text-decoration: none;
  transition: all var(--transition-normal);
}

.contact-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
  text-decoration: none;
}

.contact-card--whatsapp { color: #25D366; }
.contact-card--whatsapp:hover { border-color: #25D366; }

.contact-card--email { color: var(--color-secondary); }
.contact-card--email:hover { border-color: var(--color-secondary); }

.contact-card--phone { color: var(--color-primary); }
.contact-card--phone:hover { border-color: var(--color-primary); }

.contact-card--facebook { color: #1877F2; }
.contact-card--facebook:hover { border-color: #1877F2; }

.contact-card__icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: currentColor;
  border-radius: var(--radius-lg);
}

.contact-card__icon svg {
  color: white;
}

.contact-card__content h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-dark);
  margin-bottom: var(--spacing-1);
}

.contact-card__content p {
  font-size: var(--font-size-sm);
  color: #6B7280;
  margin: 0;
}

.contact-card__cta {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: currentColor;
  margin-top: auto;
}

/* Location Info */
.location-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.location-card {
  background-color: var(--color-surface-variant);
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
}

.location-card__header {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-4);
  color: var(--color-secondary);
}

.location-card__header h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-dark);
  margin: 0;
}

.location-card__address {
  font-style: normal;
  font-size: var(--font-size-sm);
  color: #6B7280;
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-6);
}

.location-card__address strong {
  color: var(--color-neutral-dark);
}

.map-container {
  flex: 1;
  min-height: 250px;
}

.map-placeholder {
  width: 100%;
  height: 100%;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-secondary-light) 0%, var(--color-surface-variant) 100%);
  border-radius: var(--radius-xl);
  border: 2px dashed var(--color-secondary);
  color: var(--color-secondary);
  text-align: center;
  padding: var(--spacing-6);
}

.map-placeholder svg {
  margin-bottom: var(--spacing-4);
  opacity: 0.6;
}

.map-placeholder p {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-2);
}

.map-placeholder span {
  font-size: var(--font-size-sm);
  opacity: 0.8;
}

/* Hours Section */
.hours {
  background-color: var(--color-surface-variant);
}

.hours-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-6);
}

@media (max-width: 1023px) {
  .hours-grid {
    grid-template-columns: 1fr;
  }
}

.hours-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-sm);
}

.hours-card__icon {
  font-size: 2rem;
  margin-bottom: var(--spacing-4);
}

.hours-card__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-dark);
  margin-bottom: var(--spacing-4);
}

.hours-card__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

.hours-card__list li {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-4);
  padding: var(--spacing-3);
  background-color: var(--color-surface-variant);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
}

.hours-card__list li span:first-child {
  color: var(--color-neutral-dark);
  font-weight: var(--font-weight-medium);
}

.hours-card__list li span:last-child {
  color: var(--color-secondary);
  font-weight: var(--font-weight-semibold);
}

/* Form Section */
.form-section {
  background-color: var(--color-surface);
}

.contact-form {
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-6);
}

@media (max-width: 639px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.form-group label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-neutral-dark);
}

.textarea {
  resize: vertical;
  min-height: 120px;
}

select.input {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 40px;
  cursor: pointer;
}
</style>
