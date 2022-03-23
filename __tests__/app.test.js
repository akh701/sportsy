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
        id: 3, DOB: 'September 29, 1994', name: 'David Renwick', avatar: 'https://cdn.pixabay.com/photo/2016/09/01/08/25/smiley-1635464__340.png', dateJoined: '22 March 2022 at 10:17:00 UTC', location: 'L25 2SE', preferredSports: ['Football', 'Tennis'], username: 'BritHorv56546764565',
      },
    ],
  },
});

beforeEach(() => jest.clearAllMocks());

const { mockCollection, mockWhere, mockLimit, mockOrderBy } = require('firestore-jest-mock/mocks/firestore');

describe('testing get requests to users table', () => {
  test('expect users collection to be returned from firestore', () => {
    const { Firestore } = require('@google-cloud/firestore');
    const firestore = new Firestore();

    return firestore.collection('users').get().then((userDocs) => {
      expect(mockCollection).toHaveBeenCalledWith('users');
      expect(userDocs.docs[0].data().name).toEqual('Félix Schultheiss');
    });
  });
  test('query with name', () => {
    const { Firestore } = require('@google-cloud/firestore');
    const firestore = new Firestore();
    function getUser(name) {
      let query = firestore.collection('users');

      if (name) {
        query = query.where('name', '==', name);
      }

      return query.get();
    }
    return getUser('Félix Schultheiss').then((userDocs) => {
      expect(mockCollection).toHaveBeenCalledWith('users');
      expect(mockWhere).toHaveBeenCalledWith('name', '==', 'Félix Schultheiss');
    });
  });
  test('query users without name', () => {
    const { Firestore } = require('@google-cloud/firestore');
    const firestore = new Firestore();
    function getUser(name) {
      let query = firestore.collection('users');

      if (name) {
        query = query.where('name', '==', name);
      }

      return query.get();
    }
    return getUser().then((userDocs) => {
      expect(mockCollection).toHaveBeenCalledWith('users');
      expect(mockWhere).not.toHaveBeenCalled();
    });
  });
  test('query users with limit of 2', () => {
    const { Firestore } = require('@google-cloud/firestore');
    const firestore = new Firestore();
    function getUser(name, limit) {
      let query = firestore.collection('users');

      if (name) {
        query = query.where('name', '==', name);
      }
      if (limit) {
        query = query.limit(limit);
      }
      return query.get();
    }
    return getUser(null, 2).then((userDocs) => {
      expect(mockCollection).toHaveBeenCalledWith('users');
      expect(mockWhere).not.toHaveBeenCalled();
      expect(mockLimit).toHaveBeenCalled();
    });
  });
  test('query users with order by name desc', () => {
    const { Firestore } = require('@google-cloud/firestore');
    const firestore = new Firestore();
    function getUser(name, limit, orderBy, order) {
      let query = firestore.collection('users');

      if (name) {
        query = query.where('name', '==', name);
      }
      if (limit) {
        query = query.limit(limit);
      }
      if (orderBy) {
        query = query.orderBy(orderBy, order);
      }
      return query.get();
    }
    return getUser(null, null, 'name', 'desc').then((userDocs) => {
      expect(mockCollection).toHaveBeenCalledWith('users');
      expect(mockWhere).not.toHaveBeenCalled();
      expect(mockLimit).not.toHaveBeenCalled();
      expect(mockOrderBy).toHaveBeenCalled();
    });
  });
  test('query users with preferredsports array contains tennis or football', () => {
    const { Firestore } = require('@google-cloud/firestore');
    const firestore = new Firestore();
    function getUser(sports, name, limit, orderBy, order) {
      let query = firestore.collection('users');
      if (name) {
        query = query.where('name', '==', name);
      }
      if(sports) {
        query = query.where('preferredSports', 'array-contains-any', sports)
      }
      if (limit) {
        query = query.limit(limit);
      }
      if (orderBy) {
        query = query.orderBy(orderBy, order);
      }
      return query.get();
    }
    return getUser(['Football', 'Tennis']).then((userDocs) => {
      expect(mockCollection).toHaveBeenCalledWith('users');
      expect(mockWhere).toHaveBeenCalled();
      expect(mockLimit).not.toHaveBeenCalled();
      expect(mockOrderBy).not.toHaveBeenCalled();
    });
  });
  test('query users with multiple where clauses', () => {
    const { Firestore } = require('@google-cloud/firestore');
    const firestore = new Firestore();
    function getUser(name, username) {
      let query = firestore.collection('users');
      if (name) {
        query = query.where('name', '==', name);
      }
      if(username) {
        query = query.where('username', '==', username)
      }
      return query.get();
    }
    return getUser('Félix Schultheiss', 'Schulty23').then((userDocs) => {
      expect(mockCollection).toHaveBeenCalledWith('users');
      expect(mockWhere).toHaveBeenCalledTimes(2);
      expect(mockLimit).not.toHaveBeenCalled();
      expect(mockOrderBy).not.toHaveBeenCalled();
    });
  });
});
