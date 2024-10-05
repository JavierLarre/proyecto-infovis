datos = [
    1695034, 
    1819564, 
    2025042, 
    2186173,
    2309572, 
    2501356, 
    2729251, 
    2912133, 
    3068528, 
    3256097,
    3434767, 
    3802033, 
    4287491, 
    4460212, 
    4524579 
]

with open("data/velocidad_internet.csv", "r") as file:
    lines = [line.strip() for line in file.readlines()]
    for i, line in enumerate(lines):
        if i == 0:
            continue
        lines[i] += f"{datos[i-1]}\n"

with open("data/velocidad_internet.csv", "w") as file:
    file.writelines(lines)