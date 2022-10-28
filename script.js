import Api from "./api.js"


let storecat = [];
const api = new Api('LuckyIAM');
const menu  = [...document.querySelectorAll('.menu_item div')];
const wraperForm = document.querySelector('.wraper_form');
const wraperFormUp = document.querySelector('.wraper_form_update');
const wraperFormDelete =document.querySelector('.wraper_form_delete');
const formFilter = document.querySelector('.wraper_form_filter');
const warning = document.querySelector('.text_conteiner');


function rightRead(num, q = 'меньше года', w = 'год', e = "года", r = 'лет'){
    if(num < 1){
        return q;
    }else if(num === 1){
        return w;
    }else if (num > 1 && num<5){
        return e;
    }else if (num > 4 && num<21){
        return r;
    }
}

function reload(){
    location.reload()
}

function close(form){
    const exitForm = [...document.querySelectorAll('.exit')];
    exitForm.forEach(btn => {
        btn.addEventListener('click',function(){
            form.classList.remove('active');
            reload();
        })
    })  
}
function local_storage(get_item, name_storage, obj){
    if(get_item){
        const cat_add2 = JSON.parse(localStorage.getItem(name_storage));
        console.log(cat_add2)
        cat_add2.push(obj)
        localStorage.setItem(name_storage, JSON.stringify(cat_add2))
    }else{
        const cat_add1 =[]
        cat_add1.push(obj);
        console.log(cat_add1);
        localStorage.setItem(name_storage, JSON.stringify(cat_add1))
    }
}


function addCatInBd(form){
    const formAdd = document.forms.add;
    let body = {};
    form.addEventListener('submit',function(e){
        e.preventDefault();
        for(let i = 0; i<e.target.elements.length; i++){
            let el = e.target.elements[i];
            if(el.name){
                if(el.type === 'checkbox'){
                    body[el.name] = el.checked;
                }else if(el.value){
                    body[el.name] = el.value;
                }
            }
        }
        console.log(body);
        if (document.querySelector('.warning')){
            document.querySelector('.warning').remove()
        }
        api.addCat(body)
            .then(res => res.json())
            .then(data =>{
                if(data.message === 'ok'){
                    let storeAddCats = localStorage.getItem('catsAdd');
                    local_storage(storeAddCats, 'catsAdd', body);
                    console.log(localStorage.getItem('catsAdd'));
                    const card = document.querySelector('.cats')
                    createCatCard(body, document.querySelector('.cats').children.length , document.querySelector('.cats'));
                    e.target.reset();
                }else{
                        let message = document.createElement('h3');
                        message.className = 'warning';
                        message.innerHTML = `${data.message}`;
                        message.style.color = 'orange';
                        formAdd.append(message)

                }
            })  
    })
    close(form);
}


function deleteCatToBd(form){
    const delForm =document.querySelector('#delete');
    form.addEventListener('submit', e => {
        e.preventDefault();
        let idNumber;
        let catbody;
        let catsArray = JSON.parse(localStorage.getItem('catsExist'))
        console.log(catsArray);
        for(let i = 0; i<e.target.elements.length; i++){
            let el = e.target.elements[i];
            if(el.name){
                if(el.value !== ''){
                    idNumber = Number(el.value);
                    for(let i = 0; i<catsArray.length; i++){
                        console.log(catsArray[i].id)
                        if (Number(catsArray[i].id) === idNumber){
                            catbody = catsArray[i];
                        }
                    }
                }
            }   
        }
        console.log(idNumber, catbody);
        if(document.querySelector('.warning')){
            document.querySelector('.warning').remove()
        }
        if (typeof catbody !== 'undefined'){
            api.delCat(idNumber)
            .then( r => r.json())
            .then(result => {
                if (result.message === 'ok'){
                    let storeDelCats = localStorage.getItem('catsDelete');
                    local_storage(storeDelCats, 'catsDelete', catbody);
                    const warning = document.createElement('h3');
                    warning.className = 'warning';
                    warning.textContent = 'Котик удален';
                    delForm.append(warning);
                    e.target.reset();
                }
            })
        }else if(typeof catbody === 'undefined'){
            let message = document.createElement('h3');
            message.className = 'warning';
            message.style.color = 'orange';
            message.textContent = 'Что-то пошло не так'
            document.querySelector('#delete').append(message)  
        }
    })    
    close(form);   
}

