const menu_lines = document.getElementsByClassName("menu-lines")[0]
const menu = document.getElementsByClassName("menu")[0]
const logout = document.getElementsByClassName("logout-button")[0]

menu_lines.addEventListener('click', function(){
    menu.classList.toggle('menu-small')
    logout.classList.toggle('lg-small')
})