const images_paths = {
    x: "imagenes/twitterX.png",
    twitter: "imagenes/twitter.png",
    facebook: "imagenes/facebook.png",
    instagram: "imagenes/instagram.png",
    gato: "imagenes/gato.jpg",
    youtube: "imagenes/youtube.png",
    tiktok: "imagenes/tiktok.png",
    chile: "imagenes/chile.png"
}

const image_year_mapping = {
    2014: images_paths.twitter,
    2015: images_paths.facebook,
    2016: images_paths.facebook,
    2017: images_paths.facebook,
    2018: images_paths.instagram,
    2019: images_paths.twitter,
    2020: images_paths.chile,
    2021: images_paths.youtube,
    2022: images_paths.tiktok,
    2023: images_paths.tiktok,
    2024: images_paths.twitter
}

function place_image(xValue, yValue, layout) {
    layout.images = layout.images || [];
    // Configuración de la imagen de hover
    const hoverImage = {
        source: image_year_mapping[xValue],
        x: xValue,
        y: yValue - 8,
        sizex: 10,
        sizey: 10,
        xanchor: "center",
        yanchor: "middle",
        xref: "x",
        yref: "y"
    };
    // Actualizamos layout.images sin eliminar otras imágenes
    // por qué ??????
    layout.images = [hoverImage];
    Plotly.relayout('myDiv', { images: layout.images });
}

export { place_image };