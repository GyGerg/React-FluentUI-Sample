import { 
    makeStyles, 
    shorthands,
    Tab,
    TabList,
    Divider,
    Tooltip,
    Switch,
    ForwardRefComponent,
    SwitchProps,
    mergeClasses,
 } from '@fluentui/react-components'
import { 
    AddRegular, 
    BuildingBankRegular, 
    ChartMultipleRegular, 
    CurrencyDollarEuroRegular, 
    DocumentRegular, 
    MoneyRegular, 
    OptionsRegular, 
    SettingsRegular,
    StoreMicrosoftRegular
} from '@fluentui/react-icons';
import { ForwardedRef, useRef, useState } from 'react';
import Fundraisers from './Fundraisers';

const useSidebarStyles = makeStyles({
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        
        ...shorthands.border('1px', 'solid', '#eee'),
        boxSizing: 'border-box',
        height: '100%',
        minWidth: '0px',
        overflowX: 'hidden',
        paddingRight: '0px',
        // paddingTop: '4rem',
        paddingTop: '8px',
    },
    sidebarContainer: {
        ...shorthands.gridArea("nav"),
        display: 'grid',
        overflowY: 'auto',
        minWidth: '0px',
        ...shorthands.transition('grid-template-columns', '300ms')
    },
    closed: {
        gridTemplateColumns: '0fr'
        // width: 0,
        // display: 'none',
    },
    open: {
        gridTemplateColumns: '1fr'
    },
    sideContent: {
        position: 'relative',
        height: '100%',
        backgroundColor: 'blue',
    }
});

interface SidebarProps {
    onCheck: (checked:boolean) => void,
    onTabChange: (tab:string) => void,
    isClosed?: boolean
}

function Sidebar(props:SidebarProps) {

    const [selectedValue, setSelectedValue] = useState("value1")
    const isChecked = useRef(true)
    const styles = useSidebarStyles();
    
    return (
        <nav className={mergeClasses(styles.sidebarContainer, props.isClosed ? styles.closed : styles.open)}>
            <TabList vertical size="large" appearance='subtle' 
                className={styles.sidebar} 
                selectedValue={selectedValue} 
                onTabSelect={(_,x) => {
                    const str = typeof x.value === 'string' ? x.value : ''
                    setSelectedValue(str); 
                    props.onTabChange(str)}}>
                
                <Tab value="value1">
                    <Tooltip content="Switch theme with me" relationship='label'>
                        <OptionsRegular fontSize={'2rem'}/>
                    </Tooltip>
                </Tab>
                <Tab value="value2" icon={<MoneyRegular fontSize={'2rem'}/>}>
                        
                </Tab>
                <Tab value="value3">
                    <DocumentRegular fontSize={'2rem'}/>
                </Tab>
                <h3>Fundraiser</h3>
                <Tab icon={<ChartMultipleRegular/>} value="dashboards" content={"Dashboards"} />
                <Tab icon={<CurrencyDollarEuroRegular/>} value="fundraisers" content={"Fundraisers"} />
                <Tab icon={<BuildingBankRegular/>} value="donations" content={"Donations"} />
                <Divider inset={false}/>
                <Tab value="value9" ><SettingsRegular fontSize={'2rem'}/></Tab>
                <Tooltip content="Switch theme with me" relationship='label' positioning='above' appearance='inverted'>
                    <Switch onChange={(_,data) => {props.onCheck(data.checked); isChecked.current = data.checked}} checked={isChecked.current} labelPosition='above' label="Dark mode"/>
                </Tooltip>
            </TabList>
            {selectedValue === 'value2' && <div className={styles.sideContent}>
                <h1>sziaszto</h1>
                <h2>ez a jutub csatorná</h2>
                <h3>m</h3>    
            </div>}
        </nav>
    )
}
export default Sidebar;