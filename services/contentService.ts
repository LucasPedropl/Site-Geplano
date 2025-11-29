import { SiteData } from '../types';
import { INITIAL_SITE_DATA } from '../constants';
import { db, isFirebaseInitialized, DATA_COLLECTION, DATA_DOC_ID } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const STORAGE_KEY = 'geplano_site_data';

// Função auxiliar para merge profundo
// Garante que se o objeto no banco não tiver uma chave nova (ex: hero.images), 
// ela seja preenchida pelo valor padrão do INITIAL_SITE_DATA.
const mergeWithDefaults = (defaults: any, stored: any): any => {
    if (stored === undefined || stored === null) return defaults;
    
    // Arrays e primitivos: Valor armazenado tem prioridade (mesmo se array vazio)
    if (typeof defaults !== 'object' || defaults === null || Array.isArray(defaults)) {
        return stored;
    }
    
    // Objetos: Merge recursivo para garantir estrutura
    const result = { ...defaults };
    
    // Se stored não for objeto (ex: dado corrompido ou mudança de tipo), retorna stored
    if (typeof stored !== 'object' || Array.isArray(stored)) return stored;

    for (const key in stored) {
        if (Object.prototype.hasOwnProperty.call(stored, key)) {
             if (Object.prototype.hasOwnProperty.call(defaults, key)) {
                 result[key] = mergeWithDefaults(defaults[key], stored[key]);
             } else {
                 result[key] = stored[key];
             }
        }
    }
    return result;
};

// Agora é assíncrono (Promise) pois o banco de dados real não é instantâneo
export const getContent = async (): Promise<SiteData> => {
  // 1. Tenta pegar do Firebase se estiver configurado
  if (isFirebaseInitialized && db) {
    try {
      const docRef = doc(db, DATA_COLLECTION, DATA_DOC_ID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const storedData = docSnap.data();
        // MERGE INTELIGENTE: Combina dados do banco com a estrutura padrão atualizada
        const data = mergeWithDefaults(INITIAL_SITE_DATA, storedData) as SiteData;
        
        // Salva uma cópia no localStorage para backup/cache e velocidade
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return data;
      } else {
        // Se conectou mas não tem dados ainda, salva o inicial lá
        await saveContent(INITIAL_SITE_DATA);
        return INITIAL_SITE_DATA;
      }
    } catch (error) {
      console.error("Erro ao ler do Firebase:", error);
      // Fallback para o LocalStorage em caso de erro de rede
    }
  }

  // 2. Fallback: LocalStorage
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsedStored = JSON.parse(stored);
      // Também faz merge no LocalStorage para garantir consistência se a estrutura mudou
      return mergeWithDefaults(INITIAL_SITE_DATA, parsedStored) as SiteData;
    }
  } catch (e) {
    console.warn('Failed to load from local storage', e);
  }

  // 3. Fallback final: Constante hardcoded
  return INITIAL_SITE_DATA;
};

export const saveContent = async (data: SiteData): Promise<void> => {
  // 1. Salva no Firebase
  if (isFirebaseInitialized && db) {
    try {
      await setDoc(doc(db, DATA_COLLECTION, DATA_DOC_ID), data);
      console.log("Salvo no Firebase com sucesso.");
    } catch (error) {
      console.error("Erro ao salvar no Firebase:", error);
      throw error; // Relança o erro para a UI saber
    }
  }

  // 2. Sempre salva no LocalStorage como backup imediato
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    // Dispatch a custom event so the site updates immediately without refresh (if running in same window)
    window.dispatchEvent(new Event('contentUpdated'));
  } catch (e) {
    console.error('Failed to save to local storage', e);
  }
};

export const resetContent = async (): Promise<SiteData> => {
  // Reseta Firebase
  if (isFirebaseInitialized && db) {
      try {
        await setDoc(doc(db, DATA_COLLECTION, DATA_DOC_ID), INITIAL_SITE_DATA);
      } catch(e) {
          console.error("Erro ao resetar firebase", e);
      }
  }
  
  // Reseta LocalStorage
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event('contentUpdated'));
  return INITIAL_SITE_DATA;
};
