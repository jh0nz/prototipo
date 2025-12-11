<template>
  <div class="contact-page">
    <!-- Page Header -->
    <header class="page-header">
      <div class="container">
        <div class="header-content">
          <h1 class="page-header__title">Contacto</h1>
          <p class="page-header__subtitle">
            Estamos a tu disposición para resolver tus dudas.
          </p>
        </div>
      </div>
    </header>

    <div class="container">
      <div class="contact-layout">
        
        <!-- Contact Info Sidebar -->
        <div class="info-column">
          <div class="info-card">
            <h3 class="info-title">Información</h3>
            
            <ul class="contact-list">
              <li class="contact-item">
                <span class="material-symbols-rounded icon">location_on</span>
                <div>
                  <strong>Dirección</strong>
                  <p>Calle Sucre y Parque la Torre<br>Cochabamba, Bolivia</p>
                </div>
              </li>

              <li class="contact-item">
                <span class="material-symbols-rounded icon">call</span>
                <div>
                  <strong>Teléfono</strong>
                  <p><a href="tel:+59144231765">+591 4 4231765</a></p>
                </div>
              </li>

              <li class="contact-item">
                <span class="material-symbols-rounded icon">mail</span>
                <div>
                  <strong>Correo Electrónico</strong>
                  <p><a href="mailto:fcyt@umss.edu.bo">fcyt@umss.edu.bo</a></p>
                </div>
              </li>

              <li class="contact-item">
                <span class="material-symbols-rounded icon">schedule</span>
                <div>
                  <strong>Horario de Atención</strong>
                  <p>Lun - Vie: 08:30 - 18:30<br>Sáb: 09:00 - 12:00</p>
                </div>
              </li>
            </ul>

            <div class="social-links">
               <a href="https://www.facebook.com/fcytumss.2025" target="_blank" class="social-btn" aria-label="Facebook">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.15 5.96C15.21 5.96 16.12 6.04 16.12 6.04V8.51H15.01C13.77 8.51 13.38 9.28 13.38 10.07V12.06H16.15L15.71 14.96H13.38V21.96C18.16 21.21 21.82 17.06 21.82 12.06C21.82 6.53 17.32 2.04 12 2.04Z"/></svg>
               </a>
               <a href="https://whatsapp.com/channel/0029Vae7Oov0wajtTjMSnj1v" target="_blank" class="social-btn" aria-label="WhatsApp Canal">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
               </a>
               <a href="https://t.me/fcyt_umss" target="_blank" class="social-btn" aria-label="Telegram">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65L10.06 14.42L17.74 7.5C18.08 7.19 17.67 7.04 17.22 7.31L7.74 13.3L3.64 12C2.76 11.75 2.75 11.14 3.84 10.7L19.81 4.54C20.54 4.21 21.24 4.72 20.96 5.84L18.24 18.65C18.05 19.56 17.5 19.78 16.74 19.36L12.6 16.3L10.61 18.23C10.38 18.46 10.19 18.65 9.78 18.65Z"/></svg>
               </a>
               <a href="https://www.tiktok.com/@fac..ciencias.y.te" target="_blank" class="social-btn" aria-label="TikTok">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.82C15.1 6.5 13.5 6.9 11.8 7.3V13.6C11.8 16.8 9.2 19.4 6 19.4C2.8 19.4 0.2 16.8 0.2 13.6C0.2 10.4 2.8 7.8 6 7.8C6.6 7.8 7.2 7.9 7.8 8V10.6C7.2 10.5 6.6 10.4 6 10.4C4.2 10.4 2.8 11.8 2.8 13.6C2.8 15.4 4.2 16.8 6 16.8C7.8 16.8 9.2 15.4 9.2 13.6V2H11.8C11.8 4.1 13.5 5.8 15.6 5.8V8.4C16.6 8.4 17.6 8.3 18.6 8.1V5.5C17.9 5.6 17.3 5.7 16.6 5.8Z"/></svg>
               </a>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="form-column">
          <div class="form-card">
            <h3 class="form-title">Envíanos un mensaje</h3>
            <form @submit.prevent="handleSubmit" class="minimal-form">
              <div class="form-grid">
                 <div class="form-group">
                   <label>Nombre</label>
                   <input type="text" v-model="form.name" required placeholder="Tu nombre" />
                 </div>
                 <div class="form-group">
                   <label>Email</label>
                   <input type="email" v-model="form.email" required placeholder="tu@email.com" />
                 </div>
              </div>
              <div class="form-group">
                <label>Asunto</label>
                <select v-model="form.subject" required>
                  <option value="" disabled selected>Selecciona un asunto</option>
                  <option value="admision">Admisiones</option>
                  <option value="academico">Académico</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div class="form-group">
                <label>Mensaje</label>
                <textarea v-model="form.message" rows="4" required placeholder="¿En qué podemos ayudarte?"></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-block">Enviar Mensaje</button>
            </form>
          </div>
        </div>

      </div>
    </div>

    <!-- Map Iframe -->
    <div class="map-section">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951.8741348398492!2d-66.1456162!3d-17.3938633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e373fef33857cf%3A0x676cd0a74a6599f2!2sFacultad%20de%20Ciencias%20y%20Tecnolog%C3%ADa!5e0!3m2!1ses!2sbo!4v1710000000000!5m2!1ses!2sbo" 
        width="100%" 
        height="450" 
        style="border:0;" 
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToastStore } from '@/stores/toast'
import { usePageSections } from '@/composables/usePageSections'

