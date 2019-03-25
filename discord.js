const client = require('discord-rich-presence')('559703251159875585');

module.exports = {
     send: function(song) {
        client.updatePresence({
            state: song,
            details: "Listening to"
        });
    }
};