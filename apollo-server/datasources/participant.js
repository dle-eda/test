const { DataSource } = require('apollo-datasource')
const isEmail = require('isemail')
const { success, error } = require('../response')
const { SUCCESS_MESSAGE , ERROR_MESSAGE} = require('../response/constants')
class ParticipantsAPI extends DataSource {
  constructor({ store }) {
    super()
    this.store = store
  }

  async getParticipants() {
    const found = await this.store.participant.findAll()
    return found
  }

  // CREATE Participant
  async createParticipant({ email, phone, first_name, last_name, group }) {
    if (!isEmail.validate(email)) return error(ERROR_MESSAGE.invalid_error_1)

    const res = await this.store.participant.findOrCreate({
      where: { email, phone, first_name, last_name, group },
    })

    return res && res.length ? res[0].get() : false
  }

  // UPDATE Participant
  async updateParticipant({ id, ...others }) {
    if (!isEmail.validate(others.email)) return error(ERROR_MESSAGE.invalid_error_1)
    
    const res = await this.store.participant.update({ ...others }, {
      where: { id },
    })

    return res && res.length ? success(SUCCESS_MESSAGE.update_success_1) : error(ERROR_MESSAGE.update_error_1)
  }

  // DELETE Participant
  async deleteParticipant({ id }) {
    const res = await this.store.participant.destroy({ where: { id } })

    return !!res ? success(SUCCESS_MESSAGE.delete_success_1) : error(ERROR_MESSAGE.delete_error_1)
  }
}

module.exports = ParticipantsAPI