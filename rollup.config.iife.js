import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
// eslint-disable-next-line import/extensions
import pkg from './package.json';


export default {
  input: './src/index.ts',
  output: [
    {file: pkg.main, format: 'iife', name: 'thirtyFiveUp'},
  ],
  plugins: [
    commonjs(),
    nodeResolve({browser: true}),
    typescript(),
    terser(),
  ],
};
