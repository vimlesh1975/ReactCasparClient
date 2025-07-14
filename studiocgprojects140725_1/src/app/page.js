'use client'

import React, { } from 'react'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import Rawtcpmosclient from './Rawtcpmosclient'
import RedisTest from './RedisTest'
import Mosapi from './Mosapi'
import Npmmosclient from './Npmmosclient'
import R3Controller from './R3Controller'
import Mongodb from './Mongodb'
import Nrcs2 from './Nrcs2'





export default function Page() {
  const [aa, setA] = React.useState(0)

  // if (!isClient || data.length === 0) return null

  return (<div>
    <Tabs
      forceRenderTabPanel={true}
    >
      <TabList>
        <Tab> NRCS</Tab>
        <Tab> Mongodb</Tab>
        <Tab>R³ Scene Controller</Tab>
        <Tab> Raw Tcpmosclient</Tab>
        <Tab> Reddis</Tab>
        <Tab> MosApi</Tab>
        <Tab> Npmmosclient</Tab>


      </TabList>
      <TabPanel>
        < Nrcs2 />
      </TabPanel>
      <TabPanel>
        < Mongodb />
      </TabPanel>
      <TabPanel>
        <R3Controller />
      </TabPanel>
      <TabPanel>
        < Rawtcpmosclient />
      </TabPanel>

      <TabPanel>
        < RedisTest />
      </TabPanel>

      <TabPanel>
        < Mosapi />
      </TabPanel>

      <TabPanel>
        < Npmmosclient />
      </TabPanel>

    </Tabs>


  </div>)
}
