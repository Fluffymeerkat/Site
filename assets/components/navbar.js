// ===== NAVBAR COMPONENT ===== 
// This IIFE (Immediately Invoked Function Expression) encapsulates the navbar logic 
// to avoid polluting the global namespace and prevent conflicts with other scripts
(function() {
  // ===== SECTION 1: HTML STRUCTURE =====
  // Defines the HTML markup for the navbar including the logo, hamburger menu toggle button,
  // and navigation links. Uses semantic HTML and ARIA attributes for accessibility.
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
      <!-- Navigation links container with ID for toggling visibility on mobile and aria controls -->
      <div class="navbar-links" id="navbar-links">
        <a href="Home.html">Home</a>
        <a href="dedication.html">Dedication</a>
        <a href="contact.html">Contact</a>
        <a href="about.html">About</a>
      </div>
    </nav>
  `;

  // ===== SECTION 2: CSS STYLING =====
  // All styling for the navbar is defined here as a template string. Includes:
  // - Navbar layout (fixed position, flexbox)
  // - Logo/brand styling
  // - Navigation links appearance and hover effects  
  // - Hamburger menu button styling and animations
  // - Responsive design for screens smaller than 700px (mobile-first approach)
  const styles = `
    /* Add padding to body to account for the fixed navbar height */
    body {
      padding-top: 85px !important;
    }

    .site-navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: nowrap;
      padding: 0.65rem 0.75rem;
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
      font-size: 1rem;
      font-weight: 700;
    }

    .site-navbar .navbar-brand img {
      max-width: 90px;
      max-height: 90px;
      width: auto;
      height: auto;
      display: block;
    }

    .site-navbar .navbar-links {
      display: flex;
      gap: 0.85rem;
    }

    .site-navbar .navbar-links a {
      color: #ffffff;
      text-decoration: none;
      padding: 0.3rem 0.5rem;
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
      body {
        padding-top: 65px !important;
      }

      .site-navbar {
        padding: 0.75rem 0.75rem;
        height: auto;
        flex-direction: row;
        position: relative;
      }

      .site-navbar .navbar-brand {
        flex: 1;
      }

      .site-navbar .navbar-brand img {
        max-width: 60px;
        max-height: 60px;
      }

      .navbar-toggle {
        display: flex;
        order: 2;
        flex-shrink: 0;
      }

      .site-navbar .navbar-links {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        width: 100vw;
        display: none;
        flex-direction: column;
        gap: 0;
        margin: 0;
        margin-left: calc(-50vw + 50%);
        background: #0a3d62;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        z-index: 999;
      }

      .site-navbar .navbar-links a {
        width: 100%;
        padding: 0.75rem 0.75rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        text-align: left;
      }

      .site-navbar .navbar-links.active {
        display: flex;
      }
    }
  `;

  // ===== SECTION 3: DOM MANIPULATION & INSERTION =====
  // Creates the navbar element and injects it into the page
  const container = document.createElement('div');
  // Insert the navbar HTML into the page before all other body content
  container.innerHTML = navHtml;
  document.body.prepend(container);

  // Create a style tag and insert all navbar CSS into the document head
  const styleTag = document.createElement('style');
  // Apply the CSS styles to the document
  styleTag.textContent = styles;
  document.head.appendChild(styleTag);

  // ===== SECTION 4: EVENT LISTENERS & INTERACTIVITY =====
  // Selects the hamburger menu button and navigation links for event handling
  const toggleButton = container.querySelector('.navbar-toggle');
  const links = container.querySelector('.navbar-links');

  // Handle hamburger menu toggle: opens/closes the mobile navigation menu
  // Toggles the 'active' class to show/hide links and 'open' class to animate the hamburger icon
  // Updates ARIA attribute for screen reader accessibility
  toggleButton.addEventListener('click', () => {
    const isOpen = links.classList.toggle('active');
    toggleButton.classList.toggle('open', isOpen);
    toggleButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Handle focus loss: automatically closes the mobile menu when user tabs away from the navbar
  // This improves accessibility and user experience on mobile devices
  links.addEventListener('focusout', (event) => {
    if (!container.contains(event.relatedTarget)) {
      links.classList.remove('active');
      toggleButton.classList.remove('open');
      toggleButton.setAttribute('aria-expanded', 'false');
    }
  });
})();
