from resources.errors import InternalServerError
from threading import Thread
from flask_mail import Message

from app import app
from app import mail


def send_async_email(app, msg):
    with app.app_context():
        try:
            mail.send(msg)
        except ConnectionRefusedError:
            raise InternalServerError("[MAIL SERVER] not working")


def send_email(subject, sender, recipients, text_body, html_body):
    msg = Message(subject, sender=sender, recipients=recipients)
    msg.body = text_body
    msg.html = html_body
    # como pode demorar o envio de e-mail, enviar numa thread separada
    Thread(target=send_async_email, args=(app, msg)).start()

# How to start a SMTP server
# python -m smtpd -n -c DebuggingServer localhost:1025