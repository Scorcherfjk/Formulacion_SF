def leer_ingredientes(cursor):
    """ Lee los ingredientes cargados en la tabla 'ingredientes' y llena la tabla con los datos encontrados """
    
    lista=[]
    cursor.execute("SELECT [Ingrediente].[id_Ingrediente] ,[Ingrediente].[Codigo] ,[Ingrediente].[Descripcion] ,[Ingrediente].[Habilitado] ,[Area].[Area] FROM [dbo].[Ingrediente] INNER JOIN Area ON Area.id_Area = Ingrediente.Area_id")
    row = cursor.fetchone()
    while row:
        value = {"id" : row[0], "codigo" : row[1], "descripcion" : row[2], "habilitado" : row[3], "area" : row[4] }
        lista.append(value)
        row = cursor.fetchone()
        
    return lista

def consultar_ingrediente(cursor,id_ingrediente):
    cursor.execute("SELECT [Ingrediente].[id_Ingrediente] ,[Ingrediente].[Codigo] ,[Ingrediente].[Descripcion] ,[Ingrediente].[Habilitado] ,[Ingrediente].[Area_id] FROM [dbo].[Ingrediente] WHERE [Ingrediente].[id_Ingrediente] = {}".format(id_ingrediente))
    row = cursor.fetchone()
    value = {"id" : row[0], "codigo" : row[1], "descripcion" : row[2], "habilitado" : row[3], "area" : row[4] }
        
    return value
    
def grabar_ingrediente(cursor,datos):
    try:
        cursor.execute("INSERT INTO [dbo].[Ingrediente] ([Habilitado] ,[Codigo] ,[Descripcion] ,[Area_id]) VALUES ({0},'{1}','{2}',{3})".format(
            int(datos['habilitado']),
            datos['codigo'],
            datos['descripcion'],
            int(datos['area'])
        ))
        cursor.commit()
    except:
        return False
    
    return True

def cambiar_ingrediente(cursor,datos):
    try:
        cursor.execute("UPDATE [dbo].[Ingrediente] SET [Habilitado] = {0} ,[Codigo] = '{1}' ,[Descripcion] = '{2}' ,[Area_id] = {3} WHERE [id_Ingrediente] = {4}".format(
            int(datos['habilitado']),
            datos['codigo'],
            datos['descripcion'],
            int(datos['area']),
            int(datos['id'])
        ))
        cursor.commit()
    except:
        return False
    
    return True





