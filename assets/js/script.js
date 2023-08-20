const container = document.getElementById("container");
const filtrado = document.querySelector(".filter ul");
let Datos;
let liSeleccion;
// Si el archivo JS está en la carpeta "scripts"
fetch("../assets/data.json")
  .then((response) => response.json())
  .then((datos) => {
    // Aquí puedes trabajar con los datos del JSON

    Datos = datos;
    datos.forEach((datos) => {
      //crear todas las etiquetas donde se ubica la imagen
      const cardContainer = document.createElement("div");
      cardContainer.classList.add("card__container");
      const cardUser = document.createElement("div");
      //agrego la clase para los estilos
      cardUser.classList.add("card__user");

      const userLogoFig = document.createElement("figure");
      userLogoFig.classList.add("user__logo");
      //creamos una etiqueta para la imagen
      const imagen = document.createElement("img");
      imagen.classList.add("logo");
      //modificamos la direccion i guardamos en la etiqueta creada
      imagen.src = "./assets" + datos.logo.slice(1);
      //insertamos la imagen en el DOM con el contenedor que trajimos

      userLogoFig.appendChild(imagen);
      cardUser.appendChild(userLogoFig);
      cardContainer.appendChild(cardUser);
      container.appendChild(cardContainer);
      //etiquetas nombre de la compania card__user>card__user__info>user__company>user__company__name+user__company__not

      const cardUserDiv = document.createElement("div");
      cardUserDiv.classList.add("card__user");
      const cardUserInfoDiv = document.createElement("div");
      cardUserInfoDiv.classList.add("card__user__info");
      const UserCompDiv = document.createElement("div");
      UserCompDiv.classList.add("user__company");
      const UserCompNameDiv = document.createElement("div");
      UserCompNameDiv.classList.add("user__company__name");
      const UsercompNotDiv = document.createElement("div");
      UsercompNotDiv.classList.add("user__company__not");
      const userCNew = document.createElement("span");
      userCNew.classList.add("user__company__new");
      const userCFeat = document.createElement("span");
      userCFeat.classList.add("user__company__feat");

      UserCompNameDiv.textContent = datos.company;
      //verificar los booleans
      userCNew.textContent = datos.new ? "New" : "";
      userCFeat.textContent = datos.featured ? "Featured" : "";
      //en caso de false eliminar las clases
      if (userCFeat.textContent == "") {
        userCFeat.classList.remove("user__company__feat");
      }
      if (userCNew.textContent == "") {
        userCNew.classList.remove("user__company__new");
      }

      UsercompNotDiv.appendChild(userCNew);
      UsercompNotDiv.appendChild(userCFeat);
      UserCompDiv.appendChild(UserCompNameDiv);
      UserCompDiv.appendChild(UsercompNotDiv);
      cardUserInfoDiv.appendChild(UserCompDiv);
      cardUser.appendChild(cardUserInfoDiv);

      const userPosition = document.createElement("h2");
      userPosition.classList.add("user__position");

      userPosition.textContent = datos.position;

      cardUserInfoDiv.appendChild(userPosition);

      const userJob = document.createElement("div");
      userJob.classList.add("user__job");
      const userPosted = document.createElement("span");
      userPosted.classList.add("user__posted");
      const userContract = document.createElement("p");
      userContract.classList.add("user__contract");
      const userlocation = document.createElement("span");
      userlocation.classList.add("user__location");

      userPosted.textContent = datos.postedAt;
      userContract.textContent = datos.contract;
      userlocation.textContent = datos.location;

      userJob.appendChild(userPosted);
      userJob.appendChild(userContract);
      userJob.appendChild(userlocation);
      cardUserInfoDiv.appendChild(userJob);

      const cardTools = document.createElement("div");
      cardTools.classList.add("card__tools");
      const cardToolsUl = document.createElement("ul");

      cardToolsUl.innerHTML = `
      <li>${datos.role}</li>
      <li>${datos.level}</li>
      `;

      const li = document.querySelectorAll("li");
      li.forEach((li) => {
        li.addEventListener("click", filtrarLista);
      });

      const span = document.querySelectorAll(".filter__list ul li span");
      span.forEach((s) => {
        s.addEventListener("click", cerrarFiltro);
      });

      datos.languages.forEach((datos) => {
        const cardToolsli = document.createElement("li");
        cardToolsli.textContent = datos;
        cardToolsUl.appendChild(cardToolsli);
      });

      datos.tools.forEach((datos) => {
        const cardToolsli = document.createElement("li");
        cardToolsli.textContent = datos;
        cardToolsUl.appendChild(cardToolsli);
      });

      cardTools.appendChild(cardToolsUl);
      cardContainer.appendChild(cardTools);
      
    });
  })
  .catch((error) => console.error("Error al cargar el archivo JSON:", error));

// traigo el ul del filtro

function filtrarLista() {
  const card = document.querySelectorAll(".card__container");
const ullist = document.querySelector('.filter__list ul');


  this.classList.add("active");
  // Crear el nuevo elemento <li>

  if(ullist.children.length === 0 ) {
   const nuevoLi = document.createElement("li");
   nuevoLi.innerHTML = ` ${this.textContent} <span>X</span> `;
   filtrado.appendChild(nuevoLi);   
  }

  
 const nuevoContenido = this.textContent.trim();
 const listaLi = document.querySelectorAll(".filter__list li");

 // Verificar si el contenido ya existe en la lista
 const contenidoRepetido = Array.from(listaLi).some(
   (li) => li.firstChild.textContent.trim() === nuevoContenido
 );

 // Si el contenido no está repetido, agregamos el nuevo <li> a la lista
 if (!contenidoRepetido) {
  const nuevoLi = document.createElement("li");
  nuevoLi.innerHTML = ` ${this.textContent} <span>X</span> `;
  filtrado.appendChild(nuevoLi);   
 }

//borrar element filtrado
//obtener span x
const listaLiArr = Array.from(listaLi);
listaLiArr.forEach((li) => {
  let span = li.querySelector("span"); // Usar querySelector dentro del li actual
  span.addEventListener("click", () => {
    li.remove(); // Eliminar el li correspondiente al span clickeado
  });
});


  // filtra las card 
  let arrayDistinto = Datos.filter((dat) => {
    return (
      dat.role !== this.textContent &&
      dat.level !== this.textContent &&
      !dat.languages.some((a) => a === this.textContent) &&
      !dat.tools.some((a) => a === this.textContent)
    );
  });
  // console.log(arrayDistinto);
  let b = arrayDistinto.map((a) => {
    c = a.id - 1;
    card[c].classList.add("inactive");
  });
}




