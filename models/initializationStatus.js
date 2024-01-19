import mongoose from 'mongoose';

const initializationStatusSchema = new mongoose.Schema({
  initialized: {
    type: Boolean,
    default: false,
  },
});

const InitializationStatus = mongoose.model('InitializationStatus', initializationStatusSchema);

export default InitializationStatus;
