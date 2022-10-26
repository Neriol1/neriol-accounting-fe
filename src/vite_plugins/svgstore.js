/* eslint-disable */
import path from 'path'
import fs from 'fs'
import store from 'svgstore'
import { optimize } from 'svgo'

export const svgstore = (options = {}) => {
  const inputFolder = options.inputFolder || 'src/assets/icons'
  return {
    name: 'svgstore', // 必须的，将会在 warning 和 error 中显示
    resolveId(id) {
      if (id === '@svgstore') {
        return 'svg_bundle.js'
      }
    },
    load(id) {
      if (id === 'svg_bundle.js') {
        const sprite = store(options)
        const iconsDir = path.resolve(inputFolder)
        for (const file of fs.readdirSync(iconsDir)) {
          const filepath = path.join(iconsDir, file)
          const filename = path.parse(file).name
          let code = fs.readFileSync(filepath, { encoding: 'utf-8' })
          sprite.add(filename, code)
        }
        const spriteToString = sprite.toString({ inline: options.inline })
        const { data: code } = optimize(spriteToString, {
          plugins: [
            'cleanupAttrs',
            'removeDoctype',
            'removeComments',
            'removeTitle',
            'removeEmptyAttrs',
            'removeDesc',
            { name: 'removeAttrs', params: { attrs: 'data-name|data-xxx' } },
          ],
        })

        return `
            const div = document.createElement('div')
            div.innerHTML = \`${code}\`
            const svg = div.getElementsByTagName('svg')[0]
            if(svg){
                svg.style.position = 'absolute'
                svg.style.width = 0
                svg.style.height = 0
                svg.style.overflow = 'hidden'
                svg.setAttribute('aria-hidden', 'true')
            }
            document.addEventListener('DOMContentLoaded', () => {
                if(document.firstChild){
                    document.body.insertBefore(svg, document.body.firstChild)
                }else{
                    document.body.appendChild(svg)
                }
            })
        `
      }
    },
  }
}
