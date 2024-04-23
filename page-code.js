// selected/deselect
const body = document.querySelector('body')
const workItems = document.querySelectorAll('.my-work-list__item')

body.onclick = (e) => {
  if (!e.defaultPrevented) {
    removeSelected()
  }
}
const removeSelected = () => {
  document.querySelectorAll('.selected').forEach((el) => el.classList.remove('selected'))
}
const addSelected = (e) => {
  removeSelected()
  e.preventDefault()
  e.currentTarget.classList.add('selected')
}

workItems.forEach((el) => {
  el.onclick = addSelected
})

// button is a click
body.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault()
    e.target.click()
  }
})
