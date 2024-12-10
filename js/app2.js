// String.prototype.replaceAt = function(string, character){ return this.substr(0, index) + character + this.substring(index + character.length);
// }

// Función para reemplazar una letra en una cadena en una posición específica
const replaceAt = (string, character, index) => {
    return string.substring(0, index) + character + string.substring(index + character.length);
};

// Array de palabras posibles
const palabras = ['ropa', 'avion', 'lavadora', 'comida'];
// Seleccionar una palabra aleatoria
const palabraA = palabras[Math.floor(Math.random() * palabras.length)];
let hiddenWord = palabraA.replace(/./g, "_ "); // Crear la palabra con guiones
let contadorFailed = 0;

console.log(palabraA);
console.log(palabraA + " - " + hiddenWord);

// Mostrar la palabra con guiones
document.querySelector('#salida').innerHTML = hiddenWord;

document.querySelector('#calcular').addEventListener('click', () => {
    const letra = document.querySelector('#letra').value; // Obtener la letra introducida
    let failed = true;

    // Recorrer la palabra secreta para comprobar si la letra está en la palabra
    for (let i in palabraA) {
        if (letra === palabraA[i]) {
            hiddenWord = replaceAt(hiddenWord, letra, i * 2); // Reemplazar el guion por la letra
            failed = false;
        }
    }

    // Si la letra es incorrecta, incrementar el contador de fallos
    if (failed) {
        contadorFailed++;
        document.querySelector('#ahorcado').style.backgroundPosition = -(307.2 * contadorFailed) + 'px 0';
        if (contadorFailed === 4) {
            alert('Has perdido');
        }
    } else {
        // Verificar si el jugador ha ganado
        if (!hiddenWord.includes("_")) {
            document.querySelector('#ganador').style.display = 'flex';
        }
    }

    // Actualizar el texto con la palabra oculta
    document.querySelector('#salida').innerHTML = hiddenWord;

    // Limpiar el campo de entrada
    document.querySelector('#letra').value = '';
    document.querySelector('#letra').focus();
});

