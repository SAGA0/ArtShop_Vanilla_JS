import { getResourses } from '../services/request'

const showMoreStyles = (trigger, wrapper) => {
	const wrap = document.querySelector(wrapper)
	const btn = document.querySelector(trigger)
	// let fail = document.createElement('img')
	// fail.setAttribute('src', 'assets/img/fail.png')

	const failure = {
		text: 'Что пошло не так...',
		fail: 'assets/img/fail.png',
	}

	// btn.addEventListener('click', () => {
	// 	cards.forEach((item) => {
	// 		item.classList.remove(
	// 			'hidden-lg',
	// 			'hidden-md',
	// 			'hidden-sm',
	// 			'hidden-xs',
	// 		)
	// 		item.classList.add(
	// 			'col-sm-3',
	// 			'col-sm-offset-0',
	// 			'col-xs-10',
	// 			'col-xs-offset-1',
	// 		)
	// 	})
	// 	btn.remove()
	// })

	btn.addEventListener('click', function () {
		getResourses('http://localhost:3000/styles')
			.then((res) => createCards(res))
			.catch((error) => showError(error))

		this.remove()
	})

	function createCards(response) {
		response.forEach(({ src, title, link }) => {
			let card = document.createElement('div')

			card.classList.add(
				'animated',
				'fadeInUp',
				'col-sm-3',
				'col-sm-offset-0',
				'col-xs-10',
				'col-xs-offset-1',
			)

			card.innerHTML = `
        <div class="styles-block">
            <img src=${src} alt>
                <h4>${title}</h4>
            <a href="#">${link}</a>
        </div>`

			wrap.appendChild(card)
		})
	}

	function showError() {
		let errorMessage = document.createElement('div')

		errorMessage.classList.add('animated', 'fadeInUp', 'status')

		errorMessage.innerHTML = `
        <img src=${failure.fail} alt>
            <h4>${failure.text}</h4>
        <a href="#">Ошибка</a>`

		wrap.appendChild(errorMessage)
	}
}

export default showMoreStyles
