import localforage from 'localforage';

// Configure localForage to use IndexedDB
localforage.config({
    driver: localforage.INDEXEDDB, // Use IndexedDB for large storage
    name: 'RCC',
    version: 1.0,
    storeName: 'largeDataStore', // Store name
    description: 'Storage for large datasets in my React app',
});

export default localforage;
