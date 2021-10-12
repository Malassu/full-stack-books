"""API for books"""
import os
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)

app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from models import Book


@app.route('/api/get_books', methods=['GET'])
def get_books():
    """Fetch all books"""
    results = []
    events = Book.query.all()

    return {'success': True, 'results': results}


@app.route('/api/edit_book/<db_id>', methods=['PUT'])
def edit_book(db_id):
    """Edit book using the DB ID"""
    try:
        data = request.get_json()
        book = Book.query.filter_by(id=int(db_id)).first()
        if not book:
            return {'success': False, 'msg': 'Book not found!'}
        book.title = data['title']
        book.author = data['author']
        book.description = data['description']

        return {"success": True, "result": book.serialize()}
    except ValueError:
        return {'success': False, 'msg': 'Invalid db ID!'}
    except KeyError:
        return {'success': False, 'msg': 'All fields were not provided!'}


@app.route('/api/delete_book/<db_id>', methods=['DELETE'])
def delete_book(db_id):
    """Delete book using the DB ID"""
    try:
        book = Book.query.filter_by(id=int(db_id)).first()
        if not book:
            return {'success': False, 'msg': 'Book not found!'}
        db.session.delete(book)
        db.session.commit()
        return {"success": True}
    except ValueError:
        return {'success': False, 'msg': 'Invalid db ID!'}


@app.route('/api/add_book', methods=['POST'])
def add_book():
    """Add book to DB"""
    try:
        data = request.get_json()
        book = Book(title=data['title'], author=data['author'], description=data['description'])
        db.session.add(book)
        db.session.commit()
        return {"success": True, "result": book.serialize()}
    except KeyError:
        return {'success': False, 'msg': 'All fields were not provided!'}


if __name__ == '__main__':
    app.run()