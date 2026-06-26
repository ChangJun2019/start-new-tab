const DB_NAME = 'start-db'
const DB_VERSION = 2
const LEGACY_STORE = 'bg'
const WALLPAPER_STORE = 'wallpaper'
const WALLPAPER_KEY = 'current'
const MAX_IMAGE_SIZE = 20 * 1024 * 1024
const MENU_TRANSITION_MS = 180

let db = null
let activeObjectUrl = null
let hasWallpaper = false
let toastTimer = null
let menuTransitionTimer = null

const page = document.body
const cornerControl = document.getElementById('corner-control')
const menuTrigger = document.getElementById('menu-trigger')
const actionMenu = document.getElementById('action-menu')
const wallpaperInput = document.getElementById('wallpaper-input')
const clearWallpaperButton = document.getElementById('clear-wallpaper')
const chooseWallpaperLabel = document.getElementById('choose-wallpaper-label')
const toast = document.getElementById('toast')

init()

async function init() {
  bindEvents()

  try {
    db = await openDatabase()
    const file = await getWallpaper()

    if (file)
      applyWallpaper(file)
    else
      setWallpaperState(false)
  }
  catch {
    showToast('Wallpaper settings are unavailable.')
  }
}

function bindEvents() {
  menuTrigger.addEventListener('click', toggleMenu)
  document.addEventListener('click', handleDocumentClick)
  document.addEventListener('keydown', handleDocumentKeydown)
  wallpaperInput.addEventListener('change', handleWallpaperChange)

  actionMenu.addEventListener('click', (event) => {
    const actionButton = event.target.closest('[data-action]')

    if (actionButton?.dataset.action === 'choose')
      chooseWallpaper()

    if (actionButton?.dataset.action === 'clear')
      clearWallpaper()
  })
}

function openDatabase() {
  const request = indexedDB.open(DB_NAME, DB_VERSION)

  return new Promise((resolve, reject) => {
    request.onupgradeneeded = (event) => {
      const database = event.target.result
      const transaction = event.target.transaction

      if (!database.objectStoreNames.contains(WALLPAPER_STORE))
        database.createObjectStore(WALLPAPER_STORE)

      if (event.oldVersion < 2 && database.objectStoreNames.contains(LEGACY_STORE)) {
        const legacyStore = transaction.objectStore(LEGACY_STORE)
        const wallpaperStore = transaction.objectStore(WALLPAPER_STORE)
        const legacyRequest = legacyStore.get(1)

        legacyRequest.onsuccess = () => {
          if (legacyRequest.result)
            wallpaperStore.put(legacyRequest.result, WALLPAPER_KEY)
        }
      }
    }

    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}

function readFromStore(storeName, key, fallback = undefined) {
  const transaction = db.transaction(storeName, 'readonly')
  const store = transaction.objectStore(storeName)
  const request = store.get(key)

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(request.result ?? fallback)
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}

function writeToStore(storeName, key, value) {
  const transaction = db.transaction(storeName, 'readwrite')
  const store = transaction.objectStore(storeName)
  const request = store.put(value, key)

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(request.result)
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}

function deleteFromStore(storeName, key) {
  const transaction = db.transaction(storeName, 'readwrite')
  const store = transaction.objectStore(storeName)
  const request = store.delete(key)

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve()
    }

    request.onerror = () => {
      reject(request.error)
    }
  })
}

function getWallpaper() {
  return readFromStore(WALLPAPER_STORE, WALLPAPER_KEY)
}

function setWallpaper(file) {
  return writeToStore(WALLPAPER_STORE, WALLPAPER_KEY, file)
}

function removeWallpaper() {
  return deleteFromStore(WALLPAPER_STORE, WALLPAPER_KEY)
}

function toggleMenu() {
  if (actionMenu.hidden)
    openMenu()
  else
    closeMenu()
}

function openMenu() {
  window.clearTimeout(menuTransitionTimer)
  actionMenu.hidden = false
  actionMenu.setAttribute('aria-hidden', 'false')
  menuTrigger.setAttribute('aria-expanded', 'true')
  window.requestAnimationFrame(() => {
    actionMenu.classList.add('is-open')
  })
}

function closeMenu() {
  if (actionMenu.hidden)
    return

  window.clearTimeout(menuTransitionTimer)
  actionMenu.classList.remove('is-open')
  actionMenu.setAttribute('aria-hidden', 'true')
  menuTrigger.setAttribute('aria-expanded', 'false')

  menuTransitionTimer = window.setTimeout(() => {
    actionMenu.hidden = true
  }, MENU_TRANSITION_MS)
}

function handleDocumentClick(event) {
  if (!cornerControl.contains(event.target))
    closeMenu()
}

function handleDocumentKeydown(event) {
  if (event.key === 'Escape') {
    closeMenu()
    menuTrigger.focus()
  }
}

function chooseWallpaper() {
  closeMenu()
  wallpaperInput.value = ''
  wallpaperInput.click()
}

async function handleWallpaperChange(event) {
  const [file] = event.target.files

  if (!file)
    return

  try {
    await validateImage(file)
    await setWallpaper(file)
    applyWallpaper(file)
    showToast('Image updated.')
  }
  catch (error) {
    showToast(error.message || 'Could not use that image.')
  }
}

async function clearWallpaper() {
  if (!hasWallpaper)
    return

  try {
    await removeWallpaper()
    clearAppliedWallpaper()
    closeMenu()
    menuTrigger.focus()
    showToast('Image cleared.')
  }
  catch {
    showToast('Could not clear the image.')
  }
}

async function validateImage(file) {
  if (!file.type.startsWith('image/'))
    throw new Error('Please choose an image file.')

  if (file.size > MAX_IMAGE_SIZE)
    throw new Error('Please choose an image under 20 MB.')

  await ensureImageCanLoad(file)
}

function ensureImageCanLoad(file) {
  const url = URL.createObjectURL(file)

  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = () => {
      URL.revokeObjectURL(url)
      resolve()
    }

    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('This image format is not supported.'))
    }

    image.src = url
  })
}

function applyWallpaper(file) {
  const nextObjectUrl = URL.createObjectURL(file)
  const previousObjectUrl = activeObjectUrl

  page.style.backgroundImage = `url("${nextObjectUrl}")`
  activeObjectUrl = nextObjectUrl
  setWallpaperState(true)

  if (previousObjectUrl)
    URL.revokeObjectURL(previousObjectUrl)
}

function clearAppliedWallpaper() {
  page.style.backgroundImage = ''
  setWallpaperState(false)

  if (activeObjectUrl) {
    URL.revokeObjectURL(activeObjectUrl)
    activeObjectUrl = null
  }
}

function setWallpaperState(nextHasWallpaper) {
  hasWallpaper = nextHasWallpaper
  page.dataset.hasWallpaper = String(nextHasWallpaper)
  clearWallpaperButton.disabled = !nextHasWallpaper
  chooseWallpaperLabel.textContent = nextHasWallpaper ? 'Change image' : 'Choose image'
}

function showToast(message) {
  toast.textContent = message
  toast.hidden = false

  window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => {
    toast.hidden = true
  }, 2400)
}
