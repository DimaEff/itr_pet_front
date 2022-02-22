import {Admin} from '../admin';


jest.mock('../adminAPI');

describe('Admin store', () => {
    let store = {} as Admin;
    beforeEach(() => {
        store = new Admin();
    });


    it('fetchUsers should get all users', async () => {
        expect(store.users).not.toBeUndefined();
        expect(store.users).not.toBeNull();
        expect(store.users).toHaveLength(0);

        await store.fetchUsers();

        expect(store.users).not.toBeUndefined();
        expect(store.users).not.toBeNull();
        expect(store.users.length).toBeGreaterThan(0);
    });

    it('fetchRoles should get all roles', async () => {
        expect(store.roles).not.toBeUndefined();
        expect(store.roles).not.toBeNull();
        expect(store.roles).toHaveLength(0);

        await store.fetchRoles();

        expect(store.roles).not.toBeUndefined();
        expect(store.roles).not.toBeNull();
        expect(store.roles.length).toBeGreaterThan(0);
    });
});