function upCatToBd(form){
    const formAdd = document.forms.update;
    let bodyChange = {}, num;
    form.addEventListener('submit', e =>{
        e.preventDefault();
        for(let l = 0; l<e.target.elements.length; l++){
            let el = e.target.elements[l] 
            if(el.name === 'id'){
                num = el.value;   
            }else if(el.value === ''){
                continue;
            }else if(el.type === 'checkbox'){
                bodyChange[el.name] = el.checked;
            }else if(el.name !=='id' && el.name !== 'checkbox'){
                bodyChange[el.name]=el.value;
            }
            
        }
        const cats = JSON.parse(localStorage.getItem('catsExist'))
        for (let i = 0; i<cats.length; i++){
            if(document.querySelector('.warning')){
                document.querySelector('.warning').remove()
            }
            console.log(parseInt(num) === cats[i].id, parseInt(num) ,cats[i].id);
            if (parseInt(num) === cats[i].id){
                console.log(num, bodyChange);
                
                api.upCat(num, bodyChange)
                    .then(r => r.json())
                    .then(data => {
                        if(data.message ==='ok'){
                            bodyChange.id = num;
                            let storeUpCats = localStorage.getItem('catsUpdate');
                            local_storage(storeUpCats, 'catsUpdate', bodyChange);
                            console.log(localStorage.getItem('catsUpdate'));
                            const warning = document.createElement('h3');
                            warning.className = 'warning';
                            warning.textContent = `Котик ${num} был изменен`;
                            formAdd.append(warning);
                            e.target.reset();
                        }
                    })
                break;
            }else{
                const warning = document.createElement('h3');
                warning.className = 'warning';
                warning.style.color = 'orange';
                warning.textContent = `Нет такого id`;
                formAdd.append(warning);
            }
        }
        
    })
    close(form);
}

function cheoseCat(form){
    const allcat = JSON.parse(localStorage.getItem('catsExist'));
    const filterCats = document.forms.filter;
    let chooseCats = [];
    form.addEventListener('submit', e =>{
        e.preventDefault();
        for(let i = 0; i<e.target.elements.length; i++){
            let tag = e.target.elements[i];
            console.log(tag);
            for(let c = 0; c<allcat.length;c++){
                console.log(allcat[c].age, tag.value, tag.name);
                if(tag.name === 'age' && allcat[c].age === Number(tag.value)){
                    console.log(allcat[c].age, tag.value, tag.name);
                    chooseCats.push(allcat[c])
                }if(tag.name ==='rate' && allcat[[c].rate === tag.value]){

                }
            }
        }
    })
    
    
    close(form)
}


//button menu 1-add

menu[0].addEventListener('click', function(){
    wraperForm.classList.add('active');
    addCatInBd(wraperForm)
})
//button menu 2-delete
menu[1].addEventListener('click',function () {
    wraperFormDelete.classList.add('active');
    deleteCatToBd(wraperFormDelete);
    
})
//button menu 3
menu[2].addEventListener('click',function () {
    wraperFormUp.classList.add('active');
    upCatToBd(wraperFormUp);
})
//button menu 4
menu[3].addEventListener('click',function () {
    formFilter.classList.add('active');
    cheoseCat(formFilter);
})

api.showCats()
    .then(r => r.json())
    .then(result => {
        if(result.message === 'ok'){  
            //console.log(result);
            for (let j = 0; j< result.data.length; j++){
                storecat.push(result.data[j]);
            }
            localStorage.setItem('catsExist',JSON.stringify(storecat));
            const cats = document.querySelector('.cats');
            result.data.forEach((cat, i)=>{
                createCatCard(cat, i , cats)
            })
            const cards = [...document.querySelectorAll('.cat_cart')];
            cards.forEach(card =>{
                card.addEventListener('mouseover', () =>{
                    card.style.transform = 'scale(1.19)'; 
                })
                card.addEventListener("mouseout", function(){
                    card.style.transform = 'scale(1)';
                })
                
                card.addEventListener("click", 
                //create card cat width info
                function createInfoCart(){
                    const wrap = document.createElement('div');
                    wrap.className = 'wrapper_page_info'
                    const wrapInfoCart = document.createElement('div');
                    wrapInfoCart.classList.add('wrap_info_cart');
                    wrap.append(wrapInfoCart);
                    const elementExit = document.createElement('button');
                    elementExit.textContent = 'Close'
                    elementExit.className ='btn_close'
                    wrapInfoCart.append(elementExit)
                    const contentInfo = document.createElement('div');
                    contentInfo.classList.add('content_info')
                    const imgCat = document.createElement('div');
                    imgCat.style.background = `url('${result.data[card.getAttribute('data-index')].img_link}') no-repeat  center /cover `
                    imgCat.classList.add('img_cat')
                    contentInfo.append(imgCat)
                    const info = document.createElement('div');
                    info.innerHTML = `<h1>${result.data[card.getAttribute('data-index')].name}</h1>
                    <h2>${result.data[card.getAttribute('data-index')].age} 
                    ${rightRead(result.data[card.getAttribute('data-index')].age)}</h2>
                    <p>${result.data[card.getAttribute('data-index')].description}</p>`
                    // info.append()
                    
                    contentInfo.append(info);
                    wrapInfoCart.append(contentInfo)
                    wrapInfoCart.setAttribute('z-index', 3)
                    document.body.appendChild(wrap);

                    

                    const iconClose = document.querySelector('.wrap_info_cart button');
                    iconClose.addEventListener('click', function(){
                        wrap.remove();   
                    })
                    wrap.addEventListener('click',function(e){
                        e.stopPropagation()
                        if(e.target.classList.contains('wrapper_page_info')){
                            wrap.remove()
                        } 
                    })
                    
                })
            })
        }else{
            console.log(result.message)
        }
        
    })