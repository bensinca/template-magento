import webpack from 'webpack';

export default {
  mode: 'universal',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'crossorigin',
      },
      {
        rel: 'preload',
        href: 'https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700|Roboto:300,300i,400,400i,500,700&display=swap',
        as: 'style',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700|Roboto:300,300i,400,400i,500,700&display=swap',
        media: 'print',
        onload: 'this.media=\'all\'',
      },
    ],
  },
  loading: { color: '#fff' },
  plugins: [
    {
      src: '~/plugins/domPurify.js',
      ssr: false,
    },
  ],
  buildModules: [
    // to core
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    ['@vue-storefront/nuxt', {
      useRawSource: {
        dev: [
          '@vue-storefront/magento',
          '@vue-storefront/core',
        ],
        prod: [
          '@vue-storefront/magento',
          '@vue-storefront/core',
        ],
      },
    }],
    ['@vue-storefront/nuxt-theme'],
    ['@vue-storefront/magento/nuxt', {
      i18n: {
        useNuxtI18nConfig: true,
      },
    }],
  ],
  modules: [
    'nuxt-i18n',
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt',
    '@vue-storefront/middleware/nuxt',
  ],
  i18n: {
    currency: 'USD',
    country: 'US',
    countries: [
      {
        name: 'US',
        label: 'United States',
        states: [
          'California',
          'Nevada',
        ],
      },
      {
        name: 'AT',
        label: 'Austria',
      },
      {
        name: 'DE',
        label: 'Germany',
      },
      {
        name: 'NL',
        label: 'Netherlands',
      },
    ],
    currencies: [
      {
        name: 'EUR',
        label: 'Euro',
      },
      {
        name: 'USD',
        label: 'Dollar',
      },
    ],
    locales: [
      {
        code: 'en',
        label: 'English',
        file: 'en.js',
        iso: 'en',
      },
    ],
    defaultLocale: 'en',
    lazy: true,
    seo: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'en',
      numberFormats: {
        en: {
          currency: {
            style: 'currency',
            currency: 'USD',
            currencyDisplay: 'symbol',
          },
        },
      },
    },
    detectBrowserLanguage: {
      cookieKey: 'vsf-locale',
    },
  },
  styleResources: {
    scss: [require.resolve('@storefront-ui/shared/styles/_helpers.scss', { paths: [process.cwd()] })],
  },
  build: {
    extend(config, ctx) {
      // eslint-disable-next-line no-param-reassign
      config.devtool = ctx.isClient ? 'eval-source-map' : 'inline-source-map';
    },
    transpile: [
      'vee-validate/dist/rules',
    ],
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': JSON.stringify({
          // eslint-disable-next-line global-require
          version: require('./package.json').version,
          lastCommit: process.env.LAST_COMMIT || '',
        }),
      }),
    ],
  },
  router: {
    scrollBehavior(_to, _from, savedPosition) {
      return savedPosition || {
        x: 0,
        y: 0,
      };
    },
  },
};