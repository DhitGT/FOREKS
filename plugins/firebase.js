// import { initializeApp } from 'firebase/app'
// import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut } from 'firebase/auth'
// import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
// import { getAnalytics } from 'firebase/analytics'

// export default ({ app }, inject) => {
//   const config = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.FIREBASE_APP_ID,
//     measurementId: process.env.FIREBASE_MEASUREMENT_ID
//   }

//   const firebaseApp = initializeApp(config)
//   const auth = getAuth(firebaseApp)
//   const db = getFirestore(firebaseApp)
//   const analytics = getAnalytics(firebaseApp)
//   const googleProvider = new GoogleAuthProvider()

//   const firestore = {
//     collection: (name) => collection(db, name),
//     getCollection: async (name) => {
//       const collectionRef = collection(db, name)
//       const querySnapshot = await getDocs(collectionRef)
//       return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
//     },
//     addDoc: async (name, data) => {
//       const collectionRef = collection(db, name)
//       return await addDoc(collectionRef, data)
//     },
//     updateDoc: async (name, id, data) => {
//       const docRef = doc(db, name, id)
//       return await updateDoc(docRef, data)
//     },
//     deleteDoc: async (name, id) => {
//       const docRef = doc(db, name, id)
//       return await deleteDoc(docRef)
//     }
//   }

// // asdkjahskjhajshcjahcjahcjhacsajsbc

//   inject('firebase', { auth, firestore, analytics, googleProvider, signInWithPopup, signInWithEmailAndPassword, signOut })
// }


