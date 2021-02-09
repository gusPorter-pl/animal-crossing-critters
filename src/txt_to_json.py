"""
Takes input texts in "./critter_info", and converts it to json
"""

import json

def get_input(critter_type):
    # reads input of text file, and returns list of lines
    filename = "./critter_info/" + critter_type + ".txt"
    input_file = open(filename, 'r')
    input_text = input_file.read()
    critter_list = input_text.split('\n')
    return critter_list

def create_critter_list(insect_list, fish_list, sea_creatures_list):
    # takes the lists of the critters, and converts them into one list of critter dictionaries
    critter_list = []
    insect_length, fish_length, sea_creatures_length = 5, 5, 4

    for i in range(len(insect_list) // insect_length):
        index = insect_list[i * insect_length].strip()
        name = insect_list[i * insect_length + 1].strip()
        months = insect_list[i * insect_length + 2].strip()
        time = insect_list[i * insect_length + 3].strip()
        location = insect_list[i * insect_length + 4].strip()
        critter = {"type": "Insect", "index": index, "name": name, "months": months, "time": time, "location": location, "status": "Not Caught"}
        critter_list.append(critter)

    for i in range(len(fish_list) // fish_length):
        index = fish_list[i * fish_length].strip()
        name = fish_list[i * fish_length + 1].strip()
        months = fish_list[i * fish_length + 2].strip()
        time = fish_list[i * fish_length + 3].strip()
        location = fish_list[i * fish_length + 4].strip()
        critter = {"type": "Fish", "index": index, "name": name, "months": months, "time": time, "location": location, "status": "Not Caught"}
        critter_list.append(critter)
    
    for i in range(len(sea_creatures_list) // sea_creatures_length):
        index = sea_creatures_list[i * sea_creatures_length].strip()
        name = sea_creatures_list[i * sea_creatures_length + 1].strip()
        months = sea_creatures_list[i * sea_creatures_length + 2].strip()
        time = sea_creatures_list[i * sea_creatures_length + 3].strip()
        critter = {"type": "Sea Creature", "index": index, "name": name, "months": months, "time": time, "status": "Not Caught"}
        critter_list.append(critter)
    
    return critter_list
    
def write_to_json(critter_list):
    # takes critter list and writes it to json at "critters.json"
    critter_dict = {"critters": critter_list}
    filename = "critters.json"
    with open(filename, 'w', encoding="utf-8") as outfile:
        json.dump(critter_dict, outfile, indent=2, ensure_ascii=False)

def main():
    insect_list = get_input("insects")
    fish_list = get_input("fish")
    sea_creature_list = get_input("sea_creatures")
    critter_list = create_critter_list(insect_list, fish_list, sea_creature_list)
    write_to_json(critter_list)

if __name__ == "__main__":
    main()
