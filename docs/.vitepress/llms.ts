import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import type { SiteConfig } from 'vitepress'

// Writes the files that let a language model read this documentation: `llms.txt` (an index that
// links to a plain Markdown copy of every page) and `llms-full.txt` (all pages in one file). Both
// are generated from the sidebar and the Markdown sources on every docs build, so they cannot
// drift from the documentation.

interface SidebarItem {
  text?: string
  link?: string
  items?: SidebarItem[]
}

interface Page {
  section: string
  title: string
  description: string
  path: string
  body: string
}

function parseFrontmatter(source: string): { data: Record<string, string>, body: string } {
  if (!source.startsWith('---'))
    return { data: {}, body: source }
  const close = source.indexOf('\n---', 3)
  if (close === -1)
    return { data: {}, body: source }
  const data: Record<string, string> = {}
  for (const line of source.slice(3, close).split('\n')) {
    const colon = line.indexOf(':')
    if (colon > 0)
      data[line.slice(0, colon).trim()] = line.slice(colon + 1).trim().replace(/^['"]|['"]$/g, '')
  }
  const lineEnd = source.indexOf('\n', close + 1)
  return { data, body: lineEnd === -1 ? '' : source.slice(lineEnd + 1) }
}

// Page-layout components that mean nothing as text (the "Next Steps" card grids).
function stripLayoutMarkup(body: string): string {
  let text = body
  for (;;) {
    const start = text.indexOf('<CardGrid>')
    const end = start === -1 ? -1 : text.indexOf('</CardGrid>', start)
    if (end === -1)
      break
    text = text.slice(0, start) + text.slice(end + '</CardGrid>'.length)
  }
  return text.trimEnd()
}

function pageFor(srcDir: string, section: string, item: SidebarItem): Page | undefined {
  const link = item.link
  if (!link || /^https?:/.test(link))
    return undefined
  const path = link.endsWith('/') ? `${link}index` : link
  const file = join(srcDir, `${path}.md`)
  if (!existsSync(file))
    return undefined
  const { data, body } = parseFrontmatter(readFileSync(file, 'utf8'))
  const title = item.text ?? data.title ?? path
  const text = stripLayoutMarkup(body)
  return {
    section,
    title,
    description: data.description ?? '',
    path: path.replace(/^\//, ''),
    // Some pages open with a `##` heading; every page needs a title of its own once the pages share a file.
    body: text.trimStart().startsWith('# ') ? text : `# ${title}\n\n${text}`,
  }
}

function collectPages(srcDir: string, sidebar: SidebarItem[]): Page[] {
  return sidebar.flatMap(group =>
    (group.items ?? []).flatMap((item) => {
      const page = pageFor(srcDir, group.text ?? '', item)
      return page ? [page] : []
    }),
  )
}

export function writeLlmsFiles(config: SiteConfig, siteUrl: string, title: string, summary: string): void {
  const sidebar = (config.site.themeConfig.sidebar ?? []) as SidebarItem[]
  const pages = collectPages(config.srcDir, sidebar)
  const base = siteUrl.replace(/\/$/, '')

  // A plain Markdown copy of each page, so the links in llms.txt resolve to something readable.
  for (const page of pages) {
    const target = join(config.outDir, `${page.path}.md`)
    mkdirSync(dirname(target), { recursive: true })
    writeFileSync(target, `${page.body}\n`)
  }

  const index: string[] = [`# ${title}`, '', `> ${summary}`, '']
  let section = ''
  for (const page of pages) {
    if (page.section !== section) {
      if (section)
        index.push('')
      section = page.section
      index.push(`## ${section}`, '')
    }
    index.push(`- [${page.title}](${base}/${page.path}.md)${page.description ? `: ${page.description}` : ''}`)
  }
  index.push('', '## Optional', '', `- [All pages in one file](${base}/llms-full.txt)`, '')
  writeFileSync(join(config.outDir, 'llms.txt'), index.join('\n'))

  const full = [`# ${title}`, '', `> ${summary}`, '']
  for (const page of pages)
    full.push('---', '', `<!-- ${base}/${page.path}.md -->`, '', page.body, '')
  writeFileSync(join(config.outDir, 'llms-full.txt'), full.join('\n'))
}
