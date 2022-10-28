function createCatCard (cat, i, parentElement){           
    const img = document.createElement('div');
    img.style.background = `url('${cat.img_link}') no-repeat center / cover ` || `url('${img/cat.ipg}') no-repeat center / cover ` ;
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
    
    parentElement.append(wrap_card);                  
}

