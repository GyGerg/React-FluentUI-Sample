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
    tokens,
 } from '@fluentui/react-components'
import { 
    AddRegular, 
    BuildingBankRegular, 
    ChartMultipleRegular, 
    CurrencyDollarEuroRegular, 
    DocumentRegular, 
    MoneyRegular, 
    OptionsRegular, 
    SettingsRegular
} from '@fluentui/react-icons';
import { useRef, useState } from 'react';

const useSidebarStyles = makeStyles({
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        
        ...shorthands.borderRight('2px', 'solid', tokens.colorNeutralBackground6),
        boxSizing: 'border-box',
        height: '100%',
        minWidth: '0px',
        overflowX: 'hidden',
        paddingRight: '0px',
        paddingTop: '8px',
        '& .fui-Tab': {
            width: '100%'
        }
    },
    sidebarContainer: {
        ...shorthands.gridArea("nav"),
        display: 'grid',
        gridTemplateColumns: '0fr',
        overflowY: 'auto',
        minWidth: '0px',
        backgroundColor: tokens.colorNeutralBackground5,
        ...shorthands.transition('grid-template-columns', '300ms')
    },
    open: {
        gridTemplateColumns: '1fr'
    },
    sideContent: {
        position: 'relative',
        height: '100%',
        backgroundColor: 'blue',
    },
    fillWidth: {
        width: '100%',
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
        <nav className={props.isClosed ? styles.sidebarContainer : mergeClasses(styles.sidebarContainer, styles.open)}>
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
                <Tab icon={<ChartMultipleRegular/>} value="dashboards" content={"Dashboards"} className={styles.fillWidth} />
                <Tab icon={<CurrencyDollarEuroRegular/>} value="fundraisers" content={"Fundraisers"} className={styles.fillWidth} />
                <Tab icon={<BuildingBankRegular/>} value="donations" content={"Donations"} className={styles.fillWidth} />
                <Divider inset={false}/>
                <Tab value="value9" ><SettingsRegular fontSize={'2rem'}/></Tab>
                <Tooltip content="Switch theme with me" relationship='label' positioning='above' appearance='inverted'>
                    <Switch onChange={(_,data) => {props.onCheck(data.checked); isChecked.current = data.checked}} checked={isChecked.current} labelPosition='above' label="Dark mode"/>
                </Tooltip>
            </TabList>
        </nav>
    )
}
export default Sidebar;