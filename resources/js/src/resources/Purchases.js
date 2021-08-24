import React from "react";
import { ArrayField, BooleanInput, Create, Datagrid, FormDataConsumer, List, ReferenceField, ReferenceInput, SelectInput, ShowButton, SimpleForm, SimpleShowLayout, TextField, TextInput } from 'react-admin';
import DateField from '../components/DateField';
import { ShowDialog } from '../components/DialogForm';
import MoneyField from "../components/MoneyField";
import MoneyInput from '../components/MoneyInput';
import { MultiProductCountInput, MultiProductCountItem } from "../components/MultiProductCountInput";

const Purchases = (props) => {
    return (
        <>
            <List {...props} bulkActionButtons={false} >
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="name" />
                    <DateField source="created_at" />
                    <MoneyField noLabel={true} source="transaction.amount" />
                    <ReferenceField source="transaction.user_id" reference="users" link="show">
                        <TextField source="username" />
                    </ReferenceField>
                    <ReferenceField source="movement_id" reference="movements" link="show">
                        <TextField source="name" />
                    </ReferenceField>
                    <ReferenceField source="transaction_id" reference="transactions" link="show">
                        <TextField source="name" />
                    </ReferenceField>
                    <ShowButton />
                </Datagrid>
            </List>
            <ShowDialog>
                <SimpleShowLayout>
                    <TextField source="id" />
                    <TextField source="name" />
                    <MoneyField source="transaction.amount" />
                    <ReferenceField source="transaction.user_id" reference="users" link="show">
                        <TextField source="username" />
                    </ReferenceField>
                    <ArrayField source="movement.products" >
                        <Datagrid>
                            <TextField source="product_id" />
                            <TextField source="product.name" />
                            <TextField source="count" />
                        </Datagrid>
                    </ArrayField>
                    <DateField source="created_at" />
                </SimpleShowLayout>
            </ShowDialog>
        </>
    );
};

const Buy = (props) => {
    return <>
        <Create {...props}>
            <SimpleForm>
                <TextInput source="name" />
                <ReferenceInput source="account_id" reference="accounts">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <ReferenceInput source="category_id" reference="transactions_categories">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <MoneyInput source="amount" />
                <BooleanInput source="has_products" />
                <FormDataConsumer>
                    {({ formData, ...rest }) => formData.has_products &&
                        <MultiProductCountInput source="products" {...rest}>
                            <MultiProductCountItem />
                        </MultiProductCountInput>
                    }
                </FormDataConsumer>
            </SimpleForm>
        </Create>
    </>;
};

export default {
    list: Purchases,
    create: Buy,
    show: Purchases
};
