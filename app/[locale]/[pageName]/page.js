import React from 'react';
import styles from './page.module.css'; // Импортируем стили
// Импортируем переводы
import { translations } from '../../../lib/translations'; // Путь изменился (на уровень выше)

// Компонент страницы, получает параметры из URL через props `params`
export default function Page({ params: { locale, pageName } }) {
  // Извлекаем имя страницы из параметров. Имя переменной должно совпадать
  // с именем папки в квадратных скобках ([pageName])
  const decodedPageName = decodeURIComponent(pageName);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{decodedPageName}</h1>
    </div>
  );
}

// (Опционально, но хорошо для SEO)
// Функция для генерации метаданных (например, заголовка вкладки браузера)
export async function generateMetadata({ params: { locale, pageName } }) {
    // Убедимся, что язык существует, иначе используем русский
    const lang = translations[locale] ? locale : 'ru';
    // Получаем переведенный суффикс для заголовка
    const titleSuffix = translations[lang]?.dynamicPage?.pageTitleSuffix || '| klevtsevitch.ru';

    const decodedPageName = decodeURIComponent(pageName);
    return {
        // Формируем заголовок с учетом языка
        title: `${decodedPageName} ${titleSuffix}`,
    };
}
