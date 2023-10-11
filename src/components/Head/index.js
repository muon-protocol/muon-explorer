import React from 'react'
import Head from 'next/head'

const HeadTag = ({ title }) => {
	return (
		<Head>
			<meta
				name='viewport'
				content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
			/>
			<meta name='description' content='' />
			<meta name='keywords' content='' />
			<title>{title}</title>
		</Head>
	)
}

export default HeadTag
