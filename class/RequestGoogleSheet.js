class RequestGoogleSheet {
    constructor(idSheet, nameList) {
        this.idSheet = idSheet;
        this.nameList = nameList;
        this._linkApp = "https://script.google.com/macros/s/AKfycbxTmL3s4uBH-b77G34Tgf3ohjmQN7DW3tHUehSn50h7L_lDgI4xVck5tEHkTz-qZMhx9g/exec";
    }

    console() {//вывод ответа по АПИ в консоль

        let linkRequestTest = `${this._linkApp}?nameList=${this.nameList}&idSheet=${this.idSheet}`

        const getResponse = async (url) => {
            const response = await fetch(url)
                .then(data => {
                    return data.text();
                })
                .then(data => {
                    let arr = JSON.parse(data);
                    console.log(arr[0].values);
                });
        }
        getResponse(linkRequestTest);
    }

    answer() {

        let linkRequest = `${this._linkApp}?nameList=${this.nameList}&idSheet=${this.idSheet}`

        const getResponse = async (url) => {
            const response = await fetch(url)
                .then(data => {
                    return data.text();
                })
                .then(data => {
                    return JSON.parse(data);
                });

            if (this.nameList === "listBlock") {
                let content = new BlockContent(response[0].values);
                content.render();
                content.showButtonHandler();
                content.showPicture();


            } else if (this.nameList === "listWords") {

                let listContent = new ListContent(response[0].values);
                listContent.run();
            }
        }
        getResponse(linkRequest);
    }
}