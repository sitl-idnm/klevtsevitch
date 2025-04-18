/** @type {import('next').NextConfig} */
const nextConfig = {
  // Убираем неподдерживаемую конфигурацию i18n
  /*
  i18n: {
    locales: ['ru', 'en', 'cs'], // Поддерживаемые языки
    defaultLocale: 'ru', // Язык по умолчанию (без префикса в URL)
  },
  */
  // Добавляем настройку редиректа
  async redirects() {
    return [
      {
        source: '/', // Исходный путь (корень)
        destination: '/ru', // Целевой путь (русская версия)
        permanent: false, // Указываем false, так как язык по умолчанию может измениться
      },
    ]
  },
  // Здесь могут быть другие ваши настройки
};

export default nextConfig;
