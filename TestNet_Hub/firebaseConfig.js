// ====== firebaseConfig.js ======

import { getFirestore, doc, getDoc, setDoc, onSnapshot, collection, getDocs, writeBatch } from 'firebase/firestore';

const db = getFirestore();

// ─── Коллекция и документы ───
const CONFIG_COLLECTION = 'config';
const ZONES_DOC = 'zones';
const LINKS_DOC = 'links';

// ══════════════════════════════════════
//  ЧТЕНИЕ конфига из Firestore
// ══════════════════════════════════════

export async function loadRemoteConfig() {
  try {
    const zonesSnap = await getDoc(doc(db, CONFIG_COLLECTION, ZONES_DOC));
    const linksSnap = await getDoc(doc(db, CONFIG_COLLECTION, LINKS_DOC));

    const result = {
      zones: zonesSnap.exists() ? zonesSnap.data() : null,
      links: linksSnap.exists() ? linksSnap.data() : null,
    };

    console.log('[Config] Loaded from Firestore:', result);
    return result;
  } catch (err) {
    console.error('[Config] Failed to load from Firestore:', err);
    return null;
  }
}


// ══════════════════════════════════════
//  ЗАПИСЬ конфига в Firestore (только админ)
// ══════════════════════════════════════

export async function saveZonesConfig(zoneConfig) {
  try {
    await setDoc(doc(db, CONFIG_COLLECTION, ZONES_DOC), {
      data: zoneConfig,
      updatedAt: Date.now(),
      version: Date.now()   // для отслеживания версии
    });
    console.log('[Config] ZONE_CONFIG saved to Firestore');
    return true;
  } catch (err) {
    console.error('[Config] Failed to save zones:', err);
    return false;
  }
}

export async function saveLinksConfig(linksData) {
  try {
    await setDoc(doc(db, CONFIG_COLLECTION, LINKS_DOC), {
      data: linksData,
      updatedAt: Date.now(),
      version: Date.now()
    });
    console.log('[Config] Links saved to Firestore');
    return true;
  } catch (err) {
    console.error('[Config] Failed to save links:', err);
    return false;
  }
}


// ══════════════════════════════════════
//  ПОЛНОЕ СОХРАНЕНИЕ (зоны + ссылки)
// ══════════════════════════════════════

export async function saveFullConfig(zoneConfig, linksData) {
  const batch = writeBatch(db);

  batch.set(doc(db, CONFIG_COLLECTION, ZONES_DOC), {
    data: zoneConfig,
    updatedAt: Date.now(),
    version: Date.now()
  });

  batch.set(doc(db, CONFIG_COLLECTION, LINKS_DOC), {
    data: linksData,
    updatedAt: Date.now(),
    version: Date.now()
  });

  try {
    await batch.commit();
    console.log('[Config] Full config saved to Firestore');
    return true;
  } catch (err) {
    console.error('[Config] Failed to save full config:', err);
    return false;
  }
}


// ══════════════════════════════════════
//  REALTIME подписка — авто-обновление у всех
// ══════════════════════════════════════

export function subscribeToConfigChanges(onZonesChange, onLinksChange) {
  // Подписка на изменения зон
  const unsubZones = onSnapshot(doc(db, CONFIG_COLLECTION, ZONES_DOC), (snap) => {
    if (snap.exists()) {
      const { data, version } = snap.data();
      console.log('[Config] Zones updated, version:', version);
      onZonesChange(data, version);
    }
  });

  // Подписка на изменения ссылок
  const unsubLinks = onSnapshot(doc(db, CONFIG_COLLECTION, LINKS_DOC), (snap) => {
    if (snap.exists()) {
      const { data, version } = snap.data();
      console.log('[Config] Links updated, version:', version);
      onLinksChange(data, version);
    }
  });

  // Возвращаем функцию отписки
  return () => {
    unsubZones();
    unsubLinks();
  };
}
