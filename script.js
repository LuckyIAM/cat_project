
let kitty = {
    id: 11,
    name: "Цветок",
    img_link: "https://pets2.me/media/res/3/4/9/5/3495.ovt9pc.840.jpg",
    age: 0.3,
    rate: 10,
    description: "Мой будущий катенок =)",
    favourite: true
}

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
            result.data.forEach(cat =>{
                
                const img = document.createElement('div');
                img.style.background = `url('${cat.img_link}') no-repeat center / cover `;
                img.style.opacity = '0.8'
                img.classList.add('cat_img');
                
                const wrap_card = document.createElement('div');
                wrap_card.classList.add('cat_cart');
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
                    save_darck += '<i class="fa-solid fa-heart"></i>';
                    rate_cat--;
                }
                div_icon.style.color = '#aaa';
                while (noneRate){
                    save_light += '<i class="fa-regular fa-heart"></i>';
                    noneRate--;
                }
                div_icon.innerHTML = save_darck + save_light;

                wrap_card.append(div_icon)
                
                cats.append(wrap_card);

            })
        }
    })
    .catch(err => console.log(err))



