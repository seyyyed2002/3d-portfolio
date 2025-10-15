<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 class="text-3xl font-bold text-center text-gray-800 arabic-text">
          پیگیری خواندن دعاها و سوره‌ها
        </h1>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PrayerGallery />
    </main>
  </div>
</template>

<script>
import PrayerGallery from './components/PrayerGallery.vue'

export default {
  name: 'App',
  components: {
    PrayerGallery
  }
}
</script>