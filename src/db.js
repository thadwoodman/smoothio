// Get a Firestore instance
const firebase = require('firebase');
const db = firebase.initializeApp({ projectId: 'smoothio' }).firestore();
export { db };
