{/* <div class="col flex-item" id=${elem.contentID}>
    <div class="card h-100">
        <img class="hide" id=${elem.category + "__" + elem.order} src=${elem.linkImage}" alt="${elem.linkImageDescription}">
        <div class="card-body">
            <h5 class="card-title text-center text-success text-uppercase fs-6 fw-bold">${elem.tema}</h5>
            <p class="card-text text-start fw-light fst-italic">${elem.tema_discription}</p>
            <div class="d-flex justify-content-between align-items-center">
                <span class="badge bg-danger">${elem.category}</span>
                <div class="btn-group">
                    <button type="button" id=${elem.linkImageDescription + elem.order} class="btn btn-sm btn-outline-success">show</button>
                </div>
            </div>
        </div>
    </div>
    <div class="hide" id=${elem.contentID}></div>
</div> */}

let container = {
    elem: "div",
    className: ["col", "flex-item"],
    id: `idishnik`,
    attibute: "",
    insert: "body",
    innerHTML: "",
}

function createElement(element) {
    let newElement = document.createElement(element.elem);
    element.className.map(elem => newElement.classList.add(elem));
    element.attibute.map(elem => newElement.setAttribute(elem[0], elem[1]));
    newElement.id = element.id;
    if (element.innerHTML !== ""){
        newElement.innerHTML = element.innerHTML;
    };
    let elemInsert = ducument.querySelector(element.insert);
    newElement.append(elemInsert);
}
