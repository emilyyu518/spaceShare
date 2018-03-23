const { User } = require('../models/userModel');
const { Space } = require('../models/spaceModel');
const { Search } = require('../models/searchModel');
const Promise = require('bluebird');
const { addNewUser } = require('../helpers/userHelpers');
const { addNewSpace } = require('../helpers/spaceHelpers');

const userList = [
  {
    about: 'I like drinking coffee, and going for walks. Spiders scare me, but I love my cat.',
    image_url: 'https://s3.amazonaws.com/spaceshare-sfp/users/user2.png',
    name_first: 'Bob',
    name_last: 'Boberton',
    phone: 4658053226,
    profession: 'programmer',
    email: 'email@email.email',
    fb_id: 'fakeFbId',
    fb_link: 'https://facebook.com',
    fb_verified: false,
    searchable_work: true,
    searchable_live: true,
    birthdate: new Date('02-07-1995'),
    gender_id: 2,
    sleep_id: 1,
    personality_id: 1,
  },
  {
    about: 'I like eating chocolate, and going staying seated. Snakes scare me, but I love my dog.',
    image_url: 'https://s3.amazonaws.com/spaceshare-sfp/users/user6.png',
    name_first: 'Rebecca',
    name_last: 'Red',
    phone: 8048064726,
    profession: 'web developer',
    email: 'email@email.email',
    fb_id: 'fakeFbId1',
    fb_link: 'https://facebook.com',
    fb_verified: false,
    searchable_work: true,
    searchable_live: true,
    birthdate: new Date('08-12-1975'),
    gender_id: 1,
    sleep_id: 2,
    personality_id: 2,
  },
  {
    about: 'The only thing worse than politics is having to hear other people talk about politics.',
    image_url: 'https://s3.amazonaws.com/spaceshare-sfp/users/user5.png',
    name_first: 'Sammy',
    name_last: 'Smith',
    phone: 3048064726,
    profession: 'full stack developer',
    email: 'email@email.email',
    fb_id: 'fakeFbId2',
    fb_link: 'https://facebook.com',
    fb_verified: false,
    searchable_work: true,
    searchable_live: true,
    birthdate: new Date('03-07-1991'),
    gender_id: 1,
    sleep_id: 2,
    personality_id: 2,
  },
  {
    about: 'The only thing better than eating is playing Games! I often spend hours searching for food based games.',
    image_url: 'https://s3.amazonaws.com/spaceshare-sfp/users/user4.png',
    name_first: 'Heather',
    name_last: 'Feathers',
    phone: 4928064726,
    profession: 'front end developer',
    email: 'email@email.email',
    fb_id: 'fakeFbId3',
    fb_link: 'https://facebook.com',
    fb_verified: false,
    searchable_work: true,
    searchable_live: true,
    birthdate: new Date('03-07-1994'),
    gender_id: 1,
    sleep_id: 2,
    personality_id: 1,
  },
  {
    about: 'Really busy, always at work. I make a great roommate, because I still pay half the bills, but I am only home once a week, from 9 am to 3 pm on Sundays.',
    image_url: 'https://s3.amazonaws.com/spaceshare-sfp/users/user3.png',
    name_first: 'Avo',
    name_last: 'Quat',
    phone: 9098064726,
    profession: 'back end developer',
    email: 'email@email.email',
    fb_id: 'fakeFbId4',
    fb_link: 'https://facebook.com',
    fb_verified: false,
    searchable_work: true,
    searchable_live: true,
    birthdate: new Date('03-07-1994'),
    gender_id: 2,
    sleep_id: 2,
    personality_id: 1,
  },
  {
    about: 'I get along great with everybody! Will you bee my roommate?',
    image_url: 'https://s3.amazonaws.com/spaceshare-sfp/users/user1.jpg',
    name_first: 'Su',
    name_last: 'Perfru',
    phone: 9098064726,
    profession: 'back end developer',
    email: 'email@email.email',
    fb_id: 'fakeFbId5',
    fb_link: 'https://facebook.com',
    fb_verified: false,
    searchable_work: true,
    searchable_live: true,
    birthdate: new Date('03-07-1984'),
    gender_id: 2,
    sleep_id: 2,
    personality_id: 2,
  },
];

