const login = async () => {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  try {
    const response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-type': 'application/json' }
    })

    if (response.ok) {
      const responseJSON = await response.json()
      sessionStorage.setItem('token', responseJSON.token)
      document.location = 'index.html'
    } else if (response.status !== 200) {
      throw new Error('identifiant incorect')
    }
  } catch (error) {
    const login = document.getElementById('login')
    const errorMessage = document.createElement('span')
    errorMessage.classList.add('error-message')
    errorMessage.innerText = error.message
    login.appendChild(errorMessage)
    console.error(error)
  }
}

document.querySelector('#login form').addEventListener('submit', (e) => {
  e.preventDefault()
  login()
})
