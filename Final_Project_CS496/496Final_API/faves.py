import webapp2
from google.appengine.ext import ndb
import dbase
import json

class Favorites(webapp2.RequestHandler):
    def get(self, **kwargs):
        if 'application/json' not in self.request.accept:
            self.response.status = 406
            self.response.status_message = "API only supports application/json MIME type"
        if 'name' in kwargs:
            uname = kwargs['name']
            q = dbase.Regu.query()
            self.response.write(json.dumps([x.to_dict() for x in dbase.Regu.query(dbase.Regu._properties["city"] == city).fetch()]))
        else:
            q = dbase.Organization.query()
            keys = q.fetch(keys_only=True)
            results = { 'keys' : [x.id() for x in keys]}
            self.response.write(json.dumps(results))
            
    def post(self):
        uname = self.request.get('username', default_value=None)
        new_user = dbase.Regu(dbase.Regu._properties["username"] == uname)
        faves = self.request.get('faves', default_value=None)
        new_user.faves = faves
        new_user.put()

class FavDelete(webapp2.RequestHandler):
    def delete(self, **kwargs):
        if 'name' in kwargs:
            uname = kwargs['name']
            q = dbase.Organization.query(dbase.Organization._properties["name"] == name).get()
            key = q.fetch(keys_only=True)
        q.key.delete()