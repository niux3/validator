import os
import hashlib

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = hashlib.sha512("P@ssw0rd".encode('utf-8')).hexdigest()
    MAIL_SERVER = 'smtp.googlemail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = "niuxe"
    MAIL_PASSWORD = "password"
    FLASKY_MAIL_SUBJECT_PREFIX = '[app flask]'
    FLASKY_MAIL_SENDER = 'app flask admin <name@dns.ext>'
    FLASKY_ADMIN = 'app admin'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    DEBUG = True
    PORT = '8000'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'data-dev.sqlite')


class ProductionConfig(Config):
    DEBUG = True
    PORT = '80'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')


config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,

    'default': DevelopmentConfig

}
