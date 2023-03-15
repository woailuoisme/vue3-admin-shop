import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Icons from 'unplugin-icons/vite'
import {getSrcPath} from '../utils';
import IconsResolver from 'unplugin-icons/resolver'
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import ViteComponents from "unplugin-vue-components/vite";
import {VuetifyResolver} from "unplugin-vue-components/resolvers";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {createHtmlPlugin} from "vite-plugin-html";
import {loadEnv} from "vite";
import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'
import vue from '@vitejs/plugin-vue'
import Layouts from "vite-plugin-vue-layouts";
import {FileSystemIconLoader} from "unplugin-icons/loaders";
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';
import vueJsx from '@vitejs/plugin-vue-jsx'

export default function unplugin(mode) {
  const {VITE_ICON_PREFIX,VITE_APP_NAME} = loadEnv(mode, process.cwd());
  console.log(process.cwd(),VITE_APP_NAME,VITE_ICON_PREFIX)
  const srcPath = getSrcPath();
  resolve(srcPath,'/')
  const localIconPath = `${srcPath}/assets/images/svgs`;

  /** 本地svg图标集合名称 */
  const collectionName = 'local';

  return [
    vue({
      template: { transformAssetUrls },
    }),
    VueSetupExtend(),
    Components({

      dirs: ['src/components'],
      extensions: ['vue'],
      types: [{ from: 'vue-router', names: ['RouterLink', 'RouterView'] }],
      deep: true, // search for subdirectories
      resolvers: [
        VuetifyResolver(),
        IconsResolver(
          {
            customCollections: [collectionName],
            prefix: VITE_ICON_PREFIX
          }
        ),
        (componentName) => {
          // where `componentName` is always CapitalCase
          if (componentName.startsWith('V'))
            return {name: componentName, from: 'vuetify/lib/labs/components'}
        },
        // (componentName) => {
        //   // where `componentName` is always CapitalCase
        //   if (componentName.endsWith('Provider'))
        //     return {name: componentName, from: '@/components/provider'}
        // }
      ],
      dts: 'src/typings/components.d.ts',
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
       // '@vueuse/core',
       //  'vee-validate': ['useForm','userField'],
        {
        'vuetify': ['useTheme'],
        'vue-router': ['useRoute','useRouter'],
        'vue-i18n': ['useI18n'],
        'pinia': ['storeToRefs'],
       }
      ],
      // dirs: [`${srcPath}/plugins`, `${srcPath}/filters`, `${srcPath}/store/**`, `${srcPath}/router`,
      //   `${srcPath}/views`,`${srcPath}/components`,
      // ],
      dirs:['src'],
      resolvers: [
        VuetifyResolver(),
        IconsResolver({
          customCollections: [collectionName],
          componentPrefix: VITE_ICON_PREFIX,
          enabledCollections: [collectionName],
        }),

      ],
      dts: "src/typings/auto-imports.d.ts",

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
    Layouts(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: VITE_APP_NAME,
        },
      },
    }),
    vueJsx({optimize: false, enableObjectSlots: true}),

  ];
}