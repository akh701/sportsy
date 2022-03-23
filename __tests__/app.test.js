// // eslint-disable-next-line import/no-unresolved
// import firebase from 'firebase';
// import { firestore } from '../test-helper';

// firebase.firestore = firestore;

// describe('setDocData', () => {
//   const mockData = { fake: 'data' };
//   beforeEach(() => {
//     jest.clearAllMocks();
//     setDocData('fakeDocID', mockData);
//   });

//   it('writes the correct doc', () => {
//     expect(firestore().doc).toHaveBeenCalledWith('docs/fakeDocID');
//   });

//   it('adds a timestamp, and writes it to the doc', () => {
//     expect(firestore().doc().set).toHaveBeenCalledWith({
//       created: 'MOCK_TIME',
//       fake: 'data',
//     });
//   });
// });

const { mockGoogleCloudFirestore } = require('firestore-jest-mock');

mockGoogleCloudFirestore({
  database: {
    users: [
      {
        id: 1, DOB: 'October 14, 1981', name: 'Félix Schultheiss', avatar: 'https://cdn.pixabay.com/photo/2021/02/04/12/03/superhero-5981125__340.png', dateJoined: '22 March 2022 at 10:10:00 UTC', location: 'AL8 7TD', preferredSports: ['Rugby', 'Cricket'], username: 'Schulty23',
      },
      {
        id: 2, DOB: 'December 29, 1994', name: 'Aeneas Sheenan', avatar: 'https://cdn.pixabay.com/photo/2016/04/01/12/11/avatar-1300582__340.png', dateJoined: '22 March 2022 at 10:13:00 UTC', location: 'SR7 7UG', preferredSports: ['Football', 'Tennis'], username: 'Aenan90',
      },
      {
        id: 3, DOB: 'December 29, 1994', name: 'Aeneas Sheenan', avatar: 'https://cdn.pixabay.com/photo/2016/04/01/12/11/avatar-1300582__340.png', dateJoined: '22 March 2022 at 10:13:00 UTC', location: 'SR7 7UG', preferredSports: ['Football', 'Tennis'], username: 'Aenan90',
      }
    ],
  },
});

const { mockCollection } = require('firestore-jest-mock/mocks/firestore');

test('expect users collection to be returned from firestore', () => {
  const { Firestore } = require('@google-cloud/firestore');
  const firestore = new Firestore();

  return firestore.collection('users').get().then((userDocs) => {
    console.log(userDocs.docs[0].data());
    expect(mockCollection).toHaveBeenCalledWith('users');
    expect(userDocs.docs[0].data().name).toEqual('Félix Schultheiss')
    
  });
});
