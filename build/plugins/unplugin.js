import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Icons from 'unplugin-icons/vite'
import {getRootPath, getSrcPath} from '../utils/index';
import IconsResolver from 'unplugin-icons/resolver'
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import ViteComponents from "unplugin-vue-components/vite";
import {VuetifyResolver} from "unplugin-vue-components/resolvers";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import {resolve} from "node:path";
import {createHtmlPlugin} from "vite-plugin-html";
import {loadEnv} from "vite";
import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'
import vue from '@vitejs/plugin-vue'
import {FileSystemIconLoader} from "unplugin-icons/loaders";
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';
import zipPack from "vite-plugin-zip-pack";
import VueMacros from 'unplugin-vue-macros/vite';

export default function unplugin(mode) {
  const {VITE_ICON_PREFIX, VITE_APP_NAME} = loadEnv(mode, process.cwd());
  console.log(process.cwd(), VITE_APP_NAME, VITE_ICON_PREFIX)
  const srcPath = getSrcPath();
  const rootPath = getRootPath();
  resolve(srcPath, '/')
  const localIconPath = `${srcPath}/assets/images/svgs`;
  /** 本地svg图标集合名称 */
  const collectionName = 'local';

  return [
    VueMacros({}),
    vue({
      template: {transformAssetUrls},
    }),
    VueSetupExtend(),
    Components({
      dirs: ['src/components', 'src/views/components'],
      extensions: ['vue'],
      types: [{from: 'vue-router', names: ['RouterLink', 'RouterView']}],
      deep: true,
      resolvers: [
        VuetifyResolver(),
        IconsResolver(
          {
            customCollections: [collectionName],
            prefix: VITE_ICON_PREFIX
          }
        ),
      ],
      dts: `${rootPath}/.components.d.ts`,
    }),

    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      vueTemplate: true,
      imports: [
        'vue',
        'vee-validate',
        '@vueuse/core',
        {
          'vuetify': ['useTheme'],
          'vue-router': ['useRoute', 'useRouter'],
          'vue-i18n': ['useI18n'],
          'vue-toastification': ['useToast'],
          'pinia': ['storeToRefs'],
          'lodash-es': ['trim', 'debounce'],
        },
        {
          from: `${srcPath}/utils/validation`,
          imports: ['yup'],
          type: true,
        },
      ],
      dirs: [`${srcPath}/plugins`, `${srcPath}/filters`, `${srcPath}/store/**`, `${srcPath}/router`, `${srcPath}/assets`],
      // dirs: ['src'],
      resolvers: [
        VuetifyResolver(),
        IconsResolver({
          customCollections: [collectionName],
          componentPrefix: VITE_ICON_PREFIX,
          enabledCollections: [collectionName],
        }),
      ],
      dts: `${rootPath}/.auto-imports.d.ts`,
      injectAtEnd: true,
      eslintrc: {
        enabled: true, // Default `false`
        filepath: `${rootPath}/.eslintrc-auto-import.json`, // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
    Icons({
      compiler: 'vue3',
      autoInstall: true,
      customCollections: {
        [collectionName]: FileSystemIconLoader(localIconPath, svg =>
          svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')
        )
      },
      enabledCollections: ['mdi'],
      scale: 1,
      defaultClass: 'inline-block'
    }),
    createSvgIconsPlugin({
      iconDirs: [localIconPath],
      symbolId: `${VITE_ICON_PREFIX}-[dir]-[name]`,
      inject: 'body-last',
      customDomId: '__SVG_ICON_LOCAL__'
    }),
    ViteComponents({
      resolvers: [VuetifyResolver()],
    }),
    VueI18nPlugin({
      runtimeOnly: false,
      // provide a path to the folder where you'll store translation data (see below)
      // include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**'),
      include: `${srcPath}/locales/**`,
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: VITE_APP_NAME,
        },
      },
    }),
    zipPack()

  ];
}
