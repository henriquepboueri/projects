from app import app

if __name__ == "__main__":
    app.run(debug=False, load_dotenv=True, port=5001)