from flask import (Flask,send_from_directory,request,make_response,jsonify)
from subprocess import run
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)

@app.route("/static/<path:path>")
@cross_origin()
def static_dir(path):
    return send_from_directory("static", path)


@app.route("/cordinate",methods=["POST"])
@cross_origin()
def cordinate():
    if request.method == "POST":
        print(request.get_json(True)) ### data send as json in body
        if request.get_json("smiles"): 
            ## storing smiles in file 
            with open("static/smiles.smi","w") as data:
                data.write(request.get_json()["smiles"].strip(" "))
                print("Requested data written in file")
                
            ## converersion of smiles to 3D co-ordinate and checking for error
            try:
                process = run(["obabel", "-i","smi","static/smiles.smi","-o","mol","-O","static/molecule.mol","--gen2D"])
                process.check_returncode()
            except:
                ## in case of exception go for 2d conformation
                process2 = run(["obabel", "-i","smi","static/smiles.smi","-o","mol","-O","static/molecule.mol","--gen2D"])
                print(process2.check_returncode())

            return make_response(jsonify({"work_status":"done"}),200)


if __name__ == "__main__":
    app.run(debug=True)