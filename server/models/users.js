import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userManagementSchema = new Schema({
    signingEmail: {
        type: 'String',
        required: true
    },
    signingHashedPassword: {
        type: 'String',
        required: true
    },
    salt: {
        type: 'String',
        required: true
    },
    connectedAccounts: {
        type: 'Array'
    }
});

export default mongoose.model('clients', userManagementSchema);
