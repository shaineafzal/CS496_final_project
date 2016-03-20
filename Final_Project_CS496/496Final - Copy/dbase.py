from google.appengine.ext import ndb

class Model(ndb.Model):
    def to_dict(self):
        d = super(Model, self).to_dict()
        d['key'] = self.key.id()
        return d
    
class ResourceType(ndb.Model):
    type = ndb.StringProperty(required=True)
    organizations = ndb.KeyProperty(repeated=True)
    
    def to_dict(self):
        d = super(ResourceType, self).to_dict()
        d['organizations'] = [o.id() for o in d['organizations']]
        return d
    
class Organization(ndb.Model):
    name = ndb.StringProperty(required=True)
    phone = ndb.StringProperty()
    street = ndb.StringProperty()
    city = ndb.StringProperty(required=True)
    state = ndb.StringProperty(required=True)
    description = ndb.StringProperty(required=True)
    
class Regu(ndb.Model):
    username = ndb.StringProperty(required=True)
    password = ndb.StringProperty(required=True)
    faves = ndb.KeyProperty(repeated=True)
    
    def to_dict(self):
        d = super(RegU, self).to_dict()
        d['organizations'] = [o.id() for o in d['organizations']]
        return d
