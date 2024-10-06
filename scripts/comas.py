datos = [
    17687108,
    17870124,
    18083879,
    18368577,
    18701450,
    19039485,
    19300315,
    19493184,
    19603733,
    19629590,
]

file_path = 'data/redes_sociales.csv'

with open(file_path, "r") as file:
    lines = [line.strip() for line in file.readlines()]

for i, line in enumerate(lines):
    if i == 0:
        lines[i] += ",Poblacion total en Chile\n"
        continue
    lines[i] += f",{datos[i-1]}\n"

with open(file_path, "w") as file:
    file.writelines(lines)