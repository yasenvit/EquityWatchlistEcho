import json

with open("../../api.json", "r") as file_object:
    credencials = json.load(file_object)

print(credencials)
print(credencials["secret_token"])
    