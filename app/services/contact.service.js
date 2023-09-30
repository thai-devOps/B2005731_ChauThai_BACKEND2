const { ObjectId } = require("mongodb");
const config = require("../config");

class ContactService {
  constructor(databaseSetvices) {
    this.databaseSetvices = databaseSetvices;
  }
  extractContactData(contact) {
    const _contact = { ...contact };

    // Remove undifined fileds
    Object.keys(_contact).forEach(
      (key) => _contact[key] === undefined && delete _contact[key]
    );
    return _contact;
  }
  async create(data) {
    const contact = this.extractContactData(data);
    const result = await this.databaseSetvices.contacts.findOneAndUpdate(
      contact,
      {
        $set: { favorite: contact.favorite === true },
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );
    return result;
  }
  async findAll() {
    try {
      const contacts = await this.databaseSetvices.contacts.find().toArray();
      return contacts;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findByName(name) {
    try {
      const contacts = await this.databaseSetvices.contacts
        .find({
          name: {
            $regex: new RegExp(name),
            $options: "i",
          },
        })
        .toArray();
      return contacts;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findById(id) {
    try {
      const contact = await this.databaseSetvices.contacts.findOne({
        _id: new ObjectId(id),
      });
      return contact;
    } catch (error) {
      throw new Error(error);
    }
  }
  async update(id, updateContact) {
    const filter ={
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    }
    const update = this.extractContactData(updateContact);
    const options = {
      returnDocument: "after",
    };

    try {
      const contact = await this.databaseSetvices.contacts.findOneAndUpdate(
        filter,
        {
          $set: update,
        },
        options
      );
      return contact;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteOne(id) {
    try {
      const contact = await this.databaseSetvices.contacts.findOneAndDelete({
        _id: new ObjectId(id),
      });
      return contact;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteAll() {
    try {
      const contacts = await this.databaseSetvices.contacts.deleteMany();
      return contacts;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findAllFavorite() {
    try {
      const contacts = await this.databaseSetvices.contacts
        .find({
          isFavorite: true,
        })
        .toArray();
      return contacts;
    } catch (error) {
      throw new Error(error);
    }
  }
}
const databaseSetvices = require("../utils/mongodb.util");
const contactService = new ContactService(databaseSetvices);
module.exports = contactService;
