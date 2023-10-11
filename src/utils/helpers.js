import muonLogo from 'public/images/logo/muon.png'
import pionLogo from 'public/images/logo/pion.png'
import aliceLogo from 'public/images/logo/alice.png'

import muon_net_dark from 'public/images/logo/muon-net-dark.png'
import muon_net_light from 'public/images/logo/muon-net-light.png'

export const themeImageHandler = (logo) => {
	if (logo) {
		return process.env.NETWORK === 'Alice' ? aliceLogo : process.env.NETWORK === 'Pion' ? pionLogo : muonLogo
	} else {
		return process.env.NETWORK === 'Alice'
			? muon_net_dark
			: process.env.NETWORK === 'Pion'
			? muon_net_light
			: muon_net_light
	}
}
