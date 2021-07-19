from sqlalchemy.sql.expression import false, true, update
import graphene
import flask_bcrypt as bc
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from models import db_session, User as UserModel

#User Data Model
class User(SQLAlchemyObjectType):
    class Meta:
        model = UserModel

class UserInput(graphene.InputObjectType):
    name = graphene.String()
    email = graphene.String()
    password = graphene.String()


# Mutation Classes
class createUser(graphene.Mutation):
    class Arguments:
        User = UserInput(required=True)
    ok = graphene.Boolean()
    message = graphene.String()
    data = graphene.Field(User)

    #Resolver
    def mutate(root, info,User=None):
        new_user = UserModel(
            name=User.name,
            email=User.email,
            password=str(
                bc.generate_password_hash(User.password,10),
                'utf-8'
            )
        )
        db_session.add(new_user)
        db_session.commit()
        ok = True
        return createUser(ok=ok, message="User Created", data=new_user)

class deleteUser(graphene.Mutation):
    class Arguments:
        id = graphene.Int()
    ok = graphene.Boolean()
    message = graphene.String()

    #Resolver
    def mutate(root, info, id):
        res = db_session.query(UserModel).filter_by(id=id).first()
        if (res is not None):
            db_session.query(UserModel).filter_by(id=id).delete()
            db_session.commit()
            ok = True
            message = "User with ID: " +str(id)+" has been deleted" 
        else:
            ok = False
            message = "User with ID: " +str(id)+" not found"
        return deleteUser(ok,message)

class updateUser(graphene.Mutation):
    class Arguments:
        id = graphene.Int()
        User = UserInput(required=True)
    ok = graphene.Boolean()
    message = graphene.String()
    data = graphene.Field(User)

    #Resolver
    def mutate(root, info, id, User=None):
        res = db_session.query(UserModel).get(id)
        if (res is not None):
            if User.name is not None:
                res.name= User.name
            if User.email is not None:
                res.email= User.email
            if User.password is not None:
                res.password = str(
                    bc.generate_password_hash(User.password,10),
                    'utf-8'
                )
            print("cambiado " + res.name)
            db_session.commit()
            ok = True
            message = "User with ID: " +str(id)+" has been updated"
            data = db_session.query(UserModel).filter_by(id=id).first()
        else:
            ok = False
            message = "User with ID: " +str(id)+" not found"
            data= None
        return updateUser(ok,message,data)


#Defining Mutation Class for Mutations
class Mutation(graphene.ObjectType):
    createUser = createUser.Field()
    deleteUser = deleteUser.Field()
    updateUser = updateUser.Field()

#Defining Query Class for Queries
class Query(graphene.ObjectType):
    getAllUsers = graphene.List(User)
    findUserById = graphene.Field(User, id=graphene.Int())

    def resolve_getAllUsers(self, info):
        return UserModel.query.all()

    def resolve_findUserById(root, info, id):
        return UserModel.query.filter_by(id=id).first()
        
        

#Exporting Graphene Schema with Query and Mutation classes
schema = graphene.Schema(query=Query, mutation=Mutation)