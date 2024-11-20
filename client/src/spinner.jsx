import React from 'react'

const spinner = () => {
    return (
        <div id="waitDialog" style="display: none;">
            <div class="wait-dialog-content">
                <p>Processing, please wait...</p>
                <div class="spinner"></div>
            </div>
        </div>

    )
}

export default spinner
