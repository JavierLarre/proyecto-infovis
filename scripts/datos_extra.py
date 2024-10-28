import json
import os

data = [
    {2014: "Twitter es la red social con mayor crecimiento en el mundo"}, # https://postcron.com/es/blog/todas-las-tendencias-en-redes-sociales-2014-infograficos-estadisticas-y-tips/
    {2015: "El promedio del uso de Facebook es de 1 hora y 16 minutos al día"}, # https://www.elmostrador.cl/agenda-pais/vida-en-linea/2015/12/30/en-2015-los-chilenos-estuvieron-conectados-cuatro-horas-diarias-a-aplicaciones-moviles/
    {2016: "El 90% de los usuarios de smartphone usan Facebook activamente"}, # https://www.24horas.cl/tendencias/ciencia-tecnologia/estudio-revela-cuales-fueron-las-tres-aplicaciones-mas-usadas-por-los-chilenos-este-2016-2232290
    {2017: "Facebook tiene 13 millones de usuarios activos mensualmente"}, # https://datareportal.com/reports/digital-2017-chile
    {2018: "Instagram tiene 6 millones de usuarios activos mensualmente"},
    {2019: "Twitter tiene 1.53 millones de usuarios activos mensualmente"},
    {2020: "Chile alcanza los 15 millones de usuarios en redes sociales"},
    {2021: "el 80% de la populación Chilena mayor de edad es un usuario activo de Youtube"},
    {2022: "TikTok tiene 8.55 millones de usuarios mayores de edad, un 57.5% de la población adulta Chilena"},
    {2023: "Facebook tiene 12.5 millones de usuarios activos mensualmente en Chile"},
    {2024: "La cantidad de usuarios activos en Twitter aumenta en 14.6%"}  
]

with open('data.json', 'w') as file:
    json.dump(data, file, indent=2)