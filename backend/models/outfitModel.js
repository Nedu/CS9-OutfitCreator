const mongoose = require('mongoose');

const outfitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    tags: [{
        type: String,
    }],
    worn: [{
        type: Date,
    }],
    top: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
    },
    bottom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
    },
    shoes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
    },
});

module.exports = mongoose.model('Outfit', OutfitSchema);