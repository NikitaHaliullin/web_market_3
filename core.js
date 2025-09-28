let basket = document.getElementById('basket')
let massage_basket = document.getElementById('massage-basket')
let massage_computers = document.getElementById('massage-computers')
let choose = document.getElementById('choose')
let high_low = document.getElementById('high_low')
let pc_color = document.getElementById('PcColor')
let computers = document.getElementById('computers')
let price_text = document.querySelectorAll('.price_text')
let title_text = document.querySelectorAll('.title_text')
let cards = document.querySelectorAll('.card')
let name_image = document.querySelectorAll('.name_image')
let color_text = document.querySelectorAll('.black')
let card_width = document.querySelector('img.name_image')
let buy_computers = document.getElementById('buy_computers')
let Log = document.getElementById('log_in')

let computer_list =  JSON.parse(localStorage.getItem('cart')) || []

let pos = -425
let isOpen = false
let start = true
let login_password = JSON.parse(localStorage.getItem('users')) || []
console.log(login_password)

function randerCart() {
    if (!buy_computers) return
    buy_computers.innerHTML = ''
    if (computer_list.length === 0) {
        buy_computers.innerHTML = "<p style='color: white; padding: 20px;'>Корзина пуста</p>"
        return
    }
    computer_list.forEach((item, index) => {
        let product = document.createElement('div')
        product.innerHTML = 
            `<div style="align-items: center; padding: 10px; border-bottom: 1px solid #ccc;">
                <img src="${item.img}" width="100px" height="100px">
                <p style="color: white; font-size: 16px;">${item.title}</p>
                <div style="display: flex; justify-content: space-between;">
                    <p style="color: red;">${item.price}</p>
                    <p style="color: gray;">грн</p>
                </div>
                <button class="remove-item" data-index="${index}">Удалить</button>
            </div>
            `;

        buy_computers.appendChild(product)
    })

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            let index = parseInt(e.target.dataset.index)
            computer_list.splice(index, 1)
            localStorage.setItem('cart', JSON.stringify(computer_list))
            randerCart()
        })
    })
}

function animate() {
    if (!massage_basket) return;
    let target = isOpen ? -425 : 10

    if (!isOpen && pos < target && start == true) {
        pos += 15
        massage_basket.style.right = pos + "px"
        requestAnimationFrame(animate)
        if (pos === 10) {
            isOpen = true
            start = false
            massage_basket.style.position = "fixed"
        }
    } else if (isOpen && pos > target && start == true) {
        pos -= 15
        massage_basket.style.right = pos + "px"
        requestAnimationFrame(animate)
        if (pos === -425) {
            massage_basket.style.display = "none"
            isOpen = false
            start = false
        }
    }
}

if (basket && massage_basket) {
    basket.addEventListener('click', function () {
        start = true
        if (!isOpen){
            massage_basket.style.display = "flex"
            randerCart()
            animate()
        } else {
            animate()
        }

    })
}
randerCart()


if (Log) {
    Log.addEventListener('click', function() {
        let login = document.getElementById('login').value.trim()
        let password = document.getElementById('password').value.trim()

        if (!login || !password) {
            alert('Ви не ввели логін або пароль')
        }

        let UserExist = login_password.find(user => user.login === login)
        if (UserExist) {
            if (UserExist.password === password) {
                alert('Ви увійшли в аккаунт!')
                localStorage.setItem('logined', login)
                window.location.href = 'index.html'
            } else {
                alert('Пароль не вірний!')
            }
        } else {
            login_password.push({
                login: login,
                password: password
            })
            localStorage.setItem('users', JSON.stringify(login_password))
            alert('Ви успішно створили новий аккаунт!')
            localStorage.setItem('logined', login)
            login = ''
            password = ''
            window.location.href = 'index.html'
        }
    })
}

if (choose && high_low && pc_color) {
    choose.addEventListener("click", function () {
        let Min = document.getElementById('min').value
        let Max = document.getElementById('max').value
        let color_value = pc_color.value
        let sort_value = high_low.value
        let id_price = {}
        let sorted

        if (Max === "") {
            Max = Infinity
        }

        for (let i = 0; i < price_text.length; i++) {
            let text_number = Number(price_text[i].textContent.trim())
            let img = name_image[i].src;
            let title = title_text[i].textContent.trim()
            let color = color_text[i].textContent.trim()
        
            id_price[`computer_${i + 1}`] = {
                price: text_number,
                img: img,
                title: title,
                color: color
            };
        }

        if (sort_value === "high") {
            sorted = Object.entries(id_price).sort((a, b) => b[1].price - a[1].price)
        } else {
            sorted = Object.entries(id_price).sort((a, b) => a[1].price - b[1].price)
        }

        for (let i = 0; i < sorted.length; i++) {

                if (sorted[i][1].color == color_value || color_value === "All") {
                    cards[i].innerHTML = `                                
                    <div id="${sorted[i][0]}">
                        <img class="name_image" src="${sorted[i][1].img}" width="${card_width.getAttribute("width")}" height="200px">
                        <p class="title_text">${sorted[i][1].title}</p>
                        <p class="price_text">${sorted[i][1].price}</p>
                        <p class="black">${sorted[i][1].color}</p>
                    </div>
                    `;

                    if (sorted[i][1].price >= Min && sorted[i][1].price <= Max || Max === "" && Min === "") {
                        cards[i].style.display = "flex"
                    } else {
                        cards[i].style.display = "none"
                    }

                } else {
                    cards[i].style.display = "none"
                }
            
        }
    })
}

cards.forEach((card) => {
    card.addEventListener("click", () => {
        let img = card.querySelector("img").src
        let price = card.querySelector('.price_text').textContent.trim()
        let title = card.querySelector('.title_text').textContent.trim()
        let color = card.querySelector('.black').textContent.trim()
        
        localStorage.setItem('selectComputer', JSON.stringify({
            img: img,
            price: price,
            title: title,
            color: color
        }))
    })
})
