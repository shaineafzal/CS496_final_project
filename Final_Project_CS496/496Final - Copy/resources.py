import webapp2
from google.appengine.ext import ndb
import dbase
import json

class Resource(webapp2.RequestHandler):
    def post(self):
        if 'application/json' not in self.request.accept:
            self.response.status = 406
            self.response.status_message = "API only supports application/json MIME type"
            return
        new_resource = dbase.ResourceType()
        type = self.request.get('type', default_value=None)
        orgs = self.request.get_all('organizations[]', default_value=None)
        if type:
            new_resource.type = type
        else:
            self.response.status = 400
            self.response.status_message = "Invalid request"
        if orgs:
            for org in orgs:
                new_resource.orgs.append(ndb.Key(dbase.Organization, int(org))
        key = new_resource.put()
        out = new_resource.to_dict()
        self.response.write(json.dumps(out))

class ResourceOrgs(webapp2.RequestHandler)
    def put(self, **kwargs):
        if 'application/json' not in self.request.accept:
            self.response.status = 406
            self.response.status_message = "API only supports application/json MIME type"
        if 'rid' in kwargs:
            resource = ndb.Key(dbase.ResourceType, int(kwargs['rid'])).get()
            if not resource:
                self.response.status = 404
                self.response.status_message = "Resource Type not found"
                return
            if 'oid' in kwargs:
                org = ndb.Key(dbase.Organization, int(kwargs['oid']))
                if not resource:
                    self.response.status = 404
                    self.response.status_message = "Organization not found"
                    return
                if org not in resource.organizations:
                    resource.organizations.append(org)
                    resource.put()
                self.response.write(json.dumps(resource.to_dict()))
                return