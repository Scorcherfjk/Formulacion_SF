
#############################################################################################################################

def listaASCII(texto):
    a = [ord(i) for i in texto]
    return a

#############################################################################################################################

def listaSTRING(ASCII):
    a = ''.join(chr(i) for i in ASCII)
    return a

#############################################################################################################################

def limpiatexto(string):
    lista = string.split(",")
    resultado = []
    for i in lista:
        resultado.append(listaASCII(i.strip()))
    return resultado[:5]

#############################################################################################################################

def limpiatextoC(lista):
    resultado = []
    for i in lista:
        resultado.append(listaASCII(i.strip()))
    return resultado[:5]

#############################################################################################################################

def cambioTexto(host,connector,client,tolva,var_ascii):
    
    tags = []
    
    for index, value in enumerate(var_ascii):
        tags.append("{}.CODE.DATA[{}]=(SINT){}".format(tolva,index,value))

    resultado = []
    
    tags.append("{}.CODE.LEN=(DINT){}".format(tolva,len(tags)))

    with connector( host=host ) as conn:
        for index,descr,op,reply,status,value in conn.pipeline(operations=client.parse_operations( tags ), depth=2 ):
            resultado.append(value)
        
    return resultado, tags

#############################################################################################################################
