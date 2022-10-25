import Api from "./api.js"

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


const api = new Api('q1o');
const formAdd = document.forms.add;
function addCatInBd(form, store){
    let body = {};
    form.addEventListener('submit',function(e){
        e.preventDefault();
        for(let i=0; i<e.target.elements.length; i++){
            let el = e.target.elements[i];
            if(el.name){
                if(el.type === 'checked'){
                    body[el.name] = el.checked;
                }else{
                    body[el.name] = el.value;
                }
            }
        }
    })
    console.log(body);
    
    api.addCat(body)
    .then(res => {
        console.log(res.json())
        res.json()
    })
    .then(data =>{
        if(data.message === 'ok'){
            console.log(data.message, data);
            const card = document.querySelector('.cats')
            // console.log(body, card.children.length + 1, card);
            createCatCard(body, document.querySelector('.cats').children.length , document.querySelector('.cats'));
            store = store.push(body);
            console.log(store);
            localStorage.setItem('cats', JSON.stringify(store))
            // form.reset();
        }
   })  
}

let catsList = []

const menu  = [...document.querySelectorAll('.menu_item div')]
const wraperForm = document.querySelector('.wraper_form');
menu[0].addEventListener('click', function(){
    wraperForm.classList.add('active');
    addCatInBd(formAdd, catsList);
})

const exitForm = document.querySelector('.exit')
exitForm.addEventListener('click',function(){
    wraperForm.classList.remove('active')
})




api.showCats()
    .then(r => r.json())
    .then(result => {
        if(result.message === 'ok'){  
            console.log(result);
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
   


