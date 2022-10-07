import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// eslint-disable-next-line import/extensions
import pkg from './package.json';


export default {
  input: './index.ts',
  output: [
    {file: pkg.module, format: 'es'},
    {file: pkg.main, format: 'cjs', name: 'thirtyFiveUp'},
  ],
  external: Object.keys(pkg.dependencies || {}),
  plugins: [
    commonjs(),
    nodeResolve({browser: false}),
    typescript(),
  ],
};
