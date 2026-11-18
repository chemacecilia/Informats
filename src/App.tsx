import { useState } from 'react';
import styles from './App.module.css';
import type { Noticia } from './types';
import { Header } from './components/Header/Header';
import { SearchBar } from './components/SearchBar/SearchBar';
import { NewsSection } from './components/NewsSection/NewsSection';
import { IncibeFooter } from './components/IncibeFooter/IncibeFooter';
import { ArticleModal } from './components/Modals/ArticleModal';
import { AccessibilityModal } from './components/Modals/AccessibilityModal';
import { AccountModal } from './components/Modals/AccountModal';
import { useNewsFilter } from './hooks/useNewsFilter';

export function App() {
  const {
    searchQuery,
    setSearchQuery,
    selectedTopics,
    toggleTopic,
    clearTopics,
    resetAll,
    filteredNews,
    likedMap,
    likeCounts,
    toggleLike,
    isFiltered,
  } = useNewsFilter();

  const [activeArticle, setActiveArticle] = useState<Noticia | null>(null);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const likedCountTotal = Object.values(likedMap).filter(Boolean).length;

  const handleVolver = () => {
    if (isFiltered) {
      resetAll();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.appContainer}>
      <a href="#main-content" className={styles.skipLink}>
        Saltar al contenido principal
      </a>

      <div className={styles.mobileFrame}>
        <div className={styles.stickyTopZone}>
          <Header
            onOpenAccessibility={() => setIsAccessibilityOpen(true)}
            onOpenAccount={() => setIsAccountOpen(true)}
            onVolver={handleVolver}
            showVolver={true}
          />
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            resultCount={filteredNews.length}
          />
        </div>

        <NewsSection
          news={filteredNews}
          likedMap={likedMap}
          likeCounts={likeCounts}
          onToggleLike={toggleLike}
          onReadNews={(noticia) => setActiveArticle(noticia)}
          selectedTopics={selectedTopics}
          onToggleTopic={toggleTopic}
          onClearTopics={clearTopics}
          onResetAll={resetAll}
          searchQuery={searchQuery}
        />

        <IncibeFooter />

        {/* Diálogos y modales accesibles */}
        <ArticleModal
          noticia={activeArticle}
          isOpen={Boolean(activeArticle)}
          onClose={() => setActiveArticle(null)}
        />

        <AccessibilityModal
          isOpen={isAccessibilityOpen}
          onClose={() => setIsAccessibilityOpen(false)}
        />

        <AccountModal
          isOpen={isAccountOpen}
          onClose={() => setIsAccountOpen(false)}
          savedLikesCount={likedCountTotal}
        />
      </div>
    </div>
  );
}

export default App;
