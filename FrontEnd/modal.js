let modal = null

const setWork = async (work) => {
  const formData = new FormData()
  formData.append('title', work.title)
  formData.append('image', work.img)
  formData.append('category', work.category)
  try {
    await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const openModal = (e) => {
  e.preventDefault()
  const galeryPicture = document.querySelector('.galery-picture')
  const addPicture = document.querySelector('.add-picture')
  galeryPicture.style.display = null
  addPicture.style.display = 'none'
  const target = document.querySelector(e.target.getAttribute('href'))
  target.style.display = null
  target.removeAttribute('aria-hidden')
  target.setAttribute('aria-modal', 'true')
  modal = target
  modal.addEventListener('click', closeModal)
  modal.querySelectorAll('.js-modal-close').forEach((modal) => {
    modal.addEventListener('click', closeModal)
  })
  modal.querySelectorAll('.js-modal-stop').forEach((modal) => {
    modal.addEventListener('click', stopPropagation)
  })
  populateSelect()
  document.querySelector('.create-work').disabled = true
}

const closeModal = (e) => {
  if (modal === null) return
  e.preventDefault()
  modal.style.display = 'none'
  modal.setAttribute('aria-hidden', 'true')
  modal.removeAttribute('aria-modal')
  modal.removeEventListener('click', closeModal)
  modal
    .querySelector('.js-modal-close')
    .removeEventListener('click', closeModal)
  modal
    .querySelector('.js-modal-stop')
    .removeEventListener('click', stopPropagation)
  modal = null
}

const stopPropagation = (e) => {
  e.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach((a) => {
  a.addEventListener('click', openModal)
})

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' || e.key === 'Esc') {
    closeModal(e)
  }
})

const createImage = async () => {
  let works = await getData()
  const imageSection = document.querySelector('.js-gallery-modal')
  imageSection.innerHTML = ''
  works.forEach((element) => {
    const figureElement = document.createElement('figure')
    const imageElement = document.createElement('img')
    const deleteElement = document.createElement('img')
    imageElement.classList.add('modal-img')
    deleteElement.classList.add('clickable')
    deleteElement.src = './assets/icons/trash-can-solid.svg'
    deleteElement.id = element.id
    imageElement.src = element.imageUrl
    imageSection.appendChild(figureElement)
    figureElement.appendChild(imageElement)
    figureElement.appendChild(deleteElement)
  })
  buttonImage()
}

createImage()

const getToken = () => sessionStorage.getItem('token')

const deleteWork = async (id) => {
  try {
    return await fetch(`http://localhost:5678/api/works/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const buttonImage = () => {
  document.querySelectorAll('.clickable').forEach((btn) => {
    btn.addEventListener('click', () => {
      deleteWork(btn.id)
      createImage()
      creatework()
    })
  })
}

document.querySelector('.add-button').addEventListener('click', () => {
  document.querySelector('.galery-picture').style.display = 'none'
  document.querySelector('.add-picture').style.display = null
})

document.querySelector('.js-arrow-left').addEventListener('click', () => {
  document.querySelector('.galery-picture').style.display = null
  document.querySelector('.add-picture').style.display = 'none'
})

const populateSelect = async () => {
  const category = await getCategory()
  category.forEach((category) => {
    const option = document.createElement('option')
    option.innerText = category.name
    option.value = category.id
    document.getElementById('choix').appendChild(option)
  })
}

document.getElementById('file').addEventListener('change', (e) => {
  document.querySelector('.square-add-picture').style.display = 'none'
  const divImage = document.querySelector('.picture-preview')
  divImage.classList.add('square-add-picture')
  divImage.style.display = null
  const image = document.createElement('img')
  divImage.appendChild(image)
  image.classList.add('square-picture')
  image.setAttribute('src', URL.createObjectURL(e.target.files[0]))
})

document.querySelector('.form').addEventListener('submit', async (e) => {
  e.preventDefault()
  const work = {
    title: document.getElementById('title').value,
    category: document.getElementById('choix').value,
    img: document.getElementById('file').files[0]
  }
  await setWork(work)
  await creatework()
  createImage()
  document.querySelector('.form').reset()
  document.querySelector('.square-add-picture').style.display = null
  document.querySelector('.picture-preview').style.display = 'none'
  document.querySelector('.square-picture').style.display = 'none'
})

const changeLogout = () => {
  if (sessionStorage.getItem('token')) {
    let logout = document.querySelector('.logout')
    logout.textContent = 'logout'
    document.querySelector('.edition-mode').style.display = null
    document.querySelector('.js-modal').style.display = null
    document.querySelector('.icon-title').style.display = null
    logout.addEventListener('click', () => {
      sessionStorage.removeItem('token')
      window.location = 'index.html'
    })
  } else {
    document.querySelector('.edition-mode').style.display = 'none'
    document.querySelector('.js-modal').style.display = 'none'
    document.querySelector('.icon-title').style.display = 'none'
  }
}

changeLogout()

document.querySelector('.form').addEventListener('change', () => {
  if (
    document.getElementById('title').value &&
    document.getElementById('choix').value !== '0' &&
    document.getElementById('file').files[0]
  ) {
    document.querySelector('.create-work').disabled = false
  }
})
