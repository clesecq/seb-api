import * as React from "react";
import { ArrayField, Create, Datagrid, List, ReferenceField, ShowButton, SimpleForm, SimpleShowLayout, TextField } from 'react-admin';
import DateField from '../components/DateField';
import { ShowDialog } from '../components/DialogForm';
import { MultiProductCountInput, MultiProductCountItem } from "../components/MultiProductCountInput";

const ProductsCounts = (props) => (
    <>
        <List {...props} bulkActionButtons={false}>
            <Datagrid>
                <TextField source="id" />
                <ReferenceField source="movement_id" reference="movements" link="show">
                    <TextField source="name" />
                </ReferenceField>
                <ReferenceField source="movement.user_id" reference="users">
                    <TextField source="username" />
                </ReferenceField>
                <DateField source="created_at" />
                <ShowButton />
            </Datagrid>
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
                <ReferenceField source="movement.user_id" reference="users">
                    <TextField source="username" />
                </ReferenceField>
                <DateField source="created_at" />
                <DateField source="updated_at" />
            </SimpleShowLayout>
        </ShowDialog>
    </>
);

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