document.title = 'Contacto - FCyT UMSS'
usePageSections()

const toastStore = useToastStore()
const form = ref({ name: '', email: '', subject: '', message: '' })

function handleSubmit() {
  toastStore.success('Mensaje enviado. Nos pondremos en contacto pronto.')
  form.value = { name: '', email: '', subject: '', message: '' }
}
</script>

<style scoped>
.contact-page { min-height: 100vh; background: #F9FAFB; }

.page-header {
  background: linear-gradient(135deg, var(--color-primary) 0%, #002D7A 100%);
  color: white; 
  padding: 40px 0;
  margin-bottom: 40px;
  min-height: 220px;
  display: flex;
  align-items: center;
}
.header-content { text-align: left; }
.page-header__title { font-size: 2rem; font-weight: bold; margin-bottom: 8px; color: white; }
.page-header__subtitle { font-size: 1rem; opacity: 0.9; }

.contact-layout {
  display: flex;
  flex-direction: row;
  gap: 40px;
  margin-top: 40px;
  margin-bottom: 60px;
}

.info-column { flex: 1; max-width: 400px; }
.form-column { flex: 2; }

@media (max-width: 900px) {
  .contact-layout { flex-direction: column; }
  .info-column { max-width: 100%; }
}

/* Cards */
.info-card, .form-card {
  background: white; padding: 32px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}

.info-title, .form-title { font-size: 1.25rem; font-weight: bold; margin-bottom: 24px; color: #1F2937; }

/* Contact List */
.contact-list { list-style: none; display: flex; flex-direction: column; gap: 24px; padding: 0; }
.contact-item { display: flex; gap: 16px; align-items: flex-start; }
.contact-item .icon { 
  background: #EFF6FF; color: var(--color-primary); 
  padding: 10px; border-radius: 10px; font-size: 20px; 
}
.contact-item strong { display: block; font-size: 0.85rem; color: #6B7280; margin-bottom: 2px; }
.contact-item p { margin: 0; color: #1F2937; font-size: 0.95rem; font-weight: 500; }
.contact-item a { text-decoration: none; color: inherit; }
.contact-item a:hover { color: var(--color-primary); }

/* Social */
.social-links { display: flex; gap: 12px; margin-top: 32px; padding-top: 24px; border-top: 1px solid #E5E7EB; }
.social-btn {
  width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
  background: #F3F4F6; border-radius: 10px; color: #4B5563; transition: 0.2s;
}
.social-btn:hover { background: var(--color-primary); color: white; transform: translateY(-2px); }

/* Form */
.minimal-form { display: flex; flex-direction: column; gap: 20px; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
@media (max-width: 600px) { .form-grid { grid-template-columns: 1fr; } }

.form-group label { display: block; font-size: 0.85rem; font-weight: 600; color: #374151; margin-bottom: 6px; }
.form-group input, .form-group select, .form-group textarea {
  width: 100%; padding: 10px 14px; border: 1px solid #D1D5DB; border-radius: 8px;
  font-size: 0.95rem; background: #F9FAFB; transition: 0.2s;
}
.form-group input:focus, .form-group select:focus, .form-group textarea:focus {
  background: white; border-color: var(--color-primary); outline: none; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.btn-block { width: 100%; padding: 12px; font-weight: 600; border-radius: 8px; }

/* Map */
.map-section { margin-top: 40px; line-height: 0; }
iframe { width: 100%; height: 400px; }
</style>
