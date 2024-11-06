const path = "scripts/uso_facebook.json";
export async function loadData() {
    const response = await fetch(path);
    const data = await response.json();
    return data;
}

const data = await loadData();
export const trace_facebook = {
    x: Object.keys(data),
    y: Object.values(data),
    mode: 'lines',
    name: 'Usuarios de <br> Facebook',
    line: { color: 'green', width: 2 },
    hoverinfo: 'none',
    hovertemplate: 'Año: %{x}<br>Usuarios: %{y:.2f} <extra></extra>'
};