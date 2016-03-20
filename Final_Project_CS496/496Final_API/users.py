import webapp2
from google.appengine.ext import ndb
import dbase
import json

class Users(webapp2.RequestHandler):
    def post(self):
        new_user = dbase.Regu()
        uname = self.request.get('username', default_value=None)
        passw = self.request.get('password', default_value=None)
        if uname:
            new_user.username = uname
        else:
            self.response.status = 400
            self.response.status_message = "Invalid request"
        if passw:
            new_user.password = passw
        else:
            self.response.status = 400
            self.response.status_message = "Invalid request"
        new_user.put()

    def get(self, **kwargs):
        if 'application/json' not in self.request.accept:
            self.response.status = 406
            self.response.status_message = "API only supports application/json MIME type"
        if 'name' in kwargs:
            uname = kwargs['name']
            pword = kwargs['passw']
            q = dbase.Regu.query(dbase.Regu._properties["username"] == uname).get()
            if q.password == pword:
                q2 = dbase.Regu.query(dbase.Regu._properties["username"] == uname)
                self.response.headers['Content-Type'] = 'application/json'
                results = { 'key' : [ '1' ] }
                self.response.write(json.dumps(results))
            else:
                self.response.headers['Content-Type'] = 'application/json'
                results = { 'key' : [ '0' ] }
                self.response.write(json.dumps(results))
        else:
            q = dbase.Faves.query()
            keys = q.fetch(keys_only=True)
            results = { 'key': [x.id() for x in keys]}
            self.response.write(json.dumps(results))
            
class UserReg(webapp2.RequestHandler):
    def get(self, **kwargs):
        if 'application/json' not in self.request.accept:
            self.response.status = 406
            self.response.status_message = "API only supports application/json MIME type"
        if 'uid' in kwargs:
            password = kwargs['passw']
            user = ndb.Key(dbase.Regu, int(kwargs['uid'])).get()
            user.password = password
            user.put()

class Userfaves(webapp2.RequestHandler):
    def put(self, **kwargs):
        if 'application/json' not in self.request.accept:
            self.response.status = 406
            self.response.status_message = "API only supports application/json MIME type"
        if 'uid' in kwargs:
            user = ndb.Key(dbase.Regu, int(kwargs['uid'])).get()
            if not user:
                self.response.status = 404
                self.response.status_message = "User not found"
                return
            if 'oid' in kwargs:
                org = ndb.Key(dbase.Organization, int(kwargs['oid']))
                if not org:
                    self.response.status = 404
                    self.response.status_message = "Organization not found"
                    return
                if org not in user.faves:
                    user.faves.append(org)
                    user.put()
                self.response.write(json.dumps(resource.to_dict()))
                return