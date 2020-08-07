import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
// eslint-disable-next-line import/extensions
import pkg from './package.json';


export default [{
  input: './src/index.ts',
  output: [
    {file: pkg.module, format: 'es'},
    {
      file: pkg.module.replace(/.js$/, '.min.js'),
      format: 'es',
      plugins: [terser()],
    },
    {file: pkg.browser, format: 'umd', name: 'thirtyFiveUp'},
    {
      file: pkg.browser.replace(/.js$/, '.min.js'),
      format: 'umd',
      name: 'thirtyFiveUp',
      plugins: [terser()],
    },
  ],
  external: Object.keys(pkg.dependencies || {}),
  plugins: [
    commonjs(),
    nodeResolve({browser: true}),
    typescript(),
  ],
},
{
  input: './src/index.ts',
  output: [
    {file: 'build/35up-js-sdk.js', format: 'iife', name: 'thirtyFiveUp'},
  ],
  plugins: [
    commonjs(),
    nodeResolve({browser: true}),
    typescript(),
    terser(),
  ],
}];
