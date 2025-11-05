import os
from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Ініціалізація Flask
# static_folder='static' and template_folder='templates' are default,
# but added for clarity.
app = Flask(__name__, template_folder='templates', static_folder='static')
CORS(app) 

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'shoes.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


@app.route("/")
def index():
    """Serves the main index.html page."""
    return render_template("index.html")


@app.route("/create")
def create():
    """Serves the create.html page."""
    return render_template("create.html")


@app.route("/edit")
def edit():
    """Serves the edit.html page."""
    return render_template("edit.html")

# --- Модель даних (Таблиця) ---
class Shoe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    producer = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    size = db.Column(db.Integer, nullable=False)
    color = db.Column(db.String(50), nullable=False)

    # (перетворення об'єкта Python в JSON)
    def to_dict(self):
        return {
            'id': self.id,
            'producer': self.producer,
            'price': self.price,
            'size': self.size,
            'color': self.color
        }

# CRUD Операції (API Endpoints) 

# CREATE (Створити)
@app.route('/api/shoes', methods=['POST'])
def add_shoe():
    data = request.get_json()
    
    if not all(k in data for k in ('producer', 'price', 'size', 'color')):
        return jsonify({'error': 'Missing data'}), 400

    try:
        new_shoe = Shoe(
            producer=data['producer'],
            price=float(data['price']),
            size=int(data['size']),
            color=data['color']
        )
        db.session.add(new_shoe)
        db.session.commit()
        return jsonify(new_shoe.to_dict()), 201
    except (ValueError, TypeError):
        return jsonify({'error': 'Invalid data format'}), 400

# READ (Отримати всі)
@app.route('/api/shoes', methods=['GET'])
def get_shoes():
    shoes = Shoe.query.all()
    return jsonify([shoe.to_dict() for shoe in shoes])

# READ
@app.route('/api/shoes/<int:id>', methods=['GET'])
def get_shoe(id):
    shoe = db.session.get(Shoe, id)
    if shoe:
        return jsonify(shoe.to_dict())
    else:
        return jsonify({'error': 'Shoe not found'}), 404

# UPDATE
@app.route('/api/shoes/<int:id>', methods=['PUT'])
def update_shoe(id):
    shoe = db.session.get(Shoe, id)
    if not shoe:
        return jsonify({'error': 'Shoe not found'}), 404
        
    data = request.get_json()
    
    try:
        shoe.producer = data.get('producer', shoe.producer)
        shoe.price = float(data.get('price', shoe.price))
        shoe.size = int(data.get('size', shoe.size))
        shoe.color = data.get('color', shoe.color)
        
        db.session.commit()
        return jsonify(shoe.to_dict())
    except (ValueError, TypeError):
        return jsonify({'error': 'Invalid data format'}), 400

# DELETE 
@app.route('/api/shoes/<int:id>', methods=['DELETE'])
def delete_shoe(id):
    shoe = db.session.get(Shoe, id)
    if shoe:
        db.session.delete(shoe)
        db.session.commit()
        return jsonify({'message': 'Shoe deleted successfully'})
    else:
        return jsonify({'error': 'Shoe not found'}), 404

# --- Запуск сервера ---
if __name__ == '__main__':
    # Створюємо таблиці, якщо їх ще немає
    with app.app_context():
        db.create_all()
    
    # Запускаємо Flask-сервер
    # debug=True автоматично перезавантажує сервер при змінах
    app.run(port=5001, debug=True)