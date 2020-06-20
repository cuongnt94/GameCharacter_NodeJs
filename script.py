import json

# read from the data.json file first in order to get the lastID 
print('Reading from data.json file ....')
id = 0
with open('./data/data.json') as json_file:
    data = json.load(json_file)
    id = len(data)


# while loop to prompt for hero info
while(True):
  name = input("Enter hero name: ")
  image = name + '.jpg'
  hp = input("Enter hit point of " + name + ": ")
  main = input("Enter main attribute type: ")
  strength = input("Enter strength stat: ")
  agi = input("Enter agi stat: ")
  intel = input("Enter intel stat: ")
  popularity = input("Enter hero's popularity: ")
  description = input("Enter hero's description: ")


  data.append({
    'id': str(id),
    "heroName": str(name),
    "image": str(image),
    "hp": str(hp),
    "main": str(main),
    "str": str(strength),
    "agi": str(agi),
    "intel": str(intel),
    "popularity": str(popularity),
    "description": str(description),
  })

  id = id +1

  halt = input("Do you want to continue? (Y/N)")
  if(halt != 'y'):
    break


# write to data.json file
print('Writing to data.json file ....')

with open('./data/data.json', 'w') as outfile:
    json.dump(data, outfile)