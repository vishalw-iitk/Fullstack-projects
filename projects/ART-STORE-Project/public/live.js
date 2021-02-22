const  active = document.getElementsByClassName("menu")[0]
const  navbar = document.getElementsByClassName("navigation")[0]
const fancysh = document.getElementsByClassName("fancy-msg")[0]
const headimg = document.querySelector('header')

console.log(active)
active.addEventListener('click',function(){
    console.log(123)
    navbar.classList.toggle('short-screen-ui')
    fancysh.classList.toggle('fancy-short')
    headimg.classList.toggle('hedur')
})