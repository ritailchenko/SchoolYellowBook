var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');
var sequelize;
const config = require(__dirname + '/../config/config.json');

if (process.env.JAWSDB_URL) {
 sequelize = new Sequelize(process.env[config.production.use_env_variable], config.production);
} else {
 sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, config.development);
}

// create a sequelize instance with our local postgres database information.
// const sequelize = new Sequelize('express_cc', 'root', 'root', {
// 	host:'localhost',
//     port: 8889,
// 	dialect:'mysql',
// });

// setup User model and its fields.
var User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
	username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}); 

User.beforeCreate((user, options) => {
	const salt = bcrypt.genSaltSync();
	user.password = bcrypt.hashSync(user.password, salt);
});
  
 
User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
      }; 

// create all the defined tables in the specified database.
sequelize.sync()
    .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

// export User model for use in other files.
module.exports = User;