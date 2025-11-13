import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

/**
 * Componente Header - Menu de navegação responsivo
 * Mobile: Menu hamburger que abre/fecha
 * Desktop: Menu horizontal fixo
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para fechar o menu ao clicar em um link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Função para scroll suave até a seção
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      handleLinkClick();
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-secondary/95 backdrop-blur-sm shadow-lg z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Cloud<span className="text-primary">Car</span>
            </h1>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-white hover:text-primary transition-colors duration-300 font-medium text-lg"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection('catalog')}
              className="text-white hover:text-primary transition-colors duration-300 font-medium text-lg"
            >
              Catálogo
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-white hover:text-primary transition-colors duration-300 font-medium text-lg"
            >
              Sobre Nós
            </button>
          </div>

          {/* Botão Hamburger Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-primary transition-colors duration-300 p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FiX className="w-7 h-7" />
              ) : (
                <FiMenu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>

        {/* Menu Mobile - Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-3 border-t border-gray-700">
            <button
              onClick={() => scrollToSection('hero')}
              className="block w-full text-left px-4 py-3 text-white hover:bg-primary/10 hover:text-primary transition-all duration-300 font-medium rounded-lg"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection('catalog')}
              className="block w-full text-left px-4 py-3 text-white hover:bg-primary/10 hover:text-primary transition-all duration-300 font-medium rounded-lg"
            >
              Catálogo
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left px-4 py-3 text-white hover:bg-primary/10 hover:text-primary transition-all duration-300 font-medium rounded-lg"
            >
              Sobre Nós
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;