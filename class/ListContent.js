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
        });

        for (let key in keyArr) {// передаем каждый массив под одним идентификатором на рендер
            this.render(keyArr[key]);
        }
    }

    render(arr) {
        let accordionItem = '';

        arr.map((elem, index) => {
            if (elem["type"] === "text") {

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
                            <div class="p-3 mb-2 fw-bolder text-start text-success" id="${elem.contentID + index}text">${elem.value}</div>
                        </div>
                    </div>
                </div>
                    `;

            } else if (elem["type"] === "img") {
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
                            <img class="img-fluid mx-auto" src=${elem.value} alt="picture">                             
                            </div>
                        </div>
                    </div>
                        `;

            } else if (elem["type"] === "link") {
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
                       <p class="text-start"><a class="text-start" href=${elem.value}>link</a></p>                                             
                        </div>
                    </div>
                </div>
                    `;
            }
            else if (elem["type"] === "youtube") {

                let videoLink = elem.value;
                let findKeyVideo = videoLink.indexOf('=');
                let keyVideo = videoLink.slice(findKeyVideo + 1, videoLink.length);

                let tegVideo = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${keyVideo}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`

                accordionItem += `
            
                    <h2 class="accordion-header" id="heading${elem.contentID + index}">
                        <button class="accordion-button collapsed bgGreenThree" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse${elem.contentID + index}" aria-expanded="false" aria-controls="collapse${elem.contentID + index}">
                            ${elem.key}
                        </button>
                    </h2>
                    <div id="collapse${elem.contentID + index}" class="accordion-collapse collapse" aria-labelledby="heading${elem.contentID + index}"
                        data-bs-parent="#${elem.contentID}_item">
                        <div class="accordion-body">
                        <div class="frame_blc">${tegVideo}</div>                                            
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
        };

        arr.map((elem, index) => {
            if (document.querySelector(`#${elem.contentID + index}text`)) {
                document.querySelector(`#${elem.contentID + index}text`).innerHTML = `<div>${elem.value}</div>`;
            }
        });
    }
}