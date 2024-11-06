function addButton(div, text) {
    const button = document.createElement('button');
    document.getElementById(div).appendChild(button);
    button.innerHTML = text;
    return button;
}

export function addButtons(div) {
    const buttons = {
        'facebook': addButton(div, 'Facebook'),
        'instagram': addButton(div, 'instagram')
    }
    return buttons;
}