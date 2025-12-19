import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// --- CONFIGURAÇÃO DO FIREBASE via variáveis de ambiente ---
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? '',
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? '',
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? '',
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? '',
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '',
	appId: import.meta.env.VITE_FIREBASE_APP_ID ?? '',
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? '',
};

const hasCompleteConfig = Object.values(firebaseConfig).every(
	(value) => typeof value === 'string' && value.length > 0
);

// Variáveis de controle
let db: any = null;
let storage: any = null;
let auth: any = null;
let googleProvider: any = null; // Provider do Google
let isFirebaseInitialized = false;

try {
	if (hasCompleteConfig) {
		const app = initializeApp(firebaseConfig);
		db = getFirestore(app);
		storage = getStorage(app);

		// Initialize Auth using named imports
		auth = getAuth(app);
		googleProvider = new GoogleAuthProvider();

		isFirebaseInitialized = true;
		console.log('Firebase (DB, Auth, Google) inicializado com sucesso.');
	} else {
		console.warn(
			'Firebase não configurado. Verifique as variáveis de ambiente antes de publicar.'
		);
	}
} catch (error) {
	console.error('Erro ao inicializar Firebase:', error);
}

export { db, storage, auth, googleProvider, isFirebaseInitialized };
export const DATA_DOC_ID = 'site_content';
export const DATA_COLLECTION = 'geplano_data';
