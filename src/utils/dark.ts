import 'element-plus/theme-chalk/dark/css-vars.css'
import { useDark, useToggle } from '@vueuse/core'

export const dark = useDark()
export const toggleDark = useToggle(dark)
