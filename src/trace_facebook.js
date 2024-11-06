const path = "scripts/uso_facebook.json";
export async function loadData() {
    const response = await fetch(path);
    const data = await response.json();
    return data;
}

function clean_data(data) {
    for (const key in data) {
        if (data[key] === 0) {
            delete data[key];
        }
    }
}

const data = await loadData();
clean_data(data);

export const trace_facebook = {
    x: Object.keys(data),
    y: Object.values(data),
    mode: 'lines',
    name: 'Usuarios de <br> Facebook',
    line: { color: 'blue', width: 2 },
    hoverinfo: 'none',
    hovertemplate: 'Año: %{x}<br>Usuarios: %{y:.2f} <extra></extra>'
};