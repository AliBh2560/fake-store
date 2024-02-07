fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json())
    .then(json => categ = json)
    .then(json => renderFilter(json));

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(res => items = res)
    .then(json => render(json));


//filter
function renderFilter(list) {
    let temp = list.map(item => {
        return `
        <li><label for="${item}">${item}</label> <input class="filter-inps" type="checkbox" name="" value="${item}" id="${item}"></li>
        `
    }).join('')
    filterContainer.innerHTML = temp;

    filterInps = document.querySelectorAll('.filter-inps');
    for (const filterInp of filterInps) {
        filterInp.addEventListener('change', filter);
    }
}

function filter() {
    filtered = [];
    let checkedFilter = [];

    for (const filterInp of filterInps) {
        if (filterInp.checked) checkedFilter.push(filterInp.value)
    }


    if (!checkedFilter.length) {
        render(items)
    } else {
        for (let i = 0; i < checkedFilter.length; i++) {
            fetch(`https://fakestoreapi.com/products/category/${checkedFilter[i]}`)
                .then(res => res.json())
                .then(json => filtered.push(...json))
                .then(json => render(filtered));
        }
    }
}

function render(list) {
    // console.log(list)
    let dot = '...';
    let temp = list.map((item, index) => {
        return `
        <div class="card">
        <i id="addToShop" onclick="addToShop(${item.id})" class="gg-bookmark" style="color:${sleceted.includes(item.id) ? 'gold' : ''};"></i>
            <img src="${item.image}" alt="">
            <span class="card__content">
                <h2>${item.title.length > 10 ? item.title.slice(0, 10) + dot : item.title}</h2>
                <i onclick="handleCard(${item.id})" class="gg-arrow-right-r"></i>
            </span>
        </div> 
        
        
        `
    }).join('')
    root.innerHTML = temp;
}

function addToShop(index) {


    if (!sleceted.includes(index)) {
        sleceted.push(index)
        shopCounter.textContent = sleceted.length;
    } else {
        sleceted.splice(sleceted.lastIndexOf(index), 1);
        shopCounter.textContent--
    }

    for (let i = 0; i < sleceted.length; i++) {
        fetch('https://fakestoreapi.com/carts', {
            method: "POST",
            body: JSON.stringify(
                {
                    userId: 1,

                    date: "2020-02-03",
                    products: [{ productId: sleceted[i], quantity: 1 }]
                }
            )
        });
    }
    filter()
}

function handleCard(index) {
    fetch(`https://fakestoreapi.com/products/${index}`)
        .then(res => res.json())
        .then(json => renderCard(json))


}

function renderCard(item) {
    filterContainer.classList.add('hide')
    root.innerHTML = `
    <div class="single-card">
    <i onclick="closeCard()" class="gg-arrow-left"></i>
        <img src="${item.image}" alt="">
        <span class="single-card__content">
            <h2>${item.title}</h2>
            <p>${item.price}</p>
            <p>${item.rating.rate}</p>
            <p>${item.category}</p>
            <p>${item.description}</p>
        </span>
    </div>
    `
}

function closeCard() {
    filterContainer.classList.remove('hide');
    filter()
}

function shopHandle() {
    shopSelected = [];
    if (sleceted.length) {
        for (let i = 0; i < sleceted.length; i++) {
            fetch(`https://fakestoreapi.com/products/${sleceted[i]}`)
                .then(res => res.json())
                .then(json => shopSelected.push(json))
                .then(json => renderShop());
        }
    } else {
        filterContainer.classList.add('hide')
        root.innerHTML = `<i onclick="closeShop()" class="gg-arrow-left"></i><h2 style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">you haven't selected anything yet</h2>`
    }
}


function renderShop() {


    filterContainer.classList.add('hide')

    let returnBtn = `<i onclick="closeShop()" class="gg-arrow-left"></i>`

    let temp = shopSelected.map(item => {
        return `
        <div class="single-card">
    <img src="${item.image}" alt="">
        <span class="single-card__content">
            <h2>${item.title}</h2>
            <p>${item.price}</p>
            <p>${item.rating.rate}</p>
            <p>${item.category}</p>
            <p>${item.description}</p>
        </span>
</div>
        `
    }).join('')
    root.innerHTML = returnBtn;
    root.innerHTML += temp;

}

function closeShop() {
    filterContainer.classList.remove('hide');
    filter()
}
