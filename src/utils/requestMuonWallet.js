import { Muon } from 'muon-wallet'
import { toast } from 'react-toastify'

const handleConnect = async () => {
	try {
		await window.ethereum.request({ method: 'eth_requestAccounts' })
	} catch (err) {
		throw err.message || 'connection failed'
	}
}

const handleCheckConnection = async () => {
	if (window?.ethereum?._state.isConnected && window?.ethereum?._state.accounts?.length) {
		return
	} else {
		if (window.ethereum) {
			await handleConnect()
		} else {
			throw 'No Wallet Found !'
		}
	}
}

// ================================================================

const handleAddNetwork = async () => {
	try {
		await window.ethereum.request({
			method: 'wallet_addEthereumChain',
			params: [
				{
					chainId: '0x61',
					rpcUrls: ['https://bsc-testnet.publicnode.com'],
					chainName: 'BNB Smart Chain Testnet',
					nativeCurrency: {
						name: 'tBNB',
						symbol: 'tBNB',
						decimals: 18,
					},
					blockExplorerUrls: ['https://testnet.bscscan.com/'],
				},
			],
		})
	} catch (err) {
		throw 'Failed to add network'
	}
}

const handleSwitchNetwork = async () => {
	try {
		await window.ethereum.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: '0x61' }],
		})
	} catch (err) {
		if (err.message.startsWith('Unrecognized chain ID')) {
			handleAddNetwork()
		} else {
			throw 'Failed to switch network'
		}
	}
}

const handleCheckNetwork = async () => {
	try {
		const chain = Number(window.ethereum.networkVersion)
		if (chain !== 97) {
			await handleSwitchNetwork()
		}
	} catch (err) {
		throw 'Failed to check network'
	}
}

// =========================================================================

export const handleRequest = async (appName, method, params, filtered, setResults) => {
	try {
		await handleCheckConnection()
		await handleCheckNetwork()
		await new Promise((resolve) => {
			setTimeout(() => {
				resolve()
			}, 1000)
		})
		const muon = new Muon()
		const res = await muon.request(appName, method, params)
		if (res?.success) {
			setResults([...filtered, { method, res: JSON.stringify(res.result, null, '\t') }])
			toast.success('Query Successful')
		} else {
			toast.warn(res || 'Query Failed')
		}
	} catch (err) {
		toast.error(err || 'Something went wrong')
	}
}
