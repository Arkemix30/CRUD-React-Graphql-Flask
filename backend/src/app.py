from flask import Flask, redirect
from flask_graphql import GraphQLView
from flask_cors import CORS

from models import db_session,engine,Base
import schema

app = Flask(__name__)
# Using CORS that enables controlled access to resources located outside of a given domain. 
CORS(app)
# Adding the URL RULE for accesing GraphQL View
app.add_url_rule(
    '/graphql',
    view_func=GraphQLView.as_view(
        'graphql',
        schema=schema.schema,
        graphiql=True # for having the GraphiQL interface
    )
)
# Redirecting main to graphql
@app.route('/')
def index():
    return redirect('/graphql')

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

if __name__ == '__main__':
    # Creating the tables if didn't exist
    Base.metadata.create_all(engine)
    app.run(debug=True)