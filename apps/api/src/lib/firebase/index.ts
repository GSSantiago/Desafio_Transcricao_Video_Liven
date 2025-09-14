import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = require('../../../keys/firebaseKey.json');

const app = initializeApp({credential: cert(serviceAccount)});

const auth = getAuth(app);
 
export { auth };
export default app;