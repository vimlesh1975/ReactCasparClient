'use client'
import React from 'react'
import socket from '../components/socket'
import './controller.css' // import the css

const Page = () => {
    const scrollwithSpeed = (data) => {
        socket.emit('speed', data)
    }
    const next = () => {
        socket.emit('next', '')
    }
    const previous = () => {
        socket.emit('previous', '')
    }
    const fromStart = () => {
        socket.emit('fromStart', '')
    }


    return (
        <div className="controller-container">
            <button onClick={fromStart} className="control-button start">
                fromStart
            </button>
            <button onClick={next} className="control-button start">
                Next
            </button>
            <button onClick={previous} className="control-button start">
                Previous
            </button>
            <button onClick={() => scrollwithSpeed(1)} className="control-button start">
                Speed 1
            </button>
            <button onClick={() => scrollwithSpeed(0)} className="control-button stop">
                Speed 0
            </button>
            <button onClick={() => scrollwithSpeed(2)} className="control-button start">
                Speed 2
            </button>


        </div>
    )
}

export default Page
