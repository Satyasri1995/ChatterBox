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
  });
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
  const conversation = await ConverstionSchemaModel.findById(conversationId);
  if (conversation) {
    return res.json(new Response(true, null, null, null, new Conversation(conversation)));
  } else {
    throw new Error("No Users Found");
  }
};

exports.addContact = async (req, res) => {
  const userId = req.body.userId;
  const name = req.body.name;
  const user = await UserSchemaModel.findById(req.session.user._id);
  const otherUser = await UserSchemaModel.findById(userId);
  const exist =
    user.contacts.findIndex((contact) => contact.user === userId) >= 0;
  if (exist) {
    throw new Error("User is already added to contacts");
  } else {
    const conversation = new ConverstionSchemaModel();
    conversation.messages = [];
    const updatedConversation = await conversation.save();
    const contact = new Contact();
    contact.user = userId;
    contact.name = name;
    contact.conversation = updatedConversation._id;
    console.log(contact);
    user.contacts.push(contact);
    otherUser.contacts.push(contact);
    const updatedUser = await user.save();
    const updatedOtherUser = await otherUser.save();
    if (updatedUser && updatedOtherUser) {
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
