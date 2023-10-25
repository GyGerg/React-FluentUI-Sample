import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './Sidebar'
import { FluentProvider, Portal, makeStyles, mergeClasses, shorthands, teamsDarkTheme, teamsLightTheme } from '@fluentui/react-components'
import Topbar from './Topbar'
import Fundraisers from './Fundraisers'

const useStyle = makeStyles({
  root: {
    ...shorthands.transition('grid-template-columns', '300ms'),
    display: 'grid',
    gridTemplateRows: 'auto 4fr',
    gridTemplateColumns: 'auto 4fr',
    gridTemplateAreas: `
    "header header header"
    "nav content content"
    "nav content content"
    "footer footer footer"
    `,
    "& :has(#sidebar:hover)": {
      backgroundColor: 'blue',
      gridTemplateColumns: '0% 4fr'
    },
    width:'100vw',
    height:'100vh',
    ...shorthands.margin('0'),
    ...shorthands.padding('0')
  },
  sidebarOpen: {
    gridTemplateColumns: '1fr max-content',
  },
  sidebarClosed: {
    gridTemplateColumns: '0fr 1fr'
  }
})

function App() {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false)

  const [useDarkTheme, setUseDarkTheme] = useState(true)
  const [currentTab, setCurrentTab] = useState("value1")
  const style = useStyle()
  return (
    <FluentProvider theme={useDarkTheme ? teamsDarkTheme : teamsLightTheme}>
      <div className={style.root}>
        <Topbar onSidebarToggle={() => setIsSidebarClosed(!isSidebarClosed)} />
        <Sidebar onCheck={setUseDarkTheme} onTabChange={setCurrentTab} isClosed={isSidebarClosed}/>
          <main style={{
            gridArea: 'content',
            width: '100%',
          }}>
            {currentTab === 'fundraisers' ? <Fundraisers /> : <span>ContentText</span>}
            {/* ContentText */}
          </main>
      </div>
      
    </FluentProvider>
  )
}

export default App
