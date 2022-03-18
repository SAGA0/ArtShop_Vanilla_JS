const checkTextInputs = (selector) => {
	let txtInputs = document.querySelectorAll(selector)

	txtInputs.forEach((item) => {
		item.addEventListener('keypress', function (e) {
			if (e.key.match(/[^а-яё 0-9]/gi)) {
				e.preventDefault()
			}
			let interval = setInterval(() => {
				if (item.value.match(/[^а-яё 0-9]/gi)) {
					item.value = ''
				}
			}, 1000)
			if (e.type == 'blur') {
				clearInterval(interval)
			}
		})
	})
}

export default checkTextInputs
