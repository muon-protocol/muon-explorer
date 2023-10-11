import React from 'react'
import styled from 'styled-components'

import BSModal from 'react-bootstrap/Modal'

const StyledModal = styled(BSModal)`
	& .modal-content {
		border-radius: 1rem;
		border: none;

		& .btn-close {
			opacity: 1;
			margin: 0;
			padding: 0;
		}
	}
`

export default function Modal({ show, onHide, title, children, size = 'md' }) {
	return (
		<StyledModal show={show} onHide={onHide} size={size} centered>
			<BSModal.Header closeButton className='px-4 pb-1 border-0'>
				<h5 className='fw-bold'>{title}</h5>
			</BSModal.Header>
			<BSModal.Body>{children}</BSModal.Body>
		</StyledModal>
	)
}
