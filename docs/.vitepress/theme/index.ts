// Custom theme extension for VitePress 2
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import DocumentationCard from './components/DocumentationCard.vue'
import DocumentationCardGrid from './components/DocumentationCardGrid.vue'
import DocumentationList from './components/DocumentationList.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Register custom components globally
    app.component('Card', DocumentationCard)
    app.component('CardGrid', DocumentationCardGrid)
    app.component('List', DocumentationList)
  },
} satisfies Theme
