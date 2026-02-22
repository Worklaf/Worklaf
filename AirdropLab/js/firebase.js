// Firebase конфигурация
const firebaseConfig = {
    apiKey: "AIzaSyBdXGYg2t8DJBrQHCC80-pFerZU9PWmSCk",
    authDomain: "testnet-hub.firebaseapp.com",
    projectId: "testnet-hub",
    storageBucket: "testnet-hub.firebasestorage.app",
    messagingSenderId: "497813176653",
    appId: "1:497813176653:web:089188fdd1555d76cd7704"
};

// Инициализация Firebase
let app, auth, db;

function initFirebase() {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
}

// Экспорт модулей
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { firebaseConfig, initFirebase };
}
