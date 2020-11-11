import { join } from 'path';
import { config } from 'dotenv';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';
// eslint-disable-next-line import/extensions
import pkg from './package.json';


const { parsed: env } = config({
  path: join(
    process.cwd(),
    `./env/.env.${process.env.ENV || 'staging'}`,
  ),
});

const fromEntries = arr => arr
  .reduce((acc, [ k, v ]) => ({ ...acc, [k]: v}), {});

export default [{
  input: './src/index.ts',
  output: [
    {file: pkg.module, format: 'es'},
    {
      file: pkg.module.replace(/.js$/, '.min.js'),
      format: 'es',
      plugins: [terser()],
    },
    {file: pkg.main, format: 'cjs', name: 'thirtyFiveUp'},
    {
      file: pkg.main.replace(/.js$/, '.min.js'),
      format: 'cjs',
      name: 'thirtyFiveUp',
      plugins: [terser()],
    },
  ],
  external: Object.keys(pkg.dependencies || {}),
  plugins: [
    typescript(),
    commonjs(),
    nodeResolve({browser: true}),
  ],
},
{
  input: './src/index.ts',
  output: [
    {file: pkg.browser, format: 'umd', name: 'thirtyFiveUp'},
  ],
  plugins: [
    typescript(),
    commonjs(),
    nodeResolve({browser: true}),
    terser(),
    replace(fromEntries(
      Object.entries(env).map(([ key, value ]) => [
        `process.env.${key}`,
        JSON.stringify(value),
      ]),
    )),
  ],
}];
