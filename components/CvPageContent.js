'use client'; // Этот компонент - клиентский

import React from 'react';
import styles from '../app/[locale]/page.module.css'; // Путь к стилям изменился
import LanguageSwitcher from './LanguageSwitcher'; // Импортируем из той же папки компонентов

// Компонент принимает переводы (t) и текущую локаль (locale) как props
export default function CvPageContent({ t, locale }) {
  // Если переводы не пришли (например, ошибка), можно показать заглушку
  if (!t) {
    return <div>Loading translations...</div>;
  }

  return (
    <main className={styles.mainContainer}>
      {/* Добавляем LanguageSwitcher сюда */}
      <LanguageSwitcher currentLocale={locale} />

      <header className={styles.header}>
        <h1 className={styles.name}>{t.name}</h1>
        {t.nickname && <p className={styles.nickname}>({t.nickname})</p>}
        <p className={styles.title}>{t.title}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t.aboutTitle}</h2>
        <p dangerouslySetInnerHTML={{ __html: t.aboutText.replace(/\n/g, '<br />') }} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t.skillsTitle}</h2>
        <ul className={styles.skillsList}>
          {Object.entries(t.skills || {}).map(([key, skillData]) => (
            <li key={key}>
              <strong>{skillData.title}:</strong> {skillData.description}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
         <h2 className={styles.sectionTitle}>{t.contactsTitle}</h2>
         <ul className={styles.contactList}>
           {t.contactsLinks?.map((link) => (
             <li key={link.service}>
               <a
                 href={link.url}
                 target="_blank"
                 rel="noopener noreferrer"
                 className={styles.contactLink}
               >
                 {link.service}
               </a>
             </li>
           ))}
         </ul>
      </section>

    </main>
  );
}
