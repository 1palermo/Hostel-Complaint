// Home.js
'use client'
import React, { useEffect, useRef } from 'react';

export default function Home() {
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (!hasMountedRef.current) {
      const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,hi',
            layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
          },
          'google_translate_element'
        );
        const googleTranslateImage = document.querySelector('#google_translate_element img');
        if (googleTranslateImage) {
          googleTranslateImage.style.display = 'none';
        }
      };
      const addScript = document.createElement('script');
      addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
      document.body.appendChild(addScript);
      window.googleTranslateElementInit = googleTranslateElementInit;

      hasMountedRef.current = true;
    }
    return;
  }, []);

  return (
    <div id="google_translate_element" className='ml-2'>
    </div>
  );
}
