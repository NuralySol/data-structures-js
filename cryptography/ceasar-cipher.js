//! Ceasar Cipher is cryptographic technique of encoding and decoding message strings, it is a good exercise in understading on implementing the basic cryptographic concepts in JS code:

//* ceasarCipher function, which includes both encryption and decryption functionalities. Function handles both uppercase and lowercase letters and preserves non-alphabetic chars:

const ceasarCipher = (text, shift, decrypt = false) => {
    // adjust the shift for decryption:
    const shiftAmount = shift % 26;
    let actualShift;

    if (decrypt) {
        // for decryption, reverse the shift:
        actualShift = (26 - shiftAmount) % 26;
    } else {
        // for encryption, use the forward shift:
        actualShift = shiftAmount;
    }

    // result holder of an empty string:
    let result = '';

    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        // check if the char is an uppercase letter:
        if (char >= 'A' && char <= 'Z') {
            //* charCodeAt() is a method: The charCodeAt() method of String values returns an integer between 0 and 65535 representing the UTF-16 code unit at the given index.
            let charCode = char.charCodeAt(0);
            let shiftedCharCode = ((charCode - 65 + actualShift) % 26) + 65;
            result += String.fromCharCode(shiftedCharCode);
        }
        // check if the string char is a lowercase letter:
        else if (char >= 'a' && char <= 'z') {
            let charCode = char.charCodeAt(0);
            let shiftedCharCode = ((charCode - 97 + actualShift) % 26) + 97;
            result += String.fromCharCode(shiftedCharCode);
        }
        // if element is not a letter, append as it is:
        else {
            result += char;
        }
    }
    return result;
}

// encrypt the message using the ceasarCipher function:
const encryptedText = ceasarCipher('Hello World!', 3);
console.log('Encrypted: ', encryptedText);

// decrypt the message:
const decryptedText = ceasarCipher(encryptedText, 3, true);
console.log('Decrypted Text: ', decryptedText);

// encryption with the negative shift (equivalent to a positive shift in a reverse direction):
const encryptedNegativeShift = ceasarCipher('Hello World', -3);
console.log('Encrypted with negative shift: ', encryptedNegativeShift);

// decrypt the negative shifted message:
const decryptNegativeShift = ceasarCipher(encryptedNegativeShift, -3, true);
console.log('Decrypted negative shift: ', decryptNegativeShift);

//! Atbash cipher is a simple substution cipher where each letter in the alphabet is replaced by its 'mirror' letter. For example, 'A' becomes 'Z', 'B' turns into 'Y', etc. 

const atbashCipher = (text) => {
    // init the lower cased alphabet string && its mirror image:
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const reversedAlphabet = 'zyxwvutsrqponmlkjihgfedcba';
    let result = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const lowerChar = char.toLowerCase();

        if (alphabet.includes(lowerChar)) {
            const index = alphabet.indexOf(lowerChar);
            const cipherChar = reversedAlphabet[index];

            // maintain the original case:
            result += (char === lowerChar) ? cipherChar : cipherChar.toUpperCase()
        } else {
            // keep non-alphabetic chars as they are:
            result += char;
        }
    }
    return result;
}

const plainText = 'Hello World!';
const cipherText = atbashCipher(plainText);
console.log('Ciphered Text: ', cipherText);

//! Vigenere cipher is a method of encrypting alphabetic text by using a series of different Ceasar ciphers based on the letters of a keyboard. It is a form of a polygraphic substitution cipher. 

// Vigenère cipher: encrypt or decrypt text using a keyword:
const vigenere = (message, keyword, operation) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    let keywordIndex = 0;

    // determine encryption or decryption:
    let shiftDirection;
    if (operation === 'enc') {
        shiftDirection = 1;
    } else if (operation === 'dec') {
        shiftDirection = -1;
    } else {
        console.error('Invalid operation! Use "enc" for encrypt or "dec" for decrypt.');
        return '';
    }

    for (let i = 0; i < message.length; i++) {
        const char = message[i];
        const charIndex = alphabet.indexOf(char.toLowerCase());

        if (charIndex >= 0) { 
            const keywordChar = keyword[keywordIndex % keyword.length];
            const keywordCharIndex = alphabet.indexOf(keywordChar.toLowerCase());

            let shiftedIndex = (charIndex + shiftDirection * keywordCharIndex + 26) % 26;
            let cipherChar = alphabet[shiftedIndex];

            // preserve case:
            if (char === char.toUpperCase()) {
                cipherChar = cipherChar.toUpperCase();
            }

            result += cipherChar;
            keywordIndex++;
        } else {
            // preserve the non-letters:
            result += char; 
        }
    }
    return result;
};

// message with key for cipher:
const msg = "Attack at dawn!";
const key = "lemon";

// encryption:
const encrypted = vigenere(msg, key, "enc");
console.log('Encrypted:', encrypted);

// decryption:
const decrypted = vigenere(encrypted, key, "dec");
console.log('Decrypted:', decrypted);

//! XOR cipher is a simple symmetric encryption method where plaintext is combined with a key using the bitwise XOR operation.

const xorCipher = (text, key) => {
    let result = '';
    const keyLength = key.length;

    for (let i = 0; i < text.length; i++) {
        const charCodeText = text.charCodeAt(i);
        const charCodeKey = key.charCodeAt(i % keyLength) // cycle through the key:
        const xoredCharCode = charCodeText ^ charCodeKey;
        result += String.fromCharCode(xoredCharCode);
    }
    return result;
}

const textForXOR = 'Hello World';
const encryptionKey = 'secret';

// encrypt the text:
const cipherTextXOR = xorCipher(textForXOR, encryptionKey);
console.log('ciphered text: ', cipherTextXOR);

// decrypt the text:
const decryptedXOR = xorCipher(cipherTextXOR, encryptionKey);
console.log('decrypted text: ', decryptedXOR);