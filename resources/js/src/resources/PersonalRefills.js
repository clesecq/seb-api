import React from "react";
import { Create, SelectInput, SimpleForm, useNotify, useRefresh } from 'react-admin';
import MoneyInput from "../components/MoneyInput";
import PersonalAccountSelector from "../components/PersonalAccountSelector";

const PersonalRefills = props => {
    const refresh = useRefresh();
    const notify = useNotify();

    return (
        <Create {...props} onSuccess={() => {
            notify('ra.notification.created', 'info', { smart_count: 1 });
            refresh();
        }} basePath="/personal_accounts" resource="personal_refills">
            <SimpleForm>
                <PersonalAccountSelector source="token" label="Compte" />
                <MoneyInput source="amount" />
                <SelectInput source="payment" label="Moyen de paiement" allowEmpty={false} choices={[
                    { id: 'cash', name: 'Liquide (Caisse)' },
                    { id: 'card', name: 'Carte Bancaire' }
                ]} />
            </SimpleForm>
        </Create>
    );
};

export default {
    create: PersonalRefills
};
