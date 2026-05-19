const bgAnimation = document.getElementById('bgAnimation')

const numberOfColorBoxes = 400

document.querySelectorAll('.karta').forEach(karta => {
	karta.addEventListener('mouseenter', () => {
		document.body.classList.add('karta-hover')
	})
	karta.addEventListener('mouseleave', () => {
		document.body.classList.remove('karta-hover')
	})
})

for (let i = 0; i < numberOfColorBoxes; i++) {
	const colorBox = document.createElement('div')
	colorBox.classList.add('colorBox')
	bgAnimation.append(colorBox)
}
