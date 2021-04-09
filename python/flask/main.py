from flask import Flask, redirect, url_for

app = Flask(__name__)


@app.route("/")
def home():
    return "Hello, this is the main page! <h1>Hello</h1>"


@app.route("/<name>")
def user(name):
    return f"Hello, {name}"


@app.route('/admin')
def admin():
    return redirect(url_for("home"))


if __name__ == "__main__":
    app.run()


# def scope_test():
#     def do_local():
#         spam = "local spam"
#         # print(vars())

#     def do_nonlocal():
#         nonlocal spam
#         spam = "nonlocal spam"
#         # print(vars())

#     def do_global():
#         global spam
#         spam = "global spam"
#         # print(vars())

#     # print(vars())
#     spam = "test spam"
#     do_local()
#     # print("After local assignment:", spam)
#     do_nonlocal()
#     # print("After nonlocal assignment:", spam)
#     do_global()
#     #print("After global assignment:", spam)


# spam = "global?"
# scope_test()
# print("In global scope:", spam)
