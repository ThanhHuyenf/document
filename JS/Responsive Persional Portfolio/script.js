const showMenu = document.getElementById('nav-toggle')
const navMenu = document.getElementsByClassName("nav__menu")

const navLink = document.querySelectorAll(".nav__link")

showMenu.addEventListener('click', () => {
    navMenu[0].classList.toggle('show')
})

function linkAction() {
    navLink.forEach(item => item.classList.remove("active"))
    this.classList.add('active')

    navMenu[0].classList.remove('show')
}

navLink.forEach(item => item.addEventListener("click", linkAction))

// const sr= ScrollReveal({
//     origin:'top',
//     distance: '80px',
//     duration: 2000,
//     reset: true
// })
//
// sr.reveal('.home__title',{})
