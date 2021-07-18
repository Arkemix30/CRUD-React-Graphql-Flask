from flask import Flask, redirect
from flask_graphql import GraphQLView
from flask_cors import CORS

import models
import schema

app = Flask(__name__)
CORS(app)

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
    models.Base.metadata.create_all(models.engine)
    app.run(debug=True)