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
        name = graphene.String()
        email = graphene.String()
        password = graphene.String()
    ok = graphene.Boolean()
    message = graphene.String()
    data = graphene.Field(User)

    #Resolver
    def mutate(root, info, name, email, password):
        new_user = UserModel(
            name=name,
            email=email,
            password=str(
                bc.generate_password_hash(password,10),
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
        input = UserInput(required=True)
    ok = graphene.Boolean()
    message = graphene.String()
    data = graphene.Field(User)

    #Resolver
    def mutate(root, info, id, input=None):
        res = db_session.query(UserModel).get(id)
        if (res is not None):
            if input.name is not None:
                res.name= input.name
            if input.email is not None:
                res.email= input.email
            if input.password is not None:
                res.password = str(
                    bc.generate_password_hash(input.password,10),
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
    findUserById = graphene.Field(User, id=graphene.Int(), message=graphene.String())

    def resolve_getAllUsers(self, info):
        return UserModel.query.all()

    def resolve_findUserById(root, info, id):
        return UserModel.query.filter_by(id=id).first()
        
        

#Exporting Graphene Schema with Query and Mutation classes
schema = graphene.Schema(query=Query, mutation=Mutation)