from main import db, ma, api
from flask_restful import Resource
from flask import request


# modelo - representação do meu banco de dados (tabela, no caso)
class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    content = db.Column(db.String(255))

    def __repr__(self):
        return '<Post %s>' % self.title


# conversor entre o objeto Python e o banco por meio de JSON, por exemplo
class PostSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'content')  # tipos a serem expostos
        model = Post


# API - WSGI (Web Server Gateway Interface)
class PostListResource(Resource):
    def get(self):
        posts = Post.query.all()  # busca os dados com o ORM (Alchemy)
        # serializa com o Marshmallow; não usou o Response, do Flask
        return posts_schema.dump(posts)

    def post(self):
        new_post = Post(
            title=request.json['title'],
            content=request.json['content']
        )
        db.session.add(new_post)
        db.session.commit()
        return post_schema.dump(new_post)


class PostResource(Resource):
    def get(self, post_id):
        post = Post.query.get_or_404(post_id)
        return post_schema.dump(post)

    def patch(self, post_id):
        post = Post.query.get_or_404(post_id)

        if 'title' in request.json:
            post.title = request.json['title']
        if 'content' in request.json:
            post.content = request.json['content']

        db.session.commit()
        return post_schema.dump(post)

    def delete(self, post_id):
        post = Post.query.get_or_404(post_id)
        db.session.delete(post)
        db.session.commit()
        return '', 204


api.add_resource(PostListResource, '/posts')
api.add_resource(PostResource, '/post/<int:post_id>')

post_schema = PostSchema()
posts_schema = PostSchema(many=True)
