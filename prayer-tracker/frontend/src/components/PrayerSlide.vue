<template>
  <div class="p-4 sm:p-6 lg:p-8">
    <!-- Header -->
    <div class="text-center mb-6 sm:mb-8">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 arabic-text mb-4">{{ slide.title }}</h2>
    </div>

    <!-- Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      <!-- Prayer Text -->
      <div class="lg:col-span-2">
        <div class="bg-gray-50 rounded-xl p-4 sm:p-6 max-h-80 sm:max-h-96 overflow-y-auto">
          <div class="arabic-text text-gray-700 leading-relaxed text-sm sm:text-base">
            {{ slide.text }}
          </div>
        </div>
        
        <!-- Read Button -->
        <div class="mt-4 sm:mt-6 text-center">
          <button
            @click="markAsRead"
            :disabled="isRead"
            class="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-bold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100"
            :class="isRead 
              ? 'bg-green-500 text-white cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'"
          >
            <div class="flex items-center justify-center space-x-2 sm:space-x-3">
              <span v-if="isRead">✅</span>
              <span v-else>📖</span>
              <span>{{ isRead ? 'خواندم' : 'خواندم ✅' }}</span>
            </div>
          </button>
          
          <!-- Counter -->
          <div v-if="todayCount > 0" class="mt-4">
            <div class="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="font-semibold">{{ todayCount }} نفر امروز خوانده‌اند</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Calendar -->
      <div class="lg:col-span-1">
        <PrayerCalendar 
          :prayer-name="slide.prayerName"
          :is-active="isActive"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import PrayerCalendar from './PrayerCalendar.vue'
import { markAsReadAPI, getTodayStats } from '../services/api'

export default {
  name: 'PrayerSlide',
  components: {
    PrayerCalendar
  },
  props: {
    slide: {
      type: Object,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const isRead = ref(false)
    const todayCount = ref(0)
    const loading = ref(false)

    const markAsRead = async () => {
      if (isRead.value || loading.value) return
      
      loading.value = true
      try {
        const today = new Date().toISOString().split('T')[0]
        await markAsReadAPI(props.slide.prayerName, today)
        isRead.value = true
        await loadTodayStats()
      } catch (error) {
        console.error('Error marking as read:', error)
        alert('خطا در ثبت خواندن. لطفاً دوباره تلاش کنید.')
      } finally {
        loading.value = false
      }
    }

    const loadTodayStats = async () => {
      try {
        const stats = await getTodayStats()
        todayCount.value = stats[props.slide.prayerName] || 0
      } catch (error) {
        console.error('Error loading today stats:', error)
      }
    }

    onMounted(() => {
      loadTodayStats()
    })

    return {
      isRead,
      todayCount,
      loading,
      markAsRead
    }
  }
}
</script>