columnNames = (('account_pk',), ('username',), ('password_hash',), ('balance',), ('api_key',))
results = ((1, 'carter', '9fae74fd8f5cd27c331ef955b7dfc76804164499129c8951d5a250c362f549ffc47250c20300c934819370bc83e59d331ffcb695167b2efd62c698324111110f', '1000.00', 'abcde0123456789'),(2, 'vit', '9fae74fd8f5cd27c331ef955b7dfc76804164499129c8951d5a250c362f549ffc47250c20300c934819370bc83e59d331ffcb695167b2efd62c698324111110f', '1000.00', 'abcde0123456789'))

"""
resultDict = {}
for i in range(len(columnNames)):
    resultDict[columnNames[i][0]] = result[i]
print(resultDict)

resultDict = {}
for a in columnNames:
    i = columnNames.index(a)
    resultDict[a[0]] = result[i]
print(resultDict)"""

resultList = []
for result in results:
    resultDict = {}
    for a in columnNames:
        i = columnNames.index(a)
        resultDict[a[0]] = result[i]
    resultList.append(resultDict)
print(resultList)