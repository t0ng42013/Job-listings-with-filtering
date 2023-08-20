//traer el json
fetch("../assets/data.json")
  .then((response) => response.json())
  .then((datos) => {
    // Aquí tienes acceso a los datos como un objeto JSON

    //Traer el  container del DOM
    const container = document.getElementById("container");
    let filtrosActivos = [];
    datos.forEach((dato) => {
      // Destructuración para obtener las propiedades del objeto
      const {
        company,
        logo,
        new: isNew,
        featured,
        position,
        role,
        level,
        postedAt,
        contract,
        location,
        languages,
        tools,
      } = dato;

      //funcion  para el array de language
      const languageHTML = languages
        .map((lang) => {
          return `<li>${lang}</li>`;
        })
        .join("");

      //funcion  para el array de tools
      const toolsHTML = tools
        .map((tool) => {
          return `<li>${tool}</li>`;
        })
        .join("");

      //funcion para true o false de new y features
      const newHTML = isNew
        ? '<span class="user__company__new">New</span>'
        : "";
      const featuredHTML = featured
        ? '<span class="user__company__feat">Featured</span>'
        : "";

      //funcion seleccionar card por li

      //   const cardSelection =

      //************************************************************************* */
      // Crear el HTML de la card
      const card = `
         <div  class="card__container">
                        <div  class="card__user">

                            <figure  class="user__logo">
                                <img class="logo" src="${
                                  "./assets" + logo.slice(1)
                                }" alt="${company}">
                            </figure>

                            <div class="card__user__info">
                                <div class="user__company">
                                    <div class="user__company__name">${company}</div>
                                    <div class="user__company__not">
                                        ${newHTML}
                                        ${featuredHTML}
                                    </div>
                                </div>

                                <h2 class="user__position">${position}</h2>

                                <div class="user__job">
                                    <span class="user__posted">${postedAt}</span>
                                    <p class="user__contract">${contract}</p>
                                    <span class="user__location">${location}</span>
                                </div>
                            </div>
                        </div>

                        <div class="card__tools">
                            <ul>
                                <li>${role}</li>
                                <li>${level}</li>
                                ${languageHTML}
                                ${toolsHTML}
                            </ul>
                        </div>
                    </div>
                    `;

      // Agregar la card al contenedor
      container.innerHTML += card;

      //funcion filtro
      const cardFilerSelection = document.querySelector(".card__container"); //selector card del li
      const cardsSections = document.querySelectorAll(".card__container"); //selector todos los cards
      const liC = document.querySelectorAll(".card__tools li");
      const lifilter = document.querySelector(".filter__list ul");
      const btnClear = document.querySelector(".filter__clear");

      liC.forEach((li) =>
        li.addEventListener("click", () => {
          //guardo el click
          const liSelect = li.textContent;

          //recorro el json para filtar los li distintos
          //obtengo los objetos que quiero esconder del listado usando el id
          const arrayObjetos = datos.filter((dato) => {
            //retorna los array que tienen el li selecionado diferente
            return (
              dato.role !== liSelect &&
              dato.level !== liSelect &&
              !dato.languages.some((lang) => lang === liSelect) &&
              !dato.tools.some((tool) => tool === liSelect)
            );
          });

          //obtener id para ocultar
          const arrayID = arrayObjetos.map((dato) => {
            let obtenerIdArray = dato.id - 1;
            return obtenerIdArray;
          });
          filtrosActivos.push(arrayID);
          console.log(filtrosActivos);

          //ocultar card
          cardsSections.forEach((card, index) => {
            if (arrayID.includes(index)) {
              card.classList.add("inactive");
            } else {
              card.style.display = "flex";
            }
          });
          //************ */
          const nuevoContenido = liSelect;
          const listaLi = document.querySelectorAll(".filter__list li");

          // Verificar si el contenido ya existe en la lista
          const contenidoRepetido = Array.from(listaLi).some(
            (li) => li.firstChild.textContent.trim() === nuevoContenido
          );

          // Si el contenido no está repetido, agregamos el nuevo <li> a la lista
          if (!contenidoRepetido) {
            const nuevoLi = document.createElement("li");
            nuevoLi.innerHTML = ` ${liSelect} <span class="close">X</span> `;
            lifilter.appendChild(nuevoLi);
          }
          //borrar element filtrado
          //cerrar span filtro
          // Obtener los elementos que contienen un <span> como último hijo en la lista

          const nodeSpan = document.querySelectorAll(".close");//!btn span para cerrar
          const arrayNombreSpan = Array.from(nodeSpan).map((span) =>
            span.parentNode.firstChild.textContent.trim());
          console.log(arrayNombreSpan);

          

              const btnClose = Array.from(nodeSpan).forEach((span) =>
                span.addEventListener("click", () => {
                  const spanSelect = span.parentNode.firstChild.textContent.trim();
                  const spanIndex = arrayNombreSpan.indexOf(spanSelect);
                  filtrosActivos.splice(spanIndex,1);
                   console.log(filtrosActivos);
                  console.log(spanIndex)
                    span.parentNode.remove();

                    console.log('JJJ')

              //************************************** */
              //mostrar tdo y despues
              //buscar array activos y ocultar por el filtro
              //obtener nombre del span y buscar en el array datos el objeto
              cardsSections.forEach((card) =>
                card.classList.remove("inactive")
              );
            })
          );

          //boton limpia card y filtros
          btnClear.addEventListener("click", () => {
            cardsSections.forEach((card) => {
              card.classList.remove("inactive");
              Array.from(nodeSpan).forEach((span) => span.parentNode.remove());
            });
          });
          //************ */
        })
      ); //fin de li selector
    }); //fin foreach datos
  })
  .catch((error) => console.error("Error al cargar el archivo JSON:", error));
