const modules = import.meta.glob('./*.{png,jpg}', { eager: true, import: 'default' }) as Record<string, string>

const imgMap: Record<string, string> = {}
for (const path in modules) {
  const filename = path.split('/').pop()
  if (filename) imgMap[filename] = modules[path]
}

export function getImg(filename: string): string {
  return imgMap[filename] ?? ''
}
