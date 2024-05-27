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
  { name: 'axon', images: 4 },
  { name: 'expedia', images: 2 },
  { name: 'fairslice', images: 3 },
  { name: 'gvh', images: 2 },
  { name: 'uwkc', images: 3 },
]

const getThumbHtml = (project, num) =>
  `
  <li class="my-work__screenshot-container">
    <div class="my-work__screenshot" role="button" tabindex="0" data-project="${project}" data-num="${num}">
      <img class="my-work__screenshot-img" src="screenshots/${project}${num}.jpg" alt="${project} screenshot ${num}" />
      <svg class="my-work__screenshot-mag" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
        <path
          fill="white"
          d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Zm-40-60v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z" />
      </svg>

    </div>
  </li>
`

projects.forEach((p) => {
  const list = document.getElementById(p.name + '-list')
  let items = ''
  for (var i = 1; i <= p.images; i++) {
    items += getThumbHtml(p.name, i)
  }
  list.innerHTML = items
})


/**
 * Lightbox code
 */
const lightbox = document.getElementById('lightbox')
lightbox.onclick = (e) => {
  if (e.currentTarget === lightbox) {
    lightbox.classList.remove('visible', 'no-document-scroll')
  }
}

var currentPicture = 1
var currentProject = ''
const workItemScreenshots = document.querySelectorAll('.my-work__screenshot')
workItemScreenshots.forEach((el) => {
  el.onclick = (e) => {
    lightbox.classList.add('visible', 'no-document-scroll')
    currentPicture = e.currentTarget.dataset.num
    currentProject = e.currentTarget.dataset.project
    setLightboxImage(currentProject, currentPicture)
  }
})

// alt tag should be improved here
const setLightboxImage = (project, num) => {
  const img = `<img class="lightbox__img" src="screenshots/${
    project + num
  }.jpg" alt="${project} screenshot ${num}" />`
  const interior = document.getElementById('lightbox__interior__img-holder')
  interior.innerHTML = img
}

const leftArrow = document.getElementById('arrow-left')
const rightArrow = document.getElementById('arrow-right')
leftArrow.onclick = (e) => {
  const p = projects.find((proj) => proj.name === currentProject)
  currentPicture = currentPicture - 1 <= 0 ? p.images : currentPicture - 1
  setLightboxImage(currentProject, currentPicture)
  e.stopPropagation()
}
rightArrow.onclick = (e) => {
  const p = projects.find((proj) => proj.name === currentProject)
  currentPicture = currentPicture + 1 > p.images ? 1 : currentPicture + 1
  setLightboxImage(currentProject, currentPicture)
  e.stopPropagation()
}