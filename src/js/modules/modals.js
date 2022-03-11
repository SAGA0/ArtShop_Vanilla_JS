const modals = () => {
	let btnPressed

	function bindModal(
		modalTrigger,
		modalBlock,
		closeSelector,
		destroy = false,
	) {
		const trigger = document.querySelectorAll(modalTrigger)
		const modal = document.querySelector(modalBlock)
		const close = document.querySelector(closeSelector)
		const windows = document.querySelectorAll('[data-modal]')
		const scroll = calcScroll()

		trigger.forEach((item) => {
			item.addEventListener('click', (e) => {
				if (e.target) {
					e.preventDefault()
				}

				btnPressed = true

				// let message = document.createElement('div')
				// message.innerHTML = 'Заполните все поля'

				// if (modal.classList.contains('popup_calc_profile')) {
				// 	if (!state.form || !state.width || !state.height) {
				// 		document
				// 			.querySelector('.popup_calc_button')
				// 			.insertAdjacentElement('afterend', message)
				// 		setTimeout(() => {
				// 			message.remove()
				// 		}, 1000)
				// 		return
				// 	}
				// }

				// if (modal.classList.contains('popup_calc_end')) {
				// 	if (!state.type || !state.profile) {
				// 		document
				// 			.querySelector('.popup_calc_profile_button')
				// 			.insertAdjacentElement('afterend', message)
				// 		setTimeout(() => {
				// 			message.remove()
				// 		}, 1000)
				// 		return
				// 	}
				// }
				if (destroy) {
					item.remove()
				}

				windows.forEach((item) => {
					item.style.display = 'none'
				})

				modal.style.display = 'block'
				document.body.style.overflow = 'hidden'
				document.body.style.marginRight = `${scroll}px`
			})
		})

		close.addEventListener('click', () => {
			windows.forEach((item) => {
				item.style.display = 'none'
			})

			modal.style.display = 'none'
			document.body.style.overflow = ''
			document.body.style.marginRight = `0px`
		})

		modal.addEventListener('click', (e) => {
			if (e.target === modal) {
				windows.forEach((item) => {
					item.style.display = 'none'
				})

				modal.style.display = 'none'
				document.body.style.overflow = ''
				document.body.style.marginRight = `0px`
			}
		})

		function showModalByTime(selector, time) {
			setTimeout(function () {
				let display

				document.querySelectorAll('[data-modal]').forEach((item) => {
					if (getComputedStyle(item).display !== 'none') {
						display = 'block'
					}
				})

				if (!display) {
					document.querySelector(selector).style.display = 'block'
					let scroll = calcScroll()
					document.body.style.overflow = 'hidden'
					document.body.style.marginRight = `${scroll}px`
				}
			}, time)
		}

		showModalByTime('.popup-consultation', 50000)
	}

	function calcScroll() {
		let div = document.createElement('div')

		div.style.width = '50px'
		div.style.height = '50px'
		div.style.overflowY = 'scroll'
		div.style.visibility = 'hidden'

		document.body.appendChild(div)

		let scrollWidth = div.offsetWidth - div.clientWidth
		div.remove()

		return scrollWidth
	}

	function openModalByScroll(selector) {
		window.addEventListener('scroll', () => {
			let scrollHeight = Math.max(
				document.documentElement.scrollHeight,
				document.body.scrollHeight,
			)
			if (
				!btnPressed &&
				window.pageYOffset + document.documentElement.clientHeight >=
					scrollHeight
			) {
				document.querySelector(selector).click()
			}
		})
	}

	bindModal('.button-design', '.popup-design', '.popup-design .popup-close')
	bindModal(
		'.button-consultation',
		'.popup-consultation',
		'.popup-consultation .popup-close',
	)
	openModalByScroll('.fixed-gift')
	bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true)
}

export default modals
