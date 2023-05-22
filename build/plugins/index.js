import DefineOptions from 'unplugin-vue-define-options/vite'
import unplugin from './unplugin';
import visualizer from './visualizer';

export function setupVitePlugins(mode) {
  const plugins = [
    DefineOptions({include: [/\.vue$/, /\.vue\?vue/],}),
    visualizer,
    ...unplugin(mode)];
  return [...unplugin(mode)];
}
