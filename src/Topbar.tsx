import { 
    Button,
    makeStyles, 
    shorthands,
    Tab,
    TabList,
 } from '@fluentui/react-components'
import { 
    AddRegular, GridRegular, 
} from '@fluentui/react-icons';

const useStyles = makeStyles({
    topbar: {
        ...shorthands.gridArea('header'),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // width: '100%',
        // height: 'fit-content',
        ...shorthands.border('1px','solid','#eee'),
        boxSizing: 'border-box',
        paddingLeft: '0.8rem',
        
        ...shorthands.transition('all', '0.5s', '0s', 'linear')
    },
});

interface TopBarProps {
    onSidebarToggle: () => void
}

function Topbar(props:TopBarProps) {

    const styles = useStyles();
    return (
        <header className={styles.topbar}>
            <Button appearance='transparent' icon={<GridRegular onClick={(_) => props.onSidebarToggle()}/>} />
            <AddRegular fontSize={"2rem"}/>
            <TabList size="large">
                <Tab value="one">Menu</Tab>
                <Tab value="two">Valami</Tab>
            </TabList>
        </header>
    )
}
export default Topbar;