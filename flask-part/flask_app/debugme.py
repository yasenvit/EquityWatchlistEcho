import json

with open("../../api.json", "r") as file_object:
    credencials = json.load(file_object)

print(credencials)
print(credencials["secret_token"])

g = [[{"hello":1, "hi":1}],[{"hello":1, "hi":1}],[{"hello":12, "hi":2}],[{"hello":12, "hi":2}]]

s=[]
for i in g:
    s.append(i[0])
print(s)

f={}
for i in g:
    f.update(i[0])
print(f)
