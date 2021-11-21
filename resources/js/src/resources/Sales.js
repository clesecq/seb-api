import { TextField as MuiTextField, useMediaQuery } from "@material-ui/core";
import React, { useState } from "react";
import { ArrayField, AutocompleteInput, Create, Datagrid, FormDataConsumer, FormTab, FunctionField, List, ReferenceField, ReferenceInput, SelectInput, ShowButton, SimpleList, SimpleShowLayout, TabbedForm, TextField, useNotify, useRefresh, useTranslate } from 'react-admin';
import DateField from '../components/DateField';
import { ShowDialog } from '../components/DialogForm';
import MoneyField from "../components/MoneyField";
import { MultiProductCountInput, MultiProductCountItem } from "../components/MultiProductCountInput";
import PersonalAccountSelector from "../components/PersonalAccountSelector";

const SalesFilters = [
    <ReferenceInput source="person_id" reference="people" filterToQuery={searchText => ({ fullname: searchText, has_account: true })}>
        <AutocompleteInput optionText="fullname" />
    </ReferenceInput>
];

const Sales = (props) => {
    const isDesktop = useMediaQuery(theme => theme.breakpoints.up('md'));
    return (
        <>
            <List {...props} filters={SalesFilters} bulkActionButtons={false} >
                {isDesktop ? (
                    <Datagrid>
                        <TextField source="id" />
                        <DateField source="created_at" />
                        <ReferenceField label="Montant" source="transaction_id" reference="transactions" link="show">
                            <MoneyField source="amount" noLabel={true} />
                        </ReferenceField>
                        <ReferenceField label="Créateur" source="transaction_id" reference="transactions" link={false}>
                            <ReferenceField source="user_id" reference="users" link="show">
                                <TextField source="username" />
                            </ReferenceField>
                        </ReferenceField>
                        <ReferenceField source="movement_id" reference="movements" link="show">
                            <TextField source="name" />
                        </ReferenceField>
                        <ReferenceField source="transaction_id" reference="transactions" link="show">
                            <TextField source="name" />
                        </ReferenceField>
                        <ReferenceField source="person_id" reference="people" link="show" >
                            <FunctionField render={r => r.firstname + " " + r.lastname} />
                        </ReferenceField>
                        <ShowButton />
                    </Datagrid>
                ) : (
                    <SimpleList
                        primaryText={record => <ReferenceField record={record} source="movement_id" reference="movements" link={false}>
                            <TextField source="name" />
                        </ReferenceField>}
                        secondaryText={record => new Date(record.created_at).toLocaleString()}
                        tertiaryText={record => <ReferenceField record={record} label="Montant" source="transaction_id" reference="transactions" link={false}>
                            <MoneyField source="amount" noLabel={true} />
                        </ReferenceField>}
                        linkType="show"
                    />
                )}
            </List>
            <ShowDialog>
                <SimpleShowLayout>
                    <TextField source="id" />
                    <ReferenceField label="Montant" source="transaction_id" reference="transactions" link="show">
                        <MoneyField source="amount" noLabel={true} />
                    </ReferenceField>
                    <ReferenceField label="Créateur" source="transaction_id" reference="transactions" link="show">
                        <ReferenceField source="user_id" reference="users">
                            <TextField source="username" />
                        </ReferenceField>
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

const Sell = props => {
    const refresh = useRefresh();
    const notify = useNotify();
    const translate = useTranslate();

    const [price, setPrice] = useState(0);

    return <>
        <Create {...props} onSuccess={() => {
            notify('ra.notification.created', 'info', { smart_count: 1 });
            refresh();
        }}>
            <TabbedForm syncWithLocation={false}>
                <FormTab label="Produits">
                    <MultiProductCountInput source="products" total onlysalable priceChanged={(p) => setPrice(p)}>
                        <MultiProductCountItem price showcount />
                    </MultiProductCountInput>
                </FormTab>
                <FormTab label="Paiement">
                    <MuiTextField value={Number(price).toLocaleString('fr-FR', { currency: 'EUR', currencyDisplay: 'symbol', style: 'currency' })} disabled variant="filled" type="text" label={translate('inputs.multiproductcount.price')} />
                    <SelectInput source="payment" label="Moyen de paiement" allowEmpty={false} choices={[
                        { id: 'cash', name: 'Liquide (Caisse)' },
                        { id: 'card', name: 'Carte Bancaire' },
                        { id: 'account', name: 'Compte personel' },
                    ]} initialValue='cash' />
                    <FormDataConsumer>
                        {({ formData, ...rest }) => formData.payment === 'account' &&
                            <PersonalAccountSelector source="token" label="Compte" />
                        }
                    </FormDataConsumer>
                </FormTab>
            </TabbedForm>
        </Create>
    </>
};

export default {
    list: Sales,
    create: Sell,
    show: Sales
};
