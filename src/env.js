const dev = {
    pingClientId: 'feba32829fe61805252eb20ea4f4a876',
    janrainClientId: 'gwvkpganj9napxugu9wjhqw9n9q9dwzy',
    tokenPingUrl: 'https://sso-dev.shell.com',
    tokenJanrainUrl: 'https://shell-login-dev-euw1.janrainservices.com/',
    janraionClientId :'gwvkpganj9napxugu9wjhqw9n9q9dwzy',
    userInfoUrl:localStorage.getItem('userinfoUrl'),
    //redirectURL: 'https://schedulerelease-qa.azurewebsites.net',
     //redirectURL: 'https://schedulerelease-dev.azurewebsites.net/',
    redirectURL: process.env.REACT_APP_SERVER_REDIRECT_URL,
    scope: 'openid email profile',
    userInfoEndpoint: '/userinfo',
    extra: {prompt: 'consent', access_type: 'offline'}
};  

const prod = {

};

const config = process.env.REACT_APP_STAGE === 'production'
    ? prod
    : dev;

export default {
    // Add common config values here
    ...config
};
