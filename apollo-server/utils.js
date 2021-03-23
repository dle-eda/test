const { Sequelize, DataTypes } = require('sequelize')

module.exports.paginateResults = ({
  after: cursor,
  pageSize = 20,
  results,
  // can pass in a function to calculate an item's cursor
  getCursor = () => null,
}) => {
  if (pageSize < 1) return []

  if (!cursor) return results.slice(0, pageSize)
  const cursorIndex = results.findIndex(item => {
    // if an item has a `cursor` on it, use that, otherwise try to generate one
    let itemCursor = item.cursor ? item.cursor : getCursor(item)

    // if there's still not a cursor, return false by default
    return itemCursor ? cursor === itemCursor : false
  })

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // don't let us overflow
      ? []
      : results.slice(
        cursorIndex + 1,
        Math.min(results.length, cursorIndex + 1 + pageSize),
      )
    : results.slice(0, pageSize)
}

module.exports.createStore = () => {
  // const Op = Sequelize.Op
  // const operatorsAliases = {
  //   $in: Op.in,
  // }

  const sequelize = new Sequelize('database', 'user', 'name', {
    dialect: 'sqlite',
    storage: './store.sqlite',
    operatorsAliases: false,
    logging: false
  })

  const participant = sequelize.define('participant', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    country_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    group: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    freezeTableName: true,
    tableName: 'participant'
  })

  const testConnection = async () => {
    try {
      await sequelize.authenticate()
      // console.log('Connection has been established successfully.')
    } catch (error) {
      console.error('Unable to connect to the database:', error)
    }
  }

  const synchronize = async () => {
    await participant.sync({ force: true })
  }

  return { participant, synchronize, testConnection }
}