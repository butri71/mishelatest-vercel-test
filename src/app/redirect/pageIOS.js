// src/app/redirect/page.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RedirectPage = () => {
    // console.log("loading RedirectPage")
  const router = useRouter();

  useEffect(() => {
    // Get the cocktail parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const cocktailId = urlParams.get('cocktail');
    
    // console.log('cocktailId from URL:', cocktailId); // Debugging line

    if (!cocktailId) {
      // If no cocktailId is provided, fallback to the Apple Store
    //   console.log('No cocktailId provided, redirecting to App Store');
      window.location.href = 'https://apps.apple.com/us/app/mishela-cocktails/id1548143655';
      return;
    }

    // Construct the deep link for the app
    const deepLink = `mishela://mishela/cocktaillink?id=${cocktailId}`;

    // Check if the app is installed (use deep link as a fallback)
    const timeoutId = setTimeout(() => {
      // If app doesn't open, fallback to the App Store
    //   console.log('Deep link did not open, redirecting to App Store');
      window.location.href = 'https://apps.apple.com/us/app/mishela-cocktails/id1548143655';
    }, 1000); // 1 second timeout

    // Redirect to the deep link
    // console.log('Redirecting to deep link:', deepLink);
    window.location.href = deepLink;

    // Cleanup timeout if deep link works
    return () => clearTimeout(timeoutId);
  }, [router]);

  return <div>Redirecting...</div>;
};

export default RedirectPage;
