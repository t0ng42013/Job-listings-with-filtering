const CardContainer = document.getElementById("Cards__container");
const filtersContainer = document.querySelector(".container");
const btnDeleteFilter = document.querySelector(".filter__clear");
const ulFilter = Array.from(document.querySelectorAll(".filter__list ul"));



//traer datos
fetch("../assets/data.json")
  .then((response) => response.json())
  .then((data) => {
   
    datos = data; // Almacena los datos en la variable global para que otras funciones puedan acceder a ellos
    
    data.forEach((dat) => { //  Correcion de ruta de los logos
      dat.logo = "./assets".concat(dat.logo.slice(1));
    });
    generar(datos)
    renderCards(); // Llama a la función para renderizar las tarjetas una vez que los datos estén disponibles
})
  .catch((error) => console.error("Error al cargar el archivo JSON:", error));

  // ************************************************************************************************

const createTool = (tools) => {
  return tools.map((tool) => `<li>${tool}</li>`).join(""); // Utiliza map para crear una lista de elementos <li>
};

const createLanguage = (languages) => {
  return languages.map((lang) => `<li>${lang}</li>`).join(""); // Utiliza map para crear una lista de elementos <li>
};

const createNew = (New) => {
 return New ?'<span class="user__company__new">New</span>': '';
};

const creteFeatures = (features) =>{
    return features ? '<span class="user__company__feat">Featured</span>' : "";
};

//CREAR HTML CONTENT
const createCard = (card) => {
 
  const toolsHTML = createTool(card.tools);
  const langsHTML = createLanguage(card.languages);
  const newHTML = createNew(card.new);
  const featuredHTML = creteFeatures(card.featured);

  return `
         <div  class="card__container">
                        <div  class="card__user">

                            <figure  class="user__logo">
                                <img class="logo" src="${card.logo}" alt="">
                            </figure>

                            <div class="card__user__info">
                                <div class="user__company">
                                    <div class="user__company__name">Photosnap</div>
                                    <div class="user__company__not">
                                        ${newHTML}
                                        ${featuredHTML}
                                    </div>
                                </div>

                                <h2 class="user__position">${card.company}</h2>

                                <div class="user__job">
                                    <span class="user__posted">${card.postedAt}</span>
                                    <p class="user__contract">${card.contract}</p>
                                    <span class="user__location">${card.location}</span>
                                </div>
                            </div>
                        </div>

                        <div class="card__tools">
                             <ul id="tools__list">                            
                               ${toolsHTML} <!-- Inserta la lista de herramientas generada por createTool -->
                               ${langsHTML}                               
                               <li>${card.level}</li>
                               <li>${card.role}</li>
                             </ul>
                        </div>
                    </div>
        `;
};

const renderCards = () => {
  
  // CardContainer.innerHTML = datos.map((dato) => createCard(dato)).join(""); // Utiliza map para crear una lista de tarjetas
  
 
  const ulList = Array.from(document.querySelectorAll(".card__tools ul li"));


  targetLi(ulList);

};
//******************************************************************************* */
const generar = (a) => {
  CardContainer.innerHTML = a.map((dato) => createCard(dato)).join(""); // Utiliza map para crear una lista de tarjetas
};

const targetLi = (a) => {
  
  a.forEach((a) => a.addEventListener("click", (e) => {
    const filterValue =  e.target.textContent;
    filterCard(filterValue);   
    addTagFilter(filterValue);
    console.log(addTagFilter(filterValue))
    console.log(ulFilter)
  }))
};

const filterCard = (filterValue) => {
  const filterDatos = datos.filter((dato) => {
      return (
      dato.role === filterValue ||
      dato.level === filterValue ||
      dato.tools.includes(filterValue)||
      dato.languages.includes(filterValue)
    );
  });

  // CardContainer.innerHTML = filterDatos.map(dato => createCard(dato)).join("");
  generar(filterDatos); //cambiar nombre funcion generadora de html
  renderCards();
  console.log(filterDatos);
};


const addTagFilter = (filterValue) =>{
  console.log(filterValue)
  
  return ulFilter.innerHTML += `<li>${filterValue}</li>`;
};
const init = () => {
  
  
};
init();
