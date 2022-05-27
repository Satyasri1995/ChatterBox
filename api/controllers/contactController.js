const UserSchemaModel = require("./../schemas/userSchema");
const Response = require("./../models/response");
const User = require("../models/user");
const Contact = require("./../models/contact");

exports.userSearch = async (req, res) => {
  const query = req.body.query;
  const suggestedUsers = await UserSchemaModel.find({
    mail: { $regex: query, $options: "i" },
  });
  if (suggestedUsers) {
    return res.json(
      new Response(
        true,
        null,
        null,
        null,
        suggestedUsers.map((user) => User(user))
      )
    );
  } else {
    throw new Error("No Users Found");
  }
};

exports.addContact = async (req, res) => {
  const userId = req.body.userId;
  const name = req.body.name;
  const exist = await UserSchemaModel.exists({ "contacts.user": userId });
  if (exist) {
    throw new Error("User is already added to contacts");
  } else {
    const contact = new Contact();
    contact.user = userId;
    contact.name = name;
    const user = await UserSchemaModel.findById(req.session.user._id);
    const otherUser = await UserSchemaModel.findById(userId);
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
    }else{
      throw new Error("Failed to add Contact")
    }
  }
};
