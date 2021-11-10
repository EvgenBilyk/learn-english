class Accardion {
    constructor(arrayWord, idBlock) {
        this.arrayWord = arrayWord;
        this.idBlock = idBlock;
    }

    con() {
        console.log(this.arrayWord);
        console.log(this.idBlock);

    }

    create() {
        let accordionItem = '';

        for (let i = 0; i < this.arrayWord.length; i++) {
            accordionItem += `
        <div class="accordion-item">
            <h2 class="accordion-header" id="heading${this.idBlock + i}">
                <button class="accordion-button collapsed bgGreenThree" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapse${this.idBlock + i}" aria-expanded="false" aria-controls="collapse${this.idBlock + i}">
                    ${this.arrayWord[i][0]}
                </button>
            </h2>
            <div id="collapse${this.idBlock + i}" class="accordion-collapse collapse" aria-labelledby="heading${this.idBlock + i}"
                data-bs-parent="#${this.idBlock + i}">
                <div class="accordion-body">
                    <div class="p-3 mb-2 bgGreenOne text-start text-dark">${this.arrayWord[i][1]}</div>
                </div>
            </div>
        </div>
            `;
        }

        let accordion = ` 
        <div class="accordion mt-1 mb-2" id="${this.idBlock}">
                ${accordionItem}
        </div>               
        `;

        return accordion;

        document.querySelector(this.out).classList.toggle('hide');
        document.querySelector(this.out).innerHTML = accordion;
    }
}