// Убираем 'use client' - это теперь серверный компонент
// 'use client';

import React from 'react';
// Стили здесь больше не нужны напрямую, но могут быть нужны для layout
// import styles from './page.module.css';
import { translations } from '../../lib/translations';
// Удаляем импорт LanguageSwitcher
// import LanguageSwitcher from '../../components/LanguageSwitcher';
// Импортируем новый клиентский компонент для контента
import CvPageContent from '../../components/CvPageContent';

// Компонент Home теперь серверный
export default function Home({ params: { locale } }) {
  // Получаем переводы на сервере
  const t = translations[locale]?.cv || translations.ru.cv;

  // Рендерим клиентский компонент и передаем ему данные
  return <CvPageContent t={t} locale={locale} />;
}

// generateMetadata остается здесь, так как это серверная функция
export async function generateMetadata({ params: { locale } }) {
    const lang = translations[locale] ? locale : 'ru';
    const t = translations[lang].cv;
    return {
        title: t.pageTitle,
        description: t.pageDescription,
    };
}
