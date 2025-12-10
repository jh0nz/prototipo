<template>
  <footer class="footer">
    <div class="footer__main">
      <div class="container">
        <div class="footer__grid">
          <!-- Brand / Logo -->
          <div class="footer__brand">
            <div class="footer__logo">
              <img src="@/assets/fcyt.png" alt="FCyT Logo" class="logo-image" />
            </div>
            <div class="footer__social">
              <a href="https://www.facebook.com/fcytumss.2025" target="_blank" class="social-link" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://wa.me/59144231765" target="_blank" class="social-link" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
              </a>
              <a href="https://t.me/fcytumss" target="_blank" class="social-link" aria-label="Telegram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              </a>
            </div>
            <p class="footer__tagline">Excelencia Académica desde 1979.</p>
          </div>

          <!-- Nav Links -->
          <div class="footer__links">
            <h4>Navegación</h4>
            <ul>
              <li><RouterLink to="/">Inicio</RouterLink></li>
              <li><RouterLink to="/institucional">Nosotros</RouterLink></li>
              <li><RouterLink to="/calendario">Calendario</RouterLink></li>
              <li><RouterLink to="/horarios">Horarios</RouterLink></li>
            </ul>
          </div>

          <!-- Academic Links -->
          <div class="footer__links">
            <h4>Académico</h4>
            <ul>
              <li><RouterLink to="/admision">Admisión</RouterLink></li>
              <li><a href="#">Carreras</a></li>
              <li><a href="#">Postgrado</a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div class="footer__links">
            <h4>Contacto</h4>
            <ul class="contact-list">
              <li>
                <span class="material-symbols-rounded icon-xs">location_on</span>
                <span>Calle Sucre y Parque la Torre</span>
              </li>
              <li>
                <span class="material-symbols-rounded icon-xs">call</span>
                <a href="tel:+59144231765">4 4231765</a>
              </li>
              <li>
                <span class="material-symbols-rounded icon-xs">mail</span>
                <a href="mailto:fcyt@umss.edu.bo">fcyt@umss.edu.bo</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom -->
    <div class="footer__bottom">
      <div class="container bottom-flex">
        <span>© {{ currentYear }} FCyT - UMSS</span>
        <span>Hecho con ❤️ en Bolivia</span>
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
  background-color: #1F2937; /* Darker gray background */
  color: #D1D5DB;
  font-size: 0.85rem;
  margin-top: auto;
}

.footer__main {
  padding: 24px 0; /* Minimal padding */
}

.footer__grid {
  display: grid;
  grid-template-columns: 1.5fr 0.8fr 0.8fr 1fr;
  gap: 24px;
}

@media (max-width: 768px) {
  .footer__grid { grid-template-columns: 1fr 1fr; gap: 32px 16px; }
  .footer__brand { grid-column: 1 / -1; display: flex; flex-direction: row; justify-content: space-between; align-items: center; }
}

@media (max-width: 600px) {
  .footer__brand { flex-direction: column; align-items: flex-start; }
}

/* Brand */
.footer__logo .logo-image {
  height: 48px; width: auto; object-fit: contain; margin-bottom: 8px; filter: brightness(0) invert(1); /* Make logo white if transparent PNG */
  opacity: 0.9;
}
/* If the logo has its own colors that look bad on dark bg, remove filter: brightness(0) invert(1); */

.footer__tagline { font-size: 0.75rem; color: #6B7280; margin: 4px 0 0 0; }

.footer__social { display: flex; gap: 8px; margin-top: 8px; }
.social-link {
  width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px; color: #9CA3AF; transition: 0.2s;
}
.social-link:hover { background: var(--color-primary); color: white; }

/* Links */
.footer__links h4 {
  font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px;
  color: #F3F4F6; margin-bottom: 12px; font-weight: bold;
}

.footer__links ul { list-style: none; display: flex; flex-direction: column; gap: 6px; }
.footer__links a { color: #9CA3AF; text-decoration: none; transition: 0.2s; }
.footer__links a:hover { color: white; }

.contact-list li { display: flex; align-items: center; gap: 8px; }
.icon-xs { font-size: 16px; color: #9CA3AF; }

/* Bottom */
.footer__bottom {
  background: #111827;
  padding: 12px 0;
  font-size: 0.75rem;
  color: #4B5563;
}
.bottom-flex { display: flex; justify-content: space-between; }
</style>
