class BlockContent {
    constructor(content, outElem) {
        this.content = content;
        this.outElem = outElem;
    }

    render() {

        console.log(this.content);
        console.log(this.outElem);

        let listWord = "";
        let listRules = "";

        this.content.map(elem => {
            if (+elem.show) {
                if (elem.category === "words") {
                    let listContent = JSON.parse(elem.listContent).list;
                    let accordion = new Accardion(listContent, elem.linkImageDescription);
                    let contentList = accordion.create();
                    listWord +=
                        `
        <div class="col">
            <div class="card h-100">
                <img class="hide" id=${elem.category + "__" + elem.order} src=${elem.linkImage}" alt="${elem.linkImageDescription}">
                <div class="card-body">
                    <h5 class="card-title text-center text-success text-uppercase fs-6 fw-bold">${elem.tema}</h5>
                    <p class="card-text text-start fw-light fst-italic">${elem.tema_discription}</p>                
                    <div class="d-flex justify-content-between align-items-center">
                    <span class="badge bg-info text-dark">${elem.category}</span>
                    <div class="btn-group">
                            <button type="button" id=${elem.linkImageDescription + elem.order}  class="btn btn-sm btn-outline-success">show</button>
                        </div>                  
                    </div>
                </div>
            </div>
            <div class="hide" id=${elem.category + "_" + elem.order}>${contentList}</div>
        </div>`}
                else if (elem.category === "rules") {

                    let listContent = JSON.parse(elem.listContent).list;
                    let accordion = new Accardion(listContent, elem.linkImageDescription);
                    let contentList = accordion.create();
                    listRules +=
                        `
        <div class="col">
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
            <div class="hide" id=${elem.category + "_" + elem.order}>${contentList}</div>
        </div>`

                }
            }
        });

        let listAll = listWord + listRules
        document.querySelector(this.outElem).innerHTML = listAll;
    }

    buttonHandler() {
        this.content.map(elem => {
            if (+elem.show) {
                let idBtn = `#${elem.linkImageDescription + elem.order}`;
                let idBlock = `#${elem.category + "_" + elem.order}`;

                document.querySelector(idBtn).onclick = () => {
                    document.querySelector(idBlock).classList.toggle('hide');
                }
            }
        });
    }

    showPicture() {
        this.content.map(elem => {

            if (+elem.showImg && +elem.show) {
                let idImg = `#${elem.category + "__" + elem.order}`;
                document.querySelector(idImg).classList.remove('hide');
            }
        });
    }
}