// Firebase Configuration
import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getStorage } from 'firebase/storage';

// Configuración de Firebase - Reemplaza con tus credenciales
const firebaseConfig = {
    apiKey: "AIzaSyBUDtVx2S9cv-lKIr9ijJK1xrtTWGSD4as",
    authDomain: "costurero-b4f21.firebaseapp.com",
    projectId: "costurero-b4f21",
    storageBucket: "costurero-b4f21.firebasestorage.app",
    messagingSenderId: "29709002068",
    appId: "1:29709002068:web:c92a9d176ed87e7ae0d4c1",
    measurementId: "G-9YHBXK3DJ5"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener funciones de Firebase
export const functions = getFunctions(app);

// Obtener Storage de Firebase
export const storage = getStorage(app);

// Función para obtener reseñas de Google Places
export const getGoogleReviews = httpsCallable(functions, 'getGoogleReviews');

// Función para obtener detalles del lugar
export const getPlaceDetails = httpsCallable(functions, 'getPlaceDetails'); 