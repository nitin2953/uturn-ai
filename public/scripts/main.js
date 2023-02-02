// MOBILE MENU BUTTON
document.getElementById("mob-menu").onclick = () => {
	document.documentElement.classList.toggle("menu-opened")
}


// DYNAMIC HEADER
const dynamic_header = document.querySelector("#site-header.dynamic")

if (dynamic_header) {
	const observer = new IntersectionObserver(
	  ([e]) => e.target.classList.toggle("stucked", e.intersectionRatio < 1),
	  { threshold: [1] }
	)

	observer.observe(dynamic_header)
}


// HERO VIDEO
const hero_section = document.getElementById("section-1")
const hero_video = document.getElementById("hero-video")
if (hero_video) {
	setTimeout(() => {
		if (hero_video.readyState === 4) {
			hero_section.classList.add("video-loaded")
			hero_video.play()
		} else {
			hero_video.addEventListener("loadeddata", () => {
				hero_section.classList.add("video-loaded")
				hero_video.play()
			})
		}
	}, 3000)
}

// TABS
if (document.querySelector(".tab")) {
	const tabButtons = [...document.querySelectorAll(".tab-stripe > button")]
	const tabContents = [...document.querySelectorAll(".tab-content > div")]

	let currentTab = tabButtons.findIndex(button => button.classList.contains("active"))

	function setTab(index = 0) {
		tabButtons[currentTab].classList.remove("active")
		tabContents[currentTab].classList.remove("active")

		tabButtons[index].classList.add("active")
		tabContents[index].classList.add("active")

		currentTab = index
	}

	tabButtons.forEach((button, index) => button.onclick = () => setTab(index) )
}


// POPUP
const cards = document.querySelectorAll(".card")
const popupContainer = document.querySelector(".popup-container")
const popups = document.querySelectorAll(".popup")

if (cards) {
	cards.forEach((card, index) => {
		card.addEventListener("click", (e) => {
			e.preventDefault()
			popupContainer.classList.add("active")
			popups[index].classList.add("active")
			popupContainer.addEventListener("click", handleClick)
		})
	})
}

popups.forEach((popup) => {
	const closeBtn = popup.querySelector(".popup-close-btn")
	closeBtn.addEventListener("click", () => {
		popupContainer.classList.remove("active")
		popup.classList.remove("active")
	})
})

function handleClick(e) {
	if (e.target.closest(".popup-container") && !e.target.closest(".popup")) {
		popupContainer.classList.remove("active")
		popups.forEach((popup) => popup.classList.remove("active"))
		popupContainer.removeEventListener("click", handleClick)
	}
}
