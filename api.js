class Api{
    constructor(name){
        this.name = name;
        this.path = "https://sb-cats.herokuapp.com/api/2/";
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
            method:"POST",
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
