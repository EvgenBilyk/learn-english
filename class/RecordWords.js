class RecordWords {
    constructor(inputEng, inputUkr, btnRecord, select) {
        this.inputEng = document.querySelector(inputEng);
        this.inputUkr = document.querySelector(inputUkr);
        this.btnRecord = document.querySelector(btnRecord);
        this.select = document.querySelector(select);
    }

    btnRecordHendler() {
        this.btnRecord.addEventListener("click", () => this.recordData())
    };

    recordData() {
        let contentID = this.select.options[this.select.selectedIndex].value;
        let wordEng = this.inputEng.value;
        let wordUkr = this.inputUkr.value;


        if (contentID !== "") {
            let newUrl = "https://script.google.com/macros/s/AKfycbyr0MbaBajnfp1p92FktoRmUGGhslNZuyZe4J2Yf-8lLJqJtZbJ1pLBdmgBu275PoGD5Q/exec";
            let parametr = {
                url: "https://docs.google.com/spreadsheets/d/1GjGzhZvxOw890IDWITKVa35yYrcCDpLPmGx6Ns1HCFQ/edit#gid=1682542704",
                commands: [
                    {
                        sheet: "listWords",
                        range: "A10:D10",
                        values: [contentID, wordEng, wordUkr, "text"],
                        type: "appendRow"
                    },
                ]

            }

            const postResponse = async (url) => {
                const response = await fetch(url, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    'mode': 'no-cors',
                    body: JSON.stringify(parametr),
                })
                    .then(data => {
                        return data;
                    })
            }
            postResponse(newUrl);
            this.inputEng.value = "";
            this.inputUkr.value = "";

        } else {
            alert("select category, please")
        }
    }
}