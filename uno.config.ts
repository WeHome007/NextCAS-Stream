// uno.config.ts
import path from 'node:path'
import { defineConfig, presetIcons, presetUno } from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetIcons({
      collections: {
        assets: FileSystemIconLoader(path.resolve(__dirname, './src/assets/icons')),
      },
      customizations: {
        transform(svg, collection, _icon: string) {
          // do not apply fill to this icons on this collection
          if (collection === 'assets')
            return cleanSvgFill(svg)
          return svg
        },
      },
    }),
    presetUno(),
  ],
  shortcuts: {
    'flex-center': ' items-center justify-center flex ',
  },
})

function cleanSvgFill(svg: string) {
  return svg.replace(/#fff/g, 'currentColor').replace(/white/g, 'currentColor')
}
