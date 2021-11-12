class ListContent {
    constructor(arrayWord) {
        this.arrayWord = arrayWord;
    }

    run() {
        let keyArr = {};
        this.arrayWord.map(elem => {
            if (keyArr[elem.contentID]) {
                keyArr[elem.contentID].push(elem);
            } else {
                keyArr[elem.contentID] = [];
                keyArr[elem.contentID].push(elem)
            }
        })

        for (let key in keyArr) {// передаем каждый массив под одним идентификатором на рендер
            this.render(keyArr[key]);
        }
    }

    render(arr) {
        let accordionItem = '';

        arr.map((elem, index) => {
            if (elem["type"] === "accordion") {

                accordionItem += `
                <div class="accordion-item">
                    <h2 class="accordion-header" id="heading${elem.contentID + index}">
                        <button class="accordion-button collapsed bgGreenThree" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse${elem.contentID + index}" aria-expanded="false" aria-controls="collapse${elem.contentID + index}">
                            ${elem.key}
                        </button>
                    </h2>
                    <div id="collapse${elem.contentID + index}" class="accordion-collapse collapse" aria-labelledby="heading${elem.contentID + index}"
                        data-bs-parent="#${elem.contentID}_item">
                        <div class="accordion-body">
                            <div class="p-3 mb-2 fw-bolder text-start text-success">${elem.value}</div>
                        </div>
                    </div>
                </div>
                    `;
            }
        });

        let accordion = ` 
                <div class="accordion mt-1 mb-2" id="${arr[0].contentID}_item">
                        ${accordionItem}
                </div>               
                `;

        if (document.querySelector(`#${arr[0].contentID}`)) {
            document.querySelector(`#${arr[0].contentID}`).innerHTML = accordion;
        }
    }
}