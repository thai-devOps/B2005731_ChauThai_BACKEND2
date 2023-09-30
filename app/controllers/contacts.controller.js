const ApiError = require("../api-error");
const contactService = require("../services/contact.service");

exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError("Name cannot be empty", 400));
  }
  try {
    const result = await contactService.create(req.body);
    res.send(result);
  } catch (error) {
    next(new ApiError("An error accurred while creating the contact", 500));
  }
};
exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const { name } = req.query;
    if (name) {
      documents = await contactService.findByName(name);
    } else {
      documents = await contactService.findAll();
    }
  } catch (error) {
    next(new ApiError("An error accurred while retrieving contacts", 500));
  }
  return res.send(documents);
};
exports.findOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await contactService.findById(id);
    if (!document) {
      return next(new ApiError(`Contact with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while retrieving contact ${id}`, 500));
  }
};
exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError("Update data cannot be empty", 400));
  }
  const { id } = req.params;
  try {
    const document = await contactService.update(id, req.body);
    if (!document) {
      return next(new ApiError(`Contact with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while updating contact ${id}`, 500));
  }
};

exports.deleteContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await contactService.deleteOne(id);
    if (!document) {
      return next(new ApiError(`Contact with id ${id} not found`, 404));
    }
    return res.send({
      message: `Contact with id ${id} was deleted successfully`,
    });
  } catch (error) {
    next(new ApiError(`An error accurred while deleting contact ${id}`, 500));
  }
};
  
exports.deleteAllContacts = async (req, res, next) => {
  try {
    const result = await contactService.deleteAll();
    return res.send({
      message: `${result.deletedCount} contacts were deleted successfully`,
    });
  } catch (error) {
    next(new ApiError("An error accurred while deleting contacts", 500));
  }
};

exports.findAllFavorite = (req, res) => {
  res.send({
    message: "findAllFavorite handler",
  });
};
