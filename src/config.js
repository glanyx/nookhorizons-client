const dev = {
    s3: {
        REGION: 'eu-central-1',
        BUCKET: 'nookhorizons-api-dev-uploadsbucket-l06e9jeiug2l'
    },
    apiGateway: {
        REGION: 'eu-central-1',
        URL: 'https://xdclomolaf.execute-api.eu-central-1.amazonaws.com/dev'
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
        REGION: 'eu-central-1',
        BUCKET: 'nookhorizons-api-prod-uploadsbucket-19lzrk1d2gith'
    },
    apiGateway: {
        REGION: 'eu-central-1',
        URL: 'https://zzal3tz7a7.execute-api.eu-central-1.amazonaws.com/prod'
    },
    cognito: {
        REGION: 'eu-central-1',
        USER_POOL_ID: 'eu-central-1_miT0CUFS8',
        APP_CLIENT_ID: '1d3ob1q63bote4326lajc92cl7',
        IDENTITY_POOL_ID: 'eu-central-1:35a39f7f-813c-4e8d-af51-2cc5c3e27cad'
    }
}

const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : dev;

export default {
    ...config
};