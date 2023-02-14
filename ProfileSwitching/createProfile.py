"""
# Instructions

createProfile.py 1.2
    will create a new profile for decreased sensitivity of 120%

# Explanation
Script that reads 5 files and adjusts certain values by a given percentage in each of the files.

Changes for values in:

1. insulin_sensitivities.json:
   new sensitivity = sensitivity / factor
2. basal_profile.json:
   new rate = rate * factor
3. carb_ratios.json:
   new ratio = ratio / factor
4. profile.json & pumpprofile.json:
   all 3 above values in the same way

The rounding of results:
sensitivity - whole number
basal rate - nearest 0.05 (omnipod)
carb ratio - single digit

Files reside in the same directory ./settings and the output with the same filenames will go into ./settings80 (or whatever the factor is)
All files that are not adjusted but and are in ./settings will just be copied to the new profile dirctory.

"""

import json
import os
import shutil
from decimal import Decimal, localcontext

DEFAULT_FACTOR = 0.8

BASE_DIR = os.path.dirname(os.path.realpath(__file__))
iosBASE_DIR = "/private/var/mobile/Containers/Data/Application/B74FC6C2-E5CA-4C34-A896-73E11F5C1CA8/Documents"



SETTINGS_FOLDER = "settings"
INPUT_FOLDER = os.path.join(BASE_DIR, SETTINGS_FOLDER)

concerned_filenames = {
    "BASAL": "basal_profile.json",
    "CARB": "carb_ratios.json",
    "ISF": "insulin_sensitivities.json",
    "PROFILE": "profile.json",
    "PUMPPROFILE": "pumpprofile.json",
}


def load_data(file_name):
    path = os.path.join(INPUT_FOLDER, file_name)
    with open(path, "r") as f:
        data = json.load(f)
    return data


def save_data(file_name, data, factor):
    path = get_output_path(factor)
    if not os.path.exists(path):
        os.makedirs(path)
    file = os.path.join(path, file_name)
    with open(file, "w") as f:
        json.dump(data, f, indent=2)


def get_output_path(factor):
    folder_name = SETTINGS_FOLDER + str(int(factor * 100))
    return os.path.join(BASE_DIR, folder_name)


def calc_basal_profile(data, factor):
    result = []
    for item in data:
        item["rate"] = round(20 * (item["rate"] * factor),0) / 20
        result.append(item)
    data = result
    return data


def calc_carb_ratios(data, factor):
    result = []
    for item in data["schedule"]:
        ratio = item["ratio"] / factor
        if (ratio).is_integer():
            item["ratio"] = int(ratio)
        else:
            item["ratio"] = round(ratio, 1)
        result.append(item)
    data["schedule"] = result
    return data


def calc_insulin_sensitivities(data, factor):
    result = []
    unitsBG = data["units"]
    for item in data["sensitivities"]:
        if unitsBG == "mg/dL" :
            item["sensitivity"] = round(item["sensitivity"] / factor)
        else:
            item["sensitivity"] = round(item["sensitivity"] / factor, 1)
        result.append(item)
    data["sensitivities"] = result
    return data


def calc_profile(data, factor):
    basal_profile = calc_basal_profile(data["basalprofile"], factor)
    carb_ratios = calc_carb_ratios(data["carb_ratios"], factor)
    insulin_sensitivities = calc_insulin_sensitivities(data["isfProfile"], factor)

    data["basalprofile"] = basal_profile
    data["carb_ratios"] = carb_ratios
    data["isfProfile"] = insulin_sensitivities

    return data


def basal_profile(factor):
    data = load_data(concerned_filenames["BASAL"])
    result = calc_basal_profile(data, factor)
    save_data(concerned_filenames["BASAL"], result, factor)
    print(f"Done: {concerned_filenames['BASAL']}")


def carb_ratios(factor):
    data = load_data(concerned_filenames["CARB"])
    result = calc_carb_ratios(data, factor)
    save_data(concerned_filenames["CARB"], result, factor)
    print(f"Done: {concerned_filenames['CARB']}")


def insulin_sensitivities(factor):
    data = load_data(concerned_filenames["ISF"])
    result = calc_insulin_sensitivities(data, factor)
    save_data(concerned_filenames["ISF"], result, factor)
    print(f"Done: {concerned_filenames['ISF']}")


def profile(factor):
    data = load_data(concerned_filenames["PROFILE"])
    result = calc_profile(data, factor)
    save_data(concerned_filenames["PROFILE"], result, factor)
    print(f"Done: {concerned_filenames['PROFILE']}")


def pumpprofile(factor):
    data = load_data(concerned_filenames["PUMPPROFILE"])
    result = calc_profile(data, factor)
    save_data(concerned_filenames["PUMPPROFILE"], result, factor)
    print(f"Done: {concerned_filenames['PUMPPROFILE']}")


def copy_remaining_files(factor):
    for file in os.listdir(INPUT_FOLDER):
        if not file in concerned_filenames.values():
            source_file = os.path.join(INPUT_FOLDER, file)
            target = get_output_path(factor)
            shutil.copy2(source_file, target)
            print(f"Copied: {file}")


def main(factor=DEFAULT_FACTOR):
    print(f"RUNNING: Based on factor → {factor}")
    print(f"FROM: {INPUT_FOLDER}")
    basal_profile(factor)
    carb_ratios(factor)
    insulin_sensitivities(factor)
    profile(factor)
    pumpprofile(factor)
    copy_remaining_files(factor)
    print(
        f"""
COMPLETED: Base directory was {BASE_DIR} . Please locate the new files at:

    {get_output_path(factor)}
"""
    )


if __name__ == "__main__":
    import sys

    try:
        factor = float(sys.argv[1])
        main(factor)
    except IndexError:
        print(
            f"INFO: You didn't include a [factor]. The default: {DEFAULT_FACTOR}, will be used."
        )
        print(f"Usage: python {sys.argv[0]} <factor>\n")
        main()
