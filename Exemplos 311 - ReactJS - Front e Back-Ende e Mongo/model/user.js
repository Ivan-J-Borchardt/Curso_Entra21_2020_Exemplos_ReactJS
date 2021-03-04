/********* Web Technology Development Training **************************************************
 * Instructor  : Ivan J. Borchardt - linkedin.com/in/ivan-borchardt/
 *                                 - github.com/Ivan-J-Borchardt
 * Description : - Data model for the entity User 
 * Date        : 01.2021 
 ************************************************************************************************/



var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;


var UserSchema = Schema({
    usuario: String, 
    senha: String,
    status: Boolean

});

module.exports = mongoose.model('Users', UserSchema);

