import { postData } from '../services/request'

const drop = () => {
	// drag *
	// dragend *
	// dragenter - объект над dropArea
	// dragexit *
	// dragleave - объект за пределами dropArea
	// dragover - объект зависает над dropArea
	// dragstart *
	// drop - объект отправлен в dropArea

	const fileInputs = document.querySelectorAll('[name="upload"]')

	;['dragenter', 'dragleave', 'dragover', 'drop'].forEach((eventName) => {
		fileInputs.forEach((input) => {
			input.addEventListener(eventName, preventDefaults, false)
		})
	})

	function preventDefaults(e) {
		e.preventDefault()
		e.stopPropagation()
	}

	function highlight(item) {
		item.closest('.file_upload').style.border = '5px solid purple'
		item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0, .7)'
	}

	function unhighlight(item) {
		item.closest('.file_upload').style.border = 'none'
		if (item.closest('.calc_form')) {
			item.closest('.file_upload').style.backgroundColor = '#ffff'
		} else {
			item.closest('.file_upload').style.backgroundColor = '#ededed'
		}
	}

	;['dragenter', 'dragover'].forEach((eventName) => {
		fileInputs.forEach((input) => {
			input.addEventListener(eventName, () => highlight(input), false)
		})
	})
	;['dragleave', 'drop'].forEach((eventName) => {
		fileInputs.forEach((input) => {
			input.addEventListener(eventName, () => unhighlight(input), false)
		})
	})

	fileInputs.forEach((item) => {
		item.addEventListener('drop', (e) => {
			let dots
			const arr = item.files[0].name.split('.')

			arr[0].length > 6 ? (dots = '...') : (dots = '.')
			const name = arr[0].substring(0, 6) + dots + arr[1]
			item.previousElementSibling.textContent = name
			if (input.closest('main')) {
				item.files = e.dataTransfer.files
				e.preventDefault()
				e.stopPropagation()

				let formData = new FormData()
				formData.append('file', item.files[0])

				postData('assets/server.php', formData)
					.then((res) => console.log(res))
					.catch(() => {
						console.log('Ошибка')
					})
			}
		})
	})
}

export default drop
