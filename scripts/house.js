



// Posts
if (typeof(Storage) !== "undefined") {
  // LocalStorage disponible

const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const loginCheck = (user) => {
  if (user) {
    loggedInLinks.forEach((link) => (link.style.display = "block"));
    loggedOutLinks.forEach((link) => (link.style.display = "none"));
  } else {
    loggedInLinks.forEach((link) => (link.style.display = "none"));
    loggedOutLinks.forEach((link) => (link.style.display = "block"));
  }
};

// Logout
const logout = document.querySelector("#logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("signup out");
  });
  window.location.href = "/";
});

  const houseID = localStorage.getItem("house");
  console.log(houseID);
  const postList = document.querySelector(".posts");
  const setupPosts = (data) => {
    if (data.length) {
      let html = "";
      console.log(data)
      data.forEach((doc) => {
        if(houseID === doc.id){
          const post = doc.data();
          const li = `
          <div class="col-12 col-md-6 d-flex">
            <img src="${post.imgCasa}" class="img-fluid align-selft-center">
          </div>
          <div class="col-12 col-md-6 text-white">
            <h5>${post.title}</h5>
            <strong>Dirección</strong>
            <p>${post.address}</p>
            <strong>Caracteristicas</strong>
            <p>${post.description}</p>
            <strong>Precio</strong>
            <p>$${post.price.toLocaleString('en-US')}</p>
            <a class="btn btn-block btn-success mt-3">Estoy Interesado!</a>
            <a class="btn btn-block btn-primary mt-3">Iniciar Recorrido Virual</a>
            <a class="btn btn-block btn-info mt-3">Consultar Servicios de Customización</a>
          </div>
        `;
          html += li;
        }
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

} else {
  // LocalStorage no soportado en este navegador
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const loginCheck = (user) => {
  if (user) {
    loggedInLinks.forEach((link) => (link.style.display = "block"));
    loggedOutLinks.forEach((link) => (link.style.display = "none"));
  } else {
    loggedInLinks.forEach((link) => (link.style.display = "none"));
    loggedOutLinks.forEach((link) => (link.style.display = "block"));
  }
};

// Logout
const logout = document.querySelector("#logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("signup out");
  });
  window.location.href = "/";
});




  const postList = document.querySelector(".posts");
  const setupPosts = (data) => {
    if (data.length) {
      let html = "";
      data.forEach((doc) => {
        const post = doc.data();
        const li = `
        <li class="list-group-item list-group-item-action">
          <h5>${post.title}</h5>
          <img src="${post.imgCasa}" class="img-fluid">
          <p>${post.description}</p>
          <a class="btn btn-block btn-success mt-3">Estoy Interesado!</a>
        </li>
      `;
        html += li;
      });
      postList.innerHTML = html;
    } else {
      postList.innerHTML = '<h4 class="text-white text-center">Bienvenido a Venta Inmobiliaria</h4>';
    }
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
}