const spaceList = [
  {
    amenities: [{ text: 'cats' }, { text: 'Senior Developers' }],
    capacity: 50,
    city: 'New Orleans',
    cost: 800.40,
    description: 'Open for Software Developers to work!',
    lat: 29.945961,
    lng: -90.070023,
    main_image: 'https://techservices.illinois.edu/sites/techservices.illinois.edu/files/NevadaClassClose.JPG',
    name: 'Procedure Zap',
    neighborhood: 'Central Business District',
    open: true,
    owner_fb_id: 'fakeFbId',
    purpose_id: 1,
    pet_id: 3,
    smoking_id: 2,
    state: 'LA',
    street_address: '748 camp st',
    street_address2: '2nd floor',
    timeline_id: 2,
    zip: 70130,
  },
  {
    amenities: [{ text: 'coffee' }, { text: 'pastries' }],
    capacity: 5,
    city: 'New Orleans',
    cost: 600.40,
    description: 'Amazing Place to work!',
    lat: 29.945961,
    lng: -90.070023,
    main_image: 'https://s3.amazonaws.com/spaceshare-sfp/spaces/space1.png',
    name: 'Takeoff Zone',
    neighborhood: 'Central Business District',
    open: true,
    owner_fb_id: 'fakeFbId1',
    purpose_id: 1,
    pet_id: 2,
    smoking_id: 1,
    state: 'LA',
    street_address: '748 camp st',
    street_address2: '2nd floor',
    timeline_id: 2,
    zip: 70130,
  },
  {
    amenities: [{ text: 'microwaves' }, { text: 'towels' }],
    capacity: 5,
    city: 'New Orleans',
    cost: 600.40,
    description: 'Check it out!',
    lat: 29.945961,
    lng: -90.070023,
    main_image: 'https://s3.amazonaws.com/spaceshare-sfp/spaces/space2.png',
    name: 'Work for work\'s sake',
    neighborhood: 'Warehouse District',
    open: true,
    owner_fb_id: 'fakeFbId2',
    purpose_id: 1,
    pet_id: 1,
    smoking_id: 3,
    state: 'LA',
    street_address: '748 camp st',
    street_address2: '2nd floor',
    timeline_id: 1,
    zip: 70130,
  },
  {
    amenities: [{ text: 'how water' }, { text: 'wifi' }],
    capacity: 3,
    city: 'New Orleans',
    cost: 385.40,
    description: 'Good location to live!',
    lat: 29.945961,
    lng: -90.070023,
    main_image: 'https://s3.amazonaws.com/spaceshare-sfp/spaces/space6.png',
    name: 'Chillvil',
    neighborhood: 'Arts District',
    open: true,
    owner_fb_id: 'fakeFbId3',
    purpose_id: 2,
    pet_id: 3,
    smoking_id: 2,
    state: 'LA',
    street_address: '748 camp st',
    street_address2: '2nd floor',
    timeline_id: 1,
    zip: 70130,
  },
  {
    amenities: [{ text: 'electricity' }, { text: 'arts and crafts supplies' }],
    capacity: 2,
    city: 'New Orleans',
    cost: 937.40,
    description: 'Fun place to live',
    lat: 29.945961,
    lng: -90.070023,
    main_image: 'https://s3.amazonaws.com/spaceshare-sfp/spaces/space4.png',
    name: 'Live Life (here)',
    neighborhood: 'Garden District',
    open: true,
    owner_fb_id: 'fakeFbId4',
    purpose_id: 2,
    pet_id: 2,
    smoking_id: 3,
    state: 'LA',
    street_address: '748 camp st',
    street_address2: '2nd floor',
    timeline_id: 1,
    zip: 70130,
  },
  {
    amenities: [{ text: 'bunk buds' }, { text: 'free soda' }],
    capacity: 5,
    city: 'New Orleans',
    cost: 248.40,
    description: 'Best bang for the buck!',
    lat: 29.945961,
    lng: -90.070023,
    main_image: 'https://s3.amazonaws.com/spaceshare-sfp/spaces/space3.png',
    name: 'The Crib',
    neighborhood: 'Uptown',
    open: true,
    owner_fb_id: 'fakeFbId5',
    purpose_id: 2,
    pet_id: 1,
    smoking_id: 1,
    state: 'LA',
    street_address: '748 camp st',
    street_address2: '2nd floor',
    timeline_id: 3,
    zip: 70130,
  },
];

