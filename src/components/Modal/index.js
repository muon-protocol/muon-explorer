import React from 'react'
import styled from 'styled-components'

import BSModal from 'react-bootstrap/Modal'

const StyledModal = styled(BSModal)`
	& .modal-content {
		border-radius: 1rem;
		border: none;
		background-color: ${({ theme }) => theme.palette.cardBg};

		& .btn-close {
			opacity: 1;
			margin: 0;
			padding: 0;
			background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23B0B9C8'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3e%3c/svg%3e");
		}
	}
`

export default function Modal({ show, onHide, title, children, size = 'md' }) {
	return (
		<StyledModal show={show} onHide={onHide} size={size} centered>
			<BSModal.Header closeButton className='px-4 pb-2 pt-4 border-0'>
				<h5 className='fw-bold mb-0'>{title}</h5>
			</BSModal.Header>
			<BSModal.Body>{children}</BSModal.Body>
		</StyledModal>
	)
}
