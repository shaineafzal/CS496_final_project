import webapp2
from google.appengine.api import oauth

app = webapp2.WSGIApplication([
    ('/users', 'users.Users'),
], debug=True)
app.router.add(webapp2.Route(r'/org/<city:[A-Za-z0-9]+><:/?>', 'org.Organization'))
app.router.add(webapp2.Route(r'/faves/<name:[A-Za-z0-9]+><:/?>', 'faves.Favorites'))
app.router.add(webapp2.Route(r'/faves/put/new', 'faves.Favorites'))
app.router.add(webapp2.Route(r'/users/<name:[A-Za-z0-9]+>/<passw:[A-Za-z0-9]+>', 'users.Users'))
app.router.add(webapp2.Route(r'/delete/<name:[A-Za-z0-9]+>', 'faves.Favdelete'))