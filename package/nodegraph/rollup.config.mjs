import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';

export default [
    {
        input: 'src/index.ts',
        output: [
            { file: 'dist/index.js', format: 'cjs', sourcemap: true },
            { file: 'dist/index.esm.js', format: 'esm', sourcemap: true }
        ],
        plugins: [
            resolve({ extensions: ['.ts', '.tsx', '.js', '.jsx'] }), // 👈 clave
            commonjs(),
            typescript({
                compilerOptions: {
                    allowJs: true,
                    declaration: false // dts plugin lo maneja por separado
                }
            })
        ],
        external: ['react', 'react-dom']
    },
    {
        input: 'src/index.ts',
        output: { file: 'dist/index.d.ts', format: 'esm' },
        plugins: [dts()]
    }

];