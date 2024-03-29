class Api{
    constructor(name){
        this.name = name;
        this.path = "https://srv.petiteweb.dev/api/2/";
    }
    addCat(self){
        return fetch(`${this.path}${this.name}/add`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(self)
        })
    }
    showCats(){

        return fetch(`${this.path}${this.name}/show`);

    }
    upCat(id, body){
        return fetch(`${this.path}${this.name}/update/${id}`, {
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(body)
        })

    }
    delCat(id){
        return fetch(`${this.path}${this.name}/delete/${id}`, {
            method:"DELETE"
        })
    }
}
export default Api;
