(function() {
  const navHtml = `
    <nav class="site-navbar" aria-label="Primary navigation">
      <div class="navbar-brand">
        <img src="assets/images/logo.png" alt="Website logo showing a stylized emblem next to the site name, professional and neutral tone">
      </div>
      <button class="navbar-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="navbar-links">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div class="navbar-links" id="navbar-links">
        <a href="index.html">Home</a>
        <a href="dedication.html">Dedication</a>
        <a href="contact.html">Contact</a>
        <a href="about.html">About</a>
      </div>
    </nav>
  `;

  const styles = `
    .site-navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.9rem 1rem;
      background: #0a3d62;
      color: #ffffff;
      font-family: Arial, sans-serif;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      z-index: 1000;
      box-sizing: border-box;
    }

    .site-navbar .navbar-brand {
      display: flex;
      align-items: center;
      font-size: 1.2rem;
      font-weight: 700;
    }

    .site-navbar .navbar-brand img {
      max-width: 120px;
      max-height: 120px;
      width: auto;
      height: auto;
      display: block;
    }

    .site-navbar .navbar-links {
      display: flex;
      gap: 1rem;
    }

    .site-navbar .navbar-links a {
      color: #ffffff;
      text-decoration: none;
      padding: 0.4rem 0.6rem;
      border-radius: 4px;
      transition: background 0.2s ease;
    }

    .site-navbar .navbar-links a:hover {
      background: rgba(255, 255, 255, 0.16);
    }

    .navbar-toggle {
      display: none;
      flex-direction: column;
      justify-content: space-between;
      width: 32px;
      height: 24px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      margin-left: 1rem;
      color: #fff;
    }

    .navbar-toggle span {
      display: block;
      height: 3px;
      background: #ffffff;
      border-radius: 2px;
      transition: transform 0.2s ease, opacity 0.2s ease;
    }

    .navbar-toggle.open span:nth-child(1) {
      transform: translateY(9px) rotate(45deg);
    }

    .navbar-toggle.open span:nth-child(2) {
      opacity: 0;
    }

    .navbar-toggle.open span:nth-child(3) {
      transform: translateY(-9px) rotate(-45deg);
    }

    @media (max-width: 700px) {
      .site-navbar {
        flex-wrap: wrap;
        padding: 0.9rem 0.9rem 0.5rem;
      }

      .navbar-toggle {
        display: flex;
      }

      .navbar-links {
        width: 100%;
        display: none;
        flex-direction: column;
        gap: 0.5rem;
        margin-top: 0.8rem;
      }

      .navbar-links a {
        width: 100%;
        padding: 0.75rem 0.8rem;
      }

      .navbar-links.active {
        display: flex;
      }
    }
  `;

  const container = document.createElement('div');
  container.innerHTML = navHtml;
  document.body.prepend(container);

  const styleTag = document.createElement('style');
  styleTag.textContent = styles;
  document.head.appendChild(styleTag);

  const toggleButton = container.querySelector('.navbar-toggle');
  const links = container.querySelector('.navbar-links');

  toggleButton.addEventListener('click', () => {
    const isOpen = links.classList.toggle('active');
    toggleButton.classList.toggle('open', isOpen);
    toggleButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close menu when focus leaves the navigation on mobile
  links.addEventListener('focusout', (event) => {
    if (!container.contains(event.relatedTarget)) {
      links.classList.remove('active');
      toggleButton.classList.remove('open');
      toggleButton.setAttribute('aria-expanded', 'false');
    }
  });
})();
