let modal = null

const openModal = (e) => {
  e.preventDefault()
  const galeryPicture = document.querySelector('.galery-picture')
  const addPicture = document.querySelector('.add-picture')
  galeryPicture.style.display = null
  addPicture.style.display = 'none'
  const target = document.querySelector(e.target.getAttribute('href'))
  addPicture.style.display = 'none'
  target.style.display = null
  target.removeAttribute('aria-hidden')
  target.setAttribute('aria-modal', 'true')
  modal = target
  modal.addEventListener('click', closeModal)
  modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
  modal
    .querySelector('.js-modal-stop')
    .addEventListener('click', stopPropagation)
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
    })
  })
}

document.querySelector('.add-button').addEventListener('click', () => {
  const galeryPicture = document.querySelector('.galery-picture')
  const addPicture = document.querySelector('.add-picture')
  galeryPicture.style.display = 'none'
  addPicture.style.display = null
})

document.querySelector('.js-arrow-left').addEventListener('click', () => {
  const galeryPicture = document.querySelector('.galery-picture')
  const addPicture = document.querySelector('.add-picture')
  galeryPicture.style.display = null
  addPicture.style.display = 'none'
})
