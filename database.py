def conexion():
    import pyodbc 

    server = '192.168.1.25\\SQLEXPRESS' 
    database = 'db_chancay' 
    username = 'sa' 
    password = 'Controlsi' 

    cnxn = pyodbc.connect('DRIVER=SQL Server;SERVER={0};DATABASE={1};UID={2};PWD={3}'
    .format(server,database,username,password))
    cursor = cnxn.cursor()

    return cursor, cnxn


def host():
    host = "192.168.1.35"
    return host