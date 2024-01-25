import HttpService from "./htttp.service";

class UserService {
    // authEndpoint = process.env.API_URL;

    getUserList = async () => {
        const getUserListEndpoint = 'api/users/list';
        return await HttpService.get(getUserListEndpoint);
    };

    getUser = async () => {
        const getCurrentUserEndpoint = 'api/users/current';
        return await HttpService.get(getCurrentUserEndpoint);
    };

    pendingUser = async () => {
        const getPendingUsersEndpoint = 'api/users/pending';
        return await HttpService.get(getPendingUsersEndpoint);
    }

    permitUser = async (payload) => {
        const getCurrentUserEndpoint = 'api/users/permitUser';
        return await HttpService.post(getCurrentUserEndpoint, payload);
    };

    getCustomerList = async () => {
        const getCustomerListEndpoint = 'api/users/customerList';
        return await HttpService.get(getCustomerListEndpoint);
    }

    getUserById = async (id) => {
        const getCustomerListEndpoint = `api/users/${id}/user`;
        return await HttpService.get(getCustomerListEndpoint);
    }

    updateUser = async (payload) => {

        const getCustomerListEndpoint = `api/users`;
        return await HttpService.put(getCustomerListEndpoint, payload);
    }
    sendEmail = async (payload) => {
        const sendEmailToClients = `api/users/sendEmail`;
        return await HttpService.post(sendEmailToClients, payload);
    }
}

export default new UserService();