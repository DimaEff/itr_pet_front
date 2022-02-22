import { User } from "@auth0/auth0-react";

class AdminAPI {
    users: User = [
        {
            sub: '1',
            name: '1@mail.ru',
        },
        {
            sub: '2',
            name: '2@mail.ru',
        },
        {
            sub: '3',
            name: '3@mail.ru',
        },
    ];

    roles: any[] = [
        {
            title: '123',
            value: '123',
        },
        {
            title: '321',
            value: '321',
        },
    ];

    async getAllUsers(): Promise<{data: any}> {
        return new Promise((resolve) => {
            process.nextTick(() => resolve({data: this.users}));
        });
    }

    async getAllRoles(): Promise<{data: any}> {
        return new Promise<{data: any}>(
            (resolve) => {
                process.nextTick(() => resolve({data: this.roles}));
            }
        );
    }
}

export default new AdminAPI();