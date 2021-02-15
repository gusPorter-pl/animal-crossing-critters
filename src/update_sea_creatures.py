"""
Takes input texts in "./critter_info", and converts it to json
"""

import json

def get_input(critter_type):
    # reads input of text file, and returns list of lines
    filename = "../critter_info/" + critter_type + "_updated.txt"
    input_file = open(filename, 'r')
    input_text = input_file.read()
    critter_list = input_text.split('\n')
    return critter_list

def create_critter_list(sea_creatures_list):
    # takes the lists of the critters, and converts them into one list of critter dictionaries
    
    filename = "./critters.json"
    with open(filename, 'r') as json_file:
        critters = json.load(json_file)
    json_critter_list = critters["critters"]
    
    for i in range(len(json_critter_list) - 1, -1, -1):
        critter = json_critter_list[i]
        if critter["type"] != "Sea Creature":
            json_critter_list.pop(i)    

    sea_creatures_length = 7
    for i in range(len(sea_creatures_list) // sea_creatures_length):
        # This is O(n^2), but n = 40, and I want to be thorough
        # print(sea_creatures_list[i * sea_creatures_length])
        for j in range(len(json_critter_list)):
            json_critter = json_critter_list[j]
            if json_critter["name"] == sea_creatures_list[i * sea_creatures_length].strip():
                months = sea_creatures_list[i * sea_creatures_length + 2].strip()[3:]
                while "to" in months:
                    to_index = months.find("to")
                    months = months[ : to_index - 1] + "-" + months[to_index + 3: ]
                json_critter["months"] = months
                json_critter["size"] = sea_creatures_list[i * sea_creatures_length + 4].strip()
                json_critter["speed"] = sea_creatures_list[i * sea_creatures_length + 5].strip()
                json_critter["price"] = sea_creatures_list[i * sea_creatures_length + 6].strip()
    
    return json_critter_list
    
def write_to_json(critter_list):
    # takes critter list and writes it to json at "critters.json"
    critter_dict = {"critters": critter_list}
    filename = "sea_creatures.json"
    with open(filename, 'w') as outfile:
        json.dump(critter_dict, outfile, indent=2, ensure_ascii=False)

def main():
    sea_creature_list = get_input("sea_creatures")
    critter_list = create_critter_list(sea_creature_list)
    write_to_json(critter_list)

if __name__ == "__main__":
    main()
