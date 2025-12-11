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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.15 5.96C15.21 5.96 16.12 6.04 16.12 6.04V8.51H15.01C13.77 8.51 13.38 9.28 13.38 10.07V12.06H16.15L15.71 14.96H13.38V21.96C18.16 21.21 21.82 17.06 21.82 12.06C21.82 6.53 17.32 2.04 12 2.04Z"/></svg>
              </a>
              <a href="https://whatsapp.com/channel/0029Vae7Oov0wajtTjMSnj1v" target="_blank" class="social-link" aria-label="WhatsApp Canal">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z"/></svg>
              </a>
              <a href="https://t.me/fcyt_umss" target="_blank" class="social-link" aria-label="Telegram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65L10.06 14.42L17.74 7.5C18.08 7.19 17.67 7.04 17.22 7.31L7.74 13.3L3.64 12C2.76 11.75 2.75 11.14 3.84 10.7L19.81 4.54C20.54 4.21 21.24 4.72 20.96 5.84L18.24 18.65C18.05 19.56 17.5 19.78 16.74 19.36L12.6 16.3L10.61 18.23C10.38 18.46 10.19 18.65 9.78 18.65Z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@fac..ciencias.y.te" target="_blank" class="social-link" aria-label="TikTok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.82C15.1 6.5 13.5 6.9 11.8 7.3V13.6C11.8 16.8 9.2 19.4 6 19.4C2.8 19.4 0.2 16.8 0.2 13.6C0.2 10.4 2.8 7.8 6 7.8C6.6 7.8 7.2 7.9 7.8 8V10.6C7.2 10.5 6.6 10.4 6 10.4C4.2 10.4 2.8 11.8 2.8 13.6C2.8 15.4 4.2 16.8 6 16.8C7.8 16.8 9.2 15.4 9.2 13.6V2H11.8C11.8 4.1 13.5 5.8 15.6 5.8V8.4C16.6 8.4 17.6 8.3 18.6 8.1V5.5C17.9 5.6 17.3 5.7 16.6 5.8Z"/></svg>
              </a>
            </div>
            <p class="footer__tagline">Excelencia Académica desde 1979.</p>
          </div>

          <!-- Nav Links -->
          <div class="footer__links">
            <h4>Navegación</h4>
            <ul>
              <li><RouterLink to="/">Inicio</RouterLink></li>
              <li><RouterLink to="/nosotros">Nosotros</RouterLink></li>
              <li><RouterLink to="/noticias">Noticias</RouterLink></li>
              <li><RouterLink to="/calendario">Calendario</RouterLink></li>
              <li><RouterLink to="/horarios">Horarios</RouterLink></li>
              <li><RouterLink to="/contacto">Contacto</RouterLink></li>
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
