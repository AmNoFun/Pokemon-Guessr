import pypokedex
from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit
from random import randint

app = Flask(__name__)
socketio = SocketIO(app)
app.static_folder = 'web/static'
app.template_folder = 'web/templates'

pages = False
score = 0
record = 0
vies = 3
poke = pypokedex.get(dex=randint(1,1025))

def start_round():
    global poke
    global score
    global record
    global vies
    vies = 3
    poke = pypokedex.get(dex=randint(1,1025))
    emit("lifeReset")
    emit("Record",record)
    emit("Score",score)
    emit("PokeImage",poke.sprites[0]['default'])

def defaite():
    global score
    score = 0
    start_round()

@app.route('/')
def route_page() -> str:
    """Render the page."""
    return render_template('index.html')

@socketio.on('connect')
def connect():
    start_round()

@socketio.on('Try_Guess')
def handle_Try_Guess(Trying):
    global poke
    global score
    global record
    global vies
    if Trying.lower() == poke.name :
        score += vies
        if score > record :
            record = score
        start_round()
    else :
        vies -= 1
        emit("Life-1",vies)
        if vies == 0 :
            defaite()

if __name__ == '__main__':
    socketio.run(app, debug=True, port=8080, host="0.0.0.0")