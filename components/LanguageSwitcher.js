'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Компонент переключателя языков
export default function LanguageSwitcher({ currentLocale }) {
  const pathname = usePathname(); // Получаем текущий путь (включая /locale)

  // Функция для получения нового пути без текущего locale
  const getPathWithoutLocale = () => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    // Удаляем первый сегмент (пустой) и второй (текущий locale)
    segments.splice(0, 2);
    let newPath = '/' + segments.join('/');
    // Убираем лишний слеш в конце, если он есть и путь не корневой
    if (newPath !== '/' && newPath.endsWith('/')) {
        newPath = newPath.slice(0, -1);
    }
    // Если путь пустой (была только локаль), возвращаем корень
    return newPath === '' ? '/' : newPath;
  };

  const pathWithoutLocale = getPathWithoutLocale();
  const locales = ['ru', 'en', 'cs'];

  return (
    <div style={styles.switcherContainer}>
      {locales.map((locale) => {
        const isActive = locale === currentLocale;
        // Генерируем правильный href
        const href = `/${locale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;

        return (
          <Link
            key={locale}
            href={href}
            passHref
            legacyBehavior // Используем legacyBehavior для применения стилей к <a>
          >
            <a style={isActive ? styles.activeLink : styles.link}>
              {locale.toUpperCase()}
            </a>
          </Link>
        );
      })}
    </div>
  );
}

// Стили (можно вынести в CSS модуль при желании)
const styles = {
  switcherContainer: {
    position: 'fixed', // Меняем на fixed
    top: '15px', // Уменьшим отступ сверху
    right: '15px', // Уменьшим отступ справа
    display: 'flex',
    gap: '8px', // Уменьшим гэп
    zIndex: 1001, // Чуть выше FontSwitcher, если они вдруг пересекутся
    background: 'rgba(240, 244, 248, 0.7)', // Фон светлой темы
    padding: '4px 8px',
    borderRadius: '5px',
    backdropFilter: 'blur(4px)'
  },
  link: {
    textDecoration: 'none',
    color: '#404878', // Deep Blue
    fontWeight: '500',
    fontSize: '0.85rem', // Чуть меньше
    padding: '2px 4px',
    transition: 'color 0.2s',
  },
  activeLink: {
    textDecoration: 'none',
    color: '#C87A6F', // Terracotta
    fontWeight: 'bold',
    fontSize: '0.85rem', // Чуть меньше
    padding: '2px 4px',
    borderBottom: '2px solid #C87A6F'
  }
};

// Стили для темной темы (можно добавить в @media query в globals.css или page.module.css, если вынести)
// @media (prefers-color-scheme: dark) {
//   .switcherContainer { background: rgba(64, 72, 120, 0.6); }
//   .link { color: #e8eaf6; }
//   .activeLink { color: #E09F4A; border-bottom-color: #E09F4A; }
// }
