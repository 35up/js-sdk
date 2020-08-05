import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
// eslint-disable-next-line import/extensions
import pkg from './package.json';

export default {
  input: './src/index.ts',
  output: {
    file: pkg.main,
    format: 'es',
    sourcemap: true,
  },
  external: Object.keys(pkg.dependencies || {}),
  plugins: [nodeResolve({browser: true}), typescript()],
};
