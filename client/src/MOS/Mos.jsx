import Automation from "../Automation.jsx";
import RCCAutomationClient from "../RCCAutomation/RCCAutomationClient.jsx";


const Mos = () => {
    return (<div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <RCCAutomationClient />
            </div>
            <div>
                <Automation />
            </div>
        </div>
    </div>)
}

export default Mos