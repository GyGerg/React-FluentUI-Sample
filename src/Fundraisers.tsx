import { Avatar, Button, CompoundButton, DataGrid, DataGridBody, DataGridCell, DataGridHeader, DataGridHeaderCell, DataGridRow, Divider, TableCellLayout, TableColumnDefinition, createTableColumn, makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { ArrowLeftRegular, FluentIcon, MapFilled, MapRegular, PersonRegular } from "@fluentui/react-icons";
import { useState } from "react";

const useStyles = makeStyles({
    fundraiserRoot: {
        // display: 'flex',
        // flexDirection: 'column',
        width: '100%',
        height: '100%'
    },
    fundraiserHeader: {
        display: 'flex',
        flexDirection: 'row',
        boxSizing: 'border-box',
        width: '100%',
        backgroundColor: tokens.colorNeutralBackground5,
        ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralBackground6),
        ...shorthands.borderLeft('1px', 'solid', tokens.colorNeutralBackground6)
    }
})

interface FundraiserInfo {
    name: string
    fundraiserLink?: URL
    owner: {
        name: string,
        icon?: JSX.Element
    }
    ownerLink?: URL
    goal: number
}

function Fundraisers() {

    const items: FundraiserInfo[] = [
        {
            name: "Scholarship Fund",
            owner: {
                name: "Debajit Dutta",
                icon: (<PersonRegular />)
            },
            goal: 2000
        },
        {
            name: "Special Events",
            owner: {
                name: "Debajit Dutta",
            },
            goal: 500
        },
        {
            name: "Blinker fluid change",
            owner: {
                name: "Sam O'Donell",
            },
            goal: 3.50
        },
        {
            name: "Forgot to turn off EC2, please help",
            owner: {
                name: "Alice Greenfield",
            },
            goal: 850000000
        }
    ]
    const USD = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })
    const columns: TableColumnDefinition<FundraiserInfo>[] = [
        createTableColumn<FundraiserInfo>({
            columnId: "name",
            compare: (a,b) => a.name.localeCompare(b.name),
            renderHeaderCell: () => "Name",
            renderCell: (item) => <TableCellLayout>{item.name}</TableCellLayout>
        }),
        createTableColumn<FundraiserInfo>({
            columnId: "goal",
            compare: (a,b) => 
                a.goal > b.goal ? 1 
                    : a.goal < b.goal ? -1 
                        : 0, // dont look at this one please
            renderHeaderCell: () => "Goal",
            renderCell: (item) => <TableCellLayout>{USD.format(item.goal)}</TableCellLayout>
        }),
        createTableColumn<FundraiserInfo>({
            columnId: "owner",
            compare: (a,b) => a.owner.name.localeCompare(b.owner.name),
            renderHeaderCell: () => "Owner",
            renderCell: (item) => <TableCellLayout>
                {item.owner.icon && <Avatar icon={item.owner.icon}></Avatar>}
                {item.owner.name}
            </TableCellLayout>
        }),
    ]
    const style = useStyles();
    return (
        <div className={style.fundraiserRoot}>
            <header className={style.fundraiserHeader}>
                <Button iconPosition="before" appearance='outline' shape='square' icon={<ArrowLeftRegular />} />
                <Button iconPosition="before" appearance='outline' shape='square' icon={<MapFilled color={tokens.colorPaletteGreenForeground1} />} size="large">
                    Bing Maps
                </Button>
                
            </header>
            <h2>Active Fundraisers</h2>
            <Divider />
            <DataGrid
                items={items}
                columns={columns}
                sortable
                >
                <DataGridHeader>
                    <DataGridRow>
                        {({renderHeaderCell}) => (
                        <DataGridHeaderCell>{renderHeaderCell(1)}</DataGridHeaderCell>
                        )}
                    </DataGridRow>
                </DataGridHeader>
                <DataGridBody<FundraiserInfo>>
                    {({item, rowId}) => (
                        <DataGridRow<FundraiserInfo>
                            key={rowId}
                        >
                            {({renderCell}) => <DataGridCell>{renderCell(item)}</DataGridCell>}
                        </DataGridRow>
                    )} 
                </DataGridBody>
            </DataGrid>
        </div>
    )
}
export default Fundraisers;