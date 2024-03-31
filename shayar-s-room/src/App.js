import React, {useRef , useState} from 'react';
import './App.css';

// Import the required modules individually
// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
import 'firebase/compat/analytics'

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth'
import { getAuth } from 'firebase/auth';


 import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// import { getAnalytics } from 'firebase/analytics';


import {useAuthState} from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// Your Firebase configuration
const firebaseConfig = {
  //config
  apiKey: "AIzaSyBMcIJKDfFhSxvRqOTXjgrhGDT5kGoAfWk",
  authDomain: "shayar-s-room.firebaseapp.com",
  projectId: "shayar-s-room",
  storageBucket: "shayar-s-room.appspot.com",
  messagingSenderId: "30808715510",
  appId: "1:30808715510:web:a13ae7df1326322dbb7cd7",
  measurementId: "G-JR4ZRZD11M"
}

// Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
// const auth = getAuth(firebaseApp);
// const firestore = getFirestore(firebaseApp);
// // const analytics = getAnalytics(firebaseApp);


firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

const auth = getAuth(firebase);

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>Jai shree hanuman</h1>
        <SignOut />

      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}


function SignIn() {


  // const signInWithGoogle = () => {
  //   const provider = new auth.GoogleAuthProvider();
  //   auth.signInWithPopup(provider);
  // }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Handle successful sign-in
      console.log(result.user);
    } catch (error) {
      // Handle error
      console.error(error.message);
    }
  };


  return(
    <>
    <button className='sign-in' onClick={signInWithGoogle}>Sign in with google</button>
    <p>Do not violate the community guidelines or you will be banned!</p>

    </>
  )
}

function SignOut() {
  return auth.currentUser && (

    <button className='sign-out' onClick={() => auth.signOut}>Sign Out</button>
  )
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
   firestore.collection('messages');
  const query= messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firestore.FieldValue.serverTimestamp(), uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth'});
  }

  return (
    <>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)}  placeholder="say something nice" />

    <button type='submit' disabled={!formValue}></button>

    </form>

    </>
  )
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
  
  <div className={`message ${messageClass}`}>
  <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt='img-unavailable' />

  <p>{text}</p>

  </div>
  </>)
}

export default App;
