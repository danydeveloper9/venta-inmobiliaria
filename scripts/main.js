const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const carrousel = document.querySelector("#home");
const listHouse = document.querySelector("#listHouse");

const loginCheck = (user) => {
  if (user) {
    loggedInLinks.forEach((link) => (link.style.display = "block"));
    loggedOutLinks.forEach((link) => (link.style.display = "none"));
    carrousel.classList.add("d-none");
    listHouse.classList.remove("d-none");
  } else {
    loggedInLinks.forEach((link) => (link.style.display = "none"));
    loggedOutLinks.forEach((link) => (link.style.display = "block"));
    carrousel.classList.remove("d-none");
    listHouse.classList.add("d-none");
  }
};

// SignUp
const signUpForm = document.querySelector("#signup-form");
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signUpForm["signup-email"].value;
  const password = signUpForm["signup-password"].value;

  // Authenticate the User
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // clear the form
      signUpForm.reset();
      // close the modal
      $("#signupModal").modal("hide");
    });
});

// Logout
const logout = document.querySelector("#logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("signup out");
  });
});

// SingIn
const signInForm = document.querySelector("#login-form");

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signInForm["login-email"].value;
  const password = signInForm["login-password"].value;

  // Authenticate the User
  auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
    // clear the form
    signInForm.reset();
    // close the modal
    $("#signinModal").modal("hide");
  });
});

// Posts
const postList = document.querySelector(".posts");
const setupPosts = (data) => {
  if (data.length) {
    let html = "";
    console.log(data);
    data.forEach((doc) => {
      console.log(doc.id)
      const post = doc.data();
      const li = `
      <div class="card col-12 col-md-3">
        <img src="${post.imgCasa}" class="card-img-top" height="200">
        <div class="card-body">
          <h5>${post.title}</h5>
          <p>${post.description}</p>
          <a class="btn btn-block btn-primary mt-3 text-white" onclick="redirectTo('${doc.id}')">Obtener mas información</a>
        </div>
      </div>
    `;
      html += li;
    });
    postList.innerHTML = html;
  } 
  // else {
  //   postList.innerHTML = '<h4 class="text-white text-center">Bienvenido a Venta Inmobiliaria</h4>';
  // }
};

// events
// list for auth state changes
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("signin");
    fs.collection("posts")
      .get()
      .then((snapshot) => {
        setupPosts(snapshot.docs);
        loginCheck(user);
      });
  } else {
    console.log("signout");
    setupPosts([]);
    loginCheck(user);
  }
});

// Login with Google
const googleButton = document.querySelector("#googleLogin");

googleButton.addEventListener("click", (e) => {
  e.preventDefault();
  signInForm.reset();
  $("#signinModal").modal("hide");

  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then((result) => {
    console.log(result);
    console.log("google sign in");
  })
  .catch(err => {
    console.log(err);
  })
});

// Login with Facebook
const facebookButton = document.querySelector('#facebookLogin');

facebookButton.addEventListener('click', e => {
  e.preventDefault();
  signInForm.reset();
  $("#signinModal").modal("hide");

  const provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(provider).then((result) => {
    console.log(result);
    console.log("facebook sign in");
  })
  .catch(err => {
    console.log(err);
  })

})

function redirectTo(house){
  if (typeof(Storage) !== "undefined") {
    // LocalStorage disponible
    localStorage.setItem("house", house);
    window.location.href = "app/house.html"
  } else {
    // LocalStorage no soportado en este navegador
    window.location.href = "app/house.html"
  }
  console.log(house);
}