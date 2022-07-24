const UserSchemaModel = require("./../schemas/userSchema");
const Response = require("./../models/response");
const User = require("../models/user");
const Contact = require("./../models/contact");
const ConverstionSchemaModel = require("../schemas/converstionSchema");
const Conversation = require("../models/conversation");

exports.userSearch = async (req, res) => {
  const query = req.body.query;
  const suggestedUsers = await UserSchemaModel.find({
    mail: { $regex: query, $options: "i" },
    _id: { $ne: req.session.user._id },
  }).populate("contacts.user", "name").exec();
  if (suggestedUsers) {
    return res.json(
      new Response(
        true,
        null,
        null,
        null,
        suggestedUsers.map((user) => new User(user))
      )
    );
  } else {
    throw new Error("No Users Found");
  }
};

exports.getUser = async (req, res) => {
  const userId = req.body.userId;
  const user = await UserSchemaModel.findById(userId);
  if (user) {
    return res.json(new Response(true, null, null, null, new User(user)));
  } else {
    throw new Error("No Users Found");
  }
};

exports.getConversation = async (req, res) => {
  const conversationId = req.body.conversationId;
  const conversation = await ConverstionSchemaModel.findById(conversationId)
    .populate("messages.receiver").select("--messages.receiver.password")
    .populate("messages.sender").select("--messages.receiver.password")
    .exec();
  if (conversation) {
    return res.json(
      new Response(true, null, null, null, new Conversation(conversation))
    );
  } else {
    throw new Error("No Users Found");
  }
};

exports.addContact = async (req, res) => {
  const contactUserId = req.body.userId;
  const contactUserName = req.body.name;
  const user = await UserSchemaModel.findById(req.session.user._id);
  const contactUser = await UserSchemaModel.findById(contactUserId);
  const exist =
    user.contacts.findIndex((contact) => contact.user == contactUserId) >= 0;
  if (exist) {
    throw new Error("User is already added to contacts");
  } else {
    const conversation = new ConverstionSchemaModel();
    conversation.messages = [];
    const updatedConversation = await conversation.save();
    const contact = new Contact();
    contact.user = contactUserId;
    contact.name = contactUserName;
    contact.conversation = updatedConversation._id;
    const otherContact = new Contact();
    otherContact.user = user._id;
    otherContact.name = user.mail;
    otherContact.conversation = updatedConversation._id;
    user.contacts.push(contact);
    contactUser.contacts.push(otherContact);
    const updatedUser = await user.save();
    const updatedcontactUser = await contactUser.save();
    if (updatedUser && updatedcontactUser) {
      return res.json(
        new Response(
          true,
          "success",
          "Contact Added",
          "Contact has been added successfully",
          new User(updatedUser)
        )
      );
    } else {
      throw new Error("Failed to add Contact");
    }
  }
};

exports.editContact = async (req, res, next) => {
  const contactUserId = req.body.userId;
  const contactUserName = req.body.name;
  const user = await UserSchemaModel.findById(req.session.user._id);
  const cId = user.contacts.findIndex(
    (contact) => contact.user == contactUserId
  );
  if (cId >= 0) {
    user.contacts[cId].name = contactUserName;
    const updatedUser = await user.save();
    if (updatedUser) {
      return res.json(
        new Response(
          true,
          "success",
          "Contact Added",
          "Contact has been edited successfully",
          new User(updatedUser)
        )
      );
    } else {
      throw new Error("Failed to edit Contact");
    }
  } else {
    throw new Error("Failed to edit Contact");
  }
};

exports.deleteContact = async (req, res, next) => {
  const contactUserId = req.body.userId;
  const user = await UserSchemaModel.findById(req.session.user._id);
  user.contacts = user.contacts.filter(
    (contact) => contact.user !== contactUserId
  );
  const updatedUser = await user.save();
  if (updatedUser) {
    return res.json(
      new Response(
        true,
        "success",
        "Contact Added",
        "Contact has been deleted successfully",
        new User(updatedUser)
      )
    );
  } else {
    throw new Error("Failed to delete Contact");
  }
};
