import React from 'react'

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false }
	}
	static getDerivedStateFromError(error) {
		return { hasError: true }
	}
	componentDidCatch(error, errorInfo) {
		console.warn({ error, errorInfo })
	}
	render() {
		if (this.state.hasError) {
			return (
				<div className='container'>
					<div className='d-flex flex-column align-items-center justify-content-center text-center vh-100'>
						<h5 className='fw-bold text-black'>A Client Side Error has Occured</h5>
					</div>
				</div>
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary
