/// <reference types="vite/client" />
import path, { resolve } from 'node:path';
import { fileURLToPath } from 'node:url'
import { globSync } from 'glob'
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts'
import preserveDirectives from 'rollup-preserve-directives'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

export default defineConfig({
    plugins: [
        react(), // Plugin de React para permitir la transformación y optimización de JSX.
        libInjectCss(), // Inyecta el CSS automáticamente al exportar una librería.
        dts({ 
            exclude: ['**/*.stories.tsx'], // Excluye archivos de historias de Storybook de la generación de definiciones.
            rollupTypes: true, // Genera definiciones de tipos compatibles con Rollup.
            include: ['src'], // Incluye únicamente los archivos en la carpeta `src`.
        }),
        preserveDirectives() as Plugin, // Mantiene las directivas de comentarios (como `use client`) en los outputs de Rollup.
    ],
    build: {
        copyPublicDir: false, // Evita copiar la carpeta `public` al directorio de salida.
        lib: {
            entry: resolve(__dirname, 'src/main.ts'), // Define el punto de entrada principal de la librería.
            formats: ['es'], // Define el formato de salida como módulo de ECMAScript.
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime'], // Define dependencias externas para evitar que se incluyan en el bundle.
            input: Object.fromEntries(
                globSync(['src/components/**/*.tsx', 'src/main.ts']).map((file) => { // Busca todos los archivos `.tsx` en la carpeta `src/components` y el archivo principal `main.ts`.
                  const entryName = path.relative(
                    'src',
                    file.slice(0, file.length - path.extname(file).length)
                  ) // Genera nombres de entrada eliminando la ruta `src/` y la extensión del archivo.
                  // This expands the relative paths to absolute paths, so e.g.
                  // src/nested/foo becomes /project/src/nested/foo.js
                  const entryUrl = fileURLToPath(new URL(file, import.meta.url)) // Convierte la URL del archivo a una ruta absoluta.
                  return [entryName, entryUrl]
                })
            ),
            // Crea entradas dinámicas para cada archivo de componente y el archivo principal.
            output: {
                entryFileNames: '[name].js', // Define el nombre de los archivos de entrada en el bundle.
                assetFileNames: 'assets/[name][extname]', // Define el nombre y ubicación de los archivos estáticos.
                globals: {
                    react: 'React',
                    'react-dom': 'React-dom',
                    'react/jsx-runtime': 'react/jsx-runtime',
                }, // Define nombres globales para las dependencias externas.
            },
        },
    },
});
