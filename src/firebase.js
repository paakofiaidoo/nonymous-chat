import { initializeApp } from "firebase/app";
// import { getAnalytics, logEvent } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = analytics.isSupported() ? getAnalytics(app) : null;

// const analytics = getAnalytics(app)
// console.log(analytics);
// const logEventFun = (opt) => {
//     logEvent(analytics, opt);
// }

const db = getDatabase(app);

export { db };