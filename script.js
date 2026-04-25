const revealItems = document.querySelectorAll('[data-reveal]')

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed')
        revealObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.16 }
)

revealItems.forEach((item) => revealObserver.observe(item))

const filters = document.querySelectorAll('.filter')
const projectCards = document.querySelectorAll('.project-card')
const contactMenu = document.querySelector('.contact-menu')
const contactButton = document.querySelector('.contact-menu .nav-cta')

filters.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter || 'all'
    filters.forEach((item) => item.classList.toggle('active', item === button))
    projectCards.forEach((card) => {
      const categories = card.dataset.category || ''
      card.classList.toggle('hidden', filter !== 'all' && !categories.includes(filter))
    })
  })
})

if (contactMenu && contactButton) {
  contactButton.addEventListener('click', (event) => {
    event.stopPropagation()
    const isOpen = contactMenu.classList.toggle('open')
    contactButton.setAttribute('aria-expanded', String(isOpen))
  })

  document.addEventListener('click', (event) => {
    if (!contactMenu.contains(event.target)) {
      contactMenu.classList.remove('open')
      contactButton.setAttribute('aria-expanded', 'false')
    }
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      contactMenu.classList.remove('open')
      contactButton.setAttribute('aria-expanded', 'false')
    }
  })
}

const modal = document.querySelector('.project-modal')
const modalTitle = document.querySelector('#modal-title')
const modalType = document.querySelector('.modal-type')
const modalDetail = document.querySelector('.modal-detail')
const modalPoints = document.querySelector('.modal-points')
const modalTech = document.querySelector('.modal-tech')
const modalRepo = document.querySelector('.modal-repo')
let lastFocusedProject = null

function openProjectModal(card) {
  if (!modal || !modalTitle || !modalType || !modalDetail || !modalPoints || !modalTech || !modalRepo) return
  lastFocusedProject = card
  modalTitle.textContent = card.dataset.title || card.querySelector('h3')?.textContent || 'Project'
  modalType.textContent = card.dataset.type || 'Project detail'
  modalDetail.textContent = card.dataset.detail || ''
  modalPoints.innerHTML = ''
  ;(card.dataset.points || '')
    .split('|')
    .filter(Boolean)
    .forEach((point) => {
      const item = document.createElement('li')
      item.textContent = point
      modalPoints.appendChild(item)
    })
  modalTech.innerHTML = ''
  ;(card.dataset.tech || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .forEach((tech) => {
      const chip = document.createElement('span')
      chip.textContent = tech
      modalTech.appendChild(chip)
    })
  modalRepo.href = card.dataset.repo || 'https://github.com/Devanshjd'
  modal.classList.add('open')
  modal.setAttribute('aria-hidden', 'false')
  document.body.style.overflow = 'hidden'
  modal.querySelector('.modal-close')?.focus()
}

function closeProjectModal() {
  if (!modal) return
  modal.classList.remove('open')
  modal.setAttribute('aria-hidden', 'true')
  document.body.style.overflow = ''
  lastFocusedProject?.focus()
}

projectCards.forEach((card) => {
  card.addEventListener('click', () => openProjectModal(card))
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openProjectModal(card)
    }
  })
})

document.querySelectorAll('[data-close-modal]').forEach((button) => {
  button.addEventListener('click', closeProjectModal)
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal?.classList.contains('open')) {
    closeProjectModal()
  }
})

const capabilityButtons = document.querySelectorAll('.capability')
const jarvisShot = document.querySelector('.screen-frame img')

capabilityButtons.forEach((button) => {
  button.addEventListener('click', () => {
    capabilityButtons.forEach((item) => item.classList.toggle('active', item === button))
    if (jarvisShot && button.dataset.shot) {
      jarvisShot.animate(
        [
          { opacity: 1, transform: 'scale(1)' },
          { opacity: 0.5, transform: 'scale(0.985)' },
          { opacity: 1, transform: 'scale(1)' }
        ],
        { duration: 320, easing: 'ease-out' }
      )
      window.setTimeout(() => {
        jarvisShot.src = button.dataset.shot
      }, 120)
    }
  })
})

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const target = document.querySelector(anchor.getAttribute('href'))
    if (!target) return
    event.preventDefault()
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
})
