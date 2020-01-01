function boothRun () {
    let multiplicand = document.getElementById("multiplicand").value;
    let multiplier = document.getElementById("multiplier").value;
    if (multiplicand > 127 || multiplicand < -128 || multiplier > 127 || multiplier < -128) {
        alert("numbers must both be between -128 and 127")
        return;
    }
    let add = toBinary(multiplicand) + "000000000";
    let sub = toBinary(-multiplicand) + "000000000";
    let product = "00000000" + toBinary(multiplier) + "0";

    let html = "<ul><li> Addition: " + add + "</li><li> Subtraction: " + sub + "</li><li> Initial Product: " + product + "</li></ul>"
    html += "<table>"
    html += "<tr><td> iteration </td><td> Action </td><td> new Product</td>"
    for (let i = 0; i < 8; i++) {
        html += "<tr><td>" + i + "</td>";
        let end = product.slice(15)
        switch (end) {
            case "01":
                html += "<td> Add and shift</td>"
                product = shiftBinary(addBinary(product, add));
                break;
            case "10":
            html += "<td> Sub and shift</td>"
                product = shiftBinary(addBinary(product, sub));
                break;
            case "00":
            case "11":
                html += "<td>Shift Only</td>"
                product = shiftBinary(product);
        }
        html += "<td>" + product + "</td>"
    }
    html += "</table>";
    let finalProduct = product.slice(0,16);
    html += "drop the final bit: " + finalProduct + " which is equal to " + bintodec(finalProduct);
    
    let div = document.createElement('div');
    div.innerHTML = html;
    document.body.appendChild(div);
}

function toBinary (num) {
    // converts number to binary
    let prepend = "0"
    if (num < 0) {
        prepend = "";
    }
    let temp = prepend + (num >>> 0).toString(2);

    // makes length of number to 8 bits
    let templength = temp.length;
    if (templength > 8) {
        temp = temp.slice(templength - 8);
    } else {
        for (let i = 0; i < 8 - templength; i++) {
            temp = "0" + temp;
        }
    }

    return temp;
}

function addBinary (binary1, binary2) {
    let sumBinary = binary1;
    let carry = 0;
    for (let i = sumBinary.length - 1; i >= 0; i--) {
        let sum = carry + Number(binary1[i]) + Number(binary2[i]);
        switch (sum) {
            case 0:
                sumBinary = sumBinary.substring(0,i) + "0" + sumBinary.substring(i+1);
                carry = 0;
                break;
            case 1:
                sumBinary = sumBinary.substring(0,i) + "1" + sumBinary.substring(i+1);
                carry = 0;
                break;
            case 2:
                sumBinary = sumBinary.substring(0,i) + "0" + sumBinary.substring(i+1);
                carry = 1;
                break;
            case 3:
                sumBinary = sumBinary.substring(0,i) + "1" + sumBinary.substring(i+1);
                carry = 1;
                break;
        }
    }
    return sumBinary;
}

function shiftBinary (binary) {
    let newBinary = binary.split("");
    for ( let i = newBinary.length - 1; i > 0; i--) {
        newBinary[i] = newBinary[i-1];
    }
    return newBinary.join("");
}

function bintodec (binary) {
    if (binary[0] === "0")
    {
        return parseInt(binary, 2);
    } else {
        console.log(binary);
        let binaryArr = binary.split("");
        for ( let i = 0; i < binaryArr.length; i++) {
            if (binaryArr[i] === "1") {
                binaryArr[i] = "0";
            } else {
                binaryArr[i] = "1";
            }
        }
        let newBinary = binaryArr.join("");
        return -parseInt(newBinary, 2) - 1;
    }
}