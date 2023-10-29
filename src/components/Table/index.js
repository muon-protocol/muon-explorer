import React from 'react'
import styled from 'styled-components'

const StyledTH = styled.th`
	color: ${({ theme }) => theme.palette.label} !important;
	background-color: transparent !important;
`

const StyledTable = styled.table`
	& tbody tr:hover {
		background: ${({ theme }) => theme.palette.gray8} !important;
	}
	& tbody td {
		background-color: transparent !important;
		color: ${({ theme }) => theme.palette.label};
		&.active {
			color: ${({ theme }) => theme.palette.primaryL1};
		}
		&.inactive {
			color: ${({ theme }) => theme.palette.primaryL3};
		}
	}
	& a:hover {
		color: ${({ theme }) => theme.palette.primary};
	}
`

export default function Table({ children, head, noLast }) {
	return (
		<div className='table-responsive'>
			<StyledTable className='table table-borderless table-hover'>
				<thead>
					<tr>
						{head?.map((item, index) => (
							<StyledTH
								scope='col'
								className={`smaller fw-normal ${
									index + 1 === head.length && !noLast ? 'text-end' : ''
								}`}
								key={index}
							>
								{item}
							</StyledTH>
						))}
					</tr>
				</thead>
				<tbody>{children}</tbody>
			</StyledTable>
		</div>
	)
}
