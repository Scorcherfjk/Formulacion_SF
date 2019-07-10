from os import urandom
from io import BytesIO
from datetime import datetime
from flask import Flask, request, render_template, session, jsonify
from flask import redirect, url_for, request, send_file
from database import *
from formulacion import *
from ingredientes import *
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
	redirect(url_for('error_general'))
 
 
 
 
 
## PAGINA DE INICIO DE LA APLICACION ###############################################################################################

@app.route('/', methods=['GET'])
def login():
    try:
        formulas = seleccion_formula(cursor)
        tolvas = seleccion_tolvas(cursor)
        factor = leer_factor_balanza(host,connector,client)
        return render_template('formulacion.html', formulas=formulas, tolvas_pt=tolvas, factor=factor)
    except Exception as e:
        print(e)
        return redirect(url_for('error'))
        
## PAGINA EN CASO DE ERROR ##########################################################################################################

@app.route('/error_formulacion')
def error():
	return render_template('error_formulacion.html')

@app.route('/error_ingredientes')
def error_ing():
	return render_template('error_ingredientes.html')

@app.route('/error_general')
def error_general():
	return render_template('error.html')

## EJECUCION ASOCIADA A LAS CARGAS DE AJAX ##########################################################################################






## BOTONES PRINCIPALES ########################
## CARGAR ARCHIVO DE RECETAS ###
@app.route('/cargar_receta', methods=['POST'])
def cargar_receta():
    try:
        seleccion = request.form['data']
        cargar_receta_actual(cursor, seleccion)
        response = resultadoAjax(cursor)
        return dumps(response)
    except Exception as e:
        print(e)
        return redirect(url_for('error'))

## VALIDAR RECETAS ###
@app.route('/validar_receta', methods=['POST'])
def validar_receta():
    try:
        response = validar_formula_ajax(cursor)
        return dumps(response)
    except Exception as e:
        print(e)
        return redirect(url_for('error'))

## TRANSFERIR RECETAS AL PLC ###
@app.route('/transferir_receta', methods=['POST'])
def transferir_receta():
    try:
        agua = float(request.form['data'])
    except Exception as e:
        print(e)
        agua = 0
    finally:
        factor = leer_factor_balanza(host,connector,client)
        valores = seleccion_valores_formula(cursor, factor, agua)
        
        datos = {
            'nombre' : request.form['nombre'],
            'numero' :request.form['noOrdenProd'],
            'batch': request.form['batch'],
            'pt01': request.form['pt01'],
            'pt02': request.form['pt02'],
            'pt03': request.form['pt03']
        }
        
        cambiar_string_plc(cursor,host,connector,client,datos)
    
        response = actualizar_plc(host,valores,connector,client)
        return dumps(response)
    
    
    
    
    
    
## DROPDOWN ###################################
## VALIDAR TOLVA PT ###
@app.route('/validar_tolva', methods=['POST'])
def validar_tolva():
    try:
        tolva = request.form['data']
        receta = request.form['receta']
        response = validar_tolva_pt(cursor,receta,tolva)
        return dumps(response)
    except Exception as e:
        print(e)
        return redirect(url_for('error'))

## CAMBIAR TOLVA PT ###
@app.route('/reemplazar_tolva', methods=['POST'])
def reemplazar_tolva():
    try:
        tolva = request.form['data']
        receta = request.form['receta']
        response = actulizar_tolva_pt(cursor,receta,tolva)
        return dumps(response)
    except Exception as e:
        print(e)
        return redirect(url_for('error'))






## MODALES DE VERIFICACION ###################################

## CONSULTAR- GRASA ###
@app.route('/consultar_grasa', methods=['POST'])
def consultar_grasa():
    try:
        response = consultar_registro_grasa(cursor)
        return dumps(response)
    except Exception as e:
        print(e)
        return redirect(url_for('error'))
