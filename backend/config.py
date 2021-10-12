"""Configurations for running the API"""
import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config():
    """Base configurations"""
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = 'secret-key-here'
    SQLALCHEMY_DATABASE_URI = os.environ['POSTGRES_DATABASE_URL']


class ProductionConfig(Config):
    """Production configurations"""
    DEBUG = False


class StagingConfig(Config):
    """Staginh configurations"""
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    """Development configurations"""
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
    """Testing configurations"""
    TESTING = True
