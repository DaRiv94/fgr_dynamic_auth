

If Migrations are done on this app
you can create a new migration with the sequelize-cli 
`docker exec <contianer_id_Or_name> npx sequelize migration:create --name User`

Create migration file like so
```
const { DataTypes } = require('sequelize');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('Users', {
      id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('Users');
  }
};
```
Check status
`docker exec <contianer_id_Or_name> npx sequelize db:migrate:status`

Migrate
`docker exec <contianer_id_Or_name> npx sequelize db:migrate`