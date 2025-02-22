// src/utils/firebase-admin.js
const { initializeApp, getApps, cert } = require('firebase-admin/app');

function getFirebaseAdmin() {
  if (!getApps().length) {
    try {
      const value = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
      console.log('Value type:', typeof value);
      console.log('Value starts with:', value?.substring(0, 20));
      const serviceAccount = value.startsWith('{')
        ? JSON.parse(value)
        : JSON.parse(Buffer.from(value, 'base64').toString('utf-8'));

      return initializeApp({
        credential: cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL
      });
    } catch (error) {
      console.error('Firebase admin init error:', error);
      throw error;
    }
  }
  return getApps()[0];
}

module.exports = { getFirebaseAdmin };