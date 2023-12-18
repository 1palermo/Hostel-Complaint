'use client'
import React, { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
        console.log('Component mounted');
        const addScript = document.createElement('script');
        addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
      
        return () => {
          console.log('Component unmounted');
          // Cleanup script when the component is unmounted
          document.body.removeChild(addScript);
        };
      }, []);
      

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: 'en,hi',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      'google_translate_element'
    );

    // After the translation element is initialized, hide the Google Translate image
    const googleTranslateImage = document.querySelector('#google_translate_element img');
    if (googleTranslateImage) {
      googleTranslateImage.style.display = 'none';
    }
  };

  return (
    <div>
      <style jsx>{`
        #google_translate_element {
          display: inline-block;
          padding: 8px 12px;
          border: 1px solid #ccc;
          border-radius: 20px; /* Adjust the border-radius to your preference */
          cursor: pointer;
          background-color: #ffffff; /* Background color of the button */
          color: #333; /* Text color of the button */
        }
      `}</style>
      <div id="google_translate_element" dangerouslySetInnerHTML={{ __html: '' }} />
    </div>
  );
}
