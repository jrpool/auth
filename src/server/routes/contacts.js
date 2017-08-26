const DbContacts = require('../../db/contacts');
const router = require('express').Router();
const {isLoggedIn, renderError, renderMessage} = require('../utils');

router.get('/', isLoggedIn, (request, response) => {
  DbContacts.getContacts()
  .then(contacts => {
    const user = request.session.user;
    response.render(
      'contacts', {
        id: user.id,
        username: user.username,
        admin: user.admin,
        contacts: contacts || []
      }
    );
  });
});

router.get('/new', isLoggedIn, (request, response) => {
  if(request.session.user.admin) {
    const user = request.session.user;
    response.render(
      'new', {
        id: user.id,
        username: user.username,
        admin: user.admin
      }
    );
  } else {
    renderMessage('noAuth', response);
  }
});

router.post('/', (request, response, next) => {
  DbContacts.createContact(request.body)
  .then(contact => {
    if (contact) return response.redirect(`/contacts/${contact[0].id}`);
    next();
  })
  .catch(error => renderError(error, response, response));
});

router.get('/:contactId', (request, response, next) => {
  const contactId = request.params.contactId;
  if (!contactId || !/^\d+$/.test(contactId)) return next();
  DbContacts.getContact(contactId)
  .then(contact => {
    if (contact) {
      const user = request.session.user;
      return response.render(
        'show', {
          contact,
          id: user.id,
          username: user.username,
          admin: user.admin
        }
      );
      next();
    }
  })
  .catch(error => renderError(error, response, response));
});

router.get('/:contactId/delete',(request, response, next) => {
  if(request.session.user.admin) {
    const contactId = request.params.contactId;
    DbContacts.deleteContact(contactId)
    .then(contact => {
      if (contact) return response.redirect('/contacts');
      next();
    })
    .catch(error => renderError(error, response, response));
  } else {
    renderMessage('noAuth', response);
  }
});

router.get('/search', (request, response, next) => {
  const query = request.query.q;
  DbContacts.searchForContact(query)
  .then(contacts => {
    if (contacts) return response.render('contacts', {query, contacts});
    next();
  })
  .catch(error => renderError(error, response, response));
});

module.exports = router;
