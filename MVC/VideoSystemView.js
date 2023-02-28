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

        let arrayProductions = [];

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
            arrayProductions.push(production);
        }

        for (let i = 0; i < arrayProductions.length; i++) {
            let productionsColumn = document.createElement("div");
            productionsColumn.classList.add("col");
            productionsColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem;  margin-top:2rem;">
            <img src='./media/producciones/${arrayProductions[i].Image}' class="card-img-top" alt="${arrayProductions[i].Image}" width=250 height=150>
            <div class="card-body">
              <h5 class="card-title">${arrayProductions[i].Title}</h5>
              <a href="#ProductionCard" class="btn btn-primary production-btn" data-production='${arrayProductions[i].Title}'>Ver</a>
              <button class="btn btn-primary production-btn-window" data-production='${arrayProductions[i].Title}'>Ventana</button>
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

        let arrayProductions = [];

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
            arrayProductions.push(production);
        }

        for (let i = 0; i < arrayProductions.length; i++) {
            let productionColumn = document.createElement("div");
            productionColumn.classList.add("col");
            productionColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem;  margin-top:2rem;">
            <img src='./media/producciones/${arrayProductions[i].Image}' class="card-img-top" alt="${arrayProductions[i].Image}" width=250 height=150/>
            <div class="card-body">
              <h5 class="card-title">${arrayProductions[i].Title}</h5>
              <a href="#ProductionCard" class="btn btn-primary production-btn" data-production='${arrayProductions[i].Title}'>Ver</a>
              <button class="btn btn-primary production-btn-window" data-production='${arrayProductions[i].Title}'>Ventana</button>
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

        let arrayPerson = [];

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
            arrayPerson.push(person);
        }

        for (let i = 0; i < arrayPerson.length; i++) {
            let personColumn = document.createElement("div");
            personColumn.classList.add("col");
            personColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem; margin-top:2rem;">
            <img src='./media/personas/${arrayPerson[i].Picture}' class="card-img-top" alt="${arrayPerson[i].Picture}" width=250 height=250/>
            <div class="card-body">
            <h5 class="card-title"><p>${type}</p>${arrayPerson[i].Name} ${arrayPerson[i].FirstLastName}</h5>
            <a href="#${type}card" class="btn btn-primary person-${type}" data-person='${arrayPerson[i].Picture}'>Conocer</a>
            <button class="btn btn-primary person-${type}-window" data-person='${arrayPerson[i].Picture}'>Ventana</button>
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
        let arrayProductions = [];
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

        for (let production of productionsList) {
            arrayProductions.push(production);
        }

        productionContainer.innerHTML = `<h4>${person.Name} ${person.FirstLastName}</h4>
        <h2>${person.Born.toISOString().split("T")[0]}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquam tempor tempor. Vivamus libero mi, cursus id ullamcorper vitae, commodo nec erat. Proin iaculis odio sit amet quam aliquet, et rhoncus mi dignissim. Vestibulum sed justo nec diam mollis finibus elementum et felis. Sed lobortis risus ac tellus auctor ullamcorper.</p>`;


        // No se mete junto con el inner html
        personContainer.appendChild(productionContainer);

        let productionsRow = document.createElement("div");
        productionsRow.classList.add("row");
        productionsRow.innerHTML = "<h2>Producciones</h2>";
        productionContainer.appendChild(productionsRow);

        for (let i = 0; i < arrayProductions.length; i++) {
            let productionsColumn = document.createElement("div");
            productionsColumn.classList.add("col");
            productionsColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem; margin-top:2rem;">
            <img src='./media/producciones/${arrayProductions[i].Image}' class="card-img-top" alt="${arrayProductions[i].Image}" width=250 height=150/>
            <div class="card-body">
              <h5 class="card-title">${arrayProductions[i].Title}</h5>
              <a href="#ProductionCard" class="btn btn-primary production-btn" data-production='${arrayProductions[i].Title}'>Ver</a>
              <button class="btn btn-primary production-btn-window" data-production='${arrayProductions[i].Title}'>Ventana</button>
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
        let arrayProductions = [];
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

        for (let production of productionsList) {
            arrayProductions.push(production);
        }

        productionContainer.innerHTML = `<h4>${person.Name} ${person.FirstLastName}</h4>
        <h2>${person.Born.toISOString().split("T")[0]}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquam tempor tempor. Vivamus libero mi, cursus id ullamcorper vitae, commodo nec erat. Proin iaculis odio sit amet quam aliquet, et rhoncus mi dignissim. Vestibulum sed justo nec diam mollis finibus elementum et felis. Sed lobortis risus ac tellus auctor ullamcorper.</p>`;


        // No se mete junto con el inner html
        personContainer.appendChild(productionContainer);

        let productionsRow = window.document.createElement("div");
        productionsRow.classList.add("row");
        productionsRow.innerHTML = "<h2>Producciones</h2>";
        productionContainer.appendChild(productionsRow);

        for (let i = 0; i < arrayProductions.length; i++) {
            let productionsColumn = window.document.createElement("div");
            productionsColumn.classList.add("col");
            productionsColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem; margin-top:2rem;">
            <img src='./media/producciones/${arrayProductions[i].Image}' class="card-img-top" alt="${arrayProductions[i].Image}" width=250 height=150/>
            <div class="card-body">
              <h5 class="card-title">${arrayProductions[i].Title}</h5>
              </div>
              </div>`
            //   <a href="#ProductionCard" class="btn btn-primary production-btn" data-production='${arrayProductions[i].Title}'>Ver</a>
            //   <a href="#ProductionCard" class="btn btn-primary production-btn-window" data-production='${arrayProductions[i].Title}'>Ventana</a>
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
        let arrayActors = [];
        let arrayDirectors = [];
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

        for (let actor of actors) {
            arrayActors.push(actor.actor);
        }

        for (let director of directors) {
            arrayDirectors.push(director.director);
        }

        let CastRow = document.createElement("div");
        CastRow.classList.add("row");
        CastRow.innerHTML = "<h2>Reparto</h2>";
        productionInfoContainer.appendChild(CastRow);

        for (let i = 0; i < arrayActors.length; i++) {
            let actorsColumn = document.createElement("div");
            actorsColumn.classList.add("col");
            actorsColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem; margin-top:2rem;">
            <img src='./media/personas/${arrayActors[i].Picture}' class="card-img-top" alt="${arrayActors[i].Picture}" width=200 height=200/>
            <div class="card-body">
              <h5 class="card-title"><p>Actor</p>${arrayActors[i].Name} ${arrayActors[i].FirstLastName}</h5>
              <a href="#ActoresCard" class="btn btn-primary person-Actores" data-person='${arrayActors[i].Picture}'>Conocer</a>
              <button class="btn btn-primary person-Actores-window" data-person='${arrayActors[i].Picture}'>Ventana</button>
            </div>
          </div>`
            CastRow.appendChild(actorsColumn);
        }
        for (let i = 0; i < arrayDirectors.length; i++) {
            let directorsColumn = document.createElement("div");
            directorsColumn.classList.add("col");
            directorsColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem;  margin-top:2rem;">
            <img src='./media/personas/${arrayDirectors[i].Picture}' class="card-img-top" alt="${arrayDirectors[i].Picture}" width=200 height=200/>
            <div class="card-body">
              <h5 class="card-title"><p>Director</p>${arrayDirectors[i].Name} ${arrayDirectors[i].FirstLastName}</h5>
              <a href="#DirectoresCard" class="btn btn-primary person-Directores" data-person='${arrayDirectors[i].Picture}'>Conocer</a>
              <button class="btn btn-primary person-Directores-window" data-person='${arrayDirectors[i].Picture}'>Ventana</button>
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
        let arrayActors = [];
        let arrayDirectors = [];
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

        for (let actor of actors) {
            arrayActors.push(actor.actor);
        }

        for (let director of directors) {
            arrayDirectors.push(director.director);
        }

        let CastRow = window.document.createElement("div");
        CastRow.classList.add("row");
        CastRow.innerHTML = "<h2>Reparto</h2>";
        productionInfoContainer.appendChild(CastRow);

        for (let i = 0; i < arrayActors.length; i++) {
            let actorsColumn = window.document.createElement("div");
            actorsColumn.classList.add("col");
            actorsColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem; margin-top:2rem;">
            <img src='./media/personas/${arrayActors[i].Picture}' class="card-img-top" alt="${arrayActors[i].Picture}" width=200 height=200/>
            <div class="card-body">
              <h5 class="card-title"><p>Actor</p>${arrayActors[i].Name} ${arrayActors[i].FirstLastName}</h5>
              </div>
              </div>`
            //   <a href="#ActoresCard" class="btn btn-primary person-Actores" data-person='${arrayActors[i].Picture}'>Conocer</a>
            //   <a href="#ActoresCard" class="btn btn-primary person-Actores-window" data-person='${arrayActors[i].Picture}'>Ventana</a>
            CastRow.appendChild(actorsColumn);
        }
        for (let i = 0; i < arrayDirectors.length; i++) {
            let directorsColumn = window.document.createElement("div");
            directorsColumn.classList.add("col");
            directorsColumn.innerHTML = `<div class="card mx-auto" style="width: 18rem;  margin-top:2rem;">
            <img src='./media/personas/${arrayDirectors[i].Picture}' class="card-img-top" alt="${arrayDirectors[i].Picture}" width=200 height=200/>
            <div class="card-body">
              <h5 class="card-title"><p>Director</p> ${arrayDirectors[i].Name} ${arrayDirectors[i].FirstLastName}</h5>
              </div>
              </div>`
            //   <a href="#DirectoresCard" class="btn btn-primary person-Directores" data-person='${arrayDirectors[i].Picture}'>Conocer</a>
            //   <a href="#DirectoresCard" class="btn btn-primary person-Directores-window" data-person='${arrayDirectors[i].Picture}'>Ventana</a>
            CastRow.appendChild(directorsColumn);
        }

        this.windows.set(production.Title, window);
    }

    productionForm() {
        let form = document.getElementById("formModal");
        form.innerHTML = ` <div class="container" id="cValidation" >
        <h1 class="display-5">Producciones</h1>
        <form name="fValidation" role="form" id="form-validation">
          <!-- Requiered -->
          <div class="form-row">
            <div class="col-md-4 mb-3 w-50">
              <label for="type">Tipo</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text h-100" id="typePrepend"><i class="fas fa-user"></i></span>
                </div>
                <select class="form-select" aria-label="Default select example" id="type" name="type">
                  <option selected value="Serie">Pelicula</option>
                  <option value="Movie">Serie</option>
                </select>
              </div>
            </div>
            <div class="col-md-4 mb-3 w-50" >
              <label for="vfTitulo">Título *</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text h-100" id="namePrepend"><i class="fas fa-user"></i></span>
                </div>
                <input type="text" class="form-control" id="vfName" name="vfName" placeholder="Titulo"
                  aria-describedby="namePrepend" value="" required>
                <div class="invalid-feedback">El Título es obligatorio.</div>
                <div class="valid-feedback">Correcto.</div>
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
            <div class="col-md-4 mb-3 w-50">
              <label for="vfPublication">Publicación *</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text h-100" id="publicationPrepend"><i class="fas fa-user"></i></span>
                </div>
                <input type="date" class="form-control" id="vfPublication" name="vfPublication"
                  placeholder="Segundo apellido" aria-describedby="publicationPrepend" value="" required>
                <div class="invalid-feedback">La fecha de publicación es obligatoria.</div>
                <div class="valid-feedback">Correcto.</div>
              </div>
            </div>
            </div>
          </div>
          <!-- Datos -->
          <div class="form-row">
            <div class="col-md-4 mb-3 w-50">
              <label for="Nationality">Nacionalidad</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text h-100" id="nationalityPrepend"><i class="fas fa-user"></i></span>
                </div>
                <input type="text" class="form-control" id="Nationality" name="Nationality"
                  placeholder="ES/FR/GB/RU/US" aria-describedby="nationalityPrepend" value="">
              </div>
            </div>
            <div class="col-md-4 mb-3 w-75">
              <label for="Synopsis">Sinopsis</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text h-100" id="synopsisPrepend"><i class="fas fa-user"></i></span>
                </div>
                <textarea type="text" class="form-control" id="Synopsis" name="Synopsis"
                 aria-describedby="synopsisPrepend"></textarea>
              </div>
            </div>
            <div class="col-md-4 mb-3 w-100">
              <label for="Image">Imagen</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text h-100" id="imagePrepend"><i class="fas fa-user"></i></span>
                </div>
                <input type="file" class="form-control" id="Image" name="Image" aria-describedby="imagePrepend">
              </div>
          </div>
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


}

export default videoSystemView;