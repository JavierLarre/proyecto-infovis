const data_path = "scripts/uso_instagram.json";
const users_mill_path = "scripts/users_mill.json";
export async function loadData(path) {
    const response = await fetch(path);
    const data = await response.json();
    return data;
}

function clean_data(data, users_mill) {
    for (const key in data) {
        if (data[key] === 0) {
            delete data[key];
        }
        else {
            data[key] = (data[key] / users_mill[key]) *100;
        }
    }
}

const data = await loadData(data_path);
console.log(data);
const users_mill = await loadData(users_mill_path);
clean_data(data, users_mill);

export const trace_instagram = {
    x: Object.keys(data),
    y: Object.values(data),
    mode: 'lines',
    name: 'Usuarios de <br> Instagram',
    line: { color: 'blue', width: 2 },
    hoverinfo: 'none',
    hovertemplate: 'Año: %{x}<br>Usuarios: %{y:.2f} <extra></extra>'
};