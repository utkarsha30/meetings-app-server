const mongoose = require("mongoose");
const Teams = mongoose.model("Teams");

const postNewTeam = (details) => {
  return Teams.create(details);
};
const getUsersTeams = (id) => {
  return Teams.find({
    "members.userId": id,
  });
};
const getTeamById = (id) => {
  const teamsId = mongoose.Types.ObjectId(id);
  return Teams.findById(teamsId);
};
const addMember = async (id, memberId, memberEmail) => {
  const teamsId = mongoose.Types.ObjectId(id);
  const result = await Teams.findByIdAndUpdate(
    teamsId,
    {
      $push: {
        members: {
          userId: memberId,
          email: memberEmail,
        },
      },
    },
    {
      returnOriginal: false,
      runValidators: true,
    }
  );
  return result;
};
const removeMemberFromTeam = (id, memberId, memberEmail) => {
  const teamsId = mongoose.Types.ObjectId(id);
  return Teams.findByIdAndUpdate(
    teamsId,
    {
      $pull: {
        members: {
          userId: memberId,
          email: memberEmail,
        },
      },
    },
    {
      returnOriginal: false,
      runValidators: true,
    }
  );
};

module.exports = {
  postNewTeam,
  getUsersTeams,
  addMember,
  getTeamById,
  removeMemberFromTeam,
};
