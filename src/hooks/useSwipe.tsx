import { computed, onMounted, onUnmounted, ref, Ref } from 'vue'

type Point = { x: number; y: number }

interface Options {
  beforeStart?: (e: TouchEvent | undefined) => void
  afterStart?: (e: TouchEvent | undefined) => void
  beforeMove?: (e: TouchEvent | undefined) => void
  afterMove?: (e: TouchEvent | undefined) => void
  beforeEnd?: (e: TouchEvent | undefined) => void
  afterEnd?: (e: TouchEvent | undefined) => void
}

export const useSwipe = (element: Ref<HTMLElement | null>, options: Options = {}) => {
  const start = ref<Point | null>(null)
  const end = ref<Point | null>(null)
  const swiping = ref(false)
  const distance = computed(() => {
    if (!start.value || !end.value) {
      return null
    }
    return {
      x: end.value.x - start.value.x,
      y: end.value.y - start.value.y,
    }
  })
  const direction = computed(() => {
    if (!distance.value) return ''
    const { x, y } = distance.value
    if (Math.abs(x) > Math.abs(y)) {
      return x > 0 ? 'right' : 'left'
    } else {
      return y > 0 ? 'down' : 'up'
    }
  })

  const onStart = (e: TouchEvent) => {
    options?.beforeStart?.(e)
    swiping.value = true
    end.value = start.value = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    options?.afterStart?.(e)
  }

  const onMove = (e: TouchEvent) => {
    options?.beforeMove?.(e)
    end.value = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    options?.afterMove?.(e)
  }

  const onEnd = (e: TouchEvent) => {
    options?.beforeEnd?.(e)
    swiping.value = false
    options?.afterEnd?.(e)
  }

  onMounted(() => {
    if (!element.value) return
    element.value.addEventListener('touchstart', onStart)
    element.value.addEventListener('touchmove', onMove)
    element.value.addEventListener('touchend', onEnd)
  })

  onUnmounted(() => {
    if (!element.value) return
    element.value.removeEventListener('touchstart', onStart)
    element.value.removeEventListener('touchmove', onMove)
    element.value.removeEventListener('touchend', onEnd)
  })

  return {
    swiping,
    distance,
    direction,
    start,
    end,
  }
}
