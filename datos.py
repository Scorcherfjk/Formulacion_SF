
#########################################################################################

def seleccion_formula(cursor):
    """ Lee las recetas cargadas en la tabla 'recetas' y llena el dropdown con los datos encontrados """
    
    lista=[]
    cursor.execute("SELECT [id_Receta],[Codigo],[Descripcion] FROM [db_chancay].[dbo].[Receta]")
    row = cursor.fetchone()
    while row:
        value = { "id": row[0], "codigo" : row[1], "descripcion" : row[2] }
        lista.append(value)
        row = cursor.fetchone()
    return lista

##########################################################################################

def seleccion_tolvas(cursor):
    """ Lee las tolvas PT cargadas en la tabla 'tolva' y llena el dropdown con los datos encontrados """
    
    lista=[]
    cursor.execute("SELECT [id_Tolva],[Tolva],[Codigo],[Descripcion] FROM [db_chancay].[dbo].[Tolva] WHERE Tolva LIKE 'PT%'")
    row = cursor.fetchone()
    while row:
        value = { "id": row[0], "tolva" : row[1], "codigo" : row[2], "descripcion" : row[3] }
        lista.append(value)
        row = cursor.fetchone()
    return lista

##########################################################################################

def resultadoAjax(cursor):
    lista=[]
    cursor.execute("SELECT Codigo, Descripcion, Cantidad FROM RecetaActual")
    row = cursor.fetchone()
    while row:
        value = { "codigo": row[0], "descripcion" : row[1], "peso" : row[2] }
        lista.append(value)
        row = cursor.fetchone()
        
    return lista

##########################################################################################

def cargar_recetas(cursor):
    
    lista = []
    cursor.execute("TRUNCATE TABLE [dbo].[Receta]")
    cursor.commit()
    
    cursor.execute("SELECT DISTINCT [codigoPT],[receta] FROM [dbo].[ArchivoReceta] ORDER BY [receta]")
    row = cursor.fetchone()
    while row:
        value = { "codigo": row[0], "descripcion" : row[1] }
        lista.append(value)
        row = cursor.fetchone()
    cursor.commit()  
      
    for i in range(len(lista)):
        cursor.execute("INSERT INTO [dbo].[Receta]([Codigo],[Descripcion])VALUES({0},'{1}')".format(
            lista[i]['codigo'],
            lista[i]['descripcion']
        ))
    cursor.commit()
    
##########################################################################################

def carga_archivo_receta(cursor,archivo):
    archivo.pop(0)
    
    cursor.execute("TRUNCATE TABLE [dbo].[ArchivoReceta]")
    cursor.commit()
    
    for i in range(len(archivo)):
        cursor.execute("""INSERT INTO [dbo].[ArchivoReceta]
           ([codigo],[descripcion],[peso],[codigoPT],[numVersion],[fechaVersion],[receta])
            VALUES ({0},'{1}',{2},{3},{4},'{5}','{6}')""".format(
            archivo[i][0],archivo[i][1],archivo[i][2],
            archivo[i][3],archivo[i][4],str(archivo[i][5]),
            archivo[i][6])
        )
    cursor.commit()
    
    cargar_recetas(cursor)
    
##########################################################################################

def cargar_receta_actual(cursor,seleccion):
    lista = []
    cursor.execute("TRUNCATE TABLE [dbo].[RecetaActual]")
    cursor.commit()
    
    cursor.execute("SELECT [codigo],[descripcion],[peso] FROM [dbo].[ArchivoReceta] WHERE [codigoPT] = {} ".format(int(seleccion)))
    row = cursor.fetchone()
    while row:
        value = { "codigo": row[0], "descripcion" : row[1], "peso": row[2] }
        lista.append(value)
        row = cursor.fetchone()
    cursor.commit()
    
    for i in range(len(lista)):
        cursor.execute("INSERT INTO [dbo].[RecetaActual]([Codigo],[Descripcion],[Cantidad])VALUES({0},'{1}',{2})".format(
            int(lista[i]['codigo']),
            lista[i]['descripcion'],
            float(lista[i]['peso'])
        ))
    cursor.commit()

##########################################################################################
 
def validar_formula_ajax(cursor):
    lista = []
    
    cursor.execute("""SELECT RecetaActual.Codigo, RecetaActual.Descripcion, Tolva.Tolva, Area.Area FROM RecetaActual
                    left outer join Tolva on RecetaActual.codigo = tolva.codigo
                    left outer join Ingrediente on RecetaActual.codigo = Ingrediente.Codigo
                    left outer join area on Ingrediente.Area_id = Area.id_Area""")
    row = cursor.fetchone()
    while row:
        value = { "codigo": row[0], "descripcion" : row[1], "tolva": row[2], "area": row[3] }
        lista.append(value)
        row = cursor.fetchone()
    cursor.commit()
    
    return lista

##########################################################################################

def validar_tolva_pt(cursor,receta,tolva):
    
    cursor.execute("SELECT [Codigo] FROM [db_chancay].[dbo].[Tolva] WHERE [id_Tolva] = {}".format(int(tolva)))
    row = cursor.fetchone()
    codigo = row[0]
    cursor.commit()
    
    if int(codigo) != int(receta):
        return True 
    
    return False 

#########################################################################################

def actulizar_tolva_pt(cursor,receta,tolva):
    try:
        cursor.execute("SELECT [Codigo] ,[Descripcion] FROM [db_chancay].[dbo].[Receta] WHERE [Codigo] = {}".format(int(receta)))
        row = cursor.fetchone()
        value = { "codigo": row[0], "descripcion" : row[1] }
        cursor.commit()
        
        cursor.execute("UPDATE [dbo].[Tolva] SET [Descripcion] = '{0}' ,[Codigo] = {1} WHERE [id_Tolva] = '{2}'".format(
                value['descripcion'],int(value['codigo']),tolva))
        cursor.commit()
    except:
        return False
    
    return True
    
#########################################################################################

def leer_factor_balanza(host,connector,client):
    tags=["NoFACTOR"]

    with connector( host=host ) as conn:
        for index,descr,op,reply,status,value in conn.pipeline(operations=client.parse_operations( tags ), depth=2 ):
            return float(value[0])

#########################################################################################

def seleccion_valores_formula(cursor, factor, agua):
    lista = []
    
    cursor.execute("""SELECT RecetaActual.Cantidad, Tolva.Tolva_plc FROM RecetaActual
                    full outer join Tolva on RecetaActual.codigo = tolva.codigo
                    where Tolva.Tolva_plc is not null""")
    row = cursor.fetchone()
    while row:
        if row[1] == "TA3_CTRL":
            value = { "Cantidad": agua, "Tolva_plc" : row[1]}
        else:
            value = { "Cantidad": row[0], "Tolva_plc" : row[1]}
        lista.append(value)
        row = cursor.fetchone()
    cursor.commit()
    
    for i in range(len(lista)):
        if lista[i]['Cantidad'] is not None :
            lista[i]['Cantidad'] = lista[i]['Cantidad'] * factor
        else:
            lista[i]['Cantidad'] = 0.0
    
    return lista

########################################################################################

def actualizar_plc(host,lista,connector,client):
    
    tags = []
    for i in range(len(lista)):
        tag = lista[i]['Tolva_plc']
        valor = lista[i]['Cantidad']
        tags.append("{}.SP2=(REAL){}".format(tag,valor))
        
    resultado = []
    with connector( host=host ) as conn:
        for index,descr,op,reply,status,value in conn.pipeline(operations=client.parse_operations( tags ), depth=2 ):
            resultado.append(value)
        
    return tags

########################################################################################
