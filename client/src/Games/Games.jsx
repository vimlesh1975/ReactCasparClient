import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Hockey from './Hockey'
import Tennis from './Tennis';

const Games = () => {
    const onTabChange = () => {

    }
    return (
        <div>
            <Tabs selectedTabClassName='selectedTab' forceRenderTabPanel={true} onSelect={(index, prevIndex) => onTabChange(index, prevIndex)}>
                <TabList>
                    <Tab>Hockey</Tab>
                    <Tab>Tennis</Tab>
                </TabList>

                <TabPanel>
                    <Hockey />
                </TabPanel>
                <TabPanel>
                    <Tennis />
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default Games
