export function setupVimNavigation() {
  let gKeyPressed = false;
  let gKeyTimeout: number | null = null;
  let observer: MutationObserver | null = null;
  function handleKeydown(e: KeyboardEvent) {
    // Ignore if we're in an input or textarea
    if (e.target instanceof HTMLElement) {
      if (
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.isContentEditable
      ) {
        return;
      }
    }

    const code = e.key;

    if (code === "j") {
      window.scrollBy({ top: 100, left: 0, behavior: "instant" });
    }

    if (code === "k") {
      window.scrollBy({ top: -100, left: 0, behavior: "instant" });
    }

    // Handle G (shift+g)
    if (code === "G") {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        left: 0,
        behavior: "smooth"
      });
      return;
    }

    // Handle gg
    if (code === "g") {
      if (gKeyPressed) {
        // Second g press - go to top
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
        gKeyPressed = false;
        if (gKeyTimeout) clearTimeout(gKeyTimeout);
      } else {
        // First g press
        gKeyPressed = true;
        if (gKeyTimeout) clearTimeout(gKeyTimeout);
        gKeyTimeout = window.setTimeout(() => {
          gKeyPressed = false;
        }, 300);
      }
    } else {
      // Any other key press resets the g state
      gKeyPressed = false;
      if (gKeyTimeout) clearTimeout(gKeyTimeout);
    }
  }
  function setupObserver() {
    // Clean up existing observer if any
    if (observer) {
      observer.disconnect();
    }

    // Create new observer to watch for reading mode changes
    observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          // Re-attach event listener when document structure changes
          window.removeEventListener("keydown", handleKeydown);
          window.addEventListener("keydown", handleKeydown);
        }
      }
    });

    // Observe the document body for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Initial setup
  window.addEventListener("keydown", handleKeydown);
  setupObserver();

  // Enhanced cleanup function
  return () => {
    window.removeEventListener("keydown", handleKeydown);
    if (gKeyTimeout) clearTimeout(gKeyTimeout);
    if (observer) {
      observer.disconnect();
    }
  };
}
