'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Get the cocktail parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const cocktailId = urlParams.get('cocktail');  
    
    if (!cocktailId) {
      // Handle case when cocktailId is missing (fallback to App Store or Play Store)
      console.log("3a. No cocktailId found");
      if (navigator.userAgent.match(/iPhone|iPad|iPod/)) {
        window.location.href = 'https://apps.apple.com/us/app/mishela-cocktails/id1548143655';  // iOS App Store
      } else if (navigator.userAgent.match(/Android/)) {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.maxaquilino.mishela';  // Android Play Store
      } else {
        window.location.href = 'https://apps.apple.com/us/app/mishela-cocktails/id1548143655';  // Fallback for other platforms
      }
      return;
    }

    // Construct the deep link for iOS
    const iosUniversalLink = `mishela://mishela/cocktaillink?id=${cocktailId}`;
    // const iosUniversalLink = `https://mishela.app/cocktail?id=${cocktailId}`;    
    // const iosUniversalLink = `https://mishela.app/cocktaillink?id=${cocktailId}`;    
    // Construct the deep link for Android (intent URL)      
    // const androidUniversalLink = `https://mishela.app/cocktaillink?id=${cocktailId}`;
    const androidUniversalLink = `intent://mishela/cocktaillink?id=${cocktailId}#Intent;package=com.maxaquilino.mishela;scheme=mishela;end;`;

    // Timeout fallback to App Store or Play Store
    const timeoutId = setTimeout(() => {
      console.log("Timeout fallback to App Store or Play Store")
      if (navigator.userAgent.match(/iPhone|iPad|iPod/)) {
        window.location.href = 'https://apps.apple.com/us/app/mishela-cocktails/id1548143655';  // iOS App Store
      } else if (navigator.userAgent.match(/Android/)) {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.maxaquilino.mishela';  // Android Play Store
      } else {
        window.location.href = 'https://apps.apple.com/us/app/mishela-cocktails/id1548143655';  // Fallback for other platforms
      }
    }, 2000);  // 2-second timeout to allow deep link redirection

    // Try redirecting to the deep link (iOS or Android)
    if (navigator.userAgent.match(/iPhone|iPad|iPod|iOS|CriOS|FxiOS|OPiOS/)) {  
      console.log("redirecting to the deep link iOS")
      window.location.href = iosUniversalLink;         
    } else if (navigator.userAgent.match(/Android|Linux.*Mobile|Linux.*Chrome/i)) {
      console.log("redirecting to the deep link Android")
      // window.location.href = androidDeepLink;
      window.location.href = androidUniversalLink;
    } else {
      console.log("redirecting to the deep link DEFAULT")
      window.location.href = 'https://apps.apple.com/us/app/mishela-cocktails/id1548143655';  // Fallback for other platforms
    }

    // Cleanup timeout if deep link works
    return () => clearTimeout(timeoutId);
  }, [router]);

  return <div>Redirecting...</div>;
};

export default RedirectPage;


// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// const RedirectPage = () => {
//   const router = useRouter();

//   useEffect(() => {
//     // Get the cocktail parameter from the URL
//     const urlParams = new URLSearchParams(window.location.search);
//     const cocktailId = urlParams.get('cocktail');
    
//     if (!cocktailId) {
//       if (navigator.userAgent.match(/iPhone|iPad|iPod/)) {
//         // iOS fallback to App Store
//         window.location.href = 'https://apps.apple.com/us/app/mishela-cocktails/id1548143655';
//       } else if (navigator.userAgent.match(/Android/)) {
//         // Android fallback to Play Store
//         window.location.href = 'https://play.google.com/store/apps/details?id=com.maxaquilino.mishela';
//       } else {
//         // For any other platform (unlikely), fallback to Apple Store
//         window.location.href = 'https://apps.apple.com/us/app/mishela-cocktails/id1548143655';
//       }
//       return;
//     }

//     // Construct the deep link for iOS
//     const iosDeepLink = `mishela://mishela/cocktaillink?id=${cocktailId}`;
//     // Construct the deep link for Android
//     const androidDeepLink = `intent://mishela/cocktaillink?id=${cocktailId}#Intent;package=com.maxaquilino.mishela;scheme=mishela;end;`;

//     // Fallback timeout for both iOS and Android
//     const timeoutId = setTimeout(() => {
//       if (navigator.userAgent.match(/iPhone|iPad|iPod/)) {
//         // iOS fallback to App Store
//         window.location.href = 'https://apps.apple.com/us/app/mishela-cocktails/id1548143655';
//       } else if (navigator.userAgent.match(/Android/)) {
//         // Android fallback to Play Store
//         window.location.href = 'https://play.google.com/store/apps/details?id=com.maxaquilino.mishela';
//       } else {
//         // For any other platform (unlikely), fallback to Apple Store
//         window.location.href = 'https://apps.apple.com/us/app/mishela-cocktails/id1548143655';
//       }
//     }, 2000); // 1 second timeout

//     // Try redirecting to the deep link (iOS or Android)
//     if (navigator.userAgent.match(/iPhone|iPad|iPod/)) {
//       // Redirect to iOS deep link
//       window.location.href = iosDeepLink;
//     } else if (navigator.userAgent.match(/Android/)) {
//       // Redirect to Android deep link
//       window.location.href = androidDeepLink;
//     } else {
//       // If we can't detect the platform, fallback to App Store
//       window.location.href = 'https://apps.apple.com/us/app/mishela-cocktails/id1548143655';
//     }

//     // Cleanup timeout if deep link works
//     return () => clearTimeout(timeoutId);
//   }, [router]);

//   return <div>Redirecting...</div>;
// };

// export default RedirectPage;
