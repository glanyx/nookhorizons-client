const dev = {
    s3: {
        REGION: 'eu-central-1',
        BUCKET: 'nookhorizons-api-dev-uploadsbucket-l06e9jeiug2l'
    },
    apiGateway: {
        REGION: 'eu-west-2',
        URL: 'https://xdclomolaf.execute-api.eu-west-2.amazonaws.com/dev'
    },
    cognito: {
        REGION: 'eu-central-1',
        USER_POOL_ID: 'eu-central-1_OrDJLRyYe',
        APP_CLIENT_ID: '2a1o543j31gtgt9flh8d5h2sab',
        IDENTITY_POOL_ID: 'eu-central-1:4b2c076c-7a19-447f-9ea5-68226cbe4b4f'
    }
};

const prod = {
    s3: {
        REGION: '',
        BUCKET: ''
    },
    apiGateway: {
        REGION: '',
        URL: ''
    },
    cognito: {
        REGION: '',
        USER_POOL_ID: '',
        APP_CLIENT_ID: '',
        IDENTITY_POOL_ID: ''
    }
}

const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : dev;

export default {
    ...config
};