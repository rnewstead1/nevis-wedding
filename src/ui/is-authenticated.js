module.exports.isAuthenticated = () => Boolean(!global.document.cookie.indexOf('id_token'));
