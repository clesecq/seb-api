
import React from "react";
import { Create, SimpleForm } from "react-admin";
import { MultiProductCountInput, MultiProductCountItem } from "../components/MultiProductCountInput";

const Sell = props => {
    return <>
        <Create {...props}>
            <SimpleForm>
                <MultiProductCountInput source="products" total>
                    <MultiProductCountItem price />
                </MultiProductCountInput>
            </SimpleForm>
        </Create>
    </>
};


export default Sell;