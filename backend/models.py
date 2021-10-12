"""Database schemas for backend"""
from api import db


class Book(db.Model):
    """Schema for a book"""
    __tablename__ = 'book'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String())
    author = db.Column(db.String())
    description = db.Column(db.String())

    def __init__(self, title, author, description):
        self.title = title
        self.author = author
        self.description = description

    def __repr__(self):
        return f'<Book id={self.id} title={self.title} author={self.author}>'

    def serialize(self):
        """Return book instance as JSON"""
        return {
            'id': self.id,
            'title': self.title,
            'author': self.author,
            'description': self.description
        }