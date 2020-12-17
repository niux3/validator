from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from .views import page

db = SQLAlchemy()


def create_app(config):
    app = Flask(__name__)
    app.config.from_object(config)
    app.register_blueprint(page)
    # config.init_app(app)

    db.init_app(app)

    return app