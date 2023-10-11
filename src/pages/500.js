import React from 'react'
import Head from 'src/components/Head'

export default function Error500() {
	return (
		<main className='vh-100 vw-100 d-flex align-items-center justify-content-center'>
			<Head title='Muon Explorer | 500' />
			<h5 className='fw-bold'>500 | Internal Server Error</h5>
		</main>
	)
}
