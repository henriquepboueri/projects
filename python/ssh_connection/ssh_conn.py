import paramiko

p = paramiko.SSHClient()
p.set_missing_host_key_policy(paramiko.AutoAddPolicy())   # This script doesn't work for me unless this line is added!
p.connect("192.168.1.193", port=22, username="root", password="#abc123#")

user_name = input("Digite o nome do usuário a ter a senha alterada:\n")
new_pass = input("Digite a nova senha:\n")


#stdin, stdout, stderr = p.exec_command("passwd {}".format(user_name))
p.exec_command("echo {} | passwd --stdin {}".format(new_pass, user_name))

