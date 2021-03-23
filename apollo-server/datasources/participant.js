const { DataSource } = require('apollo-datasource')
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
  async createParticipant({ email, phone, country_code, first_name, last_name, group }) {
    const res = await this.store.participant.findOrCreate({
      where: { email, phone, country_code, first_name, last_name, group },
    })

    return res && res.length ? res[0].get() : false
  }

  // UPDATE Participant
  async updateParticipant({ email, phone, country_code, first_name, last_name, group }) {
    const res = await this.store.participant.update({ email, phone, country_code, first_name, last_name, group }, {
      where: { email, phone, country_code, first_name, last_name, group },
    })

    return res && res.length ? res[0] : false
  }

  // DELETE Participant
  async deleteParticipant({ email }) {
    return !!this.store.participant.destroy({ where: { email } })
  }
}

module.exports = ParticipantsAPI