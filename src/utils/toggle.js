export const toggle = (color) => {
  document.querySelector(".header-toggle").classList.toggle("header--active") 

  document.querySelector('.header-navWrapper').classList.toggle(color) 

  document.querySelector('.header-wrap').classList.toggle(color)

  document.getElementById('navTransitionEl').classList.toggle('hidden')

  document.querySelector('.header-nav').classList.toggle('hidden')
};