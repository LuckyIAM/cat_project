
let kitty = {
    id: 11,
    name: "Цветок",
    img_link: "https://pets2.me/media/res/3/4/9/5/3495.ovt9pc.840.jpg",
    age: 0.3,
    rate: 10,
    description: "Мой будущий катенок =)",
    favourite: true
}

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

const menu  = [...document.querySelectorAll('.menu_item div')]
const wraperForm = document.querySelector('.wraper_form');
menu[0].addEventListener('click', function(){
    wraperForm.classList.add('active')
})

const exitForm = document.querySelector('.exit')
console.log(exitForm);
exitForm.addEventListener('click',function(){
    wraperForm.classList.remove('active')
})

fetch('https://sb-cats.herokuapp.com/api/2/LuckyIAM/add', {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(kitty)
})
    .then(q => q.json())
    .then(result =>{
    if(result.ok){
        console.log(result)
    }
})

fetch('https://sb-cats.herokuapp.com/api/2/LuckyIAM/show')
    
    .then(r => r.json())
    
    .then(result => {
        if(result.message === 'ok'){  
            console.log(result);
            const cats = document.querySelector('.cats');
            result.data.forEach((cat, i) =>{
                
                const img = document.createElement('div');
                img.style.background = `url('${cat.img_link}') no-repeat center / cover `;
                img.classList.add('cat_img');
                
                const wrap_card = document.createElement('div');
                wrap_card.classList.add('cat_cart');
                wrap_card.setAttribute('data-index', i)
                wrap_card.append(img);

                const name = document.createElement('h1');
                name.innerHTML = cat.name;
                wrap_card.append(name);

                const div_icon = document.createElement('div'); 
                div_icon.classList.add('icon_rate')
                let rate_cat = cat.rate;
                let noneRate = 10 - rate_cat;
                let save_darck = '', save_light = '' ;
                while(rate_cat){
                    save_darck += '<i class="fa-solid fa-heart" style ="color: #172be0;"></i>';
                    rate_cat--;
                }
                div_icon.style.color = '#aaa';
                while (noneRate){
                    save_light += '<i class="fa-regular fa-heart" style ="color: #172be0;"></i>';
                    noneRate--;
                }
                div_icon.innerHTML = save_darck + save_light;

                wrap_card.append(div_icon)
                
                cats.append(wrap_card);                  
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
                        console.log(e.target);
                        if(e.target.classList.contains('wrapper_page_info')){
                            wrap.remove()
                        } 
                    })
                })
            })
        }
    })
    .catch(err => console.log(err))


