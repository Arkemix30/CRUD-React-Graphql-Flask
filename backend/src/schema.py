from os import name
import graphene
import flask_bcrypt as bc
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from models import db_session, User as UserModel


class User(SQLAlchemyObjectType):
    class Meta:
        model = UserModel
        interfaces = (relay.Node, )

class createUser(graphene.Mutation):
    class Arguments:
        name = graphene.String()
        email = graphene.String()
        password = graphene.String()
    ok = graphene.Boolean()
    user = graphene.Field(User)

    def mutate(root, info, name, email, password):
        new_user = UserModel(
            name=name,
            email=email,
            password=str(
                bc.generate_password_hash(password),
                'utf-8'
            )
        )
        db_session.add(new_user)
        db_session.commit()
        ok = True
        return createUser(ok=ok, user=new_user)

class Insert(graphene.ObjectType):
    create_user = createUser.Field()

class Query(graphene.ObjectType):
    node = relay.Node.Field()
    # Allows sorting over multiple columns, by default over the primary key
    all_users = SQLAlchemyConnectionField(User.connection)
    findUserById = graphene.Field(User, id=graphene.Int())

    def resolve_findUserById(root, info, id):
        return db_session.query(UserModel).filter_by(id=id).first()

schema = graphene.Schema(query=Query, mutation=Insert)