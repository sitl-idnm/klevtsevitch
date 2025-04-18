'use client';

import React, { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'fontMode';

export default function FontSwitcher() {
  // Инициализируем состояние из функции, чтобы localStorage читался только один раз
  const [fontMode, setFontMode] = useState(() => {
    // Начальное значение читаем только на клиенте
    if (typeof window !== 'undefined') {
      return localStorage.getItem(LOCAL_STORAGE_KEY) || 'unbounded';
    }
    return 'unbounded'; // Значение по умолчанию для SSR
  });

  // Эффект для добавления/удаления класса на body и сохранения в localStorage
  useEffect(() => {
    // Удаляем предыдущий класс
    document.body.classList.remove('pixel-font-active', 'unbounded-font-active');

    // Добавляем текущий класс
    if (fontMode === 'pixel') {
      document.body.classList.add('pixel-font-active');
    } else {
      document.body.classList.add('unbounded-font-active');
    }

    // Сохраняем выбор в localStorage (только на клиенте)
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, fontMode);
    } catch (error) {
        console.error("Failed to save font mode to localStorage", error);
    }

  }, [fontMode]); // Зависит от fontMode

  // Функция для переключения режима
  const toggleFontMode = () => {
    setFontMode((prevMode) => (prevMode === 'unbounded' ? 'pixel' : 'unbounded'));
  };

  const isActive = fontMode === 'pixel';

  // Используем useEffect для инициализации состояния на клиенте,
  // чтобы избежать мигания/несоответствия при гидратации, если localStorage
  // отличается от дефолтного значения.
  useEffect(() => {
    const savedMode = localStorage.getItem(LOCAL_STORAGE_KEY) || 'unbounded';
    setFontMode(savedMode);
  }, []); // Пустой массив зависимостей - выполняется один раз при монтировании

  return (
    <button
      onClick={toggleFontMode}
      style={isActive ? styles.activeButton : styles.button}
      title={isActive ? "Switch to normal font" : "Switch to pixel font"}
    >
      pixel
    </button>
  );
}

// Стили для кнопки переключателя
const styles = {
  button: {
    position: 'fixed',
    bottom: '15px',
    right: '15px',
    zIndex: 1000,
    padding: '7px 14px',
    fontFamily: 'var(--font-unbounded), sans-serif',
    fontSize: '0.8rem',
    fontWeight: '600',
    cursor: 'pointer',
    border: '2px solid #404878',
    borderRadius: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    color: '#404878',
    backdropFilter: 'blur(4px)',
    transition: 'all 0.2s ease-in-out',
  },
  activeButton: {
    position: 'fixed',
    bottom: '15px',
    right: '15px',
    zIndex: 1000,
    padding: '7px 14px',
    fontFamily: 'var(--font-pixelify), monospace',
    fontSize: '0.95rem',
    fontWeight: '400',
    cursor: 'pointer',
    border: '2px solid #E09F4A',
    borderRadius: '20px',
    backgroundColor: '#404878',
    color: '#E09F4A',
    backdropFilter: 'blur(4px)',
    transition: 'all 0.2s ease-in-out',
    boxShadow: '0 0 8px rgba(224, 159, 74, 0.5)',
  },
};
