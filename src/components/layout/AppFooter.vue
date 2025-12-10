<template>
  <footer class="footer">
    <!-- Main Footer -->
    <div class="footer__main">
      <div class="container">
        <div class="footer__grid">
          <!-- Brand Column -->
          <div class="footer__brand">
            <div class="footer__logo">
              <div class="logo__icon">
                <span>FCyT</span>
              </div>
              <div class="logo__text">
                <span class="logo__title">Facultad de Ciencias y Tecnología</span>
                <span class="logo__subtitle">Universidad Mayor de San Simón</span>
              </div>
            </div>
            <p class="footer__description">
              Formando profesionales de excelencia en ciencia y tecnología desde 1979.
            </p>
            
            <!-- Social Links -->
            <div class="footer__social">
              <a 
                href="https://www.facebook.com/FCyT.UMSS.bo" 
                target="_blank" 
                rel="noopener noreferrer"
                class="social-link"
                aria-label="Facebook de FCyT UMSS"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://wa.me/59144231765" 
                target="_blank" 
                rel="noopener noreferrer"
                class="social-link social-link--whatsapp"
                aria-label="WhatsApp de FCyT UMSS"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a 
                href="https://t.me/fcytumss" 
                target="_blank" 
                rel="noopener noreferrer"
                class="social-link social-link--telegram"
                aria-label="Telegram de FCyT UMSS"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="footer__links">
            <h4 class="footer__heading">Enlaces Rápidos</h4>
            <ul class="footer__list">
              <li><RouterLink to="/">Inicio</RouterLink></li>
              <li><RouterLink to="/institucional">Institucional</RouterLink></li>
              <li><RouterLink to="/horarios">Horarios</RouterLink></li>
              <li><RouterLink to="/admision">Admisión</RouterLink></li>
              <li><RouterLink to="/contacto">Contacto</RouterLink></li>
            </ul>
          </div>

          <!-- Academic Links -->
          <div class="footer__links">
            <h4 class="footer__heading">Académico</h4>
            <ul class="footer__list">
              <li><RouterLink to="/#calendar">Calendario Académico</RouterLink></li>
              <li><RouterLink to="/horarios">Horarios de Clases</RouterLink></li>
              <li><RouterLink to="/admision">Examen de Ingreso</RouterLink></li>
              <li><RouterLink to="/admision">Carreras</RouterLink></li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div class="footer__contact">
            <h4 class="footer__heading">Contacto</h4>
            <ul class="footer__list footer__list--contact">
              <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Calle Sucre y Parque la Torre, Cochabamba, Bolivia</span>
              </li>
              <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <a href="tel:+59144231765">+591 4 4231765</a>
              </li>
              <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <a href="mailto:fcyt@umss.edu.bo">fcyt@umss.edu.bo</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="footer__bottom">
      <div class="container">
        <div class="footer__bottom-content">
          <p class="footer__copyright">
            © {{ currentYear }} Universidad Mayor de San Simón | Fundada el 21 de septiembre de 1979
          </p>
          <p class="footer__made">
            Hecho con ❤️ para la comunidad FCyT
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background-color: var(--color-neutral-dark);
  color: #E5E7EB;
  margin-top: auto;
}

.footer__main {
  padding: var(--spacing-12) 0;
}

.footer__grid {
  display: grid;
  gap: var(--spacing-8);
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
}

@media (max-width: 1023px) {
  .footer__grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 639px) {
  .footer__grid {
    grid-template-columns: 1fr;
  }
}

/* Brand Section */
.footer__brand {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.footer__logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

.footer__logo .logo__icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
}

.footer__logo .logo__text {
  display: flex;
  flex-direction: column;
}

.footer__logo .logo__title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: white;
}

.footer__logo .logo__subtitle {
  font-size: var(--font-size-xs);
  color: #9CA3AF;
}

.footer__description {
  font-size: var(--font-size-sm);
  color: #9CA3AF;
  line-height: var(--line-height-relaxed);
  margin-bottom: 0;
  max-width: 300px;
}

/* Social Links */
.footer__social {
  display: flex;
  gap: var(--spacing-3);
}

.social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  color: white;
  transition: all var(--transition-fast);
}

.social-link:hover {
  transform: translateY(-2px);
  text-decoration: none;
}

.social-link:hover {
  background-color: #1877F2;
}

.social-link--whatsapp:hover {
  background-color: #25D366;
}

.social-link--telegram:hover {
  background-color: #0088CC;
}

/* Links Sections */
.footer__heading {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: white;
  margin-bottom: var(--spacing-4);
  position: relative;
  padding-bottom: var(--spacing-2);
}

.footer__heading::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background-color: var(--color-primary);
  border-radius: var(--radius-full);
}

.footer__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

.footer__list a {
  color: #9CA3AF;
  font-size: var(--font-size-sm);
  transition: color var(--transition-fast);
}

.footer__list a:hover {
  color: white;
  text-decoration: none;
}

/* Contact List */
.footer__list--contact li {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  color: #9CA3AF;
  font-size: var(--font-size-sm);
}

.footer__list--contact svg {
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--color-primary);
}

/* Bottom Bar */
.footer__bottom {
  padding: var(--spacing-4) 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer__bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-4);
}

@media (max-width: 639px) {
  .footer__bottom-content {
    flex-direction: column;
    text-align: center;
  }
}

.footer__copyright,
.footer__made {
  font-size: var(--font-size-sm);
  color: #6B7280;
  margin: 0;
}
</style>
