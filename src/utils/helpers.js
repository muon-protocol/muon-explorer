import muonLogo from 'public/images/logo/muon.png'
import pionLogo from 'public/images/logo/pion.png'
import aliceLogo from 'public/images/logo/alice.png'

import aliceShape1 from 'public/images/shapes/alice/shape1.png'
import aliceShape2 from 'public/images/shapes/alice/shape2.png'
import aliceShape3 from 'public/images/shapes/alice/shape3.png'

import pionShape1 from 'public/images/shapes/pion/shape1.png'
import pionShape2 from 'public/images/shapes/pion/shape2.png'
import pionShape3 from 'public/images/shapes/pion/shape3.png'

export const themeLogoImageHandler = () => {
	return process.env.NETWORK === 'Alice'
		? aliceLogo
		: process.env.NETWORK === 'Pion'
		? pionLogo
		: muonLogo
}

export const themeStatImageHandler = (num) => {
	return process.env.NETWORK === 'Alice'
		? num === 1
			? aliceShape1
			: num === 2
			? aliceShape2
			: aliceShape3
		: process.env.NETWORK === 'Pion'
		? num === 1
			? pionShape1
			: num === 2
			? pionShape2
			: pionShape3
		: num === 1
		? pionShape1
		: num === 2
		? pionShape2
		: pionShape3
}
