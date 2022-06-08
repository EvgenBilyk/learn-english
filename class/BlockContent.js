class BlockContent {
    constructor(content) {
        this.content = content;
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
            } else if (item.category === "verbs") {
                accum[2].push(item);
                return accum;
            }
        }, [[], [], []]);

        let listWord = "";
        let listRules = "";
        let listVerbs = "";
        let listRecords = "";

        let arrWords = arrContent[0];
        let arrRules = arrContent[1];
        let arrVerbs = arrContent[2];

        arrWords.map(elem => {
            if (+elem.show && elem.category === "words") {

                listWord +=
                    `
        <div class="col flex-item" >
            <div class="card h-100">
            <div class="img-card">
                <img class="hide" id=${elem.category + "__" + elem.order} src=${elem.linkImage}" alt="${elem.linkImageDescription}">
                </div>
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

                listRules +=
                    `
        <div class="col flex-item">
            <div class="card h-100">
            <div class="img-card">
                <img class="hide" id=${elem.category + "__" + elem.order} src=${elem.linkImage}" alt="${elem.linkImageDescription}">
                </div>
                <div class="card-body">
                    <h5 class="card-title text-center text-success text-uppercase fs-6 fw-bold">${elem.tema}</h5>
                    <p class="card-text text-start fw-light fst-italic">${elem.tema_discription}</p>                
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="badge bg-danger">${elem.category}</span>   
                        <div class="btn-group">
                            <button type="button" id="${elem.contentID}_btn"  class="btn btn-sm btn-outline-success">show</button>
                        </div>                  
                    </div>
                </div>
            </div>
            <div class="hide" id=${elem.contentID}></div>
        </div>`}
        });

        arrVerbs.map(elem => {
            if (+elem.show && elem.category === "verbs") {

                listVerbs +=
                    `
        <div class="col flex-item">
            <div class="card h-100">
            <div class="img-card">
                <img class="hide" id=${elem.category + "__" + elem.order} src=${elem.linkImage}" alt="${elem.linkImageDescription}">
                </div>
                <div class="card-body">
                    <h5 class="card-title text-center text-success text-uppercase fs-6 fw-bold">${elem.tema}</h5>
                    <p class="card-text text-start fw-light fst-italic">${elem.tema_discription}</p>                
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="badge bg-warning">${elem.category}</span>   
                        <div class="btn-group">
                            <button type="button" id="${elem.contentID}_btn"  class="btn btn-sm btn-outline-success">show</button>
                        </div>                  
                    </div>
                </div>
            </div>
            <div class="hide" id=${elem.contentID}></div>
        </div>`}
        });

        //робимо додаткову вкладку для запису нових слів до гугл таблиці
        listRecords += `
            <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" id="select-category">
                <option selected value="" disabled >select a category</option>`;

        arrWords.map(elem => {
            if (+elem.show && elem.category === "words") {
                listRecords += `<option value="${elem.contentID}">${elem.tema}</option>`
            }
        });

        listRecords += `</select>
        <div class="container-new">
            <div class="row mt-4">
                <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here" id="record-eng-word" style="height: 100%"></textarea>
                    <label for="record-eng-word">eng</label>
                </div>
            </div>

            <div class="row mt-4">
                <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here" id="record-ukr-word" style="height: 100%"></textarea>
                    <label for="record-ukr-word">ukr</label>
                </div>
            </div>

            <div class="row mt-4">
                <button type="button" class="btn btn-success" id="record-word">RECORD</button>
            </div>
        </div>`;

        document.querySelector("#outBlockWords").innerHTML = listWord;
        document.querySelector("#outBlockRules").innerHTML = listRules;
        document.querySelector("#outBlockVerbs").innerHTML = listVerbs;
        document.querySelector("#outBlockRecords").innerHTML = listRecords;
        this.temaButtonHandler();

        let content = new RequestGoogleSheet("1GjGzhZvxOw890IDWITKVa35yYrcCDpLPmGx6Ns1HCFQ", "listWords");
        content.answer();//запускаем наполнение выпадающего списка для кнопки show
        let record = new RecordWords("#record-eng-word", "#record-ukr-word", "#record-word", "#select-category");
        record.btnRecordHendler();

    }

    showButtonHandler() {
        this.content.map(elem => {
            if (+elem.show) {
                let idBtn = `#${elem.contentID}_btn`;
                let idBlock = `#${elem.contentID}`;


                if (document.querySelector(idBtn)) {
                    document.querySelector(idBtn).onclick = () => {
                        document.querySelector(idBlock).classList.toggle('hide');
                    }
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

    temaButtonHandler() {
        let tema = document.querySelectorAll('.switch-tema');
        for (let i = 0; i < tema.length; i++) {
            tema[i].onchange = () => {
                this.switchTema();
            }
        }
    }

    switchTema() {

        let tema = document.querySelectorAll('.switch-tema');
        for (let k = 0; k < tema.length; k++) {

            if (tema[k].checked === true) {
                if (document.querySelector(tema[k].dataset.block).classList.contains('hide')) {
                    document.querySelector(tema[k].dataset.block).classList.remove('hide');
                }

            } else {
                if (!document.querySelector(tema[k].dataset.block).classList.contains('hide')) {
                    document.querySelector(tema[k].dataset.block).classList.add('hide');
                }
            }
        }
    }

}