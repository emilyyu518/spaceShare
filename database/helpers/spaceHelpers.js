const Promise = require('bluebird');
const { getAmenitiesBySpaceId } = require('./amenityHelpers');
const { getImagesBySpaceId} = require('./imageHelpers');
const { getTodosBySpaceId } = require('./todoHelpers');
const { Space } = require('../models/spaceModel');
const { updateAmenities } = require('./amenityHelpers');
const { updateImages } = require('./imageHelpers');

const { getPurposeById } = require('./optionHelpers');
const { getSmokingById } = require('./optionHelpers');
const { getPetById } = require('./optionHelpers');
const { getTimelineById } = require('./optionHelpers');


const addDataFromIds = (spaceObj) => {
  const retObj = Object.assign({}, spaceObj);
  return Promise.all([
    getPurposeById(spaceObj.purpose_id),
    getSmokingById(spaceObj.smoking_id),
    getPetById(spaceObj.pet_id),
    getTimelineById(spaceObj.timeline_id),
    retObj,
  ])
    .then(([purpose, smoking, pet, timeline, retObj]) => {
      retObj.purpose = purpose.type;
      retObj.smoking = smoking.location;
      retObj.pet = pet.location;
      retObj.timeline = timeline.range;
      return retObj;
    })
    .catch(err => console.log(err));
};

// get space for users purposes
  // needs to fetch todos, amenities, and images
const getSpaceById = (spaceId) => {
  return Space.findById(spaceId)
    .then(space => {
      const spaceId = space.dataValues.id;
      return Promise.all([
        getImagesBySpaceId(spaceId),
        getAmenitiesBySpaceId(spaceId),
        getTodosBySpaceId(spaceId),
        space.dataValues,
      ])
    })
    .then(([images, amenities, todos, spaceObj]) => {
      spaceObj.gallery = images;
      spaceObj.amenities = amenities;
      spaceObj.todos = todos;
      return addDataFromIds(spaceObj);
    })
    .catch(err => console.log(err))
};

// takes a space object that INCLUDES a fb id:
const addNewSpace = (spaceObj) => {
  const amenitiesArr = spaceObj.amenities;
  const newSpace = Object.assign({}, spaceObj);
  newSpace.main_image = spaceObj.main_image.name;
  let spaceId;
  // remove amenitites Arr from obj:
  delete newSpace.amenities;
  // first create user, then add amenities, then call getUser
  return Space.create(newSpace)
    .then(createdSpace => {
      spaceId = createdSpace.id;
      updateAmenities(createdSpace.id, amenitiesArr)
    })
    // .then(() => getSpaceById(spaceId)) // commented out to return only id!
    .then(() => spaceId)
    .catch(err => console.log(err));
}

// takes a space object, returns a promise for updated space:
const updateSpace = (spaceObj) => {
    return Promise.all([
      // update amenities related to space
      updateAmenities(spaceObj.id, spaceObj.amenities),
      // update images related to space
      updateImages(spaceObj.id, spaceObj.gallery),
    ]) 
    // update space
    .then(() => Space.findById(spaceObj.id))
    .then(space => {
      const updatedSpaceObj = Object.assign({}, spaceObj);
      updatedSpaceObj.main_image = spaceObj.main_image.name;
      return space.update(updatedSpaceObj)
    })
    .then(({id}) => getSpaceById(id))
    .catch(err => console.log(err));
}



// get space info for matching purposes
  // based on location and purpose
// get users associated with space (members) 

exports.addNewSpace = addNewSpace;
exports.getSpaceById = getSpaceById;
exports.updateSpace = updateSpace;
