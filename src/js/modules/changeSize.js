const changeSize = (imgBlock) => {
	const blocks = document.querySelectorAll(imgBlock)

	function showImg(block) {
		const img = block.querySelector('img')

		img.src = img.src.slice(0, -4) + '-1.png'
		block.querySelectorAll('p:not(.sizes-hit)').forEach((item) => {
			item.style.display = 'none'
		})
	}

	function hideImg(block) {
		const img = block.querySelector('img')

		img.src = img.src.slice(0, -6) + '.png'
		block.querySelectorAll('p:not(.sizes-hit)').forEach((item) => {
			item.style.display = 'block'
		})
	}

	blocks.forEach((block) => {
		block.addEventListener('mouseover', () => {
			showImg(block)
		})
		block.addEventListener('mouseout', () => {
			hideImg(block)
		})
	})
}

export default changeSize
