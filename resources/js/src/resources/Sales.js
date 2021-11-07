import { TextField as MuiTextField } from "@material-ui/core";
import React, { useState } from "react";
import { ArrayField, Create, Datagrid, FormDataConsumer, FormTab, List, ReferenceField, SelectInput, ShowButton, SimpleShowLayout, TabbedForm, TextField, useNotify, useRefresh, useTranslate } from 'react-admin';
import DateField from '../components/DateField';
import { ShowDialog } from '../components/DialogForm';
import MoneyField from "../components/MoneyField";
import { MultiProductCountInput, MultiProductCountItem } from "../components/MultiProductCountInput";
import PersonalAccountSelector from "../components/PersonalAccountSelector";

const Sales = (props) => {
    return (
        <>
            <List {...props} bulkActionButtons={false} >
                <Datagrid>
                    <TextField source="id" />
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
                    ]} />
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
