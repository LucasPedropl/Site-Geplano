import { SiteData } from '../lib/types';
import { INITIAL_SITE_DATA } from '../lib/constants';
import { db, DATA_COLLECTION, DATA_DOC_ID } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Remove fields that are no longer used to keep stored data clean
const stripDeprecatedFields = (data: unknown): unknown => {
	if (!data || typeof data !== 'object') return data;
	const cleaned = { ...(data as Record<string, unknown>) } as Record<
		string,
		unknown
	>;

	if (cleaned.header && typeof cleaned.header === 'object') {
		const header = cleaned.header as Record<string, unknown>;
		if ('nav_team' in header) {
			delete (header as Record<string, unknown>)['nav_team'];
		}
		cleaned.header = header;
	}

	if ('team' in cleaned) {
		delete cleaned['team'];
	}

	return cleaned;
};

// Função auxiliar para merge profundo
const mergeWithDefaults = (defaults: unknown, stored: unknown): unknown => {
	if (stored === undefined || stored === null) return defaults;

	if (
		typeof defaults !== 'object' ||
		defaults === null ||
		Array.isArray(defaults)
	) {
		return stored;
	}

	const result = { ...(defaults as Record<string, unknown>) } as Record<
		string,
		unknown
	>;

	if (typeof stored !== 'object' || stored === null || Array.isArray(stored))
		return stored;

	const storedObj = stored as Record<string, unknown>;
	for (const key in storedObj) {
		if (Object.prototype.hasOwnProperty.call(storedObj, key)) {
			const defaultsObj = defaults as Record<string, unknown>;
			if (Object.prototype.hasOwnProperty.call(defaultsObj, key)) {
				(result as Record<string, unknown>)[key] = mergeWithDefaults(
					defaultsObj[key],
					storedObj[key]
				);
			} else {
				(result as Record<string, unknown>)[key] = storedObj[key];
			}
		}
	}
	return result;
};

export const getContent = async (): Promise<SiteData> => {
	try {
		// Ensure we are running in an environment where firebase is initialized
		if (!db) return INITIAL_SITE_DATA;

		const docRef = doc(db, DATA_COLLECTION, DATA_DOC_ID);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			const storedData = docSnap.data();
			return stripDeprecatedFields(
				mergeWithDefaults(INITIAL_SITE_DATA, storedData)
			) as SiteData;
		}
	} catch (error) {
		console.error('Error fetching content:', error);
	}
	return INITIAL_SITE_DATA;
};

export const saveContent = async (data: SiteData): Promise<void> => {
	const sanitized = stripDeprecatedFields(data) as SiteData;

	if (db) {
		try {
			await setDoc(doc(db, DATA_COLLECTION, DATA_DOC_ID), sanitized);
			console.log('Salvo no Firebase com sucesso.');
		} catch (error) {
			console.error('Erro ao salvar no Firebase:', error);
			throw error;
		}
	}
};

export const resetContent = async (): Promise<SiteData> => {
	if (db) {
		try {
			await setDoc(
				doc(db, DATA_COLLECTION, DATA_DOC_ID),
				INITIAL_SITE_DATA
			);
		} catch (e) {
			console.error('Erro ao resetar firebase', e);
		}
	}
	return INITIAL_SITE_DATA;
};
