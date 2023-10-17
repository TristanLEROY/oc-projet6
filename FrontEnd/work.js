const getData = async () => {
  try {
    const response = await fetch('http://localhost:5678/api/works')
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.log(error)
  }
}

const getCategory = async () => {
  try {
    const responseButton = await fetch('http://localhost:5678/api/categories')
    if (responseButton.ok) {
      return await responseButton.json()
    }
  } catch (error) {
    console.log(error)
  }
}

const creatework = async (filter) => {
  let works = await getData()
  const gallerySection = document.querySelector('.gallery')
  if (filter) {
    works = works.filter((work) => work.categoryId === parseInt(filter))
  }
  works.forEach((element) => {
    const figureElement = document.createElement('figure')
    const imageElement = document.createElement('img')
    imageElement.src = element.imageUrl
    const titleElement = document.createElement('figcaption')
    titleElement.innerText = element.title
    gallerySection.appendChild(figureElement)
    figureElement.appendChild(imageElement)
    figureElement.appendChild(titleElement)
  })
}

const createButton = async () => {
  const categories = await getCategory()
  const buttonDiv = document.querySelector('.buttonDiv')
  const buttonAll = document.createElement('button')
  buttonAll.innerText = 'Tous'
  buttonAll.classList.add('button-item')
  buttonDiv.appendChild(buttonAll)
  categories.forEach((category) => {
    const buttonElement = document.createElement('button')
    buttonElement.innerText = category.name
    buttonElement.id = category.id
    buttonElement.classList.add('button-item')
    buttonDiv.appendChild(buttonElement)
  })
  attacheListener()
}

const attacheListener = () => {
  document.querySelectorAll('.button-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const gallerySection = document.querySelector('.gallery')
      gallerySection.innerHTML = ''
      clean()
      creatework(btn.id)
      btn.classList.add('button-click')
    })
  })
}

creatework()

createButton()

const clean = () => {
  document.querySelectorAll('.button-item').forEach((btnR) => {
    btnR.classList.remove('button-click')
  })
}
