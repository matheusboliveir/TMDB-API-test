export class Api {
    constructor(apiLink){
        this.apiLink = apiLink;
    }

    async getList(pages){
        let atualPage = 1;
        let list = [];
        while (atualPage <= pages) {
            const res = await fetch(this.apiLink + atualPage);
            const data = await res.json();
            list = [...list, ...data.results];
            atualPage++;
        }
        return list;
    }

}