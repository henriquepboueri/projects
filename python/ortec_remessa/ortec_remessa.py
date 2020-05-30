fin = open('remessa.txt')
fout = open('remessa_alterado.txt', 'w')
total = 0
valor = '000000000000001'
soma = '000000000000000001'

for line in fin:
    if (line[0:3] == '756'):
        if (line[7] == '3'):
            if (line[13] == 'A'):
                total = total + 1
                new_line = line[0:119] + valor + line[134:162] + valor + line[177:241] 
                fout.write(new_line)
                continue
            elif (line[13] == 'B'):
                new_line = line[0:135] + valor + line[150:241]
                fout.write(new_line)
                continue
        elif (line[7] == '5'):
            
            soma = soma[0:len(soma)-len(str(total))] + str(total)
            new_line = line[0:23] + soma + line[41:241]
            fout.write(new_line)
            continue
    fout.write(line)
