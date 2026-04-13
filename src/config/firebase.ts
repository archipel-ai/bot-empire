/**
 * Configuration Firebase — à remplir avec les valeurs de ta console Firebase.
 * Les clés Firebase client sont publiques par design (la sécurité vient des rules).
 * https://console.firebase.google.com → ton projet → ⚙️ → Paramètres du projet → Tes applications
 */
export const FIREBASE_CONFIG = {
  apiKey:            'AIzaSyBpJ1FCslNMQy4ZP9OKJy8mdBQM3k-o-E8',
  authDomain:        'bot-empire-3d951.firebaseapp.com',
  databaseURL:       'https://bot-empire-3d951-default-rtdb.europe-west1.firebasedatabase.app',
  projectId:         'bot-empire-3d951',
  storageBucket:     'bot-empire-3d951.firebasestorage.app',
  messagingSenderId: '216470924880',
  appId:             '1:216470924880:web:a17363c8143fb0ba426b55',
};

/** Passe à false pour désactiver le cloud save sans toucher au reste du code. */
export const CLOUD_SAVE_ENABLED = true;
