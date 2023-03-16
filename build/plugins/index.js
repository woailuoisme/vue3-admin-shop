
import vueJsx from '@vitejs/plugin-vue-jsx';
// import unocss from '@unocss/vite';
// import progress from 'vite-plugin-progress';
// import pageRoute from '@soybeanjs/vite-plugin-vue-page-route';
// import mock from './mock';
// import pwa from './pwa';
import DefineOptions from 'unplugin-vue-define-options/vite'
import unplugin from './unplugin';
import visualizer from './visualizer';
import compress from './compress';
import {loadEnv} from "vite";

export function setupVitePlugins(mode) {
  const plugins = [ vueJsx({optimize: false, enableObjectSlots: true}), DefineOptions({include: [/\.vue$/, /\.vue\?vue/],}), ...unplugin(mode)];
  const viteEnv = loadEnv(mode, process.cwd())
  const {VITE_VISUALIZER,VITE_COMPRESS,VITE_PWA,VITE_VERCEL} = loadEnv(mode, process.cwd());

  if (VITE_VISUALIZER === 'Y') {
    plugins.push(visualizer);
  }
  if (VITE_COMPRESS === 'Y') {
    plugins.push(compress(viteEnv));
  }
  if (VITE_PWA === 'Y' || VITE_VERCEL === 'Y') {
    plugins.push(pwa());
  }
  return [...unplugin(mode)];
  // return [vue(), vuetify(), ...unplugin(viteEnv), mock(viteEnv)];
}
