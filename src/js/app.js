// Скрипт для выравнивания соедржимого в блоках с ценой
const priceboxes = document.querySelectorAll('.pricebox');
for (let p of priceboxes) {
  if (p.children.length === 1) {
    p.style.justifyContent = 'center'
  }
}

// Отмена перезагрузки страницы при отправке форм
const forms = document.forms;
for (let f of forms) {
  f.onsubmit = (e) => e.preventDefault()
}


const url = 'https://jsonplaceholder.typicode.com/posts/1'
const buys = document.querySelectorAll('.buy');
let loadCont

for (let b of buys) {
  // if (b.classList.contains('normal')) {
  //   b.innerText = 'Купить'
  // } else if (b.classList.contains('done')) {
  //   b.innerText = '✔ В корзине'
  // }
  // else if (b.classList.contains('loading')) {
  //   b.innerText = '.'
  // }
  function toCart() {
    loadCont = setInterval(function() {
      b.innerText += '.';
      if (b.textContent.length >= 4) {
        b.innerText = '.'
      }
    }, 300)
  }
  b.onclick = () => {
    if (b.classList.contains('normal')) {
      b.classList.remove('normal')
      b.classList.add('loading');
      b.setAttribute('disabled', true)
      toCart();
      setTimeout(() => {
        fetch(url)
          .then((res) => {
            if (res.ok) {
              b.classList.remove('loading');
              b.removeAttribute('disabled');
              b.classList.add('done');
              b.innerText = '✔ В корзине';
              clearInterval(loadCont)
            }
          })
      }, 2000)
    } else if (b.classList.contains('done')) {
      b.classList.remove('done');
      b.classList.add('normal');
      b.innerText = 'Купить'
    }
  }
}
