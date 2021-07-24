const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const passwordcheck = document.getElementById('password-check')

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    checkInputs()
})

function checkInputs(){
    const usernameValue = username.value.trim()
    const emailValue = email.value.trim()
    const passwordValue = password.value.trim()
    const passwordcheckValue = passwordcheck.value.trim()

    if(usernameValue === ''){
        setErrorFor(username, "Username can not be blank")
    }else {
        setSuccessFor(username)
    }

    if(emailValue === ''){
        setErrorFor(email, "Email can not be blank")
    }else {
        setSuccessFor(email)
    }

    if(passwordValue !== passwordcheckValue){
        setErrorFor(password, "Password did not match")
        setErrorFor(passwordcheck, "Password did not match")
    }else {
        setSuccessFor(password)
        setSuccessFor(passwordcheck)
    }
}

function setErrorFor(input, message){
    const formControl = input.parentElement
    const small = formControl.querySelector('small')

    small.innerText = message

    formControl.className = 'form-control error'
}

function setSuccessFor(input){
    const formControl = input.parentElement

    formControl.className = 'form-control success'
}
