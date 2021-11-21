import { useMediaQuery } from '@material-ui/core';
import * as React from "react";
import { ArrayField, Create, Datagrid, List, ReferenceField, ShowButton, SimpleForm, SimpleList, SimpleShowLayout, TextField } from 'react-admin';
import DateField from '../components/DateField';
import { ShowDialog } from '../components/DialogForm';
import { MultiProductCountInput, MultiProductCountItem } from "../components/MultiProductCountInput";

const ProductsCounts = (props) => {
    const isDesktop = useMediaQuery(theme => theme.breakpoints.up('md'));
    return (
        <>
            <List {...props} bulkActionButtons={false}>
                {isDesktop ? (
                    <Datagrid>
                        <TextField source="id" />
                        <ReferenceField source="movement_id" reference="movements" link="show">
                            <TextField source="name" />
                        </ReferenceField>
                        <ReferenceField label="Créateur" source="movement_id" reference="movements" link={false}>
                            <ReferenceField source="user_id" reference="users" link="show">
                                <TextField source="username" />
                            </ReferenceField>
                        </ReferenceField>
                        <DateField source="created_at" />
                        <ShowButton />
                    </Datagrid>
                ) : (
                    <SimpleList
                        primaryText={record => <ReferenceField record={record} source="movement_id" reference="movements" link={false}>
                            <TextField source="name" />
                        </ReferenceField>}
                        secondaryText={record => new Date(record.created_at).toLocaleString()}
                        tertiaryText={record => "#" + record.id}
                        linkType="show"
                    />
                )}
            </List>
            <ShowDialog>
                <SimpleShowLayout>
                    <TextField source="id" />
                    <ArrayField source="data">
                        <Datagrid>
                            <ReferenceField source="id" reference="products" link="show">
                                <TextField source="name" />
                            </ReferenceField>
                            <TextField source="count" />
                        </Datagrid>
                    </ArrayField>
                    <ReferenceField source="movement_id" reference="movements" link="show">
                        <TextField source="name" />
                    </ReferenceField>
                    <ReferenceField label="Créateur" source="movement_id" reference="movements" link="show">
                        <ReferenceField source="user_id" reference="users">
                            <TextField source="username" />
                        </ReferenceField>
                    </ReferenceField>
                    <DateField source="created_at" />
                    <DateField source="updated_at" />
                </SimpleShowLayout>
            </ShowDialog>
        </>
    );
};

const CountProducts = (props) => {
    return <>
        <Create {...props}>
            <SimpleForm>
                <MultiProductCountInput countZero source="data">
                    <MultiProductCountItem />
                </MultiProductCountInput>
            </SimpleForm>
        </Create>
    </>;
};

export default {
    list: ProductsCounts,
    show: ProductsCounts,
    create: CountProducts
};
