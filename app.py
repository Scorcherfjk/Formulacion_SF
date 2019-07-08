from os import urandom
from io import BytesIO
from datetime import datetime
from flask import Flask, request, render_template, session, jsonify
from flask import redirect, url_for, request, send_file
from database import *
from datos import *
from json import dumps
import flask_excel as excel
from cpppo.server.enip.client import connector
from cpppo.server.enip import client

app = Flask(__name__)
app.secret_key = urandom(24)
host = host()
try:
	cursor, cnxn = conexion()
except Exception as e:
	print(e)
	redirect(url_for('error'))
 
## PAGINA DE INICIO DE LA APLICACION ###############################################################################################

@app.route('/', methods=['GET'])
def login():
    formulas = seleccion_formula(cursor)
    tolvas = seleccion_tolvas(cursor)
    factor = leer_factor_balanza(host,connector,client)
    return render_template('prueba.html', formulas=formulas, tolvas_pt=tolvas, factor=factor)

## PAGINA EN CASO DE ERROR ##########################################################################################################

@app.route('/error')
def error():
	if session:
		session.clear()
	return render_template('error.html')

## EJECUCION ASOCIADA A LAS CARGAS DE AJAX ##########################################################################################

## BOTONES PRINCIPALES ########################
## CARGAR ARCHIVO DE RECETAS ###
@app.route('/cargar_receta', methods=['POST'])
def cargar_receta():
    seleccion = request.form['data']
    cargar_receta_actual(cursor, seleccion)
    response = resultadoAjax(cursor)
    return dumps(response)

## VALIDAR RECETAS ###
@app.route('/validar_receta', methods=['POST'])
def validar_receta():
    response = validar_formula_ajax(cursor)
    return dumps(response)

## TRANSFERIR RECETAS AL PLC ###
@app.route('/transferir_receta', methods=['POST'])
def transferir_receta():
    agua = request.form['data']
    factor = leer_factor_balanza(host,connector,client)
    valores = seleccion_valores_formula(cursor, factor, float(agua))
    response = actualizar_plc(host,valores,connector,client)
    return dumps(response)

## DROPDOWN ###################################
## VALIDAR TOLVA PT ###
@app.route('/validar_tolva', methods=['POST'])
def validar_tolva():
    tolva = request.form['data']
    receta = request.form['receta']
    response = validar_tolva_pt(cursor,receta,tolva)
    return dumps(response)

## CAMBIAR TOLVA PT ###
@app.route('/reemplazar_tolva', methods=['POST'])
def reemplazar_tolva():
    tolva = request.form['data']
    receta = request.form['receta']
    response = actulizar_tolva_pt(cursor,receta,tolva)
    return dumps(response)

## CARGA DE ARCHIVO DE EXCEL ########################################################################################################

@app.route("/upload", methods=['GET', 'POST'])
def upload_file():
    try:
        if request.method == 'POST':
            archivo = request.get_array(field_name='file')
            carga_archivo_receta(cursor,archivo)
            return redirect(url_for('login'))
    except:
        return redirect(url_for('error'))
    
    return redirect(url_for('error'))

## FIN DEL PROGRAMA ####### COMIENZO DE EJECUCION ###################################################################################


if __name__ == '__main__':
    excel.init_excel(app)
    app.run(debug=True
            ,host="127.0.0.1"
            ,port=5000)