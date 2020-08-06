import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';


export default {
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
};
