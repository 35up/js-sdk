import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// eslint-disable-next-line import/extensions
import pkg from './package.json';


export default {
  input: './src/index.ts',
  output: [
    {file: pkg.module, format: 'es'},
  ],
  external: Object.keys(pkg.dependencies || {}),
  plugins: [commonjs(), nodeResolve({browser: true}), typescript()],
};
