const renderError = function(error, request, response) {
  response.send(`ERROR: ${error.message}\n\n${error.stack}`);
};

function isLoggedIn(request, response, next) {
  if(!request.session || !request.session.user) {
    response.redirect('/');
  } else {
    next();
  }
}

module.exports = {renderError, isLoggedIn};
