let buy = document.getElementById('buy');
let selectComputer = JSON.parse(localStorage.getItem('selectComputer'));

if (selectComputer) {
    document.querySelector('.hover-image').src = selectComputer.img;
    document.getElementById('general_price').textContent = selectComputer.price;
    document.querySelector('h2 p').textContent = selectComputer.title;
}

if (buy) {
    buy.addEventListener('click', function () {
        let trust = confirm('Додати цей товар до корзини?');
        if (trust) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (!cart.some(item => item.title === selectComputer.title)) {
                cart.push(selectComputer);
                localStorage.setItem('cart', JSON.stringify(cart));
            } else {
                alert('Цей товар уже в корзині!');
            }
        }
    });
}

