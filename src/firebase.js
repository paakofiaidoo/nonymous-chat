import { initializeApp, getApps } from "firebase/app";
// import { getAnalytics, logEvent } from "firebase/analytics";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
    databaseURL : process.env.DATABASE_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = analytics.isSupported() ? getAnalytics(app) : null;

// const analytics = getAnalytics(app)
// console.log(analytics);
// const logEventFun = (opt) => {
//     logEvent(analytics, opt);
// }

const database = getDatabase(app);

export { database };