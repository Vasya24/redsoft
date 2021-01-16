const axios = require('axios')

// Aligning items in price blocks
const priceboxes = document.querySelectorAll('.pricebox');
for (let p of priceboxes) {
  if (p.children.length === 1) {
    p.style.justifyContent = 'center'
  }
}

// Cancelling default page reloading by form submitting
const forms = document.forms;
for (let f of forms) {
  f.onsubmit = (e) => e.preventDefault()
}


const url = 'https://jsonplaceholder.typicode.com/posts/1'
const buys = document.querySelectorAll('.buy');
let loadCont;

for (let b=0;b<buys.length; b++) {
  window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem(b)) {
      buys[b].className = 'buy done';
      buys[b].innerText = '✔ В корзине';
    }
  })
  function toCart() {
    loadCont = setInterval(function() {
      buys[b].innerText += '.';
      if (buys[b].textContent.length >= 4) {
        buys[b].innerText = '.'
      }
    }, 300)
  }

  buys[b].onclick = () => {
    if (buys[b].classList.contains('normal')) {
      buys[b].classList.remove('normal')
      buys[b].classList.add('loading');
      buys[b].setAttribute('disabled', true)
      toCart();
      setTimeout(() => {
        // I wrote this part of code first but sadly fetch is not supported by IE11
        // fetch(url)
        //   .then((res) => {
        //     if (res.ok) {
        //       buys[b].classList.remove('loading');
        //       buys[b].removeAttribute('disabled');
        //       buys[b].classList.add('done');
        //       buys[b].innerText = '✔ В корзине';
        //       clearInterval(loadCont);
        //       localStorage.setItem(b, 'true');
        //       console.log(localStorage)
        //     }
        //   })
        // So I used axios
        axios.get(url)
          .then((res) => {
              buys[b].classList.remove('loading');
              buys[b].removeAttribute('disabled');
              buys[b].classList.add('done');
              buys[b].innerText = '✔ В корзине';
              clearInterval(loadCont);
              localStorage.setItem(b, 'true');
          })
      }, 2000)
    } else if (buys[b].classList.contains('done')) {
      buys[b].classList.remove('done');
      buys[b].classList.add('normal');
      buys[b].innerText = 'Купить'
      localStorage.removeItem(b);
    }
  }
}