## CAMBIAR GRASA ###
@app.route('/cambiar_grasa', methods=['POST'])
def cambiar_grasa():
    try:
        grasa = request.form['data']
        response = cambiar_registro_grasa(cursor,grasa,host,connector,client)
        return dumps(response)
    except Exception as e:
        print(e)
        return redirect(url_for('error'))

## NO CAMBIAR GRASA ###
@app.route('/no_postpellet', methods=['POST'])
def no_postpellet():
    try:
        grasa = 0
        response = cambiar_postpellet(grasa,host,connector,client)
        return dumps(response)
    except Exception as e:
        print(e)
        return redirect(url_for('error'))



## AGREGAR INGREDIENTE MANUAL ###
@app.route('/ing_manual', methods=['POST'])
def ing_manual():
    try:
        valores ={ 
            'valor': request.form['data'],
            'ingrediente': request.form['ingrediente'],
            'zona':  request.form['zona'] 
        }
        response = actulizar_ingManual(cursor,valores,host,connector,client)
        return dumps(response)
    except Exception as e:
        print(e)
        return redirect(url_for('error'))

## NO AGREGAR INGREDIENTE MANUAL ###
@app.route('/no_ing_manual', methods=['POST'])
def no_ing_manual():
    try:    
        valores ={ 
            'valor': 0,
            'ingrediente': '',
            'zona':  '' 
        }
        response = actulizar_ingManual(cursor,valores,host,connector,client)
        return dumps(response)
    except Exception as e:
        print(e)
        return redirect(url_for('error'))





## CARGA DE ARCHIVO DE EXCEL ########################################################################################################

@app.route("/upload", methods=['GET', 'POST'])
def upload_file():
    try:
        if request.method == 'POST':
            archivo = request.get_array(field_name='file')
            carga_archivo_receta(cursor,archivo)
            return redirect(url_for('login'))
    except Exception as e:
        print(e)
        return redirect(url_for('error'))
    
    return redirect(url_for('error'))

## FIN DEL PROGRAMA #################################################################################################################


## INICIO DE LA APLICACION DE INGREDIENTES ##########################################################################################
## RUTE INICIAL DE INGREDIENTES ###
@app.route('/ingredientes', methods=['GET'])
def ingredientes():
    try:
        ingredientes = leer_ingredientes(cursor)
        return render_template('ingredientes.html', ingredientes=ingredientes)
    except Exception as e:
        print(e)
        return redirect(url_for('error_ing'))
    
## CARGAR DATOS DE INGREDIENTES EN LA MODAL ###
@app.route('/datos_ingrediente', methods=['POST'])
def datos_ingrediente():
    try:
        id_ingrediente = int(request.form['data'])
        response = consultar_ingrediente(cursor,id_ingrediente)
        return dumps(response)
    except Exception as e:
        print(e)
        return redirect(url_for('error_ing'))
    
## CARGAR NUEVO INGREDIENTE ###
@app.route('/nuevo_ingrediente', methods=['POST'])
def nuevo_ingrediente():
    try:
        datos = {
            'habilitado': request.form['habilitado'],
            'codigo': request.form['codigo'],
            'descripcion': request.form['descripcion'],
            'area': request.form['area']
        }
        
        response = grabar_ingrediente(cursor,datos)
        return dumps(response)
    except Exception as e:
        print(e)
        return redirect(url_for('error_ing'))
    
## MODIFICAR INGREDIENTE ###
@app.route('/modificar_ingrediente', methods=['POST'])
def modificar_ingrediente():
    try:
        datos = {
            'id': request.form['data'],
            'habilitado': request.form['habilitado'],
            'codigo': request.form['codigo'],
            'descripcion': request.form['descripcion'],
            'area': request.form['area']
        }
        
        response = cambiar_ingrediente(cursor,datos)
        return dumps(response)
    except Exception as e:
        print(e)
        return redirect(url_for('error_ing'))
    
## FIN DEL PROGRAMA ####### COMIENZO DE EJECUCION ###################################################################################

if __name__ == '__main__':
    excel.init_excel(app)
    app.run(debug=True
            ,host="127.0.0.1"
            ,port=5000)