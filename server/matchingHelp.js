const db = require('../database');
const { getGeoDist } = require('./geocodeHelp');

// match space helper for match
// takes arr of spaces and current search
  // else puts into nested array depending on differences

const getDiffOfSpace = (search, place) => {
  let diff = 0;
  if (place.pet_id !== search.pet_id) { diff += 1; }
  if (place.smoking_id !== search.smoking_id) { diff += 1; }
  if (place.timeline_id !== search.timeline_id) { diff += 1; }
  return diff;
};

const matchSpaces = (currentSearch, allPlaces) => {
  // remove places outside of search distance
  const placesInDist = allPlaces.filter(space =>
    getGeoDist({ lat: currentSearch.lat, lon: currentSearch.lng }, { lat: space.lat, lon: space.lng }) < currentSearch.distance);
  // TODO: trim objs here?
  // return arr or arrs ordered by difference between space and search
  return placesInDist.reduce((orderedMatches, space) => {
    const ind = getDiffOfSpace(currentSearch, space);
    orderedMatches[ind] = orderedMatches[ind] ? orderedMatches[ind].concat(space) : [space];
    return orderedMatches;
  }, [[], [], [], []]);
};

const getDiffOfPeople = (currentSearch, match) => {
  let diff = 0;
  if (match.pet_id !== currentSearch.pet_id) { diff += 1; }
  if (match.smoking_id !== currentSearch.smoking_id) { diff += 1; }
  if (match.timeline_id !== currentSearch.timeline_id) { diff += 1; }
  if (match.personality_id !== currentSearch.personality_id) { diff += 1; }
  if (match.sleep_id !== currentSearch.sleep_id) { diff += 1; }
  return diff;
};


const matchPeople = (currentSearch, allMatches) => {
  // remove places outside of search distance
  const matchesInDist = allMatches.filter(match =>
    getGeoDist({ lat: currentSearch.lat, lon: currentSearch.lng }, { lat: match.lat, lon: match.lng }) < currentSearch.distance + match.distance);
  // TODO: trim objs here?
  // return arr or arrs ordered by difference between matching search and current search
  return matchesInDist.reduce((orderedMatches, match) => {
    const ind = getDiffOfPeople(currentSearch, match);
    orderedMatches[ind] = orderedMatches[ind] ? orderedMatches[ind].concat(match) : [match];
    return orderedMatches;
  }, [[], [], [], [], [], []]);
};
