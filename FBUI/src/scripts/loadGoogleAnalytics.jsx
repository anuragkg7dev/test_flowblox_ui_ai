const prodFlag = import.meta.env.VITE_PROD;

export const loadGoogleAnalytics = () => {
  if (prodFlag && prodFlag === 'YES') {
    const gtagScript = document.createElement("script");
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-E9SD8SE1Z9";
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    gtagScript.onload = () => {
      const initScript = document.createElement("script");
      initScript.innerHTML = `
        function initGtag() {
          if (typeof window.dataLayer !== 'undefined') {
            window.dataLayer = window.dataLayer || [];
            function gtag() { window.dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-E9SD8SE1Z9');
          } else {
            setTimeout(initGtag, 100);
          }
        }
        if (document.readyState === 'complete') {
          initGtag();
        } else {
          window.addEventListener('load', initGtag);
        }
      `;
      document.head.appendChild(initScript);
    };

    gtagScript.onerror = () => {
      console.error("Failed to load gtag.js");
    };
  }
};