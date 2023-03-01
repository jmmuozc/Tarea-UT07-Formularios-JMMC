"use strict";

import Production from "../js/Production.js";

class videoSystemView {

    windows = new Map();

    constructor() {
        // Recogemos el main
        this.main = document.getElementsByTagName("main")[0];
    }

    /**
     * Metodo que realiza el guardado dentro del history
     * @param {Function} handler 
     * @param {*} handlerArguments 
     * @param {*} scrollElement 
     * @param {*} data 
     * @param {*} url 
     * @param {*} event 
     */
    #excecuteHandler(handler, handlerArguments, scrollElement, data, url, event) {
        handler(handlerArguments);
        $(scrollElement).get(0).scrollIntoView();
        history.pushState(data, null, url);
        event.preventDefault();
    }

    /**
     * Crea un elemento div con cada una de las categorias de la lista introducida
     * @param {Category} categoriesList 
     */
    showCategories(categoriesList) {


        if (document.getElementById("div-Contents")) this.main.removeChild(document.getElementById("div-Contents"));
        if (document.getElementById("div-categories")) this.main.removeChild(document.getElementById("div-categories"));
        // Creamos un elemento Div
        let categories = document.createElement("div");
        // Le añadimos una clase (container)
        categories.classList.add("container");
        categories.classList.add("text-center");
        categories.setAttribute("Id", "div-categories");
        this.main.appendChild(categories);

        let categoriesRow = document.createElement("div");
        categoriesRow.classList.add("row");

        categories.appendChild(categoriesRow);

        for (let category of categoriesList) {
            let categoriesColumn = document.createElement("div");
            categoriesColumn.classList.add("col");
            categoriesColumn.classList.add("category");
            categoriesColumn.setAttribute("style", `margin-top:2rem`);
            categoriesColumn.setAttribute("data-category", `${category.Name}`);
            categoriesColumn.innerHTML = `<img src='./media/categorias/${category.Name}.jpg' width=200 height=100/>
            <h3>${category.Name}</h3>`;
            categoriesRow.appendChild(categoriesColumn);
        }
    }

    /**
     * Introduce en el header una lista desordenada con las respectivas categorias dentro de la lista
     * @param {Category} categoriesList 
     */
    headerCategories(categoriesList) {
        let nav = document.getElementById("navbarUl");
        if (document.getElementById("nav-categories")) nav.removeChild(document.getElementById("nav-categories"));
        let categoriesIl = document.createElement("li");
        categoriesIl.classList.add("nav-item");
        categoriesIl.classList.add("dropdown");
        categoriesIl.setAttribute("Id", "nav-categories");
        categoriesIl.innerHTML = `<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
        aria-expanded="false">Categorias</a>`;

        nav.appendChild(categoriesIl);
        let categoriesUl = document.createElement("ul");
        categoriesUl.setAttribute("Id", "categories-ul");
        categoriesUl.classList.add("dropdown-menu");
        categoriesIl.appendChild(categoriesUl);

        for (let category of categoriesList) {
            let categoryLink = document.createElement("li");
            categoryLink.classList.add("category");
            categoryLink.setAttribute("data-category", `${category.Name}`);
            categoryLink.innerHTML = `<a class="dropdown-item" href="#Category">${category.Name}</a>`;
            categoriesUl.appendChild(categoryLink);
        }
    }

    /**
     * Muestra en div una categoria aleatoria, hasta un número de 3 veces
     * @param {Production} productionsList 
     */
    rngProductions(productionsList) {

        if (document.getElementById("div-Contents")) this.main.removeChild(document.getElementById("div-Contents"));

        // let arrayProductions=
        let arrayProductions = [];
        let rng;
        const numberProductions = 3;
        let arrayExistent = [];
        // Creamos un elemento Div
        let productionsContainer = document.createElement("div");
        // Le añadimos una clase (container)
        productionsContainer.classList.add("container");
        productionsContainer.classList.add("text-center");
        productionsContainer.setAttribute("Id", "div-Contents");
        this.main.appendChild(productionsContainer);

        for (let production of productionsList) {
            arrayProductions.push(production);
        }
        let productionsRow = document.createElement("div");
        productionsRow.classList.add("row");

        productionsContainer.appendChild(productionsRow);


        for (let i = 0; i < numberProductions; i++) {
            do {
                rng = Math.floor(Math.random() * (arrayProductions.length));
            } while (arrayExistent.includes(rng));

            arrayExistent.push(rng);
            let productionsColumn = document.createElement("div");
            productionsColumn.classList.add("col");
            productionsColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem;  margin-top:2rem;">
            <img src='./media/producciones/${arrayProductions[rng].Image}' class="card-img-top" alt="${arrayProductions[rng].Image}" width=250 height=150/>
            <div class="card-body">
              <h5 class="card-title">${arrayProductions[rng].Title}</h5>
              <a href="#ProductionCard" class="btn btn-primary production-btn" data-production='${arrayProductions[rng].Title}'>Ver</a>
              <button class="btn btn-primary production-btn-window" data-production='${arrayProductions[rng].Title}'>Ventana</button>
            </div>
          </div>`

            productionsRow.appendChild(productionsColumn);
        }
    }

    /**
     * Crea cartas de las producciones con Bootstrap de la categoria introducida y muestra el nombre de la categoria 
     * @param {Category} category 
     * @param {String} name 
     */
    showCategoriesProductions(category, name) {


        if (document.getElementById("div-categories")) this.main.removeChild(document.getElementById("div-categories"));
        if (document.getElementById("div-Contents")) this.main.removeChild(document.getElementById("div-Contents"));

        let productionsContainer = document.createElement("div");
        // Le añadimos una clase (container)
        productionsContainer.classList.add("container");
        productionsContainer.classList.add("text-center");
        productionsContainer.setAttribute("Id", "div-Contents");
        productionsContainer.innerHTML = `<h1>${name}</h1>`;
        this.main.appendChild(productionsContainer);

        let productionsRow = document.createElement("div");
        productionsRow.classList.add("row");

        productionsContainer.appendChild(productionsRow);


        for (let production of category) {
            let productionsColumn = document.createElement("div");
            productionsColumn.classList.add("col");
            productionsColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem;  margin-top:2rem;">
            <img src='./media/producciones/${production.Image}' class="card-img-top" alt="${production.Image}" width=250 height=150>
            <div class="card-body">
              <h5 class="card-title">${production.Title}</h5>
              <a href="#ProductionCard" class="btn btn-primary production-btn" data-production='${production.Title}'>Ver</a>
              <button class="btn btn-primary production-btn-window" data-production='${production.Title}'>Ventana</button>
            </div>
          </div>`
            productionsRow.appendChild(productionsColumn);
        }
    }

    /**
     * Muestra una lista de cartas de producciones, muestra si es una serie o pelicula depende del tipo
     * @param {Production} productionList 
     * @param {String} type 
     */
    showProductions(productionList, type) {


        if (document.getElementById("div-categories")) this.main.removeChild(document.getElementById("div-categories"));
        if (document.getElementById("div-Contents")) this.main.removeChild(document.getElementById("div-Contents"));

        let productionContainer = document.createElement("div");
        // Le añadimos una clase (container)
        productionContainer.classList.add("container");
        productionContainer.classList.add("text-center");
        productionContainer.setAttribute("Id", "div-Contents");
        productionContainer.innerHTML = `<h1>${type}</h1>`;
        this.main.appendChild(productionContainer);

        let productionRow = document.createElement("div");
        productionRow.classList.add("row");

        productionContainer.appendChild(productionRow);

        for (let production of productionList) {
            let productionColumn = document.createElement("div");
            productionColumn.classList.add("col");
            productionColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem;  margin-top:2rem;">
            <img src='./media/producciones/${production.Image}' class="card-img-top" alt="${production.Image}" width=250 height=150/>
            <div class="card-body">
              <h5 class="card-title">${production.Title}</h5>
              <a href="#ProductionCard" class="btn btn-primary production-btn" data-production='${production.Title}'>Ver</a>
              <button class="btn btn-primary production-btn-window" data-production='${production.Title}'>Ventana</button>
            </div>
          </div>`
            productionRow.appendChild(productionColumn);
        }
    }

    /**
     * Muestra una lista de cartas de Personas, muestra si es un actor o director depende del tipo
     * @param {Person} personList 
     * @param {String} type 
     */
    showPersonsList(personList, type) {

        if (document.getElementById("div-categories")) this.main.removeChild(document.getElementById("div-categories"));
        if (document.getElementById("div-Contents")) this.main.removeChild(document.getElementById("div-Contents"));

        let personContainer = document.createElement("div");
        // Le añadimos una clase (container)
        personContainer.classList.add("container");
        personContainer.classList.add("text-center");
        personContainer.setAttribute("Id", "div-Contents");
        personContainer.innerHTML = `<h1>${type}</h1>`;
        this.main.appendChild(personContainer);

        let personRow = document.createElement("div");
        personRow.classList.add("row");

        personContainer.appendChild(personRow);

        for (let person of personList) {
            let personColumn = document.createElement("div");
            personColumn.classList.add("col");
            personColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem; margin-top:2rem;">
            <img src='./media/personas/${person.Picture}' class="card-img-top" alt="${person.Picture}" width=250 height=250/>
            <div class="card-body">
            <h5 class="card-title"><p>${type}</p>${person.Name} ${person.FirstLastName}</h5>
            <a href="#${type}card" class="btn btn-primary person-${type}" data-person='${person.Picture}'>Conocer</a>
            <button class="btn btn-primary person-${type}-window" data-person='${person.Picture}'>Ventana</button>
            </div>
          </div>`
            personRow.appendChild(personColumn);
        }
    }

    /**
     * Crea un div de cartas de las producciones en las que está la persona introducida
     * @param {Person} person 
     * @param {Production} productionsList 
     */
    showPerson(person, productionsList) {
        if (document.getElementById("div-categories")) this.main.removeChild(document.getElementById("div-categories"));
        if (document.getElementById("div-Contents")) this.main.removeChild(document.getElementById("div-Contents"));

        let personContainer = document.createElement("div");
        // Le añadimos una clase (container)
        personContainer.classList.add("container");
        personContainer.classList.add("text-center");
        personContainer.classList.add("row");
        personContainer.setAttribute("Id", "div-Contents");
        personContainer.setAttribute("style", "margin:auto; margin-top:4rem");

        this.main.appendChild(personContainer);
        personContainer.innerHTML = `
        <div class="col">
        <img src='./media/personas/${person.Picture}' class="card-img-top" alt="${person.Picture}" width=200 height=500/>
        </div>`
            ;

        let productionContainer = document.createElement("div");
        // Le añadimos una clase (container)
        productionContainer.classList.add("container");
        productionContainer.classList.add("text-center");
        productionContainer.classList.add("col");


        productionContainer.innerHTML = `<h4>${person.Name} ${person.FirstLastName}</h4>
        <h2>${person.Born.toISOString().split("T")[0]}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquam tempor tempor. Vivamus libero mi, cursus id ullamcorper vitae, commodo nec erat. Proin iaculis odio sit amet quam aliquet, et rhoncus mi dignissim. Vestibulum sed justo nec diam mollis finibus elementum et felis. Sed lobortis risus ac tellus auctor ullamcorper.</p>`;


        // No se mete junto con el inner html
        personContainer.appendChild(productionContainer);

        let productionsRow = document.createElement("div");
        productionsRow.classList.add("row");
        productionsRow.innerHTML = "<h2>Producciones</h2>";
        productionContainer.appendChild(productionsRow);

        for (let production of productionsList) {
            let productionsColumn = document.createElement("div");
            productionsColumn.classList.add("col");
            productionsColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem; margin-top:2rem;">
            <img src='./media/producciones/${production.Image}' class="card-img-top" alt="${production.Image}" width=250 height=150/>
            <div class="card-body">
              <h5 class="card-title">${production.Title}</h5>
              <a href="#ProductionCard" class="btn btn-primary production-btn" data-production='${production.Title}'>Ver</a>
              <button class="btn btn-primary production-btn-window" data-production='${production.Title}'>Ventana</button>
            </div>
          </div>`
            productionsRow.appendChild(productionsColumn);
        }



    }

    /**
     * Crea un div de cartas de las producciones en las que está la persona introducida en una ventana
     * @param {Person} person 
     * @param {Production} productionsList 
     */
    showPersonWindow(person, productionsList, window) {
        let main = window.document.getElementsByTagName("main")[0];
        if (window.document.getElementById("div-categories")) main.removeChild(window.document.getElementById("div-categories"));
        if (window.document.getElementById("div-Contents")) main.removeChild(window.document.getElementById("div-Contents"));

        let personContainer = window.document.createElement("div");
        // Le añadimos una clase (container)
        personContainer.classList.add("container");
        personContainer.classList.add("text-center");
        personContainer.classList.add("row");
        personContainer.setAttribute("Id", "div-Contents");
        personContainer.setAttribute("style", "margin:auto; margin-top:4rem");

        main.appendChild(personContainer);
        personContainer.innerHTML = `
        <div class="col">
        <img src='./media/personas/${person.Picture}' class="card-img-top" alt="${person.Picture}" width=200 height=500/>
        </div>`
            ;

        let productionContainer = window.document.createElement("div");
        // Le añadimos una clase (container)
        productionContainer.classList.add("container");
        productionContainer.classList.add("text-center");
        productionContainer.classList.add("col");

        productionContainer.innerHTML = `<h4>${person.Name} ${person.FirstLastName}</h4>
        <h2>${person.Born.toISOString().split("T")[0]}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquam tempor tempor. Vivamus libero mi, cursus id ullamcorper vitae, commodo nec erat. Proin iaculis odio sit amet quam aliquet, et rhoncus mi dignissim. Vestibulum sed justo nec diam mollis finibus elementum et felis. Sed lobortis risus ac tellus auctor ullamcorper.</p>`;


        // No se mete junto con el inner html
        personContainer.appendChild(productionContainer);

        let productionsRow = window.document.createElement("div");
        productionsRow.classList.add("row");
        productionsRow.innerHTML = "<h2>Producciones</h2>";
        productionContainer.appendChild(productionsRow);

        for (let production of productionsList) {
            let productionsColumn = window.document.createElement("div");
            productionsColumn.classList.add("col");
            productionsColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem; margin-top:2rem;">
            <img src='./media/producciones/${production.Image}' class="card-img-top" alt="${production.Image}" width=250 height=150/>
            <div class="card-body">
              <h5 class="card-title">${production.Title}</h5>
              </div>
              </div>`
            productionsRow.appendChild(productionsColumn);
        }

        this.windows.set(person.Picture, window);
    }

    /**
     * Muestra un div de la producción introducida y añade los actores y directores participantes
     * @param {Production} production 
     * @param {Person} actors 
     * @param {Person} directors 
     */
    showProductionCard(production, actors, directors) {
        if (document.getElementById("div-categories")) this.main.removeChild(document.getElementById("div-categories"));
        if (document.getElementById("div-Contents")) this.main.removeChild(document.getElementById("div-Contents"));

        let productionContainer = document.createElement("div");
        // Le añadimos una clase (container)
        productionContainer.classList.add("container");
        productionContainer.classList.add("text-center");
        productionContainer.classList.add("row");
        productionContainer.setAttribute("Id", "div-Contents");
        productionContainer.setAttribute("style", "margin:auto; margin-top:4rem");
        this.main.appendChild(productionContainer);
        productionContainer.innerHTML = `
        <div class="col">
        <img src='./media/producciones/${production.Image}' class="card-img-top" alt="${production.Image}" width=200 height=500/>
        </div>`;


        let productionInfoContainer = document.createElement("div");
        // Le añadimos una clase (container)
        productionInfoContainer.classList.add("container");
        productionInfoContainer.classList.add("text-center");
        productionInfoContainer.classList.add("col");

        productionInfoContainer.innerHTML = `<h4>${production.Title}</h4>
        <h2>${production.Publication.toISOString().split("T")[0]}</h2>
        <p>${production.Synopsis}</p>`;

        productionContainer.appendChild(productionInfoContainer);


        let CastRow = document.createElement("div");
        CastRow.classList.add("row");
        CastRow.innerHTML = "<h2>Reparto</h2>";
        productionInfoContainer.appendChild(CastRow);

        for (let actor of actors) {
            let actorsColumn = document.createElement("div");
            actorsColumn.classList.add("col");
            actorsColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem; margin-top:2rem;">
            <img src='./media/personas/${actor.actor.Picture}' class="card-img-top" alt="${actor.actor.Picture}" width=200 height=200/>
            <div class="card-body">
              <h5 class="card-title"><p>Actor</p>${actor.actor.Name} ${actor.actor.FirstLastName}</h5>
              <a href="#ActoresCard" class="btn btn-primary person-Actores" data-person='${actor.actor.Picture}'>Conocer</a>
              <button class="btn btn-primary person-Actores-window" data-person='${actor.actor.Picture}'>Ventana</button>
            </div>
          </div>`
            CastRow.appendChild(actorsColumn);
        }
        for (let director of directors) {
            let directorsColumn = document.createElement("div");
            directorsColumn.classList.add("col");
            directorsColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem;  margin-top:2rem;">
            <img src='./media/personas/${director.director.Picture}' class="card-img-top" alt="${director.director.Picture}" width=200 height=200/>
            <div class="card-body">
              <h5 class="card-title"><p>Director</p>${director.director.Name} ${director.FirstLastName}</h5>
              <a href="#DirectoresCard" class="btn btn-primary person-Directores" data-person='${director.director.Picture}'>Conocer</a>
              <button class="btn btn-primary person-Directores-window" data-person='${director.director.Picture}'>Ventana</button>
            </div>
          </div>`
            CastRow.appendChild(directorsColumn);
        }


    }

    /**
     * Muestra la carta en una ventana nueva
     * @param {Production} production 
     * @param {Person} actors 
     * @param {Person} directors 
     * @param {Window} window 
     */
    showProductionCardWindow(production, actors, directors, window) {
        let main = window.document.getElementsByTagName("main")[0];
        if (window.document.getElementById("div-categories")) main.removeChild(window.document.getElementById("div-categories"));
        if (window.document.getElementById("div-Contents")) main.removeChild(window.document.getElementById("div-Contents"));

        let productionContainer = window.document.createElement("div");

        // Le añadimos una clase (container)
        productionContainer.classList.add("container");
        productionContainer.classList.add("text-center");
        productionContainer.classList.add("row");
        productionContainer.setAttribute("Id", "div-Contents");
        productionContainer.setAttribute("style", "margin:auto; margin-top:4rem");
        main.appendChild(productionContainer);
        productionContainer.innerHTML = `
        <div class="col">
        <img src='./media/producciones/${production.Image}' class="card-img-top" alt="${production.Image}" width=200 height=500/>
        </div>`;


        let productionInfoContainer = window.document.createElement("div");
        // Le añadimos una clase (container)
        productionInfoContainer.classList.add("container");
        productionInfoContainer.classList.add("text-center");
        productionInfoContainer.classList.add("col");

        productionInfoContainer.innerHTML = `<h4>${production.Title}</h4>
        <h2>${production.Publication.toISOString().split("T")[0]}</h2>
        <p>${production.Synopsis}</p>`;

        productionContainer.appendChild(productionInfoContainer);


        let CastRow = window.document.createElement("div");
        CastRow.classList.add("row");
        CastRow.innerHTML = "<h2>Reparto</h2>";
        productionInfoContainer.appendChild(CastRow);

        for (let actor of actors) {
            let actorsColumn = document.createElement("div");
            actorsColumn.classList.add("col");
            actorsColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem; margin-top:2rem;">
            <img src='./media/personas/${actor.actor.Picture}' class="card-img-top" alt="${actor.actor.Picture}" width=200 height=200/>
            <div class="card-body">
              <h5 class="card-title"><p>Actor</p>${actor.actor.Name} ${actor.actor.FirstLastName}</h5>
            </div>
          </div>`
            CastRow.appendChild(actorsColumn);
        }
        for (let director of directors) {
            let directorsColumn = document.createElement("div");
            directorsColumn.classList.add("col");
            directorsColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem;  margin-top:2rem;">
            <img src='./media/personas/${director.director.Picture}' class="card-img-top" alt="${director.director.Picture}" width=200 height=200/>
            <div class="card-body">
              <h5 class="card-title"><p>Director</p>${director.director.Name} ${director.director.FirstLastName}</h5>
    
            </div>
          </div>`
            CastRow.appendChild(directorsColumn);
        }

        this.windows.set(production.Title, window);
    }

    productionForm(categoryList, actorList, directorList) {
        let form = document.getElementById("formModal");
        form.innerHTML = ` <div class="container" id="cValidation" >
        <h1 class="display-5">Producciones</h1>
        <form name="fValidation" role="form" id="form-validation">
          <!-- Requiered -->
          <div class="form-row">
          <div class="row">
            <div class="col-md-4 mb-3 w-50">
              <label for="type">Tipo</label>
              <div class="input-group">
                
                <select class="form-select" aria-label="Default select example" id="type" name="type">
                  <option selected value="Serie">Serie</option>
                  <option value="Movie">Pelicula</option>
                </select>
              </div>
            </div>
            <div class="col-md-4 mb-3 w-50" >
              <label for="vfTitulo">Título *</label>
              <div class="input-group">
                    
                <input type="text" class="form-control" id="vfTitle" name="vfTitle" placeholder="Titulo"
                  aria-describedby="titlePrepend" value="" required>
                <div class="invalid-feedback">El Título es obligatorio.</div>
                <div class="valid-feedback">Correcto.</div>
              </div>
            </div>
            </div>
            <div class="col-md-4 mb-3 w-50" >
            <div class="input-group">
            <input class="form-check-input" type="checkbox" value="" id="CheckDelete">
            <label class="form-check-label ms-1" for="CheckDelete">
              Eliminar
            </label>
            </div>
            </div>
            <div class="row">
            <div class="col-md-4 mb-3 w-50">
              <label for="vfPublication">Publicación *</label>
              <div class="input-group">
                                
                <input type="date" class="form-control" id="vfPublication" name="vfPublication"
                  placeholder="" aria-describedby="publicationPrepend" value="" required>
                <div class="invalid-feedback">La fecha de publicación es obligatoria.</div>
                <div class="valid-feedback">Correcto.</div>
              </div>
            </div>
            <div class="col-md-4 mb-3 w-50">
              <label for="Nationality">Nacionalidad</label>
              <div class="input-group">
                                 
                <input type="text" class="form-control" id="Nationality" name="Nationality"
                  placeholder="ES/FR/GB/RU/US" aria-describedby="nationalityPrepend" value="">
              </div>
            </div>
            </div>
            </div>
          </div>
          <!-- Datos -->
          <div class="form-row" id="dinamicHolder">
          <div class="row">
            <div class="col-md-4 mb-3 w-100">
              <label for="Synopsis">Sinopsis</label>
              <div class="input-group">        
                <textarea type="text" class="form-control" id="Synopsis" name="Synopsis"
                 aria-describedby="synopsisPrepend" rows="9"></textarea>
              </div>
            </div>
            <div class="col-md-4 mb-3 w-100">
              <label for="Image">Imagen</label>
              <div class="input-group">
                
                <input type="file" class="form-control" id="Image" name="Image" aria-describedby="imagePrepend">
              </div>
          </div>
          </div>
          
        </form>
      </div>`;

        let dinamicHolder = document.getElementById("dinamicHolder");
        let dinamicContents = document.createElement("div");
        dinamicContents.classList.add("row");
        dinamicContents.innerHTML = `<div class="col-md-4 mb-3 w-50">
        <label for="Director">Directores</label>
        <div class="input-group">
        <select class="form-select" multiple aria-label="multiple select example" id="directorSelect">

        </select>
        </div>
        </div>
        <div class="col-md-4 mb-3 w-50">
        <label for="Actor">Actores</label>
        <div class="input-group">
        <select class="form-select" multiple aria-label="multiple select example" id="actorSelect">

        </select>
        </div>
        </div>
        <div class="col-md-4 mb-3 w-50">
        <label for="Category">Categorias</label>
        <div class="input-group">
        <select class="form-select" multiple aria-label="multiple select example" id="categorySelect">

        </select>
        </div>
        </div>
        <button type="submit" class="btn btn-primary">Crear</button>`;

        dinamicHolder.appendChild(dinamicContents);

        let dinamicDirectors = document.getElementById("directorSelect");
        for (let director of directorList) {
            let option = document.createElement("option");
            option.setAttribute("value", director.Picture);
            option.innerText = `${director.Name} ${director.FirstLastName}`;
            dinamicDirectors.appendChild(option);
        }

        let dinamicActors = document.getElementById("actorSelect");
        for (let actor of actorList) {
            let option = document.createElement("option");
            option.setAttribute("value", actor.Picture);
            option.innerText = `${actor.Name} ${actor.FirstLastName}`;
            dinamicActors.appendChild(option);
        }

        let dinamicCategory = document.getElementById("categorySelect");
        for (let category of categoryList) {
            let option = document.createElement("option");
            option.setAttribute("value", category.Name);
            option.innerText = `${category.Name}`;
            dinamicCategory.appendChild(option);
        }

    }

    personForm() {
        let form = document.getElementById("formModal");
        form.innerHTML = ` <div class="container" id="cValidation" >
        <h1 class="display-5">Personas</h1>
        <form name="fValidation" role="form" id="form-validation">
          <!-- Requiered -->
          <div class="form-row">
          <div class="row">
            <div class="col-md-4 mb-3 w-50">
              <label for="type">Tipo</label>
              <div class="input-group">
                
                <select class="form-select" aria-label="Default select example" id="type" name="type">
                  <option selected value="Actor">Actor</option>
                  <option value="Director">Director</option>
                </select>
              </div>
            </div>
            <div class="col-md-4 mb-3 w-50" >
              <label for="vfName">Nombre *</label>
              <div class="input-group">
                    
                <input type="text" class="form-control" id="vfName" name="vfName" placeholder="Nombre"
                  aria-describedby="namePrepend" value="" required>
                <div class="invalid-feedback">El Nombre es obligatorio.</div>
                <div class="valid-feedback">Correcto.</div>
              </div>
            </div>
            </div>
            <div class="col-md-4 mb-3 w-50" >
            <div class="input-group">
            <input class="form-check-input" type="checkbox" value="" id="CheckDelete">
            <label class="form-check-label ms-1" for="CheckDelete">
              Eliminar
            </label>
            </div>
            </div>
            <div class="row">
            <div class="col-md-4 mb-3 w-50">
              <label for="vfBorn">Fecha Nacimiento *</label>
              <div class="input-group">
                                
                <input type="date" class="form-control" id="vfBorn" name="vfBorn"
                  placeholder="" aria-describedby="datePrepend" value="" required>
                <div class="invalid-feedback">La fecha de nacimiento es obligatoria.</div>
                <div class="valid-feedback">Correcto.</div>
              </div>
            </div>
            <div class="col-md-4 mb-3 w-50">
              <label for="DNI">DNI *</label>
              <div class="input-group">
                                 
                <input type="text" class="form-control" id="DNI" name="DNI"
                  placeholder="00000000X" aria-describedby="dniPrepend" value="">
              </div>
            </div>
            </div>
            </div>
          </div>
          <!-- Datos -->
          <div class="form-row">
          <div class="row">
            <div class="col-md-4 mb-3 w-50">
              <label for="LastName">Apellido *</label>
              <div class="input-group">        
              <input type="text" class="form-control" id="LastName" name="LastName"
              placeholder="Apellido" aria-describedby="lastNamePrepend" value="">
              </div>
            </div>
            <div class="col-md-4 mb-3 w-50">
              <label for="LastNameTwo">Segundo Apellido</label>
              <div class="input-group">        
              <input type="text" class="form-control" id="LastNameTwo" name="LastNameTwo"
              placeholder="Segundo Apellido" aria-describedby="lastNameTwoPrepend" value="">
              </div>
            </div>
            <div class="col-md-4 mb-3 w-100">
              <label for="Image">Imagen</label>
              <div class="input-group">
                
                <input type="file" class="form-control" id="Image" name="Image" aria-describedby="imagePrepend">
              </div>
          </div>
          </div>
          <button type="submit" class="btn btn-primary">Crear</button>

        </form>
      </div>`;
    }

    castingForm(productionList, actorList, directorList) {
        let form = document.getElementById("formModal");
        form.innerHTML = ` <div class="container" id="cValidation" >
        <h1 class="display-5">Asignar Reparto</h1>
        <form name="fValidation" role="form" id="form-validation">
          <!-- Requiered -->
          <div class="form-row" id="dinamicHolder">
  
          </form>
          </div>`;

        let dinamicHolder = document.getElementById("dinamicHolder");

        let dinamicContents = document.createElement("div");
        dinamicContents.classList.add("row");
        dinamicContents.innerHTML = `<div class="col-md-4 mb-3 w-50">
        <label for="Director">Directores</label>
        <div class="input-group">
        <select class="form-select" multiple aria-label="multiple select example" id="directorSelect">

        </select>
        </div>
        </div>
        <div class="col-md-4 mb-3 w-50">
        <label for="Actor">Actores</label>
        <div class="input-group">
        <select class="form-select" multiple aria-label="multiple select example" id="actorSelect">

        </select>
        </div>
        </div>
        <div class="col-md-4 mb-3 w-100">
        <label for="Production">Producciones</label>
        <div class="input-group">
        <select class="form-select" multiple aria-label="multiple select example" id="productionSelect">

        </select>
        </div>
        </div>
        <button type="submit" class="btn btn-primary">Crear</button>`;

        dinamicHolder.appendChild(dinamicContents);

        let dinamicDirectors = document.getElementById("directorSelect");
        for (let director of directorList) {
            let option = document.createElement("option");
            option.setAttribute("value", director.Picture);
            option.innerText = `${director.Name} ${director.FirstLastName}`;
            dinamicDirectors.appendChild(option);
        }

        let dinamicActors = document.getElementById("actorSelect");
        for (let actor of actorList) {
            let option = document.createElement("option");
            option.setAttribute("value", actor.Picture);
            option.innerText = `${actor.Name} ${actor.FirstLastName}`;
            dinamicActors.appendChild(option);
        }

        let dinamicCategory = document.getElementById("productionSelect");
        for (let production of productionList) {
            let option = document.createElement("option");
            option.setAttribute("value", production.Title);
            option.innerText = `${production.Title}`;
            dinamicCategory.appendChild(option);
        }
    }

    categoryForm() {
        let form = document.getElementById("formModal");
        form.innerHTML = ` <div class="container" id="cValidation" >
        <h1 class="display-5">Categorias</h1>
        <form name="fValidation" role="form" id="form-validation">
          <!-- Requiered -->
          <div class="form-row">
          <div class="row">
            <div class="col-md-4 mb-3 w-100" >
              <label for="vfName">Nombre *</label>
              <div class="input-group">
                    
                <input type="text" class="form-control" id="vfName" name="vfName" placeholder="Nombre"
                  aria-describedby="namePrepend" value="" required>
                <div class="invalid-feedback">El Nombre es obligatorio.</div>
                <div class="valid-feedback">Correcto.</div>
              </div>
              </div>
              <div class="col-md-4 mb-3 w-100">
                <div class="input-group">
                  
                <label for="Description">Descripción</label>
                <div class="input-group">        
                  <textarea type="text" class="form-control" id="Description" name="Description"
                   aria-describedby="descriptionPrepend" rows="9"></textarea>
                </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-3 w-100">
              <label for="Image">Imagen</label>
              <div class="input-group">
                
                <input type="file" class="form-control" id="Image" name="Image" aria-describedby="imagePrepend">
              </div>
          </div>
            </div>
            </div>
            <button type="submit" class="btn btn-primary">Crear</button>
            </form>
            </div>`;
    }

    /**
     * Cierra todas las ventanas
     */
    closeAllWindows() {
        for (let window of this.windows.values()) {
            if (!window.closed) {
                window.close();
            }
        }

        this.windows = new Map();
    }

    /**
    * Funcion que añade un evento a los elementos con la clase init
    * @param {Function} handler 
    */
    bindInit(handler) {
        for (let element of document.getElementsByClassName('init')) {
            element.addEventListener("click", (event) => {
                this.#excecuteHandler(handler, [], 'body', { action: 'init' }, '#Inicio', event);
                // handler();
            });

        }
    }

    /**
    * Funcion que añade un evento a los elementos con la clase serie
    * @param {Function} handler 
    */
    bindSeries(handler) {
        for (let element of document.getElementsByClassName('series')) {
            element.addEventListener("click", (event) => {
                this.#excecuteHandler(handler, [], 'body', { action: 'showSeries' }, '#Series', event);
            });

        }
    }

    /**
    * Funcion que añade un evento a los elementos con la clase movies
    * @param {Function} handler 
    */
    bindMovies(handler) {
        for (let element of document.getElementsByClassName('movies')) {
            element.addEventListener("click", (event) => {
                this.#excecuteHandler(handler, [], 'body', { action: 'showMovies' }, '#Movies', event);
            });

        }
    }

    /**
    * Funcion que añade un evento a los elementos con la clase actors
    * @param {Function} handler 
    */
    bindActors(handler) {
        for (let element of document.getElementsByClassName('actors')) {
            element.addEventListener("click", (event) => {
                this.#excecuteHandler(handler, [], 'body', { action: 'showActors' }, '#Actores', event);
            });

        }
    }

    /**
     * Funcion que añade un evento a los elementos con la clase person-Directores-window
     * @param {Function} handler 
     */
    bindDirectors(handler) {
        for (let element of document.getElementsByClassName('directors')) {
            element.addEventListener("click", (event) => {
                this.#excecuteHandler(handler, [], 'body', { action: 'showDirectors' }, '#Directores', event);
                handler();
            });

        }
    }

    /**
    * Funcion que añade un evento a los elementos con la clase person-Actores
    * @param {Function} handler 
    */
    bindActorCard(handler) {
        for (let element of document.getElementsByClassName('person-Actores')) {
            element.addEventListener("click", (event) => {
                this.#excecuteHandler(handler, element.dataset.person, 'body', { action: 'showActorCard', picture: element.dataset.person }, '#ActoresCard', event);
            });

        }
    }

    /**
   * Funcion que añade un evento a los elementos con la clase person-Directores
   * @param {Function} handler 
   */
    bindDirectorCard(handler) {
        for (let element of document.getElementsByClassName('person-Directores')) {
            element.addEventListener("click", (event) => {
                this.#excecuteHandler(handler, element.dataset.person, 'body', { action: 'showDirectorCard', picture: element.dataset.person }, '#DirectoresCard', event);
            });

        }
    }

    /**
    * Funcion que añade un evento a los elementos con la clase person-Actores-window
    * @param {Function} handler 
    */
    bindActorCardWindow(handler) {
        for (let element of document.getElementsByClassName('person-Actores-window')) {
            element.addEventListener("click", (event) => {
                handler(element.dataset.person);
            });

        }
    }

    /**
     * Funcion que añade un evento a los elementos con la clase person-Directores-window
     * @param {Function} handler 
     */
    bindDirectorCardWindow(handler) {
        for (let element of document.getElementsByClassName('person-Directores-window')) {
            element.addEventListener("click", (event) => {
                handler(element.dataset.person);
            });

        }
    }

    /**
      * Funcion que añade un evento a los elementos con la clase production-btn
      * @param {Function} handler 
      */
    bindProductionCard(handler) {
        for (let element of document.getElementsByClassName('production-btn')) {
            element.addEventListener("click", (event) => {
                this.#excecuteHandler(handler, element.dataset.production, 'body', { action: 'showProduction', title: element.dataset.production }, '#ProductionCard', event);
            });

        }
    }

    /**
     * Funcion que añade un evento a los elementos con la clase production-btn-window
     * @param {Function} handler 
     */
    bindProductionCardWindow(handler) {
        for (let element of document.getElementsByClassName('production-btn-window')) {
            element.addEventListener("click", (event) => {
                handler(element.dataset.production);
            });

        }
    }

    /**
     * Funcion que añade un evento a los elementos con la clase category
     * @param {Function} handler 
     */
    bindCategory(handler) {
        for (let element of document.getElementsByClassName('category')) {

            element.addEventListener("click", (event) => {
                this.#excecuteHandler(handler, element.dataset.category, 'body', { action: 'showCategory', category: element.dataset.category }, '#Category', event);
            });

        }
    }

    /**
     * Funcion que añade un evento a los elementos con la clase close Window
     * @param {Function} handler 
     */
    bindWindow(handler) {
        for (let element of document.getElementsByClassName('close-windows')) {

            element.addEventListener("click", (event) => {
                handler()
            });

        }
    }

    /**
     * Funcion que añade un evento a los elementos con la clase formProduction
     * @param {Function} handler 
     */
    bindFormProduction(handler) {
        document.getElementById("FormProduction").addEventListener("click", (event) => {
            handler()
        });

    }

    /**
     * Funcion que añade un evento a los elementos con la clase formCasting
     * @param {Function} handler 
     */
    bindFormCasting(handler) {
        document.getElementById("FormCasting").addEventListener("click", (event) => {
            handler()
        });

    }

    /**
     * Funcion que añade un evento a los elementos con la clase formCategory
     * @param {Function} handler 
     */
    bindFormCategory(handler) {
        document.getElementById("FormCategory").addEventListener("click", (event) => {
            handler()
        });

    }

    /**
     * Funcion que añade un evento a los elementos con la clase formPerson
     * @param {Function} handler 
     */
    bindFormPerson(handler) {
        document.getElementById("FormPerson").addEventListener("click", (event) => {
            handler()
        });

    }


}

export default videoSystemView;