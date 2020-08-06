import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
// eslint-disable-next-line import/extensions
import pkg from './package.json';


export default {
  input: './src/index.ts',
  output: [
    {file: pkg.module, format: 'es'},
    {
      file: pkg.module.replace(/.js$/, '.min.js'),
      format: 'es',
      plugins: [terser()],
    },
    {file: pkg.browser, format: 'umd', name: 'thirtyFiveUp'},
  ],
  external: Object.keys(pkg.dependencies || {}),
  plugins: [
    commonjs(),
    nodeResolve({browser: true}),
    typescript(),
  ],
};
