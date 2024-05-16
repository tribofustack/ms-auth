import mongoose from "mongoose";

mongoose.pluralize(null);

export interface ICustomer {
    id?: string;
    cpf: string;
}

const Customerschema = new mongoose.Schema<ICustomer>({
    cpf: String,
});

const Customers = mongoose.model<ICustomer>("customer", Customerschema);

export default Customers;
