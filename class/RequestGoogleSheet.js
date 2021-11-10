class RequestGoogleSheet {
    constructor(idSheet, nameList) {
        this.idSheet = idSheet;
        this.nameList = nameList;
        this._linkApp = "https://script.google.com/macros/s/AKfycbxTmL3s4uBH-b77G34Tgf3ohjmQN7DW3tHUehSn50h7L_lDgI4xVck5tEHkTz-qZMhx9g/exec";
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

            let content = new BlockContent(response[0].values, "#outBlock");
            content.render();
            content.buttonHandler();
            content.showPicture();



        }
        getResponse(linkRequest);
    }
}