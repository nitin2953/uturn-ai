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



// TABS
if (document.querySelector(".tab")) {
	const tabButtons = [...document.querySelectorAll('.tab-stripe > button')]
	const tabContents = [...document.querySelectorAll('.tab-content > div')]

	let currentTab = tabButtons.findIndex(button => button.classList.contains('active'))

	function setTab(index = 0) {
		tabButtons[currentTab].classList.remove('active')
		tabContents[currentTab].classList.remove('active')

		tabButtons[index].classList.add('active')
		tabContents[index].classList.add('active')

		currentTab = index
	}

	tabButtons.forEach((button, index) => button.onclick = () => setTab(index) )
}


// POPUP
const cards = document.querySelectorAll(".card")
const popups = document.querySelectorAll(".popup")
const popupContainer = document.querySelector(".popup-container")

if (cards) {
	cards.forEach((card, index) => {
		card.addEventListener("click", (e) => {
			e.preventDefault()

			popupContainer.classList.add("active")
			popupContainer.addEventListener("click", handleClick);

			popups.forEach((popup) => popup.classList.remove("active"))
			popups[index].classList.add("active")
		})
	})
}

function handleClick(e) {
	if (e.target.closest(".popup-container") && !e.target.closest(".popup")) {
		popupContainer.classList.remove("active")
		popupContainer.removeEventListener("click", handleClick)

		popups.forEach((popup) => popup.classList.remove("active"))
	}
}
