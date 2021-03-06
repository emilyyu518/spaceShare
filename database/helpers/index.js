// user helpers:
const { addNewUser } = require('./userHelpers');
const { getUserByFbId } = require('./userHelpers');
const { getUserById } = require('./userHelpers');
const { updateUser } = require('./userHelpers');
const { userInDb } = require('./userHelpers');
const { getUserPublic } = require('./userHelpers');
// options helpers:
const { addGender } = require('./genderHelpers');
const { addNewSearch } = require('./searchHelpers');
const { deleteSearchById } = require('./searchHelpers');
const { getSearchesByFbId } = require('./searchHelpers');
const { getSearchesForMatching } = require('./searchHelpers');
const { getGenderOptions } = require('./optionHelpers');
const { getPlanetOptions } = require('./optionHelpers');
const { getPersonalityOptions } = require('./optionHelpers');
const { getSleepOptions } = require('./optionHelpers');

const { getPurposeOptions } = require('./optionHelpers');
const { getTimelineOptions } = require('./optionHelpers');
const { getPetOptions } = require('./optionHelpers');
const { getSmokingOptions } = require('./optionHelpers');
// space helpers
const { addNewSpace } = require('./spaceHelpers');
const { getSpaceById } = require('./spaceHelpers');
const { updateSpace } = require('./spaceHelpers');
const { getSpacesForMatching } = require('./spaceHelpers');
const { getSpaceListingById } = require('./spaceHelpers');
const { isOwner } = require('./spaceHelpers');
const { updateGroundrules } = require('./spaceHelpers');
const { destroySpace } = require('./spaceHelpers');
// todo helpers
const { getTodosBySpaceId } = require('./todoHelpers');
const { updateTodo } = require('./todoHelpers');
// spacemembers
const { addUsersToSpaces } = require('./spaceMembersHelpers');
const { getSpacesByFbId } = require('./spaceMembersHelpers');
const { getSpaceMembers } = require('./spaceMembersHelpers');
const { getUserIncludingSpaces } = require('./spaceMembersHelpers');
const { getSpaceIncludingMembers } = require('./spaceMembersHelpers');
const { removeUserFromSpace } = require('./spaceMembersHelpers');
// matches
const { getAllMatches } = require('./matchingHelpers');
const { getListingsAndSavedSearches } = require('./matchingHelpers');


// user exports:
exports.addNewUser = addNewUser;
exports.getUserByFbId = getUserByFbId;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.userInDb = userInDb;
exports.getUserPublic = getUserPublic;
// options exports:
exports.addGender = addGender;
exports.addNewSearch = addNewSearch;
exports.deleteSearchById = deleteSearchById;
exports.getSearchesByFbId = getSearchesByFbId;
exports.getSearchesForMatching = getSearchesForMatching;
exports.getGenderOptions = getGenderOptions;
exports.getPlanetOptions = getPlanetOptions;
exports.getPersonalityOptions = getPersonalityOptions;
exports.getSleepOptions = getSleepOptions;

exports.getPurposeOptions = getPurposeOptions;
exports.getTimelineOptions = getTimelineOptions;
exports.getPetOptions = getPetOptions;
exports.getSmokingOptions = getSmokingOptions;

// space exports
exports.addNewSpace = addNewSpace;
exports.getSpaceById = getSpaceById;
exports.updateSpace = updateSpace;
exports.getSpacesForMatching = getSpacesForMatching;
exports.getSpaceListingById = getSpaceListingById;
exports.isOwner = isOwner;
exports.updateGroundrules = updateGroundrules;
// todo exports:
exports.getTodosBySpaceId = getTodosBySpaceId;
exports.updateTodo = updateTodo;
// space members
exports.addUsersToSpaces = addUsersToSpaces;
exports.getSpacesByFbId = getSpacesByFbId;
exports.getSpaceMembers = getSpaceMembers;
exports.getUserIncludingSpaces = getUserIncludingSpaces;
exports.getSpaceIncludingMembers = getSpaceIncludingMembers;
exports.destroySpace = destroySpace;
exports.removeUserFromSpace = removeUserFromSpace;
// matches
exports.getAllMatches = getAllMatches;
exports.getListingsAndSavedSearches = getListingsAndSavedSearches;
