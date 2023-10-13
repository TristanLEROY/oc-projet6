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

const creatework = async (filter) => {
  let works = await getData()
  const gallerySection = document.querySelector('.gallery')
  gallerySection.innerHTML = ''
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

creatework()

document.querySelectorAll('.button-item').forEach((btn) => {
  btn.addEventListener('click', () => {
    clean()
    creatework(btn.id)
    btn.classList.add('button-click')
  })
})

const clean = () => {
  document.querySelectorAll('.button-item').forEach((btnR) => {
    btnR.classList.remove('button-click')
  })
}
