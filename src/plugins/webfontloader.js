/**
 * plugins/webfontloader.js
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

export async function loadFonts() {
  const webFontLoader = await import(/* webpackChunkName: "webfontloader" */ 'webfontloader')

  webFontLoader.load({
    // google: {
    //   families: ['Roboto:100,300,400,500,700,900&display=swap','Roboto:ital,wght@0,100;0,300;0,400;0,500;1,400&display=swap'],
    // },
    // https://fonts.google.com/
    google: {
      families: [
        'ZCOOL+XiaoWei&display=swap',
        'Noto+Sans+SC:wght@100;300;400&display=swap',
        'Roboto:ital,wght@0,100;0,300;0,400;0,500;1,400&display=swap',
      ],
    },
  })
}
