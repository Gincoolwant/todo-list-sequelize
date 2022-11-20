'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example: */
      return queryInterface.addColumn('Todos','UserId', {
        type: Sequelize.INTEGER, 
        allowNull: false,
        references:{
          model: 'Users',
          key: 'id'
        }
       });
   
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return queryInterface.removeColumn('Todos', 'UserId');
    
  }
};