const searchList = [
  {
    price_min: 200.00,
    price_max: 600.00,
    age_min: 20,
    age_max: 30,
    distance: 20,
    location: 'New Orleans',
    include_people: true,
    fb_id: 'fakeFbId',
    personality_id: 2,
    sleep_id: 2,
    purpose_id: 1,
    timeline_id: 2,
    pet_id: 3,
    smoking_id: 3,
    city: 'New Orleans',
    lat: 29.945961,
    lng: -90.070023,
  },
  {
    price_min: 300.00,
    price_max: 500.00,
    age_min: 20,
    age_max: 30,
    distance: 20,
    location: 'New Orleans',
    include_people: true,
    fb_id: 'fakeFbId1',
    personality_id: 1,
    sleep_id: 1,
    purpose_id: 1,
    timeline_id: 2,
    pet_id: 2,
    smoking_id: 2,
    city: 'New Orleans',
    lat: 29.945961,
    lng: -90.070023,
  },
  {
    price_min: 300.00,
    price_max: 500.00,
    age_min: 20,
    age_max: 30,
    distance: 20,
    location: 'New Orleans',
    include_people: true,
    fb_id: 'fakeFbId2',
    personality_id: 1,
    sleep_id: 1,
    purpose_id: 1,
    timeline_id: 3,
    pet_id: 1,
    smoking_id: 3,
    city: 'New Orleans',
    lat: 29.945961,
    lng: -90.070023,
  },
  {
    price_min: 300.00,
    price_max: 500.00,
    age_min: 20,
    age_max: 30,
    distance: 20,
    location: 'New Orleans',
    include_people: true,
    fb_id: 'fakeFbId3',
    personality_id: 1,
    sleep_id: 1,
    purpose_id: 2,
    timeline_id: 3,
    pet_id: 1,
    smoking_id: 3,
    city: 'New Orleans',
    lat: 29.945961,
    lng: -90.070023,
  },
  {
    price_min: 500.00,
    price_max: 800.00,
    age_min: 20,
    age_max: 30,
    distance: 20,
    location: 'New Orleans',
    include_people: true,
    fb_id: 'fakeFbId4',
    personality_id: 1,
    sleep_id: 1,
    purpose_id: 2,
    timeline_id: 3,
    pet_id: 3,
    smoking_id: 2,
    city: 'New Orleans',
    lat: 29.945961,
    lng: -90.070023,
  },
  {
    price_min: 200.00,
    price_max: 800.00,
    age_min: 20,
    age_max: 30,
    distance: 20,
    location: 'New Orleans',
    include_people: true,
    fb_id: 'fakeFbId5',
    personality_id: 1,
    sleep_id: 1,
    purpose_id: 2,
    timeline_id: 3,
    pet_id: 3,
    smoking_id: 2,
    city: 'New Orleans',
    lat: 29.945961,
    lng: -90.070023,
  },
];

const populateUsers = () => Promise.map(userList, user => {
  addNewUser(user);
})
const populateSpaces = () => Promise.map(spaceList, space => addNewSpace(space, space.fb_owner_id));
const populateSearches = () => Search.bulkCreate(searchList);

const addUsersAndSpaces = () => (
  populateUsers()
    .then(users => populateSpaces())
    .then(spaces => populateSearches())
    .catch(err => console.log(err))
);

exports.findOrAddUsersAndSpaces = () => (
  // search for Smokings
  User.findAll()
    // if already Smokings, print them. else add them
    .then((foundUsers) => {
      if (foundUsers.length) {
        return console.log('users already created!');
      }
      return addUsersAndSpaces();
    })
    .catch(err => console.log(err))
);
