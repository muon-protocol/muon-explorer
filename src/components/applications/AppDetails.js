import React from 'react'
import { useSelector } from 'react-redux'

export default function AppDetails() {

    const { info } = useSelector(store => store.data)

    return (
        <div className='card shadow border-0 rounded-4 p-3'>
            <div className='card-body'>
                <div className='row g-4 align-items-center'>
                    <div className='col-6 col-sm-4 col-lg-2'>
                        <div className='d-flex flex-column text-center text-lg-start'>
                            <h6 className='text-gray6 mb-4 small'>App Name</h6>
                            <h6 className='fw-bold text-gray1 mb-0'>{info?.name}</h6>
                        </div>
                    </div>
                    <div className='col-6 col-sm-4 col-lg-2'>
                        <div className='d-flex flex-column text-center'>
                            <h6 className='text-gray6 mb-4 small'>Most Used Method</h6>
                            <h6 className='fw-bold text-gray1 mb-0 text-decoration-underline'>{info?.mostUsedMethod}</h6>
                        </div>
                    </div>
                    <div className='col-6 col-sm-4 col-lg-2'>
                        <div className='d-flex flex-column text-center'>
                            <h6 className='text-gray6 mb-4 small'>#Methods</h6>
                            <h6 className='fw-bold text-gray1 mb-0'>{info?.methods.length}</h6>
                        </div>
                    </div>
                    <div className='col-6 col-sm-4 col-lg-2'>
                        <div className='d-flex flex-column text-center'>
                            <h6 className='text-gray6 mb-4 small'>#Nodes on app</h6>
                            <h6 className='fw-bold text-gray1 mb-0'>{info?.nodes}</h6>
                        </div>
                    </div>
                    <div className='col-6 col-sm-4 col-lg-2'>
                        <div className='d-flex flex-column text-center'>
                            <h6 className='text-gray6 mb-4 small'>#Confirmed Requests</h6>
                            <h6 className='fw-bold text-gray1 mb-0'>{info?.confirmedRequests}</h6>
                        </div>
                    </div>
                    <div className='col-6 col-sm-4 col-lg-2'>
                        <div className='d-flex flex-column text-center text-lg-end'>
                            <h6 className='text-gray6 mb-4 small'>Start Time</h6>
                            <h6 className='fw-bold text-gray1 mb-0'>{new Date(info?.startTime).toLocaleString()}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
