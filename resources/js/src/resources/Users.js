import Grid from '@material-ui/core/Grid';
import * as React from "react";
import { AutocompleteArrayInput, BooleanInput, ChipField, Datagrid, DateField, DateInput, EditButton, Labeled, List, PasswordInput, ReferenceArrayField, ReferenceArrayInput, SimpleForm, SimpleShowLayout, SingleFieldList, TextField, TextInput } from 'react-admin';
import { CreateDialog, EditDialog, ShowDialog } from '../components/DialogForm';

const UsersFilters = [
    <TextInput label="First Name" source="firstname" />,
    <TextInput label="Last Name" source="lastname" />,
    <TextInput label="Email" source="email" />,
    <TextInput label="Card" source="card" />,
    <BooleanInput label="Payed" source="payed" />
];

const Users = (props) => (
    <>
        <List {...props} filters={UsersFilters}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="username" />
                <TextField source="firstname" />
                <TextField source="lastname" />
                <TextField source="email" />
                <ReferenceArrayField label="Permissions" reference="permissions" source="permissions">
                    <SingleFieldList linkType={false}>
                        <ChipField source="name" />
                    </SingleFieldList>
                </ReferenceArrayField>
                <DateField source="created_at" />
                <DateField source="updated_at" />
                <DateField source="password_changed_at" />
                <EditButton />
            </Datagrid>
        </List>
        <CreateDialog {...props}>
            <SimpleForm redirect="list">
                <>{((props) => (<>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                            <TextInput {...props} source="username" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <PasswordInput {...props} source="password" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                            <TextInput {...props} source="firstname" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextInput {...props} source="lastname" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextInput {...props} source="email" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <ReferenceArrayInput {...props} label="Permissions" reference="permissions" source="permissions">
                                <AutocompleteArrayInput />
                            </ReferenceArrayInput>
                        </Grid>
                    </Grid>
                </>))()}</>
            </SimpleForm>
        </CreateDialog>
        <EditDialog {...props}>
            <SimpleForm redirect="list">
                <>{((props) => (<>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                            <TextInput {...props} source="username" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <PasswordInput {...props} source="password" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                            <TextInput {...props} source="firstname" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextInput {...props} source="lastname" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextInput {...props} source="email" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <ReferenceArrayInput {...props} label="Permissions" reference="permissions" source="permissions">
                                <AutocompleteArrayInput />
                            </ReferenceArrayInput>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={3}>
                            <TextInput {...props} disabled source="id" />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <DateInput {...props} disabled source="created_at" />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <DateInput {...props} disabled source="updated_at" />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <DateInput {...props} disabled source="password_changed_at" />
                        </Grid>
                    </Grid>
                </>))()}</>
            </SimpleForm>
        </EditDialog>
        <ShowDialog>
            <SimpleShowLayout>
                <>{((props) => (<>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                            <Labeled {...props} source="username">
                                <TextField source="username" />
                            </Labeled>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Labeled {...props} source="email">
                                <TextField source="email" />
                            </Labeled>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                            <Labeled {...props} source="firstname">
                                <TextField source="firstname" />
                            </Labeled>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Labeled {...props} source="lastname">
                                <TextField source="lastname" />
                            </Labeled>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Labeled {...props} label="Permissions" source="permissions">
                                <ReferenceArrayField {...props} reference="permissions" source="permissions">
                                    <SingleFieldList linkType={false}>
                                        <ChipField source="name" />
                                    </SingleFieldList>
                                </ReferenceArrayField>
                            </Labeled>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={3}>
                            <Labeled {...props} source="id">
                                <TextField source="id" />
                            </Labeled>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Labeled {...props} source="created_at">
                                <DateField source="created_at" />
                            </Labeled>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Labeled {...props} source="updated_at">
                                <DateField source="updated_at" />
                            </Labeled>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Labeled {...props} source="password_changed_at">
                                <DateField source="password_changed_at" />
                            </Labeled>
                        </Grid>
                    </Grid>
                </>))()}</>
            </SimpleShowLayout>
        </ShowDialog>
    </>
);

export default {
    list: Users,
    create: Users,
    edit: Users,
    show: Users
};
