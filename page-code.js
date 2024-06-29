const body = document.querySelector('body')

// button is a click
body.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault()
    e.target.click()
  }
  console.log(e.key)
  if(e.key === 'ArrowLeft') {
    onArrowLeft()
  }
  if(e.key === 'ArrowRight') {
    onArrowRight()
  }
  if (e.key === 'Escape') {
    exitLightbox()
  }
})

// selected/deselect
const infoBox = document.getElementById('my-work__infobox-container')

const removeSelected = () => {
  document.querySelectorAll('.selected').forEach((el) => el.classList.remove('selected'))
  document.querySelectorAll('.visible').forEach((el) => el.classList.remove('visible'))
}

/**
 * Lightbox code
 */
const lightbox = document.getElementById('lightbox')
lightbox.onclick = (e) => {
  if (e.currentTarget === lightbox) {
    exitLightbox()
  }
}
const exitLightbox = () => lightbox.classList.remove('visible', 'no-document-scroll')

var currentPicture = 1
var currentProject = ''

const showScreenshots = (project) => {
  currentProject = project
  lightbox.classList.add('visible', 'no-document-scroll')
  setLightboxImage(project, 1)
}

// alt tag should be improved here
const setLightboxImage = (project, num) => {
  const img = `<img class="lightbox__img" src="screenshots/${
    project + num
  }.jpg" alt="${project} screenshot ${num}" />`
  const interior = document.getElementById('lightbox__interior__img-holder')
  interior.innerHTML = img
}

const projects = [
  { name: 'axon', images: 4 },
  { name: 'expedia', images: 2 },
  { name: 'fairslice', images: 3 },
  { name: 'gvh', images: 2 },
  { name: 'uwkc', images: 3 },
]
const leftArrow = document.getElementById('arrow-left')
const onArrowLeft = (e) => {
  const p = projects.find((proj) => proj.name === currentProject)
  currentPicture = currentPicture - 1 <= 0 ? p.images : currentPicture - 1
  setLightboxImage(currentProject, currentPicture)
  e.stopPropagation()
}
leftArrow.onclick = onArrowLeft

const rightArrow = document.getElementById('arrow-right')
const onArrowRight = (e) => {
  const p = projects.find((proj) => proj.name === currentProject)
  currentPicture = currentPicture + 1 > p.images ? 1 : currentPicture + 1
  setLightboxImage(currentProject, currentPicture)
  e.stopPropagation()
}
rightArrow.onclick = onArrowRight

// Scrolling code
const navItems = document.querySelectorAll('nav a')
navItems.forEach((el) => {
  el.onclick = (e) => {
    e.preventDefault()
    const target = el.attributes.href.value.slice(1)
    window.scrollTo({
      top: document.getElementById(target).offsetTop,
      behavior: 'smooth',
    })
  }
})
