#import flask
from flask import Flask, render_template

#import socket IO
from flask_socketio import SocketIO

#flask app config
app = Flask(__name__,
            static_url_path='',
            static_folder='./static',
            template_folder='./templates')

app.config['SECRET_KEY'] = 'supermegasecretkey'
socketio = SocketIO(app, cors_allowed_origins="*")


# Routes
@app.route('/')
def home():
    return render_template('session.html')

# Socket events
@socketio.on('join')
def join_room(json, methods=['GET', 'POST']):
    print("joining: ", json)
    username = json['username']
    socketio.username = username
    socketio.emit("joined room", username + " joined the room")

@socketio.on('disconnect')
def left_room():
    print("leaving", socketio.username)
    socketio.emit("left room", f"{socketio.username} left the room" )

@socketio.on("message")
def get_message(json, methods=['POST']):
    print("mensaje:" + str(json))
    socketio.emit("response", json)


if __name__ == '__main__':
    socketio.run(app, debug=True)