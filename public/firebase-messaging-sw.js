// Your web app's Firebase configuration
importScripts("https://www.gstatic.com/firebasejs/9.18.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.18.0/firebase-messaging-compat.js");



const firebaseConfig = {
    apiKey: "AIzaSyAebqGxjbCW46VJOqFxBTi-ksHFwqhwQWY",
    authDomain: "notificaciones-e06b7.firebaseapp.com",
    projectId: "notificaciones-e06b7",
    storageBucket: "notificaciones-e06b7.appspot.com",
    messagingSenderId: "897744081306",
    appId: "1:897744081306:web:67308843f1ab2b10d32a23"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging(app);

messaging.onBackgroundMessage(payload =>{
    console.log("Recibiste mensaje");
    console.log(payload);
    const notificationTitle = payload.motification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "./logo192.png"
    };
    return self.ServiceWorkerRegistration.showNotification(
        notificationTitle,
        notificationOptions
    )
})