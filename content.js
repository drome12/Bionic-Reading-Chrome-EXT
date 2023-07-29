// content.js
function highlightFirstHalf(text) {
    // split text into words
    const words = text.split(' ');

    // iterate over words
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        let firstHalf = getFirstHalf(word);

        // replace the first half with a bolded version
        words[i] = word.replace(firstHalf, `<b>${firstHalf}</b>`);
    }

    // join words back into text
    return words.join(' ');
}

function getFirstHalf(word) {
    // get the first half of the word
    let halfLength = Math.ceil(word.length / 2);
    return word.substring(0, halfLength);
}

// iterate over all text nodes in the body
function walk(node) {
    let child, next;
    switch (node.nodeType) {
        case 1: // Element
        case 9: // Document
        case 11: // Document fragment
            child = node.firstChild;
            while (child) {
                next = child.nextSibling;
                walk(child);
                child = next;
            }
            break;
        case 3: // Text node
            handleText(node);
            break;
    }
}

function handleText(textNode) {
    let newNodeValue = highlightFirstHalf(textNode.nodeValue);
    let newElement = document.createElement("span"); // Create a new span element
    newElement.innerHTML = newNodeValue; // Set the innerHTML of the new element

    // Replace the old text node with the new element
    textNode.parentNode.replaceChild(newElement, textNode);
}

// start the walk from the body tag
walk(document.body);
