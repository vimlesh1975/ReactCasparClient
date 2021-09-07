import React, { } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const OnelinerTable = ({ endpoint }) => {
    const dispatch = useDispatch()
    const onelinerData = useSelector(state => state.oneLinerReducer.onelinerData)
    const style1 = useSelector(state => state.style1Reducer.style1)

    const handleOnChange = (e) => {
        dispatch({ type: 'UPDATE_ONELINER', payload: { id: e.target.getAttribute('id1'), name: e.target.value } })
    }
    function hexToRGBA(hex, opacity) {
        return 'rgba(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length / 3 + '})', 'g')).map(function (l) { return parseInt(hex.length % 2 ? l + l : l, 16) }).concat(isFinite(opacity) ? opacity : 1).join(',') + ')';
    }
    function update(str) {
        str = str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
        return `CG 1-101 UPDATE 1 "<templateData><componentData id=\\"oneliner\\"><data id=\\"text\\" value=\\"` + str + `\\"/></componentData></templateData>"`
        // return `call 1-101 "document.getElementById('oneliner').innerText='${str}'"`

    }
    function sanitise(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }
    return (
        <div>
            <table border='1'>
                <thead><tr><td>Content</td><td>Show</td><td>Update</td></tr></thead>
                <tbody>
                    {onelinerData.map((val, _) => {
                        return <tr key={val.id}><td ><input size="20" id1={val.id} onChange={(e) => handleOnChange(e)} value={val.name}></input></td><td><button className='palyButton' onClick={(e) => endpoint(`play 1-101 [html] "http://${window.location.host}${process.env.PUBLIC_URL}/oneliner/` + sanitise(val.name) + `/${hexToRGBA(style1.color, 1)}/${hexToRGBA(style1.backgroundColor, 1)}"`)}>Show</button></td><td><button className='updateButton' onClick={() => endpoint(update(val.name))} > Update</button></td></tr>
                    })}
                </tbody>
            </table>
        </div >
    )
}

export default OnelinerTable
