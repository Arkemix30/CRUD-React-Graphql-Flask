from flask import Flask, redirect
from flask_graphql import GraphQLView

import models
import schema

app = Flask(__name__)
app.debug = True

app.add_url_rule(
    '/graphql',
    view_func=GraphQLView.as_view(
        'graphql',
        schema=schema.schema,
        graphiql=True # for having the GraphiQL interface
    )
)
@app.route('/')
def index():
    return redirect('/graphql')

@app.teardown_appcontext
def shutdown_session(exception=None):
    models.db_session.remove()

if __name__ == '__main__':
    app.run()