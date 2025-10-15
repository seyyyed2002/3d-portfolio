<template>
  <div class="bg-white rounded-xl shadow-lg p-4 sm:p-6">
    <h3 class="text-lg sm:text-xl font-bold text-gray-800 arabic-text mb-4 text-center">
      تقویم خواندن
    </h3>
    
    <!-- Month Navigation -->
    <div class="flex items-center justify-between mb-4">
      <button 
        @click="previousMonth"
        class="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      
      <h4 class="text-sm sm:text-lg font-semibold text-gray-700 text-center">
        {{ currentMonthName }} {{ currentYear }}
      </h4>
      
      <button 
        @click="nextMonth"
        class="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>

    <!-- Calendar Grid -->
    <div class="grid grid-cols-7 gap-1 mb-2">
      <div v-for="day in weekDays" :key="day" class="text-center text-xs sm:text-sm font-medium text-gray-500 py-1 sm:py-2">
        {{ day }}
      </div>
    </div>

    <div class="grid grid-cols-7 gap-1">
      <div 
        v-for="day in calendarDays" 
        :key="day.date"
        class="relative aspect-square flex flex-col items-center justify-center text-xs sm:text-sm rounded-lg transition-colors cursor-pointer hover:bg-gray-100"
        :class="{
          'text-gray-400': !day.isCurrentMonth,
          'text-gray-900': day.isCurrentMonth,
          'bg-blue-100 text-blue-800': day.isToday,
          'bg-green-100 text-green-800': day.isToday && day.count > 0
        }"
        @click="selectDay(day)"
      >
        <span class="font-medium">{{ day.day }}</span>
        <span v-if="day.count > 0" class="text-xs font-bold text-green-600">
          {{ day.count }}
        </span>
      </div>
    </div>

    <!-- Selected Day Info -->
    <div v-if="selectedDay" class="mt-4 p-3 bg-gray-50 rounded-lg">
      <div class="text-center">
        <p class="text-sm text-gray-600">
          {{ selectedDay.day }} {{ currentMonthName }}
        </p>
        <p class="text-lg font-bold text-gray-800">
          {{ selectedDay.count }} بار خوانده شده
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { getMonthlyStats } from '../services/api'

export default {
  name: 'PrayerCalendar',
  props: {
    prayerName: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const currentDate = new Date()
    const currentYear = ref(currentDate.getFullYear())
    const currentMonth = ref(currentDate.getMonth())
    const selectedDay = ref(null)
    const monthlyStats = ref({})
    const loading = ref(false)

    const weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']
    const monthNames = [
      'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
      'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
    ]

    const currentMonthName = computed(() => monthNames[currentMonth.value])

    const calendarDays = computed(() => {
      const year = currentYear.value
      const month = currentMonth.value
      const today = new Date()
      
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      const startDate = new Date(firstDay)
      startDate.setDate(startDate.getDate() - firstDay.getDay())
      
      const days = []
      const currentDate = new Date(startDate)
      
      for (let i = 0; i < 42; i++) {
        const dayDate = currentDate.toISOString().split('T')[0]
        const isCurrentMonth = currentDate.getMonth() === month
        const isToday = currentDate.toDateString() === today.toDateString()
        const count = monthlyStats.value[dayDate] || 0
        
        days.push({
          day: currentDate.getDate(),
          date: dayDate,
          isCurrentMonth,
          isToday,
          count
        })
        
        currentDate.setDate(currentDate.getDate() + 1)
      }
      
      return days
    })

    const loadMonthlyStats = async () => {
      if (!props.isActive) return
      
      loading.value = true
      try {
        const year = currentYear.value
        const month = currentMonth.value + 1
        const stats = await getMonthlyStats(year, month, props.prayerName)
        
        const statsMap = {}
        stats.forEach(stat => {
          statsMap[stat.date] = stat.count
        })
        monthlyStats.value = statsMap
      } catch (error) {
        console.error('Error loading monthly stats:', error)
      } finally {
        loading.value = false
      }
    }

    const previousMonth = () => {
      if (currentMonth.value === 0) {
        currentMonth.value = 11
        currentYear.value--
      } else {
        currentMonth.value--
      }
    }

    const nextMonth = () => {
      if (currentMonth.value === 11) {
        currentMonth.value = 0
        currentYear.value++
      } else {
        currentMonth.value++
      }
    }

    const selectDay = (day) => {
      if (day.isCurrentMonth) {
        selectedDay.value = day
      }
    }

    watch([currentYear, currentMonth], loadMonthlyStats)
    watch(() => props.isActive, loadMonthlyStats)

    onMounted(() => {
      loadMonthlyStats()
    })

    return {
      currentYear,
      currentMonth,
      currentMonthName,
      weekDays,
      calendarDays,
      selectedDay,
      previousMonth,
      nextMonth,
      selectDay
    }
  }
}
</script>