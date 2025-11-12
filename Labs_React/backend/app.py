import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Ініціалізація Flask
app = Flask(__name__, template_folder='templates', static_folder='static')
CORS(app) 

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'shoes.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# --- Модель даних для взуття (Таблиця) ---
class Shoe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    producer = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    size = db.Column(db.Integer, nullable=False)
    color = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'producer': self.producer,
            'price': self.price,
            'size': self.size,
            'color': self.color
        }

# --- Модель даних для новин (Таблиця) ---
class FeaturedNews(db.Model):  
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(255), nullable=False)  # Шлях до зображення
    title = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'image': self.image,
            'title': self.title
        }

# CRUD Операції для взуття (API Endpoints) 

# CREATE (Створити взуття)
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

# READ (Отримати всі взуття)
@app.route('/api/shoes', methods=['GET'])
def get_shoes():
    shoes = Shoe.query.all()
    return jsonify([shoe.to_dict() for shoe in shoes])

# READ (Отримати одне взуття)
@app.route('/api/shoes/<int:id>', methods=['GET'])
def get_shoe(id):
    shoe = db.session.get(Shoe, id)
    if shoe:
        return jsonify(shoe.to_dict())
    else:
        return jsonify({'error': 'Shoe not found'}), 404

# UPDATE (Оновити взуття)
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

# DELETE (Видалити взуття)
@app.route('/api/shoes/<int:id>', methods=['DELETE'])
def delete_shoe(id):
    shoe = db.session.get(Shoe, id)
    if shoe:
        db.session.delete(shoe)
        db.session.commit()
        return jsonify({'message': 'Shoe deleted successfully'})
    else:
        return jsonify({'error': 'Shoe not found'}), 404

# --- API для новин ---

# CREATE (Додати новину)
@app.route('/api/featured-news', methods=['POST'])  
def add_featured_news(): 
    data = request.get_json()
    
    if not all(k in data for k in ('image', 'title')):
        return jsonify({'error': 'Missing data'}), 400

    try:
        new_news = FeaturedNews(  
            image=data['image'],
            title=data['title']
        )
        db.session.add(new_news)
        db.session.commit()
        return jsonify(new_news.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# READ (Отримати всі новини)
@app.route('/api/featured-news', methods=['GET'])  
def get_featured_news():  
    news = FeaturedNews.query.all() 
    return jsonify([news_item.to_dict() for news_item in news])

# READ (Отримати одну новину)
@app.route('/api/featured-news/<int:id>', methods=['GET'])  
def get_featured_news_item(id): 
    news_item = db.session.get(FeaturedNews, id) 
    if news_item:
        return jsonify(news_item.to_dict())
    else:
        return jsonify({'error': 'News not found'}), 404

# UPDATE (Оновити новину)
@app.route('/api/featured-news/<int:id>', methods=['PUT'])  
def update_featured_news(id): 
    news_item = db.session.get(FeaturedNews, id)  
    if not news_item:
        return jsonify({'error': 'News not found'}), 404
        
    data = request.get_json()
    
    try:
        news_item.image = data.get('image', news_item.image)
        news_item.title = data.get('title', news_item.title)
        
        db.session.commit()
        return jsonify(news_item.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# DELETE (Видалити новину)
@app.route('/api/featured-news/<int:id>', methods=['DELETE'])  
def delete_featured_news(id):  
    news_item = db.session.get(FeaturedNews, id)  
    if news_item:
        db.session.delete(news_item)
        db.session.commit()
        return jsonify({'message': 'News deleted successfully'})
    else:
        return jsonify({'error': 'News not found'}), 404

# Функція для додавання початкових даних
def add_mock_data():
    # Перевіряємо, чи вже є дані в таблиці
    if FeaturedNews.query.count() == 0:  
        initial_news = [  
            FeaturedNews( 
                image="src/assets/img1.jpeg",
                title="Your Favorite Brands"
            ),
            FeaturedNews(  
                image="src/assets/img2.jpeg",
                title="Seasonal Essentials"
            ),
            FeaturedNews(  
                image="src/assets/img3.jpeg",
                title="Style Spotlight"
            )
        ]
        
        for news_item in initial_news:  
            db.session.add(news_item)
        
        db.session.commit()
        print("Initial featured news added to database.")

# --- Запуск сервера ---
if __name__ == '__main__':
    # Створюємо таблиці, якщо їх ще немає
    with app.app_context():
        db.create_all()
        add_mock_data()  # Додаємо початкові дані
    
    # Запускаємо Flask-сервер
    app.run(port=5001, debug=True)