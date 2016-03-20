import webapp2
from google.appengine.ext import ndb
import dbase
import json

class Organization(webapp2.RequestHandler):
    def get(self, **kwargs):
        if 'application/json' not in self.request.accept:
            self.response.status = 406
            self.response.status_message = "API only supports application/json MIME type"
        if 'city' in kwargs:
            city = kwargs['city']
            self.response.write(json.dumps([x.to_dict() for x in dbase.Organization.query(dbase.Organization._properties["city"] == city).fetch()]))
        else:
            q = dbase.Organization.query()
            keys = q.fetch(keys_only=True)
            results = { 'keys' : [x.id() for x in keys]}
            self.response.write(json.dumps(results))
