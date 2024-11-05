const path = "scripts/data.json";
export async function loadData() {
    const response = await fetch(path);
    const data = await response.json();
    return data;
}