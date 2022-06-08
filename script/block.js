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
    if (element.innerHTML !== "") {
        newElement.innerHTML = element.innerHTML;
    };
    let elemInsert = ducument.querySelector(element.insert);
    newElement.append(elemInsert);
}
