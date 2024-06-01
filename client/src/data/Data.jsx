import React from 'react'
// import CsvReader2 from './CsvReader2'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import EditableTable from './EditableTable';

const Data = () => {
    const onTabChange = () => {

    }
    return (
        <div>
            <Tabs
                // selectedIndex={tabindex}
                selectedTabClassName="selectedTab"
                forceRenderTabPanel={true}
                onSelect={(index, prevIndex) => onTabChange(index, prevIndex)}
            >
                <TabList>
                    <Tab>Data Table</Tab>
                    {/* <Tab>CSV</Tab> */}
                </TabList>
                <TabPanel>
                    <EditableTable />
                </TabPanel>
                {/* <TabPanel>
                    <CsvReader2 />
                </TabPanel> */}
            </Tabs>
        </div>
    )
}

export default Data
