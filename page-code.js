const body = document.querySelector('body')

// button is a click
body.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault()
    e.target.click()
  }
})

// selected/deselect
const workItems = document.querySelectorAll('.my-work-list__item')
const infoBox = document.getElementById('my-work__infobox-container')

// body.onclick = (e) => {
//   if (!e.defaultPrevented) {
//     removeSelected()
//   }
// }

const removeSelected = () => {
  document.querySelectorAll('.selected').forEach((el) => el.classList.remove('selected'))
  document.querySelectorAll('.visible').forEach((el) => el.classList.remove('visible'))
}
const addSelected = (e) => {
  removeSelected()
  e.preventDefault()
  e.currentTarget.classList.add('selected')
  const name = e.currentTarget.id
  const box = document.getElementById(name + '__info')
  box.classList.add('visible') //error handling?
}

workItems.forEach((el) => (el.onclick = addSelected))

const projects = [
  { name: 'axon', images: 4, },
  { name: 'expedia', images: 0 },
  { name: 'fairslice', images: 3 },
]

const getThumbHtml = (project, num) => (
  `
  <li class="my-work__screenshot-container">
    <div class="my-work__screenshot" role="button" tabindex="0" data-project="${project}" data-num="${num}">
      <img class="my-work__screenshot-img" src="screenshots/${project}${num}.jpg" alt="${project} screenshot ${num}" />
      <img class="my-work__screenshot-mag" src="icons/magnifier.svg" alt="" />
    </div>
  </li>
`)

projects.forEach((p) => {
  const list = document.getElementById(p.name + '-list')
  let items = ''
  for(var i = 1; i <= p.images; i++) {
    items += getThumbHtml(p.name, i)
  }
  list.innerHTML = items
})
const lightbox = document.getElementById('lightbox')
lightbox.onclick = e => {
  if(e.target === lightbox) {
    lightbox.classList.remove('visible')
  }
}

var currentPicture = 1
var currentProject = ''
const workItemScreenshots = document.querySelectorAll('.my-work__screenshot')
workItemScreenshots.forEach((el) => {
  el.onclick = (e) => {
    lightbox.classList.add('visible')
    currentPicture = e.currentTarget.dataset.num
    currentProject = e.currentTarget.dataset.project
    setLightboxImage(currentProject, currentPicture)
  }
})

// alt tag should be improved here
const setLightboxImage = (project, num) => {
  const img = `<img class="lightbox__img" src="screenshots/${project+num}.jpg" alt="${project} screenshot ${num}" />`
  const interior = document.getElementById('lightbox__interior__img-holder')
  interior.innerHTML = img
}

const leftArrow = document.getElementById('arrow-left')
const rightArrow = document.getElementById('arrow-right')
leftArrow.onclick = () => {
  const p = projects.find(proj => proj.name === currentProject)
  currentPicture = currentPicture - 1 <= 0 ? p.images : currentPicture - 1
  setLightboxImage(currentProject, currentPicture)
}
rightArrow.onclick = () => {
  const p = projects.find(proj => proj.name === currentProject)
  currentPicture = currentPicture + 1 > p.images ? 1 : currentPicture + 1
  setLightboxImage(currentProject, currentPicture)
}
