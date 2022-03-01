// Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBn0GY_S3cEtrYzFRu0cCeQrQCi1ZQQMbk",
        authDomain: "prueba-web-5f9f0.firebaseapp.com",
        projectId: "prueba-web-5f9f0",
        storageBucket: "prueba-web-5f9f0.appspot.com",
        messagingSenderId: "97164636430",
        appId: "1:97164636430:web:bc4c0f910f9ac32cb0275f"
   };
   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
   const db = firebase.firestore();
   const createUser = (user) => {
     db.collection("users")
       .add(user)
       .then((docRef) => console.log("Document written with ID: ", docRef.id))
       .catch((error) => console.error("Error adding document: ", error));
   };

   //Sortzeko
   document.getElementById("crear").addEventListener("click", () => {
    let sNombre = document.getElementById('txtNombre');
    let sEmail = document.getElementById('txtEmail');
    let sMsg = document.getElementById('txtMsg');
    let sUrl = document.getElementById('txtURL');
     createUser({
       nombre: sNombre.value,
       email: sEmail.value,
       msg: sMsg.value,
       url: sUrl.value,
     });
   });
   //Zabaldu zerrenda osoa
   document.getElementById('mostrar').addEventListener("click", () => {
    db.collection("users").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
      });
    });
   });
  
   //Ezabatu guztiak
   document.getElementById('borrar').addEventListener("click", () => {
    let usersRef = db.collection("users");
    let busca = usersRef.where("nombre", "!=", "");
    busca.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " + ", doc.data());
        let tempBorra = doc.id;
        db.collection("users").doc(tempBorra).delete().then(() => {
          console.log("Document successfully deleted!");
        }).catch((error) => {
          console.error("Error removing document: ", error);
        });
      });
    })
    .catch((error) => {
      console.log("Error buscando: ", error);
    });
  });

   //Ezabatu 1
   document.getElementById('borrarOne').addEventListener("click", () => {
    let tempBorra = prompt("Usuario a borrar:");
    let usersRef = db.collection("users");
    let busca = usersRef.where("nombre", "==", tempBorra);
    console.log(tempBorra);
    busca.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " + ", doc.data());
        tempBorra = doc.id;
        db.collection("users").doc(tempBorra).delete().then(() => {
          console.log("Document successfully deleted!");
        }).catch((error) => {
          console.error("Error removing document: ", error);
        });
      });
    })
    .catch((error) => {
      console.log("Error buscando: ", error);
    });
  });

   const readAllUsers = (born) => {
    db.collection("users")
      .where("born", "==", born)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
        });
      });
  };
   //readAllUsers(1224)
   // Read ONE
   function readOne(id) {
     db.collection("users")
       .doc(id)
       .get()
       .then((doc) => {
         if (doc.exists) {
           console.log("Document data:", doc.data());
         } else {
           // doc.data() will be undefined in this case
           console.log("No such document!");
         }
       })
       .catch((error) => {
         console.log("Error getting document:", error);
       });
   }
   //readOne("690WYQfTZUoEFnq5q1Ov");


   // Autenticación

//let provider = new firebase.auth.GoogleAuthProvider(); //Google
    //Permisos adicionales
   //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
   //firebase.auth().languageCode = 'eu';
// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();


//Para acceder con una ventana emergente, llama a signInWithPopup

  //firebase.auth().signInWithRedirect(provider);


  //Luego, para recuperar el token de OAuth del proveedor de Google, 
      //puedes llamar a getRedirectResult cuando se cargue tu página:
  firebase.auth()
  .getRedirectResult()
  .then((result) => {
    if (result.credential) {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // ...
    }
    // The signed-in user info.
    var user = result.user;
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

   const signUpUser = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        let user = userCredential.user;
        console.log(`se ha registrado ${user.email} ID:${user.uid}`)
        alert(`se ha registrado ${user.email} ID:${user.uid}`)
        // ...
        // Guarda El usuario en Firestore
        createUser({
          id:user.uid,
          email:user.email,
          message:"Hola que tal"
        });
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log("Error en el sistema"+error.message);
      });
  };
  //"alex@demo.com","123456"
  document.getElementById("form1").addEventListener("submit",function(event){
      event.preventDefault();
      let email = event.target.elements.email.value;
      let pass = event.target.elements.pass.value;
      let pass2 = event.target.elements.pass2.value;
      pass===pass2?signUpUser(email,pass):alert("error password");
  })

  const signInUser = (email,password) =>{
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        let user = userCredential.user;
        console.log(`se ha logado ${user.email} ID:${user.uid}`)
        alert(`se ha logado ${user.email} ID:${user.uid}`)
        console.log(user);
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
      });
}

document.getElementById("form2").addEventListener("submit",function(event){
  event.preventDefault();
  let email = event.target.elements.email2.value;
  let pass = event.target.elements.pass3.value;
  signInUser(email,pass)
})
document.getElementById("btBesteLogin").addEventListener("click", () => {
  let provider = new firebase.auth.GoogleAuthProvider(); //Google
  firebase.auth() //Login a través de Google
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });
})

const signOut = () => {
  let user = firebase.auth().currentUser;
  firebase.auth().signOut().then(() => {
      console.log("Sale del sistema: "+user.email)
    }).catch((error) => {
      console.log("hubo un error: "+error);
    });
}
document.getElementById("salir").addEventListener("click", signOut);

// Listener de usuario en el sistema// Controlar usuario logado
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(`Está en el sistema:${user.email} ${user.uid}`);
  } else {
    console.log("no hay usuarios en el sistema");
  }
});



   /*
<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBn0GY_S3cEtrYzFRu0cCeQrQCi1ZQQMbk",
    authDomain: "prueba-web-5f9f0.firebaseapp.com",
    projectId: "prueba-web-5f9f0",
    storageBucket: "prueba-web-5f9f0.appspot.com",
    messagingSenderId: "97164636430",
    appId: "1:97164636430:web:bc4c0f910f9ac32cb0275f"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
</script>
*/