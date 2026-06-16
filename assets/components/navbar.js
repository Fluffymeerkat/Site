(function() {
  const navHtml = `
    <nav class="site-navbar">
      <div class="navbar-brand">My Website</div>
      <button class="navbar-toggle" aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div class="navbar-links">
        <a href="index.html">Home</a>
        <a href="dedication.html">Dedication</a>
        <a href="contact.html">Contact</a>
        <a href="about.html">About</a>
        <a href="construction.html">Under Construction</a>
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
      position: relative;
      z-index: 1000;
    }

    .site-navbar .navbar-brand {
      font-size: 1.2rem;
      font-weight: 700;
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
      width: 28px;
      height: 20px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
    }

    .navbar-toggle span {
      display: block;
      height: 3px;
      background: #ffffff;
      border-radius: 2px;
    }

    @media (max-width: 700px) {
      .site-navbar {
        flex-wrap: wrap;
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
    links.classList.toggle('active');
  });
})();
