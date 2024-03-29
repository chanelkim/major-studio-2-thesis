import json


def find_and_append_object_ids(words_file, categories_file):
    # Load the JSON data from the files
    with open(words_file, 'r') as wf:
        words_data = json.load(wf)
    with open(categories_file, 'r') as cf:
        categories_data = json.load(cf)

    # Function to recursively search and append ObjectIDs
    def search_and_append(data, word, object_ids):
        if isinstance(data, dict):
            for key, value in data.items():
                print(f"WORD {word} KEY {key}")
                if word.lower() in key.lower() and key.lower() != "part" and key.lower() != "catalogid" and key.lower() != "objectids":
                    print("MATCH")
                    if "ObjectIDs" not in data[key]:
                        # print(f"DATA KEY?? {data[key]}")
                        data[key]["ObjectIDs"] = []
                    data[key]["ObjectIDs"].extend(object_ids)
                search_and_append(value, word, object_ids)
        elif isinstance(data, list):
            for item in data:
                search_and_append(item, word, object_ids)

    # Iterate through each word and perform the search and append operation
    for word_info in words_data:
        if len(word_info["Word"]) > 2:
            word = word_info["Word"]
            object_ids = word_info["ObjectIDs"]
            search_and_append(categories_data, word, object_ids)

    # Return the modified categories data
    return categories_data

# Define the paths to the JSON files
words_file_path = 'words.json'
categories_file_path = 'categories.json'

# Call the function and get the updated categories data
updated_categories = find_and_append_object_ids(words_file_path, categories_file_path)

# Optionally, you can write the updated categories data back to a file
with open('updated_categories.json', 'w') as outfile:
    json.dump(updated_categories, outfile, indent=4)
