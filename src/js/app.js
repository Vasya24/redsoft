const priceboxes = document.querySelectorAll('.pricebox');
for (let p of priceboxes) {
  console.log(p.children)
  if (p.children.length == 1) {
    p.style.justifyContent = 'center'
  }
}
