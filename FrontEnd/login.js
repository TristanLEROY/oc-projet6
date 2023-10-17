const login = async () => {
  try {
    const response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        'email': 'sophie.bluel@test.tld',
        'password': 'S0phie'
      }),
      headers: { 'Content-type': 'application/json' }
    })
    if (response.ok) {
      const responseJSON = await response.json()
      console.log(responseJSON)
    }
  } catch (error) {
    console.error(error)
  }
}

login()
