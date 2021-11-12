class BlockContent {
    constructor(content, outElem) {
        this.content = content;
        this.outElem = outElem;
    }

    render() {

        //отделяем массивы с правилами от массивов со словами
        let arrContent = this.content.reduce((accum, item) => {
            if (item.category === "words") {
                accum[0].push(item);
                return accum;
            } else if (item.category === "rules") {
                accum[1].push(item);
                return accum;
            }
        }, [[], []]);

        let listWord = "";
        let listRules = "";

        let arrWords = arrContent[0];
        let arrRules = arrContent[1];

        arrWords.map(elem => {
            if (+elem.show && elem.category === "words") {

                listWord +=
                    `
        <div class="col flex-item" >
            <div class="card h-100">
                <img class="hide" id=${elem.category + "__" + elem.order} src=${elem.linkImage}" alt="${elem.linkImageDescription}">
                <div class="card-body">
                    <h5 class="card-title text-center text-success text-uppercase fs-6 fw-bold">${elem.tema}</h5>
                    <p class="card-text text-start fw-light fst-italic">${elem.tema_discription}</p>                
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="badge bg-info text-dark">${elem.category}</span>
                        <div class="btn-group">
                            <button type="button" id="${elem.contentID}_btn"  class="btn btn-sm btn-outline-success">show</button>
                        </div>                  
                    </div>
                </div>
            </div>
            <div class="hide" id=${elem.contentID}></div>
        </div>`
            }
        })

        arrRules.map(elem => {
            if (+elem.show && elem.category === "rules") {

                listWord +=
                    `
        <div class="col flex-item" id=${elem.contentID}>
            <div class="card h-100">
                <img class="hide" id=${elem.category + "__" + elem.order} src=${elem.linkImage}" alt="${elem.linkImageDescription}">
                <div class="card-body">
                    <h5 class="card-title text-center text-success text-uppercase fs-6 fw-bold">${elem.tema}</h5>
                    <p class="card-text text-start fw-light fst-italic">${elem.tema_discription}</p>                
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="badge bg-danger">${elem.category}</span>   
                        <div class="btn-group">
                            <button type="button" id=${elem.linkImageDescription + elem.order}  class="btn btn-sm btn-outline-success">show</button>
                        </div>                  
                    </div>
                </div>
            </div>
            <div class="hide" id=${elem.contentID}></div>
        </div>`}
        });

        let listAll = listWord + listRules
        document.querySelector(this.outElem).innerHTML = listAll;

        let content = new RequestGoogleSheet("1GjGzhZvxOw890IDWITKVa35yYrcCDpLPmGx6Ns1HCFQ", "listWords");
        content.answer();//запускаем наполнение выпадающего списка для кнопки show

    }

    buttonHandler() {
        this.content.map(elem => {
            if (+elem.show) {
                let idBtn = `#${elem.contentID}_btn`;
                let idBlock = `#${elem.contentID}`;

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