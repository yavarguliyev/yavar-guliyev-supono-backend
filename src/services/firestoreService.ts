import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from '../../firebase.json';

initializeApp({ credential: cert(serviceAccount as ServiceAccount) })

const db = getFirestore();

export { db };
