//traer datos
fetch("../assets/data.json")
  .then((response) => response.json())
  .then((data) => {
    const CardContainer = document.getElementById("Cards__container");
    const filtersContainer = document.querySelector(".filter__list ul");
    const clearBtn = document.querySelector(".filter__clear");
    let listaLi = Array.from(document.querySelectorAll(".filter__list li"));

    let OptionFilter = [];
    let arrayFil = [];
    let filterList = [];
    let filtradoN = [];

    const createTool = (tools) => {
      return tools.map((tool) => `<li>${tool}</li>`).join(""); // Utiliza map para crear una lista de elementos <li>
    };

    const createLanguage = (languages) => {
      return languages.map((lang) => `<li>${lang}</li>`).join(""); // Utiliza map para crear una lista de elementos <li>
    };

    const createNew = (New) => {
      return New ? '<span class="user__company__new">New</span>' : "";
    };

    const creteFeatures = (features) => {
      return features
        ? '<span class="user__company__feat">Featured</span>'
        : "";
    };

    //correcion de la ruta img
    data.forEach((dato) => (dato.logo = "./assets".concat(dato.logo.slice(1))));

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

    const renderCards = (cards) => {
      CardContainer.innerHTML = cards.map((dato) => createCard(dato)).join("");
      OptionFilter = Array.from(document.querySelectorAll("li")); //busco todos los li
    };
    renderCards(data);

    const targetSelector = () => {
      OptionFilter.forEach((li) => li.addEventListener("click", dameTarget)); //le doy un evento a cada li
    };

    const dameTarget = (e) => {
      //me devuelvo el valor del target
      const target = e.target.textContent;
      if (target === "X") return;
      filterCard(target);
    };
    targetSelector();

    const filterCard = (target) => {
     console.log(arrayFil)
      if (!arrayFil.length) {
        arrayFil = data.filter(
          (dato) =>
          dato.level === target ||
          dato.role === target ||
          dato.languages.includes(target) ||
          dato.tools.includes(target)
          );
          listaLi.push(target); //agrego li al filtro
          filtradoN.push(arrayFil);
          renderCards(arrayFil);
          renderFiltro(target);
          targetSelector();
          btnClose();
          return;
        }
        
        if (!isValidFilter(target)) return;
        
        arrayFil = arrayFil.filter(
          (dato) =>
          dato.level === target ||
          dato.role === target ||
          dato.languages.includes(target) ||
          dato.tools.includes(target)
          );
          listaLi.push(target);
          filtradoN.push(arrayFil);
          renderCards(arrayFil);
          renderFiltro(target);
          targetSelector();
          btnClose();
    };       
        
        const renderFiltro = (target) => {
          if (target === "X") return;
          return (filtersContainer.innerHTML += `<li class="">${target}<span class="close">X</span> </li> `);
        };
        
        const isValidFilter = (target) => {      
         if (listaLi.includes(target)) return;
         if (arrayFil.length <= 2) return;
         return true;
       };

         const btnClose = () => {
           filterList = Array.from(document.querySelectorAll(".close"));
           filterList.forEach((item) =>
           item.addEventListener("click", cerrarFiltro)
           );
         };

    const cerrarFiltro = (event) => {
      const liToRemove = event.target.closest("li"); // Encuentra el elemento <li> padre más cercano

      if (liToRemove) {
        const filterText = liToRemove.textContent.trim().replace("X", ""); //extraigo el textContent

        let indexDelete = listaLi.indexOf(filterText);//busco el index a borrar
        listaLi = listaLi.filter((nombre) => !nombre.includes(filterText)); //cuando click obtengo la lista de string
        
        if (!listaLi.length) {        
          //si no tengo filtro render todo
           renderCards(data);
           arrayFil = [];
           targetSelector();
           btnClose();
           filtersContainer.innerHTML = "";
        } else {
            for (let i = 0; i < filtradoN.length; i++) {
                if (i === indexDelete) {
                 continue; // Salta esta iteración si es el índice a eliminar
                }
                console.log(arrayFil);
                arrayFil = filtradoN[i];
                renderCards(arrayFil);
            }

          filtradoN.splice(indexDelete, 1); // Elimina el sub-array en indexDelete                                 

          filtersContainer.innerHTML = "";
            listaLi.forEach(
            (li) =>(filtersContainer.innerHTML += `<li class="">${li}<span class="close">X</span> </li> `)
           );
       
           targetSelector();
           btnClose();
        }

       
      }
    };

    const clearAll = () => {
      //borrar todos los filtro
      renderCards(data);   
       arrayFil = [];
       listaLi = [];
       filtradoN = [];
      filtersContainer.innerHTML = "";
      targetSelector();
    };
    clearBtn.addEventListener("click", clearAll);
  })
  .catch((error) => console.error("Error al cargar el archivo JSON:", error));
