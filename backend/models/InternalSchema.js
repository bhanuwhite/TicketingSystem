const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    admin: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    image: {
        name: {
          type: String,
          required: true
        },
        createdDate: {
          type: Date,
          default: Date.now
        },
        createdTime: {
          type: String,
          default: function() {
            const now = new Date();
            return now.getHours() + ':' + now.getMinutes();
          }
        }
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
})

const Internal = mongoose.model('Internal' ,clientSchema );
module.exports = Internal;