/* eslint-disable no-undef */
import { defineConfig, loadEnv } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import eslint from 'vite-plugin-eslint';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

  return defineConfig({
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: 'node_modules/bpmn-js/dist/assets/bpmn-font',
            dest: 'dependencies/bpmn-js/assets',
          },
          {
            src: 'node_modules/diagram-js/assets/diagram-js.css',
            dest: 'dependencies',
          },
          {
            src: 'app/domain-story-modeler/language/icon/icons.css',
            dest: 'domain-story-modeler/language/icon/',
          },
          {
            src: 'node_modules/jquery/dist/jquery.min.js',
            dest: 'dependencies',
          },
          {
            src: 'node_modules/jquery/dist/jquery.min.js',
            dest: '',
            rename: 'jquery-3.6.0.min.js',
          },
        ]
      }),
      eslint(),
    ],
  });
};