import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import external from 'rollup-plugin-peer-deps-external'
import multi from '@rollup/plugin-multi-entry'

export default [
  {
    input: ['src/components/index.ts', 'src/hooks/index.ts', 'src/context/index.ts', 'src/utils/index.ts'],
    output: {
      dir: 'dist',
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      external(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
      multi()
    ]
  }
]